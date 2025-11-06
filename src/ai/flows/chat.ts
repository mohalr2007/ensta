
'use server';
/**
 * @fileoverview A simple chat flow that responds to user messages.
 */

import {ai} from '@/ai/genkit';
import {MessageData} from '@genkit-ai/google-genai';
import {z} from 'zod';

const ChatInputSchema = z.object({
  history: z.array(z.custom<MessageData>()),
  message: z.string(),
});

const ChatOutputSchema = z.object({
  message: z.string(),
});

export async function chat(
  input: z.infer<typeof ChatInputSchema>
): Promise<z.infer<typeof ChatOutputSchema>> {
  const result = await chatFlow(input);
  return result;
}

export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {history, message} = input;
    const model = ai.model('googleai/gemini-2.5-flash');

    const result = await ai.generate({
      model: model,
      history: history,
      prompt: message,
    });

    return {
      message: result.text,
    };
  }
);
