import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { isPublicHoldEnabled } from '@/lib/site-hold';

export type CopySaveResult = {
  mode: 'local-file' | 'github-commit';
  message: string;
  commitUrl?: string;
  deployHookTriggered?: boolean;
};

export type CopyJsonValue = string | number | boolean | null | undefined | CopyJsonObject | CopyJsonValue[];
export type CopyJsonObject = { [key: string]: CopyJsonValue };

const copyFilePath = 'src/content/site-copy.json';

export type PublishingStatus = {
  mode: 'local-file' | 'github-commit';
  isOnlineDeployment: boolean;
  isConfigured: boolean;
  repository?: string;
  branch?: string;
  deployHookConfigured: boolean;
  isPublicHoldEnabled: boolean;
  missing: string[];
};

function localCopyPath() {
  return path.join(process.cwd(), copyFilePath);
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

function getGitHubCopyApiUrl(owner: string, repo: string) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${copyFilePath}`;
}

export function getPublishingStatus(): PublishingStatus {
  const repository = process.env.GITHUB_REPOSITORY;
  let owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
  let repo = process.env.GITHUB_REPO_NAME || process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

  if (repository?.includes('/')) {
    [owner, repo] = repository.split('/');
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';
  const onlineDeployment = isOnlineDeployment();

  const missing = [
    !token ? 'GITHUB_TOKEN' : null,
    !owner || !repo ? 'GITHUB_REPOSITORY' : null,
  ].filter(Boolean) as string[];

  return {
    mode: onlineDeployment ? 'github-commit' : 'local-file',
    isOnlineDeployment: onlineDeployment,
    isConfigured: !onlineDeployment || missing.length === 0,
    repository: owner && repo ? `${owner}/${repo}` : undefined,
    branch,
    deployHookConfigured: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL),
    isPublicHoldEnabled: isPublicHoldEnabled(),
    missing,
  };
}

async function triggerDeployHook() {
  if (!process.env.VERCEL_DEPLOY_HOOK_URL) {
    return false;
  }

  const response = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
    method: 'POST',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Vercel deploy hook failed with ${response.status}`);
  }

  return true;
}

async function readFromGitHub() {
  const target = getGitHubTarget();

  if (!target) {
    throw new Error(
      'Production copy loading needs GITHUB_TOKEN plus GITHUB_REPOSITORY, or GITHUB_OWNER and GITHUB_REPO_NAME.'
    );
  }

  const { owner, repo, branch, token } = target;
  const apiUrl = getGitHubCopyApiUrl(owner, repo);
  const response = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    headers: getGitHubHeaders(token),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Could not read copy file from GitHub: ${response.status}`);
  }

  const file = (await response.json()) as { content?: string };

  if (typeof file.content !== 'string') {
    throw new Error('GitHub did not return copy file content.');
  }

  return Buffer.from(file.content, 'base64').toString('utf8');
}

async function saveToGitHub(content: string): Promise<CopySaveResult> {
  const target = getGitHubTarget();

  if (!target) {
    throw new Error(
      'Production copy saving needs GITHUB_TOKEN plus GITHUB_REPOSITORY, or GITHUB_OWNER and GITHUB_REPO_NAME.'
    );
  }

  const { owner, repo, branch, token } = target;
  const apiUrl = getGitHubCopyApiUrl(owner, repo);
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
    throw new Error(`Could not read copy file from GitHub: ${currentResponse.status}`);
  }

  const updateResponse = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Update website copy',
      branch,
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
    cache: 'no-store',
  });

  if (!updateResponse.ok) {
    throw new Error(`Could not save copy file to GitHub: ${updateResponse.status}`);
  }

  const result = await updateResponse.json();
  const deployHookTriggered = await triggerDeployHook();

  return {
    mode: 'github-commit',
    message: deployHookTriggered
      ? 'Saved copy to GitHub and requested a Vercel deploy. The editor shows the saved copy right away; the public site updates after the deployment finishes.'
      : 'Saved copy to GitHub. The editor shows the saved copy right away; the public site updates after Vercel finishes rebuilding.',
    commitUrl: result.commit?.html_url,
    deployHookTriggered,
  };
}

export async function readCopyFile() {
  if (isOnlineDeployment() && getGitHubTarget()) {
    return readFromGitHub();
  }

  return readFile(localCopyPath(), 'utf8');
}

export async function readCopyObject(): Promise<CopyJsonObject> {
  return JSON.parse(await readCopyFile()) as CopyJsonObject;
}

export async function saveCopyFile(content: string): Promise<CopySaveResult> {
  const shouldCommitToGitHub = isOnlineDeployment();

  if (shouldCommitToGitHub) {
    return saveToGitHub(content);
  }

  await writeFile(localCopyPath(), content, 'utf8');

  return {
    mode: 'local-file',
    message: 'Saved copy to src/content/site-copy.json. The local dev site will refresh automatically.',
  };
}
