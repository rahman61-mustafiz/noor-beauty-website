import Hero from './components/Hero'
import Features from './components/Features'
import ServicesGrid from './components/ServicesGrid'
import Testimonials, { type Testimonial } from './components/Testimonials'
import CTASection from './components/CTASection'
import { createReadClient } from '@/lib/supabase/read'

export const dynamic = 'force-dynamic'

const stats = [
  { value: '195+', label: 'Services' },
  { value: '20+', label: 'Categories' },
  { value: '7 Days', label: 'Open Weekly' },
  { value: '11–9', label: 'Every Day' },
]

export default async function Home() {
  const db = createReadClient()
  const { data } = await db
    .from('testimonials')
    .select('initials, name, service, rating, body')
    .order('sort_order')
  const testimonials: Testimonial[] = (data ?? []).map((t) => ({
    initials: t.initials as string,
    name: t.name as string,
    service: (t.service as string) ?? null,
    rating: (t.rating as number) ?? 5,
    text: t.body as string,
  }))

  // Real "from" price per category (lowest price across its services/packages).
  const [cats, svc, pkg] = await Promise.all([
    db.from('categories').select('id, slug'),
    db.from('services').select('category_id, price, prices'),
    db.from('packages').select('category_id, price'),
  ])
  const slugById = new Map((cats.data ?? []).map((c) => [c.id, c.slug as string]))
  const priceBySlug: Record<string, number> = {}
  const consider = (slug: string, val: number | null | undefined) => {
    if (val == null || val <= 0) return
    if (priceBySlug[slug] == null || val < priceBySlug[slug]) priceBySlug[slug] = val
  }
  for (const s of svc.data ?? []) {
    const slug = slugById.get(s.category_id)
    if (!slug) continue
    consider(slug, s.price as number)
    if (Array.isArray(s.prices)) for (const p of s.prices) consider(slug, p)
  }
  for (const p of pkg.data ?? []) {
    const slug = slugById.get(p.category_id)
    if (slug) consider(slug, p.price as number)
  }

  return (
    <>
      <Hero />

      {/* Stats band */}
      <section className="border-y border-gold/20 bg-ink px-6 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-gold md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm uppercase tracking-wide text-paper/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Features />
      <ServicesGrid priceBySlug={priceBySlug} />
      <Testimonials items={testimonials} />
      <CTASection />
    </>
  )
}
