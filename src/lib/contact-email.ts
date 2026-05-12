type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message: string;
};

const defaultRecipient = 'fishers.oysters@gmail.com';
const defaultFrom = "Fisher's Oysters <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getRecipient() {
  return process.env.CONTACT_EMAIL_TO || defaultRecipient;
}

function getSender() {
  return process.env.CONTACT_EMAIL_FROM || defaultFrom;
}

function getSubject(input: ContactEmailInput) {
  const type = input.inquiryType ? ` - ${input.inquiryType}` : '';

  return `New Fisher's Oysters enquiry${type}`;
}

function getTextBody(input: ContactEmailInput) {
  return [
    'New website enquiry',
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || 'Not provided'}`,
    `Inquiry type: ${input.inquiryType || 'Not selected'}`,
    '',
    'Message:',
    input.message,
  ].join('\n');
}

function getHtmlBody(input: ContactEmailInput) {
  const rows = [
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone || 'Not provided'],
    ['Inquiry type', input.inquiryType || 'Not selected'],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">New Fisher's Oysters website enquiry</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 10px; text-align: left; width: 140px;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin: 24px 0 8px;">Message</h2>
      <div style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 14px; max-width: 640px; white-space: pre-wrap;">${escapeHtml(input.message)}</div>
    </div>
  `;
}

export async function sendContactEmail(input: ContactEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Contact email is not configured. Add RESEND_API_KEY in Vercel.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getSender(),
      to: [getRecipient()],
      reply_to: input.email,
      subject: getSubject(input),
      text: getTextBody(input),
      html: getHtmlBody(input),
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Contact email failed: ${response.status} ${error}`);
  }
}
