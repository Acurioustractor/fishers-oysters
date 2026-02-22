/**
 * GoHighLevel Integration
 *
 * Submits contact form data to GoHighLevel CRM.
 */

const GHL_API_URL = 'https://services.leadconnectorhq.com/contacts/';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  tags?: string[];
}

/**
 * Submit a contact to GoHighLevel
 */
export async function submitToGHL(data: ContactSubmission): Promise<{ success: boolean; contactId?: string }> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.warn('GHL not configured - skipping CRM submission');
    return { success: true }; // Don't fail if GHL not configured
  }

  try {
    // Parse name into first/last
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    const payload = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || '',
      source: data.source || 'Fishers Oysters Website',
      tags: data.tags || ['fishers-oysters', 'website-contact'],
      customFields: [
        {
          key: 'contact_message',
          value: data.message || '',
        },
        {
          key: 'contact_source_project',
          value: 'ACT-FO',
        },
      ],
    };

    const response = await fetch(GHL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL API error:', error);
      return { success: false };
    }

    const result = await response.json();
    return { success: true, contactId: result.contact?.id };
  } catch (error) {
    console.error('Failed to submit to GHL:', error);
    return { success: false };
  }
}

/**
 * Add tags to an existing contact
 */
export async function addTagsToContact(contactId: string, tags: string[]): Promise<boolean> {
  if (!GHL_API_KEY) {
    return false;
  }

  try {
    const response = await fetch(`${GHL_API_URL}${contactId}/tags`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({ tags }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to add tags:', error);
    return false;
  }
}
