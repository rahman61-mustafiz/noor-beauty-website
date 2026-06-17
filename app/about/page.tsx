import type { Metadata } from 'next'
import Link from 'next/link'
import { FaGem, FaHeart, FaStar } from 'react-icons/fa'
import { getSettings } from '@/lib/settings'
import SectionHeading from '@/app/components/SectionHeading'

export const metadata: Metadata = {
  title: 'About — Noor Beauty Salon',
  description:
    'The story and values behind Noor Beauty Salon — a luxury beauty lounge on Bailey Road, Dhaka.',
}

const values = [
  { icon: FaGem, title: 'Craft', text: 'Skilled hands and an eye for detail in every cut, colour and look.' },
  { icon: FaHeart, title: 'Care', text: 'Hygiene, comfort and genuine attention from the moment you arrive.' },
  { icon: FaStar, title: 'Confidence', text: 'We don’t just style — we help you walk out feeling radiant.' },
]

const stats = [
  { value: '195+', label: 'Services' },
  { value: '20+', label: 'Categories' },
  { value: '7 Days', label: 'Open Weekly' },
  { value: '11–9', label: 'Every Day' },
]

export default async function AboutPage() {
  const siteConfig = await getSettings()
  return (
    <main className="bg-paper dark:bg-ink">
      {/* Header band */}
      <section className="bg-ink px-6 py-14 text-center text-paper">
        <span className="eyebrow">Our Story</span>
        <h1 className="text-4xl font-bold tracking-tight text-gold md:text-5xl">
          The Light Behind Noor
        </h1>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-sm bg-ink py-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/noor-logo.svg"
              alt={`${siteConfig.fullName} logo`}
              className="h-24 w-auto"
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink/70 dark:text-paper/70">
            <p>
              <span className="font-semibold text-gold">Noor</span> means light —
              and that is exactly what we set out to bring to every guest who walks
              through our doors.
            </p>
            <p>
              From everyday styling to once-in-a-lifetime bridal looks, our artists
              blend classic technique with modern trends, using only premium,
              professional-grade products. Hair, facial, nails, body spa and
              makeup — all under one roof on Bailey Road, Dhaka.
            </p>
            <p>
              Step into our black-and-gold lounge and let us take care of the rest.
            </p>
            <Link href="/services" className="btn-gold mt-2 inline-block">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-gold/20 bg-ink px-6 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-gold md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm uppercase tracking-wide text-paper/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="What We Stand For" title="Our Values" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-sm border border-ink/10 bg-paper-off p-8 text-center
                         transition-all duration-300 hover:-translate-y-1.5 hover:border-gold
                         hover:shadow-gold-lg dark:border-paper/10 dark:bg-ink-soft"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/30 text-gold">
                <Icon size={22} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-ink dark:text-paper">{title}</h3>
              <p className="text-sm leading-relaxed text-ink/60 dark:text-paper/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gold/20 bg-ink px-6 py-16 text-center text-paper">
        <h2 className="mb-3 text-3xl font-bold text-gold">Come experience Noor</h2>
        <p className="mx-auto mb-8 max-w-xl text-paper/70">{siteConfig.address}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Book on WhatsApp
          </a>
          <Link href="/contact" className="btn-outline">
            Visit Us
          </Link>
        </div>
      </section>
    </main>
  )
}
