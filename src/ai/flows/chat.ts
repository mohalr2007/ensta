
'use server';
/**
 * @fileOverview A simple chatbot flow that provides standard answers based on keywords.
 *
 * - chat - A function that handles the chat interaction.
 */

import { z } from 'zod';
import { MessageData } from '@genkit-ai/google-genai';

const ChatInputSchema = z.object({
  history: z.array(z.custom<MessageData>()),
  message: z.string(),
});

const ChatOutputSchema = z.object({
  message: z.string(),
});

/**
 * Handles a chat request by checking for keywords in the user's message
 * and returning a pre-defined response.
 * @param input The user's message and chat history.
 * @returns A standard response object.
 */
export async function chat(
  input: z.infer<typeof ChatInputSchema>
): Promise<z.infer<typeof ChatOutputSchema>> {
  const userMessage = input.message.toLowerCase();

  let botResponse = `
EN: "Sorry, I don't understand that question. Please try asking about admissions, programs, or contact information."
FR: "Désolé, je ne comprends pas cette question. Veuillez essayer de poser une question sur les admissions, les programmes ou les informations de contact."`;

  if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('bonjour') || userMessage.includes('salut')) {
    botResponse = `
EN: "Hello! How can I help you today? You can ask me about admissions, programs, or how to contact the school."
FR: "Bonjour ! Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur les admissions, les programmes ou comment contacter l'école."`;
  } else if (userMessage.includes('admission') || userMessage.includes('register') || userMessage.includes('inscription')) {
    botResponse = `
EN: "For all admission inquiries, please visit the official admissions page on our website or contact the administration office directly. You can find contact details on the 'Contact' page."
FR: "Pour toute demande d'admission, veuillez visiter la page officielle des admissions sur notre site web ou contacter directement le bureau de l'administration. Vous trouverez les coordonnées sur la page 'Contact'."`;
  } else if (userMessage.includes('program') || userMessage.includes('speciality') || userMessage.includes('filière') || userMessage.includes('mi') || userMessage.includes('st')) {
    botResponse = `
EN: "ENSTA offers two main domains: 'Mathématiques et Informatique' (MI) and 'Sciences et Technologies' (ST). The MI domain is preparing to launch two new specializations for the 2025-2026 year: 'Artificial Intelligence and Applications' and 'Systems Security'. For more details, please check the 'About Us' page on the website."
FR: "L'ENSTA propose deux domaines principaux : 'Mathématiques et Informatique' (MI) et 'Sciences et Technologies' (ST). Le domaine MI prépare le lancement de deux nouvelles spécialisations pour l'année 2025-2026 : 'Intelligence Artificielle et Applications' et 'Sécurité des Systèmes'. Pour plus de détails, veuillez consulter la page 'À Propos' sur le site."`;
  } else if (userMessage.includes('contact') || userMessage.includes('address') || userMessage.includes('adresse') || userMessage.includes('phone') || userMessage.includes('email')) {
    botResponse = `
EN: "You can find our contact details on the 'Contact' page.
- Phone: +21323797118 / +21344121103
- Email: contact@ensta.edu.dz
- MI Address: Faculté de Médecine - Ctre biomédicale, Bordj El Kiffan
- ST Address: Lycée Emir Abdelkader Bab El Oued Alger DZ, 16001"
FR: "Vous trouverez nos coordonnées sur la page 'Contact'.
- Téléphone : +21323797118 / +21344121103
- Courriel : contact@ensta.edu.dz
- Adresse MI : Faculté de Médecine - Ctre biomédicale, Bordj El Kiffan
- Adresse ST : Lycée Emir Abdelkader Bab El Oued Alger DZ, 16001"`;
  } else if (userMessage.includes('thank you') || userMessage.includes('merci')) {
    botResponse = `
EN: "You're welcome!"
FR: "De rien !"`;
  }

  return {
    message: botResponse,
  };
}
