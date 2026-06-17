// Gallery items grouped by category.
// NOTE: these are royalty-free stock placeholders (Pexels) to fill the page —
// replace the files in /public/images/gallery/<category>/ with real salon work
// when ready (keep the same file names and no code changes are needed).
//
// VIDEOS: a `src` ending in .mp4 / .webm / .mov auto-plays in the gallery.
// Example: { src: '/images/gallery/spa/intro.mp4', caption: 'Inside our spa', category: 'Body Spa' }

export type GalleryImage = { src: string; caption: string; category: string }

// 'All' first; the rest are the filter tabs shown on the gallery page.
export const galleryFilters = ['All', 'Bridal', 'Hair', 'Nails', 'Facial', 'Body Spa', 'Makeup'] as const

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/bridal/bridal-1.jpg', caption: 'Bridal mehndi hands', category: 'Bridal' },
  { src: '/images/gallery/bridal/bridal-2.jpg', caption: 'Intricate henna design', category: 'Bridal' },
  { src: '/images/gallery/bridal/bridal-3.jpg', caption: 'Henna decorated hands', category: 'Bridal' },
  { src: '/images/gallery/bridal/bridal-4.jpg', caption: 'Mehndi & bangles', category: 'Bridal' },

  { src: '/images/gallery/hair/hair-1.jpg', caption: 'Braided hair detail', category: 'Hair' },
  { src: '/images/gallery/hair/hair-2.jpg', caption: 'Salon hair styling', category: 'Hair' },
  { src: '/images/gallery/hair/hair-3.jpg', caption: 'Long hair care', category: 'Hair' },
  { src: '/images/gallery/hair/hair-4.jpg', caption: 'Hair colour & shine', category: 'Hair' },

  { src: '/images/gallery/nails/nails-1.jpg', caption: 'Acrylic nail art', category: 'Nails' },
  { src: '/images/gallery/nails/nails-2.jpg', caption: 'Glitter manicure', category: 'Nails' },
  { src: '/images/gallery/nails/nails-3.jpg', caption: 'Neon nail art', category: 'Nails' },
  { src: '/images/gallery/nails/nails-4.jpg', caption: 'Classic red manicure', category: 'Nails' },

  { src: '/images/gallery/facial/facial-1.jpg', caption: 'Skincare set', category: 'Facial' },
  { src: '/images/gallery/facial/facial-2.jpg', caption: 'Serum & spa stones', category: 'Facial' },
  { src: '/images/gallery/facial/facial-3.jpg', caption: 'Skincare essentials', category: 'Facial' },
  { src: '/images/gallery/facial/facial-4.jpg', caption: 'Minimal skincare flatlay', category: 'Facial' },

  { src: '/images/gallery/spa/spa-1.jpg', caption: 'Aromatherapy & candles', category: 'Body Spa' },
  { src: '/images/gallery/spa/spa-2.jpg', caption: 'Natural soap & towels', category: 'Body Spa' },
  { src: '/images/gallery/spa/spa-3.jpg', caption: 'Spa oils & flowers', category: 'Body Spa' },
  { src: '/images/gallery/spa/spa-4.jpg', caption: 'Oil & eucalyptus', category: 'Body Spa' },

  { src: '/images/gallery/makeup/makeup-1.jpg', caption: 'Brushes & palettes', category: 'Makeup' },
  { src: '/images/gallery/makeup/makeup-2.jpg', caption: 'Makeup brush set', category: 'Makeup' },
  { src: '/images/gallery/makeup/makeup-3.jpg', caption: 'Eyeshadow palette', category: 'Makeup' },
  { src: '/images/gallery/makeup/makeup-4.jpg', caption: 'Makeup brush kit', category: 'Makeup' },
]
