
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
  const body = new FormData();
  body.append('name', formData.name);
  body.append('email', formData.email);
  body.append('subject', formData.subject);
  body.append('message', formData.message);
  body.append('speciality', formData.speciality || 'N/A');

  try {
    // 4. Send the data using fetch. We use 'redirect: manual' because Google Scripts
    // often respond with a 302 redirect on success.
    const response = await fetch(scriptURL, {
      method: 'POST',
      body,
      redirect: 'manual', // Important: handle redirects manually
    });

    // A successful submission to a Google Apps Script doPost function that
    // redirects will have a response type of 'opaqueredirect' and status 0
    // when mode is 'no-cors', or a status of 302 when redirect is manual.
    // We check for 302 as it's a strong indicator of a successful POST.
    if (response.status === 302 || response.status === 200) {
        return { success: true, message: 'Message sent successfully!' };
    } else {
       // The fetch request itself might have failed or the script returned an error.
      console.error('Google Script fetch failed with status:', response.status, response.statusText);
      // Try to get more info from the response if possible
      const responseBody = await response.text();
      console.error('Response body:', responseBody);
      return { success: false, message: `Failed to send message. Server responded with status ${response.status}.` };
    }

  } catch (error: any) {
    console.error("Error submitting form:", error);
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}
