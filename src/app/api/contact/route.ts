import { NextRequest, NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/ghl';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Submit to GoHighLevel if configured
    if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
      const tags = ['website-contact', 'fishers-oysters'];
      if (inquiryType) {
        tags.push(`inquiry-${inquiryType}`);
      }

      await submitToGHL({
        name,
        email,
        phone,
        message: inquiryType ? `[${inquiryType}] ${message}` : message,
        source: 'Fishers Oysters Website',
        tags,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
