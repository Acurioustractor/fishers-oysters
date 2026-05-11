import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type CopySaveResult = {
  mode: 'local-file' | 'github-commit';
  message: string;
  commitUrl?: string;
  deployHookTriggered?: boolean;
};

const copyFilePath = 'src/content/site-copy.json';

export type PublishingStatus = {
  mode: 'local-file' | 'github-commit';
  isOnlineDeployment: boolean;
  isConfigured: boolean;
  repository?: string;
  branch?: string;
  deployHookConfigured: boolean;
  missing: string[];
};

function localCopyPath() {
  return path.join(process.cwd(), copyFilePath);
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

export function getPublishingStatus(): PublishingStatus {
  const repository = process.env.GITHUB_REPOSITORY;
  let owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
  let repo = process.env.GITHUB_REPO_NAME || process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

  if (repository?.includes('/')) {
    [owner, repo] = repository.split('/');
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';
  const isOnlineDeployment = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';

  const missing = [
    !token ? 'GITHUB_TOKEN' : null,
    !owner || !repo ? 'GITHUB_REPOSITORY' : null,
  ].filter(Boolean) as string[];

  return {
    mode: isOnlineDeployment ? 'github-commit' : 'local-file',
    isOnlineDeployment,
    isConfigured: !isOnlineDeployment || missing.length === 0,
    repository: owner && repo ? `${owner}/${repo}` : undefined,
    branch,
    deployHookConfigured: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL),
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

async function saveToGitHub(content: string): Promise<CopySaveResult> {
  const target = getGitHubTarget();

  if (!target) {
    throw new Error(
      'Production copy saving needs GITHUB_TOKEN plus GITHUB_REPOSITORY, or GITHUB_OWNER and GITHUB_REPO_NAME.'
    );
  }

  const { owner, repo, branch, token } = target;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${copyFilePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

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
      ? 'Saved copy to GitHub and requested a Vercel deploy.'
      : 'Saved copy to GitHub. Vercel will redeploy from the connected branch.',
    commitUrl: result.commit?.html_url,
    deployHookTriggered,
  };
}

export async function readCopyFile() {
  return readFile(localCopyPath(), 'utf8');
}

export async function saveCopyFile(content: string): Promise<CopySaveResult> {
  const shouldCommitToGitHub = getPublishingStatus().isOnlineDeployment;

  if (shouldCommitToGitHub) {
    return saveToGitHub(content);
  }

  await writeFile(localCopyPath(), content, 'utf8');

  return {
    mode: 'local-file',
    message: 'Saved copy to src/content/site-copy.json. The local dev site will refresh automatically.',
  };
}
