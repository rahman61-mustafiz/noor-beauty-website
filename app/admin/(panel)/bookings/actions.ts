'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function adminDb() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return createAdminClient()
}

export async function updateBookingStatus(formData: FormData) {
  const id = String(formData.get('id'))
  const status = String(formData.get('status'))
  if (!id || !['new', 'confirmed', 'done', 'cancelled'].includes(status)) return
  const db = await adminDb()
  await db.from('bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/bookings')
  revalidatePath('/admin')
}

export async function deleteBooking(formData: FormData) {
  const id = String(formData.get('id'))
  if (!id) return
  const db = await adminDb()
  await db.from('bookings').delete().eq('id', id)
  revalidatePath('/admin/bookings')
  revalidatePath('/admin')
}
