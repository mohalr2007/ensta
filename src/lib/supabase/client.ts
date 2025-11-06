
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Supabase URL not found. Please add NEXT_PUBLIC_SUPABASE_URL to your .env.local file.");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase anon key not found. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
