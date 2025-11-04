
'use server';
/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that handles the chat interaction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MessageData } from '@genkit-ai/google-genai';

// Define schemas inside the function scope or in a non-exported way if only for the flow.
const ChatInputSchema = z.object({
  history: z.array(z.custom<MessageData>()),
  message: z.string(),
});

const ChatOutputSchema = z.object({
  message: z.string(),
});

// The main exported function is the server action.
export async function chat(
  input: z.infer<typeof ChatInputSchema>
): Promise<z.infer<typeof ChatOutputSchema>> {
  
  const chatFlow = ai.defineFlow(
    {
      name: 'chatFlow',
      inputSchema: ChatInputSchema,
      outputSchema: ChatOutputSchema,
    },
    async ({ history, message }) => {
      const { output } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: {
          history,
          messages: [{ role: 'user', content: [{ text: message }] }],
        },
      });

      return {
        message: output?.content.at(-1)?.content.at(0)?.text || "Sorry, I couldn't process that.",
      };
    }
  );

  return chatFlow(input);
}
