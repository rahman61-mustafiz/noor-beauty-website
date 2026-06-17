import { createAdminClient } from '@/lib/supabase/admin'
import { createTestimonial, updateTestimonial, deleteTestimonial } from './actions'

export const dynamic = 'force-dynamic'

type T = {
  id: string
  initials: string
  name: string
  service: string | null
  rating: number
  body: string
}

const input =
  'rounded-sm border border-paper/15 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold'

function RatingSelect({ value }: { value?: number }) {
  return (
    <select name="rating" defaultValue={value ?? 5} className={`${input} w-20`}>
      {[5, 4, 3, 2, 1].map((n) => (
        <option key={n} value={n}>{n}★</option>
      ))}
    </select>
  )
}

export default async function AdminTestimonials() {
  const db = createAdminClient()
  const { data } = await db.from('testimonials').select('*').order('sort_order')
  const items = (data ?? []) as T[]

  return (
    <div className="max-w-3xl">
      <h1 className="mb-1 text-3xl font-bold text-paper">Testimonials</h1>
      <p className="mb-8 text-sm text-paper/50">Reviews shown on the homepage.</p>

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-sm border border-paper/10 bg-ink-soft p-4">
            <form action={updateTestimonial} className="space-y-2">
              <input type="hidden" name="id" value={t.id} />
              <div className="flex flex-wrap gap-2">
                <input name="name" defaultValue={t.name} className={`${input} flex-1`} placeholder="Name" />
                <input name="initials" defaultValue={t.initials} className={`${input} w-20`} placeholder="RS" />
                <input name="service" defaultValue={t.service ?? ''} className={`${input} flex-1`} placeholder="Service" />
                <RatingSelect value={t.rating} />
              </div>
              <textarea name="body" defaultValue={t.body} rows={2} className={`${input} w-full`} placeholder="Review text" />
              <button className="rounded-sm bg-gold px-4 py-1.5 text-sm font-semibold text-ink hover:bg-white">Save</button>
            </form>
            <form action={deleteTestimonial} className="mt-2">
              <input type="hidden" name="id" value={t.id} />
              <button className="text-sm text-paper/50 hover:text-gold">Delete</button>
            </form>
          </div>
        ))}
      </div>

      {/* Add */}
      <form action={createTestimonial} className="mt-8 space-y-2 rounded-sm border border-dashed border-paper/20 bg-ink-soft p-4">
        <h2 className="text-sm font-semibold text-paper">Add a testimonial</h2>
        <div className="flex flex-wrap gap-2">
          <input name="name" required className={`${input} flex-1`} placeholder="Name *" />
          <input name="initials" className={`${input} w-20`} placeholder="Initials" />
          <input name="service" className={`${input} flex-1`} placeholder="Service" />
          <RatingSelect />
        </div>
        <textarea name="body" required rows={2} className={`${input} w-full`} placeholder="Review text *" />
        <button className="rounded-sm border border-gold px-4 py-1.5 text-sm font-semibold text-gold hover:bg-gold hover:text-ink">+ Add</button>
      </form>
    </div>
  )
}
