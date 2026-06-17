import type { Metadata } from 'next'
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaRegClock, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { getSettings } from '@/lib/settings'
import ContactForm from '@/app/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Noor Beauty Salon',
  description:
    'Visit or contact Noor Beauty Salon, New Bailey Road, Ramna, Dhaka. Call, WhatsApp or send us a message.',
}

export default async function ContactPage() {
  const siteConfig = await getSettings()
  const socials = [
    { href: siteConfig.social.facebook, icon: FaFacebookF, label: 'Facebook' },
    { href: siteConfig.social.instagram, icon: FaInstagram, label: 'Instagram' },
    { href: siteConfig.social.whatsapp, icon: FaWhatsapp, label: 'WhatsApp' },
  ]
  return (
    <main className="bg-paper dark:bg-ink">
      {/* Header band */}
      <section className="bg-ink px-6 py-14 text-center text-paper">
        <span className="eyebrow">Get in Touch</span>
        <h1 className="text-4xl font-bold tracking-tight text-gold md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-paper/60">
          Book your visit, ask a question, or just say hello.
        </p>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        {/* Details */}
        <div className="space-y-8">
          <div className="flex gap-4">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" size={20} />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Visit</h3>
              <p className="mt-1 text-ink/80 dark:text-paper/80">{siteConfig.address}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <FaPhoneAlt className="mt-1 shrink-0 text-gold" size={18} />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Call</h3>
              <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-ink/80 hover:text-gold dark:text-paper/80">
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <FaWhatsapp className="mt-1 shrink-0 text-gold" size={20} />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">WhatsApp</h3>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-ink/80 hover:text-gold dark:text-paper/80"
              >
                Chat with us
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <FaRegClock className="mt-1 shrink-0 text-gold" size={19} />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Opening Hours</h3>
              <p className="mt-1 text-ink/80 dark:text-paper/80">{siteConfig.hours}</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-3 pt-2">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink
                           transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-sm border border-ink/10 bg-paper-off p-8 dark:border-paper/10 dark:bg-ink-soft">
          <h2 className="mb-6 text-2xl font-bold text-ink dark:text-paper">Send a Message</h2>
          <ContactForm />
        </div>
      </div>

      {/* Map */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-sm border border-gold/30">
          <iframe
            title="Noor Beauty Salon location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&z=16&output=embed`}
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  )
}
