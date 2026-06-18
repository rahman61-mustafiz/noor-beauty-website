import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSettings } from '@/lib/settings'
import BookingForm from '@/app/components/BookingForm'

export const metadata: Metadata = {
  title: 'Book an Appointment — Noor Beauty Salon',
  description:
    'Request an appointment at Noor Beauty Salon — hair, facial, nails, body spa, bridal and more.',
}

export default async function BookingPage() {
  const siteConfig = await getSettings()
  return (
    <main className="bg-ash dark:bg-ink">
      {/* Header band */}
      <section className="bg-ink px-6 py-14 text-center text-paper">
        <span className="eyebrow">Reserve Your Spot</span>
        <h1 className="text-4xl font-bold tracking-tight text-gold md:text-5xl">
          Book an Appointment
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-paper/60">
          Fill in the form and our team will call you back to confirm.
        </p>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-sm border border-ink/10 bg-paper p-8 dark:border-paper/10 dark:bg-ink-soft">
          <Suspense fallback={<p className="text-ink/50 dark:text-paper/50">Loading…</p>}>
            <BookingForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-sm text-ink/50 dark:text-paper/50">
          Prefer to chat? Message us on{' '}
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            WhatsApp
          </a>{' '}
          or call{' '}
          <a href={`tel:${siteConfig.phone}`} className="text-gold hover:underline">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </main>
  )
}
