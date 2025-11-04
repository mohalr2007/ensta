
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

const responses = {
    greeting: {
        en: "Hello! How can I help you today? You can ask me about admissions, programs, or how to contact the school.",
        fr: "Bonjour ! Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur les admissions, les programmes ou comment contacter l'école."
    },
    admissions: {
        en: "For all admission inquiries, please visit the official admissions page on our website or contact the administration office directly. You can find contact details on the 'Contact' page.",
        fr: "Pour toute demande d'admission, veuillez visiter la page officielle des admissions sur notre site web ou contacter directement le bureau de l'administration. Vous trouverez les coordonnées sur la page 'Contact'."
    },
    programs: {
        en: "ENSTA offers two main domains: 'Mathématiques et Informatique' (MI) and 'Sciences et Technologies' (ST). The MI domain is preparing to launch two new specializations for the 2025-2026 year: 'Artificial Intelligence and Applications' and 'Systems Security'. For more details, please check the 'About Us' page on the website.",
        fr: "L'ENSTA propose deux domaines principaux : 'Mathématiques et Informatique' (MI) et 'Sciences et Technologies' (ST). Le domaine MI prépare le lancement de deux nouvelles spécialisations pour l'année 2025-2026 : 'Intelligence Artificielle et Applications' et 'Sécurité des Systèmes'. Pour plus de détails, veuillez consulter la page 'À Propos' sur le site."
    },
    contact: {
        en: "You can find our contact details on the 'Contact' page.\n- Phone: +21323797118 / +21344121103\n- Email: contact@ensta.edu.dz\n- MI Address: Faculté de Médecine - Ctre biomédicale, Bordj El Kiffan\n- ST Address: Lycée Emir Abdelkader Bab El Oued Alger DZ, 16001",
        fr: "Vous trouverez nos coordonnées sur la page 'Contact'.\n- Téléphone : +21323797118 / +21344121103\n- Courriel : contact@ensta.edu.dz\n- Adresse MI : Faculté de Médecine - Ctre biomédicale, Bordj El Kiffan\n- Adresse ST : Lycée Emir Abdelkader Bab El Oued Alger DZ, 16001"
    },
    thanks: {
        en: "You're welcome!",
        fr: "De rien !"
    },
    default: {
        en: "Sorry, I don't understand that question. Please try asking about admissions, programs, or contact information.",
        fr: "Désolé, je ne comprends pas cette question. Veuillez essayer de poser une question sur les admissions, les programmes ou les informations de contact."
    }
};

function detectLanguage(message: string): 'fr' | 'en' {
    const frKeywords = ['bonjour', 'salut', 'merci', 'comment', 'filière', 'spécialité', 'adresse', 'inscription'];
    if (frKeywords.some(kw => message.includes(kw))) {
        return 'fr';
    }
    return 'en';
}

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
  const lang = detectLanguage(userMessage);

  let botResponse: string;

  if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('bonjour') || userMessage.includes('salut')) {
    botResponse = responses.greeting[lang];
  } else if (userMessage.includes('admission') || userMessage.includes('register') || userMessage.includes('inscription')) {
    botResponse = responses.admissions[lang];
  } else if (userMessage.includes('program') || userMessage.includes('speciality') || userMessage.includes('filière') || userMessage.includes('mi') || userMessage.includes('st')) {
    botResponse = responses.programs[lang];
  } else if (userMessage.includes('contact') || userMessage.includes('address') || userMessage.includes('adresse') || userMessage.includes('phone') || userMessage.includes('email') || userMessage.includes('localisation')) {
    botResponse = responses.contact[lang];
  } else if (userMessage.includes('thank you') || userMessage.includes('merci')) {
    botResponse = responses.thanks[lang];
  } else {
    botResponse = responses.default[lang];
  }

  return {
    message: botResponse,
  };
}
