
'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '../supabase/server';

const sendEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  speciality: z.string().optional(),
});

export async function sendEmail(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const parsedData = sendEmailSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    speciality: formData.get('speciality'),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid form data.',
    };
  }

  const { error } = await supabase.from('messages').insert([parsedData.data]);

  if (error) {
    console.error('Supabase error:', error);
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: 'Message sent successfully!',
  };
}
