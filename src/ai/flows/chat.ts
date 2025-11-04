
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

  let botResponse = "Sorry, I don't understand that question. Please try asking about admissions, programs, or contact information.";

  if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('bonjour')) {
    botResponse = 'Hello! How can I help you today? You can ask me about admissions, programs, or how to contact the school.';
  } else if (userMessage.includes('admission') || userMessage.includes('register') || userMessage.includes('inscription')) {
    botResponse = 'For all admission inquiries, please visit the official admissions page on our website or contact the administration office directly. You can find contact details on the "Contact" page.';
  } else if (userMessage.includes('program') || userMessage.includes('speciality') || userMessage.includes('filière')) {
    botResponse = 'ENSTA offers specializations in "Mathématiques et Informatique" (MI) and "Sciences et Technologies" (ST). You can find more details on the "About Us" page.';
  } else if (userMessage.includes('contact') || userMessage.includes('address') || userMessage.includes('adresse') || userMessage.includes('phone')) {
    botResponse = 'You can find our address, phone numbers, and a contact form on the "Contact" page. Our email is contact@ensta.edu.dz.';
  } else if (userMessage.includes('thank you') || userMessage.includes('merci')) {
    botResponse = "You're welcome!";
  }

  return {
    message: botResponse,
  };
}
