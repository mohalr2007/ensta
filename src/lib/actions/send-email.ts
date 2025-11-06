
'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '../supabase/server';

const sendEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  speciality: z.string(),
});

export async function sendEmail(data: z.infer<typeof sendEmailSchema>) {
  try {
    const supabase = createSupabaseServerClient();
    if (!supabase) {
      throw new Error("Supabase client not initialized. Check environment variables.");
    }
    
    const validatedData = sendEmailSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, error: "Invalid data." };
    }

    const { error } = await supabase
      .from('messages')
      .insert([validatedData.data]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: (error as Error).message };
  }
}
