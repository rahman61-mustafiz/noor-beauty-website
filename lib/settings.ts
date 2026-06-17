import { siteConfig } from './config'
import { createReadClient } from './supabase/read'

export type Settings = {
  name: string
  fullName: string
  tagline: string
  description: string
  phone: string
  phoneDisplay: string
  whatsapp: string // bare number, e.g. 8801711726728
  address: string
  hours: string
  social: { facebook: string; instagram: string; whatsapp: string }
  heroImage: string
  heroVideo: string
  metaTitle: string
  metaDescription: string
  googleVerification: string
}

const DEFAULT_META_TITLE = 'Noor Beauty Salon | Luxury Beauty in Dhaka'
const DEFAULT_META_DESC =
  'Experience luxury beauty at Noor Beauty Salon, Bailey Road, Dhaka. Hair, facial, bridal makeup, spa, nails and more. Book your transformation today.'

const waUrl = (number: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(
    "Hello Noor Beauty! I'm interested in your services."
  )}`

// Fallback used if the DB row is missing or unreachable.
export const defaultSettings: Settings = {
  name: siteConfig.name,
  fullName: siteConfig.fullName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  whatsapp: siteConfig.whatsapp,
  address: siteConfig.address,
  hours: siteConfig.hours,
  social: { ...siteConfig.social },
  heroImage: '/images/home/hero-1.jpg',
  heroVideo: '/videos/hero.mp4',
  metaTitle: DEFAULT_META_TITLE,
  metaDescription: DEFAULT_META_DESC,
  googleVerification: '',
}

export async function getSettings(): Promise<Settings> {
  try {
    const db = createReadClient()
    const { data } = await db.from('site_settings').select('*').eq('id', 1).single()
    if (!data) return defaultSettings
    const whatsapp = data.whatsapp ?? siteConfig.whatsapp
    return {
      name: data.name ?? siteConfig.name,
      fullName: data.full_name ?? siteConfig.fullName,
      tagline: data.tagline ?? siteConfig.tagline,
      description: data.description ?? siteConfig.description,
      phone: data.phone ?? siteConfig.phone,
      phoneDisplay: data.phone_display ?? siteConfig.phoneDisplay,
      whatsapp,
      address: data.address ?? siteConfig.address,
      hours: data.hours ?? siteConfig.hours,
      social: {
        facebook: data.facebook ?? siteConfig.social.facebook,
        instagram: data.instagram ?? siteConfig.social.instagram,
        whatsapp: waUrl(whatsapp),
      },
      heroImage: data.hero_image ?? '/images/home/hero-1.jpg',
      heroVideo: data.hero_video ?? '/videos/hero.mp4',
      metaTitle: data.meta_title ?? DEFAULT_META_TITLE,
      metaDescription: data.meta_description ?? DEFAULT_META_DESC,
      googleVerification: data.google_verification ?? '',
    }
  } catch {
    return defaultSettings
  }
}
