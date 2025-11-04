
'use server';
/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that handles the chat interaction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MessageData } from '@genkit-ai/google-genai';

// This is the schema for the data coming from the client.
const ChatInputSchema = z.object({
  history: z.array(z.custom<MessageData>()),
  message: z.string(),
});

// This is the schema for the data we send back to the client.
const ChatOutputSchema = z.object({
  message: z.string(),
});

// The main exported function is the server action.
export async function chat(
  input: z.infer<typeof ChatInputSchema>
): Promise<z.infer<typeof ChatOutputSchema>> {
  
  // We define the flow inside the action to keep it private to this file.
  const chatFlow = ai.defineFlow(
    {
      name: 'chatFlow',
      inputSchema: ChatInputSchema,
      outputSchema: ChatOutputSchema,
    },
    async ({ history, message }) => {
      // The AI model expects a `prompt` object containing a `messages` array.
      // We combine the existing chat history with the new user message here.
      const { output } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: {
          messages: [
            ...history, 
            { role: 'user', content: [{ text: message }] }
          ],
        },
      });

      // We extract the text from the AI's response.
      // The `|| "..."` provides a fallback message if the AI gives no response.
      return {
        message: output?.content.at(-1)?.content.at(0)?.text || "Sorry, I couldn't process that.",
      };
    }
  );

  // We call the flow with the input from the client and return the result.
  return chatFlow(input);
}
