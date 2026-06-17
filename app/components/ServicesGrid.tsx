'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  FaCut,
  FaPalette,
  FaSpa,
  FaHandSparkles,
  FaRegSmile,
  FaCrown,
} from 'react-icons/fa'
import { services } from '@/lib/config'
import SectionHeading from './SectionHeading'

// Each high-level category -> icon, image and matching /services anchor.
const meta: Record<
  string,
  { icon: React.ComponentType<{ size?: number }>; href: string; img: string }
> = {
  'Hair Cutting': { icon: FaCut, href: '/services#hair-cut', img: '/images/gallery/hair/hair-2.jpg' },
  'Hair Color': { icon: FaPalette, href: '/services#hair-color', img: '/images/gallery/hair/hair-4.jpg' },
  Facial: { icon: FaRegSmile, href: '/services#facial', img: '/images/gallery/facial/facial-1.jpg' },
  Nails: { icon: FaHandSparkles, href: '/services#nail-extension', img: '/images/gallery/nails/nails-1.jpg' },
  'Body Spa': { icon: FaSpa, href: '/services#body-spa-massage', img: '/images/gallery/spa/spa-1.jpg' },
  Makeup: { icon: FaCrown, href: '/services#makeup-packages', img: '/images/gallery/makeup/makeup-1.jpg' },
}

export default function ServicesGrid({
  priceBySlug = {},
}: {
  priceBySlug?: Record<string, number>
}) {
  return (
    <section className="bg-paper-off px-6 py-20 dark:bg-ink-soft">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          subtitle="From everyday styling to once-in-a-lifetime bridal looks — explore the full menu."
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {services.map((service, i) => {
            const m = meta[service.name] ?? {
              icon: FaSpa,
              href: '/services',
              img: '/images/gallery/spa/spa-1.jpg',
            }
            const Icon = m.icon
            const slug = m.href.includes('#') ? m.href.split('#')[1] : ''
            const priceFrom = priceBySlug[slug] ?? service.priceFrom
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={m.href}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-ink/10 dark:border-paper/10"
                >
                  <Image
                    src={m.img}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark gradient so text is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10 transition-colors duration-300 group-hover:from-ink/95" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-center">
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-semibold text-paper">{service.name}</h3>
                    <p className="text-xs text-paper/70">{service.tagline}</p>
                    <p className="mt-1 text-xs font-semibold text-gold">
                      From Tk {priceFrom.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn-gold">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
