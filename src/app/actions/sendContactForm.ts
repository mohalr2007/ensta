
'use server';

import { z } from 'zod';

// Define the schema for the form data
const ContactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  speciality: z.string().optional(),
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendContactForm(
  data: ContactFormInputs
): Promise<{ success: boolean; error?: string }> {
  // Validate the data on the server
  const parsedData = ContactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
  if (!sheetUrl) {
    console.error('Google Sheet URL is not defined in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  const formData = new URLSearchParams();
  formData.append('timestamp', new Date().toISOString());
  formData.append('name', parsedData.data.name);
  formData.append('email', parsedData.data.email);
  formData.append('subject', parsedData.data.subject);
  formData.append('message', parsedData.data.message);
  formData.append('speciality', parsedData.data.speciality || 'N/A');

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      body: formData,
    });

    // Since Google Apps Script can have tricky redirect behavior,
    // we check for a successful response status (200) or a redirect (302),
    // which also indicates the script likely executed.
    if (response.status === 200 || response.status === 302) {
      // We can optionally check the body for a success flag if the script returns one
      const result = await response.json();
      if (result.result === 'success') {
        return { success: true };
      } else {
         return { success: false, error: result.error || 'The script reported an error.' };
      }
    } else {
        // The request failed at the network level
        return { success: false, error: `The server responded with status: ${response.status}` };
    }

  } catch (error) {
    console.error('Failed to send data to Google Sheet:', error);
    return {
      success: false,
      error: 'Failed to communicate with the data-saving service.',
    };
  }
}
