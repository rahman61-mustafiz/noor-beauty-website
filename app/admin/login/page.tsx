'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  const field =
    'w-full rounded-sm border border-paper/15 bg-ink-soft px-4 py-3 text-paper outline-none transition-colors focus:border-gold'

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/noor-logo.svg" alt="Noor" className="mx-auto h-12 w-auto" />
          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-gold">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-sm border border-paper/10 bg-ink-soft/50 p-8">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-paper">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={field}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-paper">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={field}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-sm border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-gold">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
