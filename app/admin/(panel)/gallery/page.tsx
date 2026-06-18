import { createAdminClient } from '@/lib/supabase/admin'
import { galleryFilters } from '@/lib/gallery-data'
import { updateGalleryItem, deleteGalleryItem } from './actions'
import GalleryUploader from '@/app/components/admin/GalleryUploader'

export const dynamic = 'force-dynamic'

const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src)
const CATEGORIES = galleryFilters.filter((f) => f !== 'All')

type Item = { id: string; category: string; src: string; caption: string | null }

const input =
  'rounded-sm border border-paper/15 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold'

export default async function AdminGallery() {
  const db = createAdminClient()
  const { data } = await db
    .from('gallery_images')
    .select('id, category, src, caption')
    .order('sort_order')
  const items = (data ?? []) as Item[]

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold text-paper">Gallery</h1>
      <p className="mb-8 text-sm text-paper/50">{items.length} items. Upload photos or videos (max 50 MB each).</p>

      {/* Upload */}
      <GalleryUploader categories={CATEGORIES} />

      {/* Existing items */}
      {items.length === 0 ? (
        <div className="rounded-sm border border-paper/10 bg-ink-soft p-12 text-center text-paper/50">
          No gallery items yet. Upload one above.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.id} className="overflow-hidden rounded-sm border border-paper/10 bg-ink-soft">
              <div className="relative aspect-[4/3] bg-ink">
                {isVideo(it.src) ? (
                  <video src={it.src} muted loop className="h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.src} alt={it.caption ?? ''} className="h-full w-full object-cover" />
                )}
              </div>
              <form action={updateGalleryItem} className="space-y-2 p-3">
                <input type="hidden" name="id" value={it.id} />
                <select name="category" defaultValue={it.category} className={`${input} w-full`}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input name="caption" defaultValue={it.caption ?? ''} className={`${input} w-full`} placeholder="Caption" />
                <button className="w-full rounded-sm bg-gold px-3 py-1.5 text-sm font-semibold text-ink hover:bg-white">Save</button>
              </form>
              <form action={deleteGalleryItem} className="px-3 pb-3">
                <input type="hidden" name="id" value={it.id} />
                <input type="hidden" name="src" value={it.src} />
                <button className="w-full rounded-sm border border-paper/20 px-3 py-1.5 text-sm text-paper/60 hover:border-gold hover:text-gold">Delete</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
