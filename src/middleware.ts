import { NextRequest, NextResponse } from 'next/server';
import { isPublicHoldEnabled } from '@/lib/site-hold';

const ownerSessionCookie = 'fishers_owner_session';
const ownerPreviewCookie = 'fishers_owner_preview';
const ownerPreviewParam = 'owner_preview';
const ownerPreviewMaxAge = 60 * 60;

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

async function signPreview(value: string) {
  return sign(`owner-preview:${value}`);
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

async function isValidOwnerPreviewToken(token: string | undefined) {
  if (!token) return false;

  const [expiresAt, signature] = token.split('.');
  const expiresAtNumber = Number(expiresAt);

  if (!expiresAt || !signature || !Number.isFinite(expiresAtNumber) || Date.now() > expiresAtNumber) {
    return false;
  }

  return signature === await signPreview(expiresAt);
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

  const previewToken = request.nextUrl.searchParams.get(ownerPreviewParam) || undefined;

  if (await isValidOwnerPreviewToken(previewToken)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete(ownerPreviewParam);

    const response = NextResponse.redirect(url);
    response.cookies.set(ownerPreviewCookie, previewToken!, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ownerPreviewMaxAge,
    });

    return response;
  }

  if (await isValidOwnerPreviewToken(request.cookies.get(ownerPreviewCookie)?.value)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!.*\\.).*)', '/'],
};
