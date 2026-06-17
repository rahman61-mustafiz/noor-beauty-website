import { createClient } from '@supabase/supabase-js'

/**
 * Public, read-only Supabase client (anon key). For reading content on public
 * pages. Respects Row Level Security — only data with a public read policy
 * (categories, services, packages, gallery, testimonials, site_settings) is visible.
 *
 * Uses `cache: 'no-store'` so edits made in the admin panel show up immediately
 * (Next.js otherwise caches fetch() responses).
 */
export function createReadClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
      },
    }
  )
}
