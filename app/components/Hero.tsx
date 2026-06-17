'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSettings } from './SettingsProvider'

export default function Hero() {
  const siteConfig = useSettings()
  return (
    <section className="relative overflow-hidden">
      {/* Base photo (also acts as the video's poster / fallback) */}
      <Image
        src={siteConfig.heroImage}
        alt="Noor Beauty Salon interior"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Background video — set one in the admin (Settings → Homepage Hero).
          Until then, the photo above shows. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={siteConfig.heroImage}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={siteConfig.heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay + gold glow for readability */}
      <div className="absolute inset-0 bg-ink/80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 55% at 50% 30%, rgba(212,175,55,0.18) 0%, rgba(10,10,10,0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          Luxury Beauty Lounge · Bailey Road, Dhaka
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 text-5xl font-bold leading-tight tracking-tight text-paper md:text-6xl"
        >
          Your Radiant Self <span className="text-gold">Awaits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-9 max-w-xl text-lg text-paper/70"
        >
          {siteConfig.description}. Hair, facial, nails, body spa and bridal —
          all under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link href="/booking" className="btn-gold">
            Book Appointment
          </Link>
          <Link href="/services" className="btn-outline !text-gold">
            View Services
          </Link>
        </motion.div>

        <span className="divider-gold" aria-hidden="true" />
      </div>
    </section>
  )
}
