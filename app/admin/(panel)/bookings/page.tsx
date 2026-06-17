import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { updateBookingStatus, deleteBooking } from './actions'

export const dynamic = 'force-dynamic'

const TABS = ['all', 'new', 'confirmed', 'done', 'cancelled'] as const

type Booking = {
  id: string
  name: string
  phone: string
  service: string | null
  message: string | null
  preferred_date: string | null
  status: string
  created_at: string
}

export default async function AdminBookings({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const active = TABS.includes((searchParams.status ?? 'all') as (typeof TABS)[number])
    ? (searchParams.status ?? 'all')
    : 'all'

  const db = createAdminClient()
  let query = db.from('bookings').select('*').order('created_at', { ascending: false })
  if (active !== 'all') query = query.eq('status', active)
  const { data } = await query
  const bookings = (data ?? []) as Booking[]

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold text-paper">Bookings</h1>
      <p className="mb-6 text-sm text-paper/50">Appointment requests from the booking form.</p>

      {/* Status tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t}
            href={`/admin/bookings?status=${t}`}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              active === t
                ? 'border-gold bg-gold text-ink font-semibold'
                : 'border-paper/15 text-paper/70 hover:border-gold hover:text-gold'
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-sm border border-paper/10 bg-ink-soft p-12 text-center text-paper/50">
          No {active === 'all' ? '' : active} bookings.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-sm border border-paper/10 bg-ink-soft p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-paper">{b.name}</span>
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs uppercase tracking-wide text-gold">
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-paper/70">
                    <a href={`tel:${b.phone}`} className="hover:text-gold">{b.phone}</a>
                    {b.service && <> · {b.service}</>}
                    {b.preferred_date && <> · prefers {b.preferred_date}</>}
                  </p>
                  {b.message && <p className="mt-2 text-sm text-paper/60">“{b.message}”</p>}
                  <p className="mt-2 text-xs text-paper/40">
                    Requested {new Date(b.created_at).toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <form action={updateBookingStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={b.id} />
                    <select
                      name="status"
                      defaultValue={b.status}
                      className="rounded-sm border border-paper/15 bg-ink px-3 py-1.5 text-sm text-paper outline-none focus:border-gold"
                    >
                      <option value="new">New</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="done">Done</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="rounded-sm bg-gold px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-white">
                      Save
                    </button>
                  </form>
                  <form action={deleteBooking}>
                    <input type="hidden" name="id" value={b.id} />
                    <button className="rounded-sm border border-paper/20 px-3 py-1.5 text-sm text-paper/60 transition-colors hover:border-gold hover:text-gold">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
