'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CopyJsonObject as JsonObject, CopyJsonValue as JsonValue, PublishingStatus } from '@/lib/owner-copy-store';

type PathPart = string | number;

type SaveResponse = {
  success?: boolean;
  message?: string;
  mode?: string;
  commitUrl?: string;
  deployHookTriggered?: boolean;
  error?: string;
};

type UploadResponse = {
  success?: boolean;
  src?: string;
  message?: string;
  commitUrl?: string;
  deployHookTriggered?: boolean;
  error?: string;
};

type OwnerCopyEditorProps = {
  initialCopy: JsonObject;
  previewToken: string;
  publishingStatus: PublishingStatus;
};

type EditorSection = {
  key: string;
  label: string;
  href?: string;
};

const lockedKeys = new Set(['href', 'url', 'id', 'icon']);
const imageFieldKeys = new Set(['src', 'coverImage', 'backgroundImage', 'image', 'logo']);
const primarySections: EditorSection[] = [
  { key: 'home', label: 'Home page', href: '/' },
  { key: 'about', label: 'About page', href: '/about' },
  { key: 'sales', label: 'Sales page', href: '/sales' },
  { key: 'culture', label: 'Work on Country page', href: '/culture' },
  { key: 'contact', label: 'Contact page', href: '/contact' },
  { key: 'global', label: 'Header and footer' },
];

