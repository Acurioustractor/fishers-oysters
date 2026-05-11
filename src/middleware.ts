import { NextRequest, NextResponse } from 'next/server';
import { isPublicHoldEnabled } from '@/lib/site-hold';

const ownerSessionCookie = 'fishers_owner_session';

const publicAssetPrefixes = [
  '/_next',
  '/images',
  '/video',
];

const publicAssetPaths = new Set([
  '/favicon.ico',
  '/icon.png',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
]);

function getSessionSecret() {
  return process.env.OWNER_SESSION_SECRET
    || process.env.OWNER_PASSWORD
    || process.env.ADMIN_PASSWORD
    || (process.env.NODE_ENV !== 'production' ? 'fishers-oysters' : 'fishers-oysters-local-session');
}

function bytesToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));

  return bytesToHex(signature);
}

async function hasValidOwnerSession(request: NextRequest) {
  const session = request.cookies.get(ownerSessionCookie)?.value;
  if (!session) return false;

  const [expiresAt, signature] = session.split('.');
  const expiresAtNumber = Number(expiresAt);

  if (!expiresAt || !signature || !Number.isFinite(expiresAtNumber) || Date.now() > expiresAtNumber) {
    return false;
  }

  return signature === await sign(expiresAt);
}

function shouldAlwaysAllow(pathname: string) {
  if (publicAssetPaths.has(pathname)) return true;
  if (publicAssetPrefixes.some((prefix) => pathname.startsWith(prefix))) return true;
  if (pathname.startsWith('/api')) return true;
  if (pathname.startsWith('/owner')) return true;

  return pathname === '/coming-soon';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isPublicHoldEnabled() || shouldAlwaysAllow(pathname) || await hasValidOwnerSession(request)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!.*\\.).*)', '/'],
};
