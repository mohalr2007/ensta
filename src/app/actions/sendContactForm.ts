
'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  speciality: z.string().optional(),
});

export async function sendContactForm(values: z.infer<typeof formSchema>) {
  const sheetdbURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  if (!sheetdbURL) {
    console.error("SheetDB URL is not defined in environment variables.");
    return { success: false, error: "The form endpoint is not configured correctly." };
  }

  try {
    const response = await fetch(sheetdbURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          timestamp: new Date().toISOString(),
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          speciality: values.speciality || 'N/A'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit form to SheetDB.');
    }

    return { success: true };

  } catch (error) {
    console.error("Error sending data to SheetDB:", error);
    return { success: false, error: (error as Error).message || "An unknown error occurred." };
  }
}