function isJsonObject(value: JsonValue): value is JsonObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function humanize(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function shouldHideStringField(key: string, path: PathPart[]) {
  if (lockedKeys.has(key)) return true;
  return key === 'value' && path.includes('options');
}

function isImageField(key: string, value: JsonValue) {
  if (imageFieldKeys.has(key)) return true;
  return typeof value === 'string' && /^\/images\//.test(value);
}

function slotHintFromPath(path: PathPart[]) {
  return path
    .map((part) => String(part))
    .filter((part) => part && part !== 'images' && part !== 'src')
    .join('-')
    .toLowerCase();
}

function ImageUploadField({
  fieldKey,
  path,
  value,
  onChange,
}: {
  fieldKey: string;
  path: PathPart[];
  value: JsonValue;
  onChange: (path: PathPart[], value: JsonValue) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const currentSrc = typeof value === 'string' ? value : '';

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    const slot = slotHintFromPath(path) || file.name;
    formData.append('slot', slot);

    try {
      const response = await fetch('/api/upload-image', { method: 'POST', body: formData });
      const data = (await response.json().catch(() => null)) as UploadResponse | null;

      if (!response.ok || !data?.src) {
        throw new Error(data?.error || 'Could not upload the photo.');
      }

      onChange(path, data.src);
      setMessage(data.message || 'Photo uploaded. Click Publish changes to save.');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload the photo.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-gray-700">{humanize(fieldKey === 'src' ? 'photo' : fieldKey)}</span>
      <div className="flex items-start gap-4 rounded-lg border border-gray-300 bg-white p-3">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-gray-100">
          {currentSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentSrc} alt="Current photo" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">No photo</div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-outline px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : currentSrc ? 'Replace photo' : 'Upload photo'}
            </button>
            {currentSrc && (
              <code className="break-all text-xs text-gray-500">{currentSrc}</code>
            )}
          </div>
          <p className="text-xs text-gray-500">
            JPG, PNG, WEBP, GIF, AVIF or SVG. Max 8 MB. After uploading, click <strong>Publish changes</strong> to save.
          </p>
          {message && <p className="text-xs text-green-700">{message}</p>}
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

function setValueAtPath(value: JsonValue, path: PathPart[], nextValue: JsonValue): JsonValue {
  if (path.length === 0) return nextValue;

  const [head, ...tail] = path;

  if (Array.isArray(value)) {
    const next = [...value];
    next[Number(head)] = setValueAtPath(next[Number(head)], tail, nextValue);
    return next;
  }

  if (isJsonObject(value)) {
    return {
      ...value,
      [head]: setValueAtPath(value[String(head)], tail, nextValue),
    };
  }

  return value;
}

function Field({
  fieldKey,
  path,
  value,
  onChange,
}: {
  fieldKey: string;
  path: PathPart[];
  value: JsonValue;
  onChange: (path: PathPart[], value: JsonValue) => void;
}) {
  if (typeof value === 'string') {
    if (isImageField(fieldKey, value)) {
      return <ImageUploadField fieldKey={fieldKey} path={path} value={value} onChange={onChange} />;
    }

    if (shouldHideStringField(fieldKey, path)) return null;

    const isLong = value.length > 80 || value.includes('.') || value.includes('\n');

    return (
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">{humanize(fieldKey)}</span>
        {isLong ? (
          <textarea
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            rows={Math.min(8, Math.max(3, Math.ceil(value.length / 85)))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm leading-relaxed focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    if (value.every((item) => typeof item === 'string')) {
      return (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">{humanize(fieldKey)}</p>
          <div className="space-y-3">
            {value.map((item, index) => (
              <textarea
                key={`${fieldKey}-${index}`}
                value={item as string}
                onChange={(event) => onChange([...path, index], event.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm leading-relaxed focus:border-transparent focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3 className="mb-3 text-base font-semibold text-gray-900">{humanize(fieldKey)}</h3>
        <div className="space-y-4">
          {value.map((item, index) => {
            const title = isJsonObject(item)
              ? String(item.title || item.heading || item.label || item.name || `Item ${index + 1}`)
              : `Item ${index + 1}`;

            return (
              <div key={`${fieldKey}-${index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-4 text-sm font-semibold text-primary">{title}</p>
                <CopyFields value={item} path={[...path, index]} onChange={onChange} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isJsonObject(value)) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="font-display text-xl font-bold text-primary">{humanize(fieldKey)}</h2>
        <div className="mt-5">
          <CopyFields value={value} path={path} onChange={onChange} />
        </div>
      </section>
    );
  }

  return null;
}

function CopyFields({
  value,
  path,
  onChange,
}: {
  value: JsonValue;
  path: PathPart[];
  onChange: (path: PathPart[], value: JsonValue) => void;
}) {
  if (!isJsonObject(value)) return null;

  return (
    <div className="space-y-5">
      {Object.entries(value).map(([key, child]) => (
        <Field key={[...path, key].join('.')} fieldKey={key} path={[...path, key]} value={child} onChange={onChange} />
      ))}
    </div>
  );
}

function getPreviewHref(href: string, previewToken: string) {
  const separator = href.includes('?') ? '&' : '?';

  return `${href}${separator}owner_preview=${encodeURIComponent(previewToken)}`;
}

export default function OwnerCopyEditor({ initialCopy, previewToken, publishingStatus }: OwnerCopyEditorProps) {
  const [draft, setDraft] = useState<JsonObject>(initialCopy);
  const [activeSectionKey, setActiveSectionKey] = useState('home');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [commitUrl, setCommitUrl] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const sections = useMemo<EditorSection[]>(() => {
    const knownKeys = new Set(primarySections.map((section) => section.key));
    const knownSections = primarySections.filter((section) => Object.prototype.hasOwnProperty.call(draft, section.key));
    const remainingSections: EditorSection[] = Object.keys(draft)
      .filter((key) => !knownKeys.has(key))
      .map((key) => ({ key, label: humanize(key) }));

    return [...knownSections, ...remainingSections];
  }, [draft]);

  const activeSection = sections.find((section) => section.key === activeSectionKey) || sections[0];
  const activeValue = activeSection ? draft[activeSection.key] : null;

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    function warnBeforeLeaving(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', warnBeforeLeaving);

    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [hasUnsavedChanges]);

  function updateField(path: PathPart[], value: JsonValue) {
    setDraft((current) => setValueAtPath(current, path, value) as JsonObject);
    setStatus('idle');
    setMessage('');
    setCommitUrl('');
    setHasUnsavedChanges(true);
  }

  async function saveCopy() {
    setStatus('saving');
    setMessage('');
    setCommitUrl('');

    const response = await fetch('/api/owner/copy', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    });

    const data = (await response.json().catch(() => null)) as SaveResponse | null;

    if (!response.ok) {
      setStatus('error');
      setMessage(data?.error || 'Could not save copy.');
      return;
    }

    setStatus('saved');
    setMessage(data?.message || 'Saved.');
    setCommitUrl(data?.commitUrl || '');
    setHasUnsavedChanges(false);
  }

  async function reloadCopy() {
    if (hasUnsavedChanges && !window.confirm('Reloading will discard your unsaved changes. Continue?')) {
      return;
    }

    const response = await fetch('/api/owner/copy', { cache: 'no-store' });
    if (!response.ok) return;

    const data = (await response.json()) as JsonObject;
    setDraft(data);
    setActiveSectionKey((current) => (Object.prototype.hasOwnProperty.call(data, current) ? current : 'home'));
    setStatus('idle');
    setMessage('Reloaded the latest saved copy.');
    setCommitUrl('');
    setHasUnsavedChanges(false);
  }

  async function logout() {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Sign out anyway?')) {
      return;
    }

    await fetch('/api/owner/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="sticky top-0 z-20 -mx-4 border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur md:top-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-primary">Website copy editor</h1>
            <p className="mt-1 text-sm text-gray-600">
              Choose a page, change the wording, then publish. The live site updates after Vercel finishes rebuilding.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={reloadCopy} className="btn-outline px-4 py-2 text-sm">
              Reload
            </button>
            <button type="button" onClick={logout} className="btn-outline px-4 py-2 text-sm">
              Sign out
            </button>
            <button
              type="button"
              onClick={saveCopy}
              className={`px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${
                hasUnsavedChanges ? 'btn-primary ring-2 ring-secondary ring-offset-2' : 'btn-primary'
              }`}
              disabled={status === 'saving'}
            >
              {status === 'saving' ? 'Publishing...' : 'Publish changes'}
            </button>
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className="mt-4 rounded-md border border-secondary/30 bg-secondary/10 p-3 text-sm font-medium text-primary">
            Unsaved changes. Click <strong>Publish changes</strong> before previewing, reloading, signing out or closing this page.
          </div>
        )}

        <div
          className={`mt-4 rounded-md border p-3 text-sm ${
            publishingStatus.isConfigured
              ? 'border-blue-200 bg-blue-50 text-blue-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
        >
          {publishingStatus.isOnlineDeployment ? (
            publishingStatus.isConfigured ? (
              <>
                Live publishing is ready. Saves commit to{' '}
                <strong>{publishingStatus.repository}</strong> on{' '}
                <strong>{publishingStatus.branch}</strong>. Vercel will rebuild the live site after the commit.
                {' '}
                {publishingStatus.isPublicHoldEnabled
                  ? 'The public holding page is active; signed-in owners can still preview the real pages.'
                  : 'The public website is live.'}
              </>
            ) : (
              <>
                Live publishing is not configured yet. Add these Vercel environment variables:{' '}
                <strong>{publishingStatus.missing.join(', ')}</strong>.
              </>
            )
          ) : (
            <>
              Local editing mode. Saves update <code>src/content/site-copy.json</code> here; the deployed site will publish
              after the same code is deployed with GitHub/Vercel environment variables.
            </>
          )}
        </div>

        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <strong className="text-slate-900">Note about yesterday:</strong>{' '}
          the edit did not reach the save system, so there was no saved website-copy commit.
          After changing text, click <strong>Publish changes</strong> and wait for the green saved message.
          If the save worked, a <strong>View GitHub commit</strong> link will appear here.
        </div>

        {message && (
          <div
            className={`mt-4 rounded-md border p-3 text-sm ${
              status === 'error'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-green-200 bg-green-50 text-green-700'
            }`}
          >
            <p>{message}</p>
            {commitUrl && (
              <a href={commitUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">
                View GitHub commit
              </a>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg border border-gray-200 bg-white p-4 lg:sticky lg:top-36">
          <p className="text-sm font-semibold text-gray-900">Choose what to edit</p>
          <div className="mt-3 space-y-2">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSectionKey(section.key)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  section.key === activeSection?.key
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-secondary">Editing</p>
                <h2 className="font-display text-2xl font-bold text-primary">{activeSection?.label}</h2>
              </div>
              {activeSection?.href && (
                <a
                  href={getPreviewHref(activeSection.href, previewToken)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-4 py-2 text-sm"
                >
                  Preview page
                </a>
              )}
            </div>
          </div>

          {activeSection && (
            <Field
              key={activeSection.key}
              fieldKey={activeSection.label}
              path={[activeSection.key]}
              value={activeValue}
              onChange={updateField}
            />
          )}
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-secondary/30 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-primary">
              Unsaved changes on this page. Publish before leaving.
            </p>
            <button
              type="button"
              onClick={saveCopy}
              className="btn-primary px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={status === 'saving'}
            >
              {status === 'saving' ? 'Publishing...' : 'Publish changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
