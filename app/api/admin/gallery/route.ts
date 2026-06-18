import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const BUCKET = 'gallery'
const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'misc'

// Admin gallery upload. Route handlers (unlike server actions) have no 1 MB
// body limit, so large photos/videos upload fine.
export async function POST(request: Request) {
  // Auth: must be the logged-in admin.
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not signed in. Please log in again.' }, { status: 401 })
  }

  let fd: FormData
  try {
    fd = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Could not read the upload.' }, { status: 400 })
  }

  const file = fd.get('file')
  const category = String(fd.get('category') ?? '').trim()
  const caption = String(fd.get('caption') ?? '').trim()

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Please choose a file.' }, { status: 400 })
  }
  if (!category) {
    return NextResponse.json({ error: 'Please choose a category.' }, { status: 400 })
  }
  if (!(file.type.startsWith('image/') || file.type.startsWith('video/'))) {
    return NextResponse.json({ error: 'Only image or video files are allowed.' }, { status: 400 })
  }

  const db = createAdminClient()
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `${slugify(category)}/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`

  const { error: upErr } = await db.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (upErr) {
    return NextResponse.json({ error: `Storage upload failed: ${upErr.message}` }, { status: 500 })
  }

  const { data: pub } = db.storage.from(BUCKET).getPublicUrl(path)

  const { data: maxRow } = await db
    .from('gallery_images')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
  const sort_order = (maxRow?.[0]?.sort_order ?? -1) + 1

  const { error: insErr } = await db.from('gallery_images').insert({
    category,
    src: pub.publicUrl,
    caption: caption || null,
    sort_order,
  })
  if (insErr) {
    return NextResponse.json({ error: `Saving failed: ${insErr.message}` }, { status: 500 })
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return NextResponse.json({ ok: true })
}
