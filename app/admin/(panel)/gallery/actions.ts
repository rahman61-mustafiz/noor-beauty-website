'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const BUCKET = 'gallery'
const STORAGE_MARKER = `/storage/v1/object/public/${BUCKET}/`

async function adminClient() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return createAdminClient()
}

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'misc'

function revalidate() {
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}

export async function uploadGalleryItem(fd: FormData) {
  const db = await adminClient()
  const file = fd.get('file') as File | null
  const category = String(fd.get('category') ?? '').trim()
  const caption = String(fd.get('caption') ?? '').trim()

  if (!file || file.size === 0 || !category) return
  const isMedia = file.type.startsWith('image/') || file.type.startsWith('video/')
  if (!isMedia) throw new Error('Only image or video files are allowed.')

  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `${slugify(category)}/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`

  const { error: upErr } = await db.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (upErr) throw new Error(upErr.message)

  const { data: pub } = db.storage.from(BUCKET).getPublicUrl(path)

  const { data: maxRow } = await db
    .from('gallery_images')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
  const sort_order = (maxRow?.[0]?.sort_order ?? -1) + 1

  await db.from('gallery_images').insert({
    category,
    src: pub.publicUrl,
    caption: caption || null,
    sort_order,
  })
  revalidate()
}

export async function updateGalleryItem(fd: FormData) {
  const db = await adminClient()
  const id = String(fd.get('id') ?? '')
  if (!id) return
  await db
    .from('gallery_images')
    .update({
      category: String(fd.get('category') ?? '').trim() || null,
      caption: String(fd.get('caption') ?? '').trim() || null,
    })
    .eq('id', id)
  revalidate()
}

export async function deleteGalleryItem(fd: FormData) {
  const db = await adminClient()
  const id = String(fd.get('id') ?? '')
  const src = String(fd.get('src') ?? '')
  if (!id) return

  // If the file lives in our Storage bucket, remove it too.
  const idx = src.indexOf(STORAGE_MARKER)
  if (idx !== -1) {
    const path = src.slice(idx + STORAGE_MARKER.length)
    await db.storage.from(BUCKET).remove([path])
  }

  await db.from('gallery_images').delete().eq('id', id)
  revalidate()
}
