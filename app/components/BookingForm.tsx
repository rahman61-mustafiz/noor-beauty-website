'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSettings } from './SettingsProvider'

const SERVICE_OPTIONS = [
  'Hair Cut & Style',
  'Hair Color',
  'Hair Treatment',
  'Facial',
  'Pedicure & Manicure',
  'Nail Extension',
  'Waxing',
  'Body Spa',
  'Makeup',
  'Bridal Package',
  'Other',
]

export default function BookingForm() {
  const siteConfig = useSettings()
  const params = useSearchParams()
  const preset = params.get('service') ?? ''
  const options = preset && !SERVICE_OPTIONS.includes(preset) ? [preset, ...SERVICE_OPTIONS] : SERVICE_OPTIONS

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: preset || '',
    preferred_date: '',
    message: '',
  })
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error ?? 'Please try again.')
        setState('error')
        return
      }
      setState('done')
    } catch {
      setError('Network error. Please try again.')
      setState('error')
    }
  }

  const field =
    'w-full rounded-sm border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-gold dark:border-paper/15 dark:bg-ink-soft dark:text-paper'

  if (state === 'done') {
    return (
      <div className="rounded-sm border border-gold/40 bg-gold/10 p-8 text-center">
        <h3 className="text-xl font-bold text-gold">Request received! 🎉</h3>
        <p className="mt-2 text-ink/70 dark:text-paper/70">
          Thank you, {form.name || 'there'}. Our team will contact you on{' '}
          {form.phone} to confirm your appointment.
        </p>
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-6 inline-block"
        >
          Message us on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
            Name *
          </label>
          <input id="name" required value={form.name} onChange={(e) => set('name', e.target.value)} className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
            Phone *
          </label>
          <input id="phone" type="tel" required value={form.phone} onChange={(e) => set('phone', e.target.value)} className={field} placeholder="01XXX-XXXXXX" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
            Service
          </label>
          <select id="service" value={form.service} onChange={(e) => set('service', e.target.value)} className={field}>
            <option value="">Select a service…</option>
            {options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
            Preferred date
          </label>
          <input id="date" type="date" value={form.preferred_date} onChange={(e) => set('preferred_date', e.target.value)} className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Message
        </label>
        <textarea id="message" rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} className={field} placeholder="Anything we should know?" />
      </div>

      {state === 'error' && (
        <p className="rounded-sm border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-gold">
          Something went wrong: {error}. Please try again or contact us on WhatsApp.
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-gold w-full disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Request Appointment'}
      </button>
    </form>
  )
}
