'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/** Verifies the caller is the logged-in admin, then returns the admin DB client. */
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
  const str = typeof v === 'string' ? v.trim() : ''
  return str || null
}
const num = (fd: FormData, k: string) => {
  const v = fd.get(k)
  const n = typeof v === 'string' && v.trim() !== '' ? Number(v) : NaN
  return Number.isFinite(n) ? n : null
}
const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'category'

const list = (fd: FormData, k: string) =>
  String(fd.get(k) ?? '')
    .split(k === 'includes' ? '\n' : ',')
    .map((x) => x.trim())
    .filter(Boolean)

// Collect tiered price inputs named price_0, price_1, … in order.
function tieredPrices(fd: FormData): number[] {
  const out: [number, number][] = []
  for (const [key, val] of fd.entries()) {
    const m = /^price_(\d+)$/.exec(key)
    if (m) out.push([Number(m[1]), Number(val) || 0])
  }
  return out.sort((a, b) => a[0] - b[0]).map((e) => e[1])
}

function revalidate(categoryId?: string) {
  revalidatePath('/admin/services')
  if (categoryId) revalidatePath(`/admin/services/${categoryId}`)
  revalidatePath('/services')
}

// ---------------- CATEGORIES ----------------

export async function createCategory(fd: FormData) {
  const title = s(fd, 'title')
  if (!title) return
  const kind = (s(fd, 'kind') ?? 'simple') as 'simple' | 'tiered' | 'packages'
  const db = await adminDb()

  let slug = slugify(title)
  const { data: clash } = await db.from('categories').select('slug').eq('slug', slug)
  if (clash && clash.length) slug = `${slug}-${Date.now().toString().slice(-4)}`

  const { data: maxRow } = await db
    .from('categories')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
  const sort_order = (maxRow?.[0]?.sort_order ?? -1) + 1

  await db.from('categories').insert({
    slug,
    title,
    subtitle: s(fd, 'subtitle'),
    note: s(fd, 'note'),
    kind,
    tier_labels: kind === 'tiered' ? list(fd, 'tier_labels') : [],
    sort_order,
  })
  revalidate()
}

export async function updateCategory(fd: FormData) {
  const id = s(fd, 'id')
  if (!id) return
  const db = await adminDb()
  await db
    .from('categories')
    .update({
      title: s(fd, 'title'),
      subtitle: s(fd, 'subtitle'),
      note: s(fd, 'note'),
      tier_labels: list(fd, 'tier_labels'),
    })
    .eq('id', id)
  revalidate(id)
}

export async function deleteCategory(fd: FormData) {
  const id = s(fd, 'id')
  if (!id) return
  const db = await adminDb()
  await db.from('categories').delete().eq('id', id) // cascades to services/packages
  revalidate()
}

// ---------------- SERVICES (simple + tiered) ----------------

export async function createService(fd: FormData) {
  const categoryId = s(fd, 'category_id')
  const name = s(fd, 'name')
  if (!categoryId || !name) return
  const kind = s(fd, 'kind')
  const db = await adminDb()
  const { data: maxRow } = await db
    .from('services')
    .select('sort_order')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: false })
    .limit(1)
  const sort_order = (maxRow?.[0]?.sort_order ?? -1) + 1
  await db.from('services').insert({
    category_id: categoryId,
    name,
    price: kind === 'tiered' ? null : num(fd, 'price'),
    prices: kind === 'tiered' ? tieredPrices(fd) : [],
    note: s(fd, 'note'),
    sort_order,
  })
  revalidate(categoryId)
}

export async function updateService(fd: FormData) {
  const id = s(fd, 'id')
  const categoryId = s(fd, 'category_id')
  if (!id) return
  const kind = s(fd, 'kind')
  const db = await adminDb()
  await db
    .from('services')
    .update({
      name: s(fd, 'name'),
      price: kind === 'tiered' ? null : num(fd, 'price'),
      prices: kind === 'tiered' ? tieredPrices(fd) : [],
      note: s(fd, 'note'),
    })
    .eq('id', id)
  revalidate(categoryId ?? undefined)
}

export async function deleteService(fd: FormData) {
  const id = s(fd, 'id')
  const categoryId = s(fd, 'category_id')
  if (!id) return
  const db = await adminDb()
  await db.from('services').delete().eq('id', id)
  revalidate(categoryId ?? undefined)
}

// ---------------- PACKAGES ----------------

export async function createPackage(fd: FormData) {
  const categoryId = s(fd, 'category_id')
  const name = s(fd, 'name')
  if (!categoryId || !name) return
  const db = await adminDb()
  const { data: maxRow } = await db
    .from('packages')
    .select('sort_order')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: false })
    .limit(1)
  const sort_order = (maxRow?.[0]?.sort_order ?? -1) + 1
  await db.from('packages').insert({
    category_id: categoryId,
    name,
    occasion: s(fd, 'occasion'),
    price: num(fd, 'price') ?? 0,
    regular_price: num(fd, 'regular_price'),
    includes: list(fd, 'includes'),
    note: s(fd, 'note'),
    sort_order,
  })
  revalidate(categoryId)
}

export async function updatePackage(fd: FormData) {
  const id = s(fd, 'id')
  const categoryId = s(fd, 'category_id')
  if (!id) return
  const db = await adminDb()
  await db
    .from('packages')
    .update({
      name: s(fd, 'name'),
      occasion: s(fd, 'occasion'),
      price: num(fd, 'price') ?? 0,
      regular_price: num(fd, 'regular_price'),
      includes: list(fd, 'includes'),
      note: s(fd, 'note'),
    })
    .eq('id', id)
  revalidate(categoryId ?? undefined)
}

export async function deletePackage(fd: FormData) {
  const id = s(fd, 'id')
  const categoryId = s(fd, 'category_id')
  if (!id) return
  const db = await adminDb()
  await db.from('packages').delete().eq('id', id)
  revalidate(categoryId ?? undefined)
}
