import type { Metadata } from 'next'
import { getSettings } from '@/lib/settings'
import { createReadClient } from '@/lib/supabase/read'
import GalleryGrid, { type GalleryImage } from '@/app/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery — Noor Beauty Salon',
  description:
    'A glimpse of our work — bridal, hair, nails, facial, body spa and makeup at Noor Beauty Salon, Dhaka.',
}

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const siteConfig = await getSettings()
  const db = createReadClient()
  const { data } = await db
    .from('gallery_images')
    .select('src, caption, category')
    .order('sort_order')
  const images: GalleryImage[] = (data ?? []).map((g) => ({
    src: g.src as string,
    caption: (g.caption as string) ?? '',
    category: g.category as string,
  }))

  return (
    <main className="bg-ash dark:bg-ink">
      {/* Header band */}
      <section className="bg-ink px-6 py-14 text-center text-paper">
        <span className="eyebrow">Our Work</span>
        <h1 className="text-4xl font-bold tracking-tight text-gold md:text-5xl">
          Gallery
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-paper/60">
          A glimpse of the looks and care we create. Filter by category to explore.
        </p>
      </section>

      <GalleryGrid images={images} />

      {/* CTA */}
      <section className="border-t border-gold/20 bg-ink px-6 py-16 text-center text-paper">
        <h2 className="mb-3 text-3xl font-bold text-gold">Love what you see?</h2>
        <p className="mx-auto mb-8 max-w-xl text-paper/70">
          Let&apos;s create your next look together.
        </p>
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          Book on WhatsApp
        </a>
      </section>
    </main>
  )
}
