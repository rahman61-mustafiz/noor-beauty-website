import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  updateCategory,
  createService,
  updateService,
  deleteService,
  createPackage,
  updatePackage,
  deletePackage,
} from '../actions'

export const dynamic = 'force-dynamic'

const input =
  'rounded-sm border border-paper/15 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold'

export default async function CategoryEditor({ params }: { params: { id: string } }) {
  const db = createAdminClient()
  const { data: category } = await db.from('categories').select('*').eq('id', params.id).single()
  if (!category) notFound()

  const isPackages = category.kind === 'packages'
  const tierLabels: string[] = category.tier_labels ?? []

  const { data: services } = isPackages
    ? { data: [] }
    : await db.from('services').select('*').eq('category_id', category.id).order('sort_order')
  const { data: packages } = isPackages
    ? await db.from('packages').select('*').eq('category_id', category.id).order('sort_order')
    : { data: [] }

  return (
    <div className="max-w-4xl">
      <Link href="/admin/services" className="text-sm text-gold hover:underline">
        ← All categories
      </Link>

      {/* Category meta */}
      <form action={updateCategory} className="mt-4 rounded-sm border border-paper/10 bg-ink-soft p-6">
        <input type="hidden" name="id" value={category.id} />
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-paper">Edit Category</h1>
          <span className="rounded-full bg-paper/10 px-2 py-0.5 text-xs uppercase tracking-wide text-paper/60">
            {category.kind}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-paper/70">Title</label>
            <input name="title" defaultValue={category.title} className={`${input} w-full`} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">Subtitle</label>
            <input name="subtitle" defaultValue={category.subtitle ?? ''} className={`${input} w-full`} />
          </div>
          {category.kind === 'tiered' && (
            <div>
              <label className="mb-1 block text-sm text-paper/70">Tier labels (comma-separated)</label>
              <input name="tier_labels" defaultValue={tierLabels.join(', ')} className={`${input} w-full`} />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm text-paper/70">Note</label>
            <input name="note" defaultValue={category.note ?? ''} className={`${input} w-full`} />
          </div>
        </div>
        <button className="btn-gold mt-4">Save Category</button>
      </form>

      {/* Items */}
      <h2 className="mb-3 mt-10 text-xl font-semibold text-paper">
        Items {isPackages ? '(packages)' : ''}
      </h2>

      {!isPackages && (
        <div className="space-y-2">
          {(services ?? []).map((it) => (
            <div key={it.id} className="flex flex-wrap items-end gap-2 rounded-sm border border-paper/10 bg-ink-soft p-3">
              <form action={updateService} className="flex flex-1 flex-wrap items-end gap-2">
                <input type="hidden" name="id" value={it.id} />
                <input type="hidden" name="category_id" value={category.id} />
                <input type="hidden" name="kind" value={category.kind} />
                <input name="name" defaultValue={it.name} className={`${input} min-w-[180px] flex-1`} placeholder="Name" />
                {category.kind === 'tiered' ? (
                  tierLabels.map((label, i) => (
                    <input
                      key={i}
                      name={`price_${i}`}
                      type="number"
                      defaultValue={it.prices?.[i] ?? ''}
                      className={`${input} w-24`}
                      placeholder={label}
                      title={label}
                    />
                  ))
                ) : (
                  <input name="price" type="number" defaultValue={it.price ?? ''} className={`${input} w-28`} placeholder="Price" />
                )}
                <input name="note" defaultValue={it.note ?? ''} className={`${input} w-32`} placeholder="Note" />
                <button className="rounded-sm bg-gold px-3 py-2 text-sm font-semibold text-ink hover:bg-white">Save</button>
              </form>
              <form action={deleteService}>
                <input type="hidden" name="id" value={it.id} />
                <input type="hidden" name="category_id" value={category.id} />
                <button className="rounded-sm border border-paper/20 px-3 py-2 text-sm text-paper/60 hover:border-gold hover:text-gold">✕</button>
              </form>
            </div>
          ))}

          {/* Add service */}
          <form action={createService} className="flex flex-wrap items-end gap-2 rounded-sm border border-dashed border-paper/20 bg-ink-soft/50 p-3">
            <input type="hidden" name="category_id" value={category.id} />
            <input type="hidden" name="kind" value={category.kind} />
            <input name="name" required className={`${input} min-w-[180px] flex-1`} placeholder="New item name" />
            {category.kind === 'tiered' ? (
              tierLabels.map((label, i) => (
                <input key={i} name={`price_${i}`} type="number" className={`${input} w-24`} placeholder={label} title={label} />
              ))
            ) : (
              <input name="price" type="number" className={`${input} w-28`} placeholder="Price" />
            )}
            <input name="note" className={`${input} w-32`} placeholder="Note" />
            <button className="rounded-sm border border-gold px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-ink">+ Add</button>
          </form>
        </div>
      )}

      {isPackages && (
        <div className="space-y-4">
          {(packages ?? []).map((p) => (
            <div key={p.id} className="rounded-sm border border-paper/10 bg-ink-soft p-4">
              <form action={updatePackage} className="space-y-3">
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="category_id" value={category.id} />
                <div className="grid gap-2 md:grid-cols-2">
                  <input name="name" defaultValue={p.name} className={`${input} w-full`} placeholder="Package name" />
                  <input name="occasion" defaultValue={p.occasion ?? ''} className={`${input} w-full`} placeholder="Occasion (optional)" />
                  <input name="price" type="number" defaultValue={p.price} className={`${input} w-full`} placeholder="Price" />
                  <input name="regular_price" type="number" defaultValue={p.regular_price ?? ''} className={`${input} w-full`} placeholder="Regular price (if discounted)" />
                </div>
                <textarea name="includes" defaultValue={(p.includes ?? []).join('\n')} rows={4} className={`${input} w-full`} placeholder="One included item per line" />
                <input name="note" defaultValue={p.note ?? ''} className={`${input} w-full`} placeholder="Note (optional)" />
                <button className="rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-white">Save</button>
              </form>
              <form action={deletePackage} className="mt-2">
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="category_id" value={category.id} />
                <button className="text-sm text-paper/50 hover:text-gold">Delete package</button>
              </form>
            </div>
          ))}

          {/* Add package */}
          <form action={createPackage} className="space-y-3 rounded-sm border border-dashed border-paper/20 bg-ink-soft/50 p-4">
            <input type="hidden" name="category_id" value={category.id} />
            <h3 className="text-sm font-semibold text-paper">Add a package</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <input name="name" required className={`${input} w-full`} placeholder="Package name" />
              <input name="occasion" className={`${input} w-full`} placeholder="Occasion (optional)" />
              <input name="price" type="number" className={`${input} w-full`} placeholder="Price" />
              <input name="regular_price" type="number" className={`${input} w-full`} placeholder="Regular price (optional)" />
            </div>
            <textarea name="includes" rows={4} className={`${input} w-full`} placeholder="One included item per line" />
            <input name="note" className={`${input} w-full`} placeholder="Note (optional)" />
            <button className="rounded-sm border border-gold px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-ink">+ Add Package</button>
          </form>
        </div>
      )}
    </div>
  )
}
