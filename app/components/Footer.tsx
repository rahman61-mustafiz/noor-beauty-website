'use client'

import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from 'react-icons/fa'
import { navLinks } from '@/lib/config'
import { useSettings } from './SettingsProvider'

export default function Footer() {
  const siteConfig = useSettings()
  const socials = [
    { href: siteConfig.social.facebook, icon: FaFacebookF, label: 'Facebook' },
    { href: siteConfig.social.instagram, icon: FaInstagram, label: 'Instagram' },
    { href: siteConfig.social.whatsapp, icon: FaWhatsapp, label: 'WhatsApp' },
  ]
  return (
    <footer className="border-t border-gold/30 bg-ink px-6 pt-14 pb-8 text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/noor-logo.svg"
            alt={`${siteConfig.fullName} logo`}
            className="mb-4 h-12 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-paper/60">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink
                           transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-paper/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-paper/70">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" size={14} />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex gap-3">
              <FaPhoneAlt className="mt-1 shrink-0 text-gold" size={13} />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-gold">
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Opening Hours
          </h3>
          <ul className="space-y-2 text-sm text-paper/70">
            <li className="flex gap-3">
              <FaRegClock className="mt-0.5 shrink-0 text-gold" size={14} />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-5 !px-6 !py-2.5 text-sm"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-paper/15 pt-6 text-center">
        <p className="text-xs text-paper/50">
          &copy; {new Date().getFullYear()} {siteConfig.fullName} | Luxury Salon Experience
        </p>
      </div>
    </footer>
  )
}
