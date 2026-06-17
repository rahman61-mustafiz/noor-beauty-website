import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service_role key.
 * Bypasses Row Level Security — use ONLY in server code (API routes,
 * server actions) for admin writes and seeding. NEVER import in client code.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
