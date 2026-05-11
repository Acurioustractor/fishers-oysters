import { NextRequest, NextResponse } from 'next/server';
import {
  createOwnerSessionValue,
  isOwnerLoginConfigured,
  OWNER_SESSION_COOKIE,
  ownerSessionMaxAge,
  verifyOwnerCredentials,
} from '@/lib/owner-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!isOwnerLoginConfigured()) {
    return NextResponse.json(
      { error: 'Owner login is not configured. Set OWNER_PASSWORD.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);

  if (!verifyOwnerCredentials(body?.username, body?.password)) {
    return NextResponse.json({ error: 'Wrong username or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(OWNER_SESSION_COOKIE, createOwnerSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ownerSessionMaxAge,
  });

  return response;
}
