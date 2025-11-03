
'use server';

import { z } from 'zod';

// Define the schema for the form data for validation.
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
  speciality: z.string().optional(),
});

/**
 * Server Action to send contact form data to a Google Sheet.
 * @param data - The form data.
 * @returns An object with a success status and a message.
 */
export async function sendContactForm(data: unknown) {
  // 1. Validate the data on the server.
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.' };
  }
  const formData = parsed.data;

  // 2. Get the Google Sheet URL from environment variables.
  const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
  if (!scriptURL) {
    console.error("Google Sheet URL is not defined in environment variables.");
    return { success: false, message: 'Form endpoint is not configured.' };
  }

  // 3. Prepare the data to be sent to Google Apps Script.
  // The script expects the data as URL-encoded form parameters.
  const body = new FormData();
  body.append('name', formData.name);
  body.append('email', formData.email);
  body.append('subject', formData.subject);
  body.append('message', formData.message);
  body.append('speciality', formData.speciality || 'N/A');

  try {
    // 4. Send the data using fetch.
    const response = await fetch(scriptURL, {
      method: 'POST',
      body,
    });
    
    // Google Apps Script Web Apps often redirect. We follow the redirect and check the final response.
    // A successful POST to a doPost script that returns JSON will have a final status of 200.
    if (response.status === 200) {
      const jsonResponse = await response.json();
      if (jsonResponse.result === 'success') {
        return { success: true, message: 'Message sent successfully!' };
      } else {
        // The script itself returned an error.
        console.error('Google Script returned an error:', jsonResponse.error);
        return { success: false, message: 'An error occurred on the server.' };
      }
    } else {
       // The fetch request itself failed.
      console.error('Fetch to Google Script failed with status:', response.status, response.statusText);
      return { success: false, message: 'Failed to send message.' };
    }

  } catch (error: any) {
    console.error("Error submitting form:", error);
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}
