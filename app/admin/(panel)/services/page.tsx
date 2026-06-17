import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { createCategory, deleteCategory } from './actions'

export const dynamic = 'force-dynamic'

type Category = {
  id: string
  title: string
  kind: 'simple' | 'tiered' | 'packages'
  sort_order: number
}

export default async function AdminServices() {
  const db = createAdminClient()
  const { data: cats } = await db
    .from('categories')
    .select('id, title, kind, sort_order')
    .order('sort_order')
  const categories = (cats ?? []) as Category[]

  const { data: svc } = await db.from('services').select('category_id')
  const { data: pkg } = await db.from('packages').select('category_id')
  const counts = new Map<string, number>()
  for (const r of [...(svc ?? []), ...(pkg ?? [])]) {
    counts.set(r.category_id, (counts.get(r.category_id) ?? 0) + 1)
  }

  const input =
    'w-full rounded-sm border border-paper/15 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold'

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold text-paper">Services &amp; Prices</h1>
      <p className="mb-8 text-sm text-paper/50">
        {categories.length} categories. Click <span className="text-gold">Manage</span> to edit a
        category&apos;s items and prices.
      </p>

      {/* Categories list */}
      <div className="space-y-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-paper/10 bg-ink-soft px-5 py-4"
          >
            <div className="min-w-0">
              <span className="font-semibold text-paper">{c.title}</span>
              <span className="ml-3 rounded-full bg-paper/10 px-2 py-0.5 text-xs uppercase tracking-wide text-paper/60">
                {c.kind}
              </span>
              <span className="ml-2 text-sm text-paper/40">{counts.get(c.id) ?? 0} items</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${c.id}`}
                className="rounded-sm bg-gold px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                Manage
              </Link>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <button className="rounded-sm border border-paper/20 px-3 py-1.5 text-sm text-paper/60 transition-colors hover:border-gold hover:text-gold">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Add category */}
      <div className="mt-10 rounded-sm border border-dashed border-paper/20 bg-ink-soft p-6">
        <h2 className="mb-4 text-lg font-semibold text-paper">Add a category</h2>
        <form action={createCategory} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-paper/70">Title *</label>
            <input name="title" required className={input} placeholder="e.g. Hair Spa" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">Type</label>
            <select name="kind" className={input} defaultValue="simple">
              <option value="simple">Simple (one price each)</option>
              <option value="tiered">Tiered (e.g. Short / Medium / Long)</option>
              <option value="packages">Packages (bundles)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">Subtitle</label>
            <input name="subtitle" className={input} placeholder="Optional" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">
              Tier labels (comma-separated, for tiered only)
            </label>
            <input name="tier_labels" className={input} placeholder="Short, Medium, Long" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-paper/70">Note</label>
            <input name="note" className={input} placeholder="Optional note shown under the category" />
          </div>
          <div className="md:col-span-2">
            <button className="btn-gold">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  )
}
