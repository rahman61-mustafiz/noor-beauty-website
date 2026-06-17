'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export type GalleryImage = { src: string; caption: string; category: string }

// Treat these extensions as playable video.
const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src)

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<string>('All')
  const [active, setActive] = useState<number | null>(null)

  // Build the filter tabs from whatever categories actually exist.
  const filters = useMemo(() => {
    const cats: string[] = []
    for (const img of images) if (!cats.includes(img.category)) cats.push(img.category)
    return ['All', ...cats]
  }, [images])

  const shown = filter === 'All' ? images : images.filter((img) => img.category === filter)

  const changeFilter = (f: string) => {
    setFilter(f)
    setActive(null)
  }

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + shown.length) % shown.length)),
    [shown.length]
  )
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % shown.length)),
    [shown.length]
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, prev, next])

  if (images.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center text-ink/50 dark:text-paper/50">
        Our gallery is coming soon.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'border-gold bg-gold text-ink'
                : 'border-ink/15 text-ink/70 hover:border-gold hover:text-gold dark:border-paper/15 dark:text-paper/70'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((img, i) => (
          <motion.button
            key={img.src}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/10 dark:border-paper/10"
          >
            {isVideo(img.src) ? (
              <video
                src={img.src}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}

            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-medium text-paper">{img.caption}</span>
            </span>
            <span className="absolute left-2 top-2 rounded-full bg-gold/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {img.category}
            </span>
            {isVideo(img.src) && (
              <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-paper">
                ▶
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && shown[active] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button onClick={close} aria-label="Close" className="absolute right-5 top-5 text-3xl text-paper/80 transition-colors hover:text-gold">
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
            className="absolute left-4 text-4xl text-paper/70 transition-colors hover:text-gold md:left-10"
          >
            ‹
          </button>

          <figure className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {isVideo(shown[active].src) ? (
              <video src={shown[active].src} controls autoPlay loop playsInline className="max-h-[80vh] w-auto rounded-sm border border-gold/30" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shown[active].src} alt={shown[active].caption} className="max-h-[80vh] w-auto rounded-sm border border-gold/30 object-contain" />
            )}
            <figcaption className="mt-3 text-center text-sm text-paper/80">
              {shown[active].caption}
              <span className="ml-2 text-gold">· {shown[active].category}</span>
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
            className="absolute right-4 text-4xl text-paper/70 transition-colors hover:text-gold md:right-10"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
