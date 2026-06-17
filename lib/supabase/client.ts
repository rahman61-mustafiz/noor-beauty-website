import { createBrowserClient } from '@supabase/ssr'

/** Browser Supabase client (anon key) — for client components like the login form. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
