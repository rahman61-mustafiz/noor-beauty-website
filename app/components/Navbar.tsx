'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navLinks } from '@/lib/config'
import { useSettings } from './SettingsProvider'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const siteConfig = useSettings()

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" aria-label={siteConfig.fullName} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/noor-logo.svg"
            alt={`${siteConfig.fullName} logo`}
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-paper transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-gold px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            Book Now
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-2xl text-gold"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t border-gold/20 bg-ink px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-paper transition-colors hover:text-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-gold px-5 py-2 text-center text-sm font-semibold text-ink"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  )
}
