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

const s = (fd: FormData, k: string) => {
  const v = fd.get(k)
  return typeof v === 'string' && v.trim() ? v.trim() : null
}
const rating = (fd: FormData) => {
  const n = Number(fd.get('rating'))
  return Number.isFinite(n) && n >= 1 && n <= 5 ? Math.round(n) : 5
}

function revalidate() {
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

export async function createTestimonial(fd: FormData) {
  const name = s(fd, 'name')
  const body = s(fd, 'body')
  if (!name || !body) return
  const db = await adminDb()
  const { data: maxRow } = await db
    .from('testimonials')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
  const sort_order = (maxRow?.[0]?.sort_order ?? -1) + 1
  await db.from('testimonials').insert({
    name,
    body,
    initials: s(fd, 'initials') ?? name.slice(0, 2).toUpperCase(),
    service: s(fd, 'service'),
    rating: rating(fd),
    sort_order,
  })
  revalidate()
}

export async function updateTestimonial(fd: FormData) {
  const id = s(fd, 'id')
  if (!id) return
  const db = await adminDb()
  await db
    .from('testimonials')
    .update({
      name: s(fd, 'name'),
      body: s(fd, 'body'),
      initials: s(fd, 'initials'),
      service: s(fd, 'service'),
      rating: rating(fd),
    })
    .eq('id', id)
  revalidate()
}

export async function deleteTestimonial(fd: FormData) {
  const id = s(fd, 'id')
  if (!id) return
  const db = await adminDb()
  await db.from('testimonials').delete().eq('id', id)
  revalidate()
}
