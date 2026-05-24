import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type SiteState = {
  publicHold: boolean;
};

export type SiteStateSaveResult = {
  mode: 'local-file' | 'github-commit';
  message: string;
  commitUrl?: string;
  deployHookTriggered?: boolean;
  publicHold: boolean;
};

const siteStateFilePath = 'src/content/site-state.json';

function localSiteStatePath() {
  return path.join(process.cwd(), siteStateFilePath);
}

function isOnlineDeployment() {
  return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
}

function getGitHubTarget() {
  const repository = process.env.GITHUB_REPOSITORY;
  let owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
  let repo = process.env.GITHUB_REPO_NAME || process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

  if (repository?.includes('/')) {
    [owner, repo] = repository.split('/');
  }

  const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (!owner || !repo || !token) {
    return null;
  }

  return { owner, repo, branch, token };
}

function getGitHubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

function siteStateApiUrl(owner: string, repo: string) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${siteStateFilePath}`;
}

async function triggerDeployHook() {
  if (!process.env.VERCEL_DEPLOY_HOOK_URL) return false;

  const response = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
    method: 'POST',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Vercel deploy hook failed with ${response.status}`);
  }

  return true;
}

const DEFAULT_STATE: SiteState = { publicHold: true };

function parseSiteState(text: string): SiteState {
  const parsed = JSON.parse(text) as { publicHold?: unknown };
  return { publicHold: parsed.publicHold !== false };
}

export async function readSiteState(): Promise<SiteState> {
  const target = getGitHubTarget();

  if (isOnlineDeployment() && target) {
    const { owner, repo, branch, token } = target;
    const url = `${siteStateApiUrl(owner, repo)}?ref=${encodeURIComponent(branch)}`;
    const response = await fetch(url, { headers: getGitHubHeaders(token), cache: 'no-store' });

    if (response.status === 404) return DEFAULT_STATE;
    if (!response.ok) {
      throw new Error(`Could not read site state from GitHub: ${response.status}`);
    }

    const file = (await response.json()) as { content?: string };
    if (typeof file.content !== 'string') return DEFAULT_STATE;

    return parseSiteState(Buffer.from(file.content, 'base64').toString('utf8'));
  }

  try {
    return parseSiteState(await readFile(localSiteStatePath(), 'utf8'));
  } catch {
    return DEFAULT_STATE;
  }
}

export async function saveSiteState(next: SiteState): Promise<SiteStateSaveResult> {
  const content = `${JSON.stringify(next, null, 2)}\n`;

  if (!isOnlineDeployment()) {
    await writeFile(localSiteStatePath(), content, 'utf8');
    return {
      mode: 'local-file',
      message: `Saved site state to ${siteStateFilePath}. Restart the dev server to take effect.`,
      publicHold: next.publicHold,
    };
  }

  const target = getGitHubTarget();
  if (!target) {
    throw new Error('Publishing the site needs GITHUB_TOKEN plus GITHUB_REPOSITORY.');
  }

  const { owner, repo, branch, token } = target;
  const apiUrl = siteStateApiUrl(owner, repo);
  const headers = getGitHubHeaders(token);

  const currentResponse = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    headers,
    cache: 'no-store',
  });

  let sha: string | undefined;
  if (currentResponse.ok) {
    const current = await currentResponse.json();
    sha = current.sha;
  } else if (currentResponse.status !== 404) {
    throw new Error(`Could not read site state from GitHub: ${currentResponse.status}`);
  }

  const updateResponse = await fetch(apiUrl, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: next.publicHold ? 'Take site offline (show holding page)' : 'Publish site (remove holding page)',
      branch,
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
    cache: 'no-store',
  });

  if (!updateResponse.ok) {
    throw new Error(`Could not save site state to GitHub: ${updateResponse.status}`);
  }

  const result = await updateResponse.json();
  const deployHookTriggered = await triggerDeployHook();

  const liveMessage = deployHookTriggered
    ? 'Saved to GitHub and requested a Vercel deploy. The public site will switch over after the deployment finishes (about 1 minute).'
    : 'Saved to GitHub. The public site will switch over after Vercel finishes rebuilding.';

  return {
    mode: 'github-commit',
    message: liveMessage,
    commitUrl: result.commit?.html_url,
    deployHookTriggered,
    publicHold: next.publicHold,
  };
}
