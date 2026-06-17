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

export async function updateSettings(fd: FormData) {
  const db = await adminDb()
  const v = (k: string) => {
    const x = fd.get(k)
    return typeof x === 'string' && x.trim() ? x.trim() : null
  }
  await db.from('site_settings').upsert({
    id: 1,
    name: v('name'),
    full_name: v('full_name'),
    tagline: v('tagline'),
    description: v('description'),
    phone: v('phone'),
    phone_display: v('phone_display'),
    whatsapp: v('whatsapp'),
    address: v('address'),
    hours: v('hours'),
    facebook: v('facebook'),
    instagram: v('instagram'),
    meta_title: v('meta_title'),
    meta_description: v('meta_description'),
    google_verification: v('google_verification'),
    updated_at: new Date().toISOString(),
  })
  // Public pages read fresh on each request, but revalidate cached chrome too.
  revalidatePath('/', 'layout')
  revalidatePath('/admin/settings')
}

export async function uploadHeroMedia(fd: FormData) {
  const db = await adminDb()

  const put = async (file: File) => {
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '')
    const path = `hero/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`
    const { error } = await db.storage.from('gallery').upload(path, file, { contentType: file.type })
    if (error) throw new Error(error.message)
    return db.storage.from('gallery').getPublicUrl(path).data.publicUrl
  }

  const updates: Record<string, string> = {}
  const img = fd.get('hero_image') as File | null
  const vid = fd.get('hero_video') as File | null
  if (img && img.size > 0 && img.type.startsWith('image/')) updates.hero_image = await put(img)
  if (vid && vid.size > 0 && vid.type.startsWith('video/')) updates.hero_video = await put(vid)
  if (Object.keys(updates).length === 0) return

  updates.updated_at = new Date().toISOString()
  await db.from('site_settings').update(updates).eq('id', 1)
  revalidatePath('/', 'layout')
  revalidatePath('/admin/settings')
}
