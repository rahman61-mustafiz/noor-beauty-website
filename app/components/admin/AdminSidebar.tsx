'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const nav = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/services', label: 'Services & Prices' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/settings', label: 'Site Settings' },
]

export default function AdminSidebar({ email }: { email?: string }) {
  const path = usePathname()
  const router = useRouter()

  const isActive = (href: string) =>
    href === '/admin' ? path === '/admin' : path.startsWith(href)

  const signOut = async () => {
    await createClient().auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-paper/10 bg-ink-soft">
      <div className="border-b border-paper/10 p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/noor-logo.svg" alt="Noor" className="h-9 w-auto" />
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-sm px-4 py-2.5 text-sm transition-colors ${
              isActive(item.href)
                ? 'bg-gold text-ink font-semibold'
                : 'text-paper/70 hover:bg-paper/5 hover:text-gold'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-2 border-t border-paper/10 p-4">
        {email && <p className="truncate px-2 text-xs text-paper/40">{email}</p>}
        <Link
          href="/"
          className="block rounded-sm px-4 py-2 text-sm text-paper/70 transition-colors hover:text-gold"
        >
          View site ↗
        </Link>
        <button
          onClick={signOut}
          className="w-full rounded-sm border border-gold/40 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
