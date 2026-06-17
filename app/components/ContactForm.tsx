'use client'

import { useState } from 'react'
import { useSettings } from './SettingsProvider'

export default function ContactForm() {
  const siteConfig = useSettings()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hello Noor Beauty! My name is ${name || '—'} (${phone || 'no phone'}). ${message}`.trim()
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const field =
    'w-full rounded-sm border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-gold dark:border-paper/15 dark:bg-ink-soft dark:text-paper'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="01XXX-XXXXXX"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Which service are you interested in?"
          className={field}
        />
      </div>
      <button type="submit" className="btn-gold w-full">
        Send via WhatsApp
      </button>
      <p className="text-center text-xs text-ink/40 dark:text-paper/40">
        This opens WhatsApp with your message pre-filled.
      </p>
    </form>
  )
}
