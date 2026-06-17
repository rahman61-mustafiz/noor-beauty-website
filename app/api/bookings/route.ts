import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Public endpoint for the booking form. Inserts server-side with the service
// role (after validation) so it doesn't depend on client-side RLS.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body.name !== 'string' || typeof body.phone !== 'string') {
    return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
  }
  const name = body.name.trim().slice(0, 120)
  const phone = body.phone.trim().slice(0, 40)
  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
  }

  const db = createAdminClient()
  const { error } = await db.from('bookings').insert({
    name,
    phone,
    service: body.service ? String(body.service).slice(0, 120) : null,
    preferred_date: body.preferred_date ? String(body.preferred_date).slice(0, 20) : null,
    message: body.message ? String(body.message).slice(0, 1000) : null,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
