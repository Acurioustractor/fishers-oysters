export function OysterIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="34" rx="28" ry="18" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 28c6-8 16-14 24-14s16 4 24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 34c4-3 10-5 18-5s14 2 18 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="32" cy="26" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function CompassIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <polygon points="32,8 35,28 32,32 29,28" fill="currentColor" opacity="0.8" />
      <polygon points="32,56 29,36 32,32 35,36" fill="currentColor" opacity="0.3" />
      <polygon points="8,32 28,29 32,32 28,35" fill="currentColor" opacity="0.3" />
      <polygon points="56,32 36,35 32,32 36,29" fill="currentColor" opacity="0.3" />
      <line x1="32" y1="2" x2="32" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="58" x2="32" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="32" x2="6" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CommunityIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="18" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M18 48c0-8 6-14 14-14s14 6 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="24" r="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M2 46c0-6 4-10 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <circle cx="52" cy="24" r="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M62 46c0-6-4-10-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function getIcon(name: string, className?: string) {
  switch (name) {
    case 'oyster':
      return <OysterIcon className={className} />;
    case 'compass':
      return <CompassIcon className={className} />;
    case 'community':
      return <CommunityIcon className={className} />;
    default:
      return null;
  }
}
