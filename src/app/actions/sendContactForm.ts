
'use server';

import { z } from 'zod';

// Définir le schéma pour les données du formulaire
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
  // Valider les données côté serveur
  const parsedData = ContactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
  if (!scriptUrl) {
    console.error('Google Sheet URL is not defined in environment variables.');
    return { success: false, error: 'Server configuration error: Google Sheet URL is missing.' };
  }

  // Créer un corps de formulaire pour la requête POST
  const formData = new URLSearchParams();
  formData.append('timestamp', new Date().toISOString());
  formData.append('name', parsedData.data.name);
  formData.append('email', parsedData.data.email);
  formData.append('subject', parsedData.data.subject);
  formData.append('message', parsedData.data.message);
  formData.append('speciality', parsedData.data.speciality || 'N/A');

  try {
    // Envoyer les données au script Google Apps
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.result === 'success') {
      return { success: true };
    } else {
      // Si le script retourne une erreur, la capturer
      return { success: false, error: result.error || 'The script reported an error.' };
    }

  } catch (error) {
    console.error('Failed to send data to Google Sheet:', error);
    return {
      success: false,
      error: 'Failed to communicate with the data-saving service.',
    };
  }
}
