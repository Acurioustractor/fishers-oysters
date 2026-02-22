'use client';

import { useState, useRef, useEffect } from 'react';

interface ImagePlaceholderProps {
  alt: string;
  aspect?: 'landscape' | 'square' | 'portrait';
  className?: string;
}

export default function ImagePlaceholder({
  alt,
  aspect = 'landscape',
  className = '',
}: ImagePlaceholderProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDev = process.env.NODE_ENV === 'development';

  const aspectClass = {
    landscape: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  }[aspect];

  // Check manifest on mount for existing image
  useEffect(() => {
    fetch('/images/manifest.json')
      .then((r) => r.json())
      .then((manifest: Record<string, string>) => {
        if (manifest[alt]) {
          setSrc(manifest[alt]);
        }
      })
      .catch(() => {});
  }, [alt]);

  const handleClick = () => {
    if (isDev && !src) {
      inputRef.current?.click();
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('slot', alt);

    try {
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.src) {
        setSrc(data.src);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSrc(null);
    // Small delay so state clears before opening picker
    setTimeout(() => inputRef.current?.click(), 50);
  };

  // Real image
  if (src) {
    return (
      <div className={`relative ${aspectClass} rounded-xl overflow-hidden group ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isDev && (
          <button
            onClick={handleReplace}
            className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Replace
          </button>
        )}
      </div>
    );
  }

  // Placeholder
  return (
    <div
      className={`relative ${aspectClass} bg-gray-200 rounded-xl overflow-hidden ${isDev ? 'cursor-pointer hover:bg-gray-300 transition-colors' : ''} ${className}`}
      role="img"
      aria-label={alt}
      onClick={handleClick}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
        {uploading ? (
          <div className="text-sm">Uploading...</div>
        ) : (
          <>
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
            <span className="text-xs text-center px-4">{alt}</span>
            {isDev && (
              <span className="text-xs mt-2 text-primary font-medium">
                Click to add image
              </span>
            )}
          </>
        )}
      </div>
      {isDev && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      )}
    </div>
  );
}
