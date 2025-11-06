
'use server';

import { z } from 'zod';

// Schéma de validation pour les données du formulaire
const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  speciality: z.string().optional(),
});

/**
 * Cette action serveur s'exécute sur le serveur pour envoyer les données du formulaire à SheetDB.
 * Elle agit comme un proxy sécurisé pour éviter les problèmes de CORS dans le navigateur.
 */
export async function sendContactForm(values: z.infer<typeof formSchema>) {
  // Récupère l'URL de SheetDB depuis les variables d'environnement
  const sheetdbURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  // Vérifie si l'URL est bien configurée
  if (!sheetdbURL) {
    console.error("SheetDB URL is not defined in environment variables.");
    return { success: false, error: "The form endpoint is not configured correctly." };
  }

  try {
    // Prépare les données à envoyer. SheetDB attend un objet `data`.
    const body = {
      data: {
        timestamp: new Date().toISOString(), // Ajoute un horodatage
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        speciality: values.speciality || 'N/A' // Assure que la spécialité est toujours envoyée
      }
    };

    // Envoie la requête POST à l'API de SheetDB
    const response = await fetch(sheetdbURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Si la réponse de SheetDB n'est pas OK (ex: status 4xx ou 5xx), on lève une erreur
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit form to SheetDB.');
    }

    // Si tout s'est bien passé, retourne un succès
    return { success: true };

  } catch (error) {
    // En cas d'erreur (réseau ou autre), on la capture et on retourne un échec
    console.error("Error sending data to SheetDB:", error);
    return { success: false, error: (error as Error).message || "An unknown error occurred." };
  }
}
