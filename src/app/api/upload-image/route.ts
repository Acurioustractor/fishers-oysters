import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const slot = formData.get('slot') as string;

    if (!file || !slot) {
      return NextResponse.json({ error: 'File and slot required' }, { status: 400 });
    }

    // Sanitise filename
    const ext = path.extname(file.name).toLowerCase();
    const safeName = slot
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const filename = `${safeName}${ext}`;

    // Write file to public/images/
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), 'public', 'images', filename);
    await writeFile(filePath, buffer);

    // Update manifest
    const manifestPath = path.join(process.cwd(), 'public', 'images', 'manifest.json');
    let manifest: Record<string, string> = {};
    try {
      const raw = await readFile(manifestPath, 'utf-8');
      manifest = JSON.parse(raw);
    } catch {
      // Start fresh if missing
    }
    manifest[slot] = `/images/${filename}`;
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    return NextResponse.json({ src: `/images/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
