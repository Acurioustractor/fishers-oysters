import { NextRequest, NextResponse } from 'next/server';
import { hasOwnerSession } from '@/lib/owner-auth';
import { saveImageFile } from '@/lib/owner-copy-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]);

export async function POST(request: NextRequest) {
  if (!(await hasOwnerSession())) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Could not read upload.' }, { status: 400 });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'A photo file is required.' }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: 'The selected photo is empty.' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Photos must be 8 MB or smaller.' }, { status: 400 });
  }

  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Only JPG, PNG, WEBP, GIF, AVIF or SVG photos are supported.' },
      { status: 400 }
    );
  }

  const slot = typeof formData.get('slot') === 'string' ? (formData.get('slot') as string) : '';
  const originalName = slot.trim() || file.name || 'photo';
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await saveImageFile(originalName, buffer);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Owner image upload failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not save photo.' },
      { status: 500 }
    );
  }
}
