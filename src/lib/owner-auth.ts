import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const OWNER_SESSION_COOKIE = 'fishers_owner_session';
export const OWNER_PREVIEW_COOKIE = 'fishers_owner_preview';

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;
const ONE_HOUR_SECONDS = 60 * 60;
const LOCAL_DEFAULT_PASSWORD = 'fishers-oysters';

export function isUsingLocalDefaultPassword() {
  return !process.env.OWNER_PASSWORD && !process.env.ADMIN_PASSWORD && process.env.NODE_ENV !== 'production';
}

export function getOwnerUsername() {
  return process.env.OWNER_USERNAME || process.env.ADMIN_USERNAME || null;
}

export function isOwnerUsernameRequired() {
  return Boolean(getOwnerUsername());
}

export function getOwnerPassword() {
  if (process.env.OWNER_PASSWORD) return process.env.OWNER_PASSWORD;
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== 'production') return LOCAL_DEFAULT_PASSWORD;
  return null;
}

export function isOwnerLoginConfigured() {
  return Boolean(getOwnerPassword());
}

export function getOwnerSessionSecret() {
  return process.env.OWNER_SESSION_SECRET || getOwnerPassword() || 'fishers-oysters-local-session';
}

function sign(value: string) {
  return createHmac('sha256', getOwnerSessionSecret()).update(value).digest('hex');
}

function signPreview(value: string) {
  return createHmac('sha256', getOwnerSessionSecret()).update(`owner-preview:${value}`).digest('hex');
}

function safeEquals(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function verifyOwnerPassword(candidate: unknown) {
  const password = getOwnerPassword();

  if (typeof candidate !== 'string' || !password) {
    return false;
  }

  return safeEquals(candidate, password);
}

export function verifyOwnerCredentials(candidateUsername: unknown, candidatePassword: unknown) {
  if (!verifyOwnerPassword(candidatePassword)) {
    return false;
  }

  const username = getOwnerUsername();

  if (!username) {
    return true;
  }

  return typeof candidateUsername === 'string' && safeEquals(candidateUsername, username);
}

export function createOwnerSessionValue() {
  const expiresAt = Date.now() + ONE_WEEK_SECONDS * 1000;
  const payload = String(expiresAt);

  return `${payload}.${sign(payload)}`;
}

export function createOwnerPreviewTokenValue() {
  const expiresAt = Date.now() + ONE_HOUR_SECONDS * 1000;
  const payload = String(expiresAt);

  return `${payload}.${signPreview(payload)}`;
}

export function verifyOwnerSessionValue(value: string | undefined) {
  if (!value) return false;

  const [expiresAt, signature] = value.split('.');
  const expiresAtNumber = Number(expiresAt);

  if (!expiresAt || !signature || !Number.isFinite(expiresAtNumber)) {
    return false;
  }

  if (Date.now() > expiresAtNumber) {
    return false;
  }

  return safeEquals(signature, sign(expiresAt));
}

export async function hasOwnerSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(OWNER_SESSION_COOKIE)?.value;

  return verifyOwnerSessionValue(session);
}

export const ownerSessionMaxAge = ONE_WEEK_SECONDS;
export const ownerPreviewMaxAge = ONE_HOUR_SECONDS;
