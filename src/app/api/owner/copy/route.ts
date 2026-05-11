import { NextRequest, NextResponse } from 'next/server';
import { hasOwnerSession } from '@/lib/owner-auth';
import { readCopyFile, saveCopyFile } from '@/lib/owner-copy-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
}

export async function GET() {
  if (!(await hasOwnerSession())) {
    return unauthorized();
  }

  const content = await readCopyFile();

  return NextResponse.json(JSON.parse(content));
}

export async function PUT(request: NextRequest) {
  if (!(await hasOwnerSession())) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Copy must be a JSON object.' }, { status: 400 });
  }

  const content = `${JSON.stringify(body, null, 2)}\n`;

  if (content.length > 300_000) {
    return NextResponse.json({ error: 'Copy payload is too large.' }, { status: 400 });
  }

  try {
    const result = await saveCopyFile(content);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Owner copy save failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not save copy.' },
      { status: 500 }
    );
  }
}
