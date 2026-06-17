import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const tk = (n: number | null) => (n == null ? '—' : n.toLocaleString('en-US'))

export default async function AdminDashboard() {
  const db = createAdminClient()

  const countOf = async (table: string) => {
    const { count } = await db.from(table).select('*', { count: 'exact', head: true })
    return count ?? 0
  }

  const [services, packages, gallery, testimonials] = await Promise.all([
    countOf('services'),
    countOf('packages'),
    countOf('gallery_images'),
    countOf('testimonials'),
  ])

  const { count: newBookings } = await db
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  const { data: recent } = await db
    .from('bookings')
    .select('id, name, phone, service, status, created_at')
    .order('created_at', { ascending: false })
    .limit(8)

  const cards = [
    { label: 'Services', value: services, href: '/admin/services' },
    { label: 'Packages', value: packages, href: '/admin/services' },
    { label: 'Gallery Images', value: gallery, href: '/admin/gallery' },
    { label: 'Testimonials', value: testimonials, href: '/admin/testimonials' },
    { label: 'New Bookings', value: newBookings ?? 0, href: '/admin/bookings' },
  ]

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold text-paper">Dashboard</h1>
      <p className="mb-8 text-sm text-paper/50">Overview of your salon content and bookings.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-sm border border-paper/10 bg-ink-soft p-5 transition-colors hover:border-gold"
          >
            <div className="text-3xl font-bold text-gold">{tk(c.value)}</div>
            <div className="mt-1 text-sm text-paper/60">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-paper">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-gold hover:underline">
            View all →
          </Link>
        </div>

        {recent && recent.length > 0 ? (
          <div className="overflow-x-auto rounded-sm border border-paper/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-soft text-paper/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} className="border-t border-paper/10">
                    <td className="px-4 py-3 text-paper">{b.name}</td>
                    <td className="px-4 py-3 text-paper/70">{b.phone}</td>
                    <td className="px-4 py-3 text-paper/70">{b.service ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs uppercase tracking-wide text-gold">
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-paper/50">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-sm border border-paper/10 bg-ink-soft p-8 text-center text-paper/50">
            No bookings yet. They’ll appear here when customers submit the booking form.
          </div>
        )}
      </div>
    </div>
  )
}
