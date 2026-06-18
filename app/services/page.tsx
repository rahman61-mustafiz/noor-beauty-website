import type { Metadata } from 'next'
import Link from 'next/link'
import { getSettings } from '@/lib/settings'
import { createReadClient } from '@/lib/supabase/read'
import TieredServiceCard from '@/app/components/TieredServiceCard'

export const metadata: Metadata = {
  title: 'Services — Noor Beauty Salon',
  description:
    'Full service menu — hair, facial, nails, body spa, bridal and packages. Open 11:00 – 21:00 everyday.',
}

// Always read fresh from the database so admin edits appear immediately.
export const dynamic = 'force-dynamic'

const tk = (n: number) => `Tk ${n.toLocaleString('en-US')}`

type DBCategory = {
  id: string
  slug: string
  title: string
  subtitle: string | null
  note: string | null
  kind: 'simple' | 'tiered' | 'packages'
  tier_labels: string[]
}

async function getCategories() {
  const db = createReadClient()
  const [cats, services, packages] = await Promise.all([
    db.from('categories').select('*').order('sort_order'),
    db.from('services').select('*').order('sort_order'),
    db.from('packages').select('*').order('sort_order'),
  ])
  const categories = (cats.data ?? []) as DBCategory[]
  const allServices = services.data ?? []
  const allPackages = packages.data ?? []

  return categories.map((c) => {
    const base = { id: c.slug, title: c.title, subtitle: c.subtitle, note: c.note, kind: c.kind }
    if (c.kind === 'packages') {
      return {
        ...base,
        packages: allPackages
          .filter((p) => p.category_id === c.id)
          .map((p) => ({
            name: p.name as string,
            occasion: p.occasion as string | null,
            price: p.price as number,
            regularPrice: p.regular_price as number | null,
            includes: (p.includes ?? []) as string[],
            note: p.note as string | null,
          })),
      }
    }
    const items = allServices
      .filter((s) => s.category_id === c.id)
      .map((s) =>
        c.kind === 'tiered'
          ? { name: s.name as string, prices: (s.prices ?? []) as number[], note: s.note as string | null }
          : { name: s.name as string, price: s.price as number, note: s.note as string | null }
      )
    return { ...base, tierLabels: c.tier_labels ?? [], items }
  })
}

export default async function ServicesPage() {
  const categories = await getCategories()
  const siteConfig = await getSettings()

  return (
    <main className="bg-ash dark:bg-ink">
      {/* Header band */}
      <section className="bg-ink px-6 py-14 text-center text-paper">
        <h1 className="text-4xl font-bold tracking-tight text-gold md:text-5xl">Service List</h1>
        <span className="mt-4 inline-block rounded-sm bg-gold px-5 py-1.5 text-sm font-semibold tracking-wide text-ink">
          OPEN 11:00 – 21:00 · EVERYDAY
        </span>
      </section>

      {/* Sticky category nav */}
      <nav className="sticky top-[72px] z-40 border-b border-ink/10 bg-paper/95 backdrop-blur dark:border-paper/10 dark:bg-ink/95">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="whitespace-nowrap rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/70 transition-colors hover:border-gold hover:text-gold dark:border-paper/15 dark:text-paper/70"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Categories */}
      <div className="mx-auto max-w-6xl px-6">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-36 py-14">
            <div className="mb-8 border-b border-gold/40 pb-4">
              <h2 className="text-3xl font-bold tracking-tight text-ink dark:text-paper">{cat.title}</h2>
              {cat.subtitle && <p className="mt-1 text-sm text-ink/50 dark:text-paper/50">{cat.subtitle}</p>}
            </div>

            {cat.kind === 'simple' && 'items' in cat && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item: any) => (
                    <div
                      key={item.name}
                      className="flex items-start justify-between gap-3 rounded-sm border border-ink/10 bg-paper p-4 transition-all duration-300 hover:border-gold hover:shadow-gold-lg dark:border-paper/10 dark:bg-ink-soft"
                    >
                      <h4 className="text-sm font-semibold text-ink dark:text-paper">
                        {item.name}
                        {item.note && <span className="ml-2 text-xs uppercase tracking-wide text-gold">{item.note}</span>}
                      </h4>
                      <span className="whitespace-nowrap text-sm font-bold text-gold">{tk(item.price)}</span>
                    </div>
                  ))}
                </div>
                {cat.note && <p className="mt-4 text-xs text-ink/50 dark:text-paper/50">{cat.note}</p>}
              </>
            )}

            {cat.kind === 'tiered' && 'items' in cat && (
              <>
                <p className="mb-5 text-sm text-ink/50 dark:text-paper/50">
                  Hover (or tap) a service to see prices for{' '}
                  <span className="text-gold">{(cat.tierLabels ?? []).join(' / ')}</span>.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item: any) => (
                    <TieredServiceCard key={item.name} item={item} tierLabels={cat.tierLabels ?? []} />
                  ))}
                </div>
                {cat.note && <p className="mt-4 text-xs text-ink/50 dark:text-paper/50">{cat.note}</p>}
              </>
            )}

            {cat.kind === 'packages' && 'packages' in cat && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cat.packages.map((pkg: any) => (
                  <div key={pkg.name} className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-paper transition-all duration-300 hover:border-gold hover:shadow-gold-lg dark:border-paper/10 dark:bg-ink-soft">
                    <div className="bg-ink px-6 py-6 text-center">
                      <h3 className="text-xl font-bold text-gold">{pkg.name}</h3>
                      {pkg.occasion && <p className="mt-1 text-sm text-paper/70">{pkg.occasion}</p>}
                      <p className="mt-3 text-2xl font-bold text-paper">
                        {pkg.regularPrice && (
                          <span className="mr-2 text-base font-normal text-paper/40 line-through">{tk(pkg.regularPrice)}</span>
                        )}
                        {tk(pkg.price)}
                      </p>
                    </div>
                    <ul className="flex-1 space-y-3 px-6 py-6">
                      {pkg.includes.map((inc: string) => (
                        <li key={inc} className="flex gap-3 text-sm text-ink/80 dark:text-paper/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    {pkg.note && <p className="px-6 text-xs text-ink/50 dark:text-paper/50">{pkg.note}</p>}
                    <div className="px-6 pb-6 pt-4">
                      <Link href={`/booking?service=${encodeURIComponent(pkg.name)}`} className="btn-gold w-full text-center !py-2.5">
                        Book This Package
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-gold/20 bg-ink px-6 py-16 text-center text-paper">
        <h2 className="mb-3 text-3xl font-bold text-gold">Ready to book?</h2>
        <p className="mx-auto mb-8 max-w-xl text-paper/70">
          Message us on WhatsApp or call — we&apos;ll find the perfect time for you.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/booking" className="btn-gold">Book Appointment</Link>
          <a href={`tel:${siteConfig.phone}`} className="btn-outline">Call {siteConfig.phoneDisplay}</a>
        </div>
      </section>
    </main>
  )
}
