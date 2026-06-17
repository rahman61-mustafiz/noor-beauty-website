'use client'

import { useState } from 'react'
import type { TieredItem } from '@/lib/services-data'

const tk = (n: number) => `Tk ${n.toLocaleString('en-US')}`

/**
 * One length/size/duration-tiered service (e.g. Hair Omega Treatment).
 * Shows the name + lowest price by default; reveals all tier prices
 * on hover (desktop) or tap (mobile).
 */
export default function TieredServiceCard({
  item,
  tierLabels,
}: {
  item: TieredItem
  tierLabels: string[]
}) {
  const [open, setOpen] = useState(false)
  const min = Math.min(...item.prices)
  const allSame = item.prices.every((p) => p === item.prices[0])

  return (
    <div
      className="group relative cursor-pointer rounded-sm border border-ink/10 bg-paper p-4
                 transition-all duration-300 hover:border-gold hover:shadow-gold-lg
                 dark:border-paper/10 dark:bg-ink-soft"
      onClick={() => setOpen((o) => !o)}
      onMouseLeave={() => setOpen(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen((o) => !o)
        }
      }}
      aria-expanded={open}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-ink dark:text-paper">{item.name}</h4>
        <span className="whitespace-nowrap text-sm font-bold text-gold">
          {allSame ? tk(min) : `${tk(min)}+`}
        </span>
      </div>

      {/* Hint line — hidden while the breakdown is showing */}
      <p
        className={`mt-1 text-xs text-ink/40 dark:text-paper/40 transition-opacity group-hover:opacity-0 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {tierLabels.join('  ·  ')}
      </p>

      {/* Tier breakdown — revealed on hover / tap */}
      <div
        className={`mt-2 space-y-1.5 border-t border-gold/30 pt-2 ${
          open ? 'block' : 'hidden'
        } group-hover:block`}
      >
        {tierLabels.map((label, i) => (
          <div key={label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-ink/60 dark:text-paper/60">{label}</span>
            <span className="font-semibold text-ink dark:text-paper">{tk(item.prices[i])}</span>
          </div>
        ))}
        {item.note && <p className="pt-1 text-xs text-ink/40 dark:text-paper/40">{item.note}</p>}
      </div>
    </div>
  )
}
