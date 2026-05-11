'use client';

import { useState } from 'react';

type OwnerLoginProps = {
  isConfigured: boolean;
  requiresUsername: boolean;
  isUsingLocalDefault: boolean;
};

export default function OwnerLogin({ isConfigured, requiresUsername, isUsingLocalDefault }: OwnerLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    const response = await fetch('/api/owner/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    const data = await response.json().catch(() => null);
    setError(data?.error || 'Could not sign in.');
    setStatus('error');
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="font-display text-3xl font-bold text-primary">Owner login</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        Sign in to edit the website copy and save changes for redeploy.
      </p>

      {!isConfigured && (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Owner login is not configured. Set <code>OWNER_PASSWORD</code> in the environment.
        </div>
      )}

      {isUsingLocalDefault && (
        <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Local dev password: <code>fishers-oysters</code>
        </div>
      )}

      <form onSubmit={submitLogin} className="mt-6 space-y-4">
        {requiresUsername && (
          <div>
            <label htmlFor="owner-username" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="owner-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              disabled={!isConfigured || status === 'loading'}
              autoComplete="username"
              required={requiresUsername}
            />
          </div>
        )}

        <div>
          <label htmlFor="owner-password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="owner-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
            disabled={!isConfigured || status === 'loading'}
            autoComplete="current-password"
            required
          />
        </div>

        {status === 'error' && (
          <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isConfigured || status === 'loading'}
        >
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
