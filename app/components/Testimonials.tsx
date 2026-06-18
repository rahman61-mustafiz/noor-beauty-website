'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

export type Testimonial = {
  initials: string
  name: string
  service: string | null
  rating: number
  text: string
}

function Stars({ count }: { count: number }) {
  return (
    <div className="mb-3 text-sm font-semibold text-gold">{'★'.repeat(count)}</div>
  )
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null
  const testimonials = items
  return (
    <section className="border-y border-ink/10 bg-ash px-6 py-20 dark:border-paper/10 dark:bg-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Kind Words" title="What Our Clients Say" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-sm border-l-[3px] border-gold bg-paper p-6
                         transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold-lg
                         dark:bg-ink-soft"
            >
              <Stars count={t.rating} />
              <p className="mb-4 text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink dark:text-paper">{t.name}</div>
                  <div className="text-xs text-ink/50 dark:text-paper/50">{t.service}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
