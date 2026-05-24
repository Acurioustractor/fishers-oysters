import { NextRequest, NextResponse } from 'next/server';
import { hasOwnerSession } from '@/lib/owner-auth';
import { getSiteHoldOverrideSource } from '@/lib/site-hold';
import { readSiteState, saveSiteState } from '@/lib/site-state-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
}

export async function GET() {
  if (!(await hasOwnerSession())) return unauthorized();

  const state = await readSiteState();
  return NextResponse.json({ ...state, overrideSource: getSiteHoldOverrideSource() });
}

export async function PUT(request: NextRequest) {
  if (!(await hasOwnerSession())) return unauthorized();

  const override = getSiteHoldOverrideSource();
  if (override !== 'file') {
    return NextResponse.json(
      {
        error:
          'The SITE_HOLD environment variable is forcing the site state. Remove SITE_HOLD from Vercel to publish or unpublish from this page.',
      },
      { status: 409 }
    );
  }

  const body = await request.json().catch(() => null);
  const publicHold = (body as { publicHold?: unknown } | null)?.publicHold;

  if (typeof publicHold !== 'boolean') {
    return NextResponse.json({ error: 'Body must be { publicHold: boolean }.' }, { status: 400 });
  }

  try {
    const result = await saveSiteState({ publicHold });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Owner site state save failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not save site state.' },
      { status: 500 }
    );
  }
}
