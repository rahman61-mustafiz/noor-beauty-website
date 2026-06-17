// Central place for site-wide info. Edit here once, used everywhere.

export const siteConfig = {
  name: 'Noor',
  fullName: 'Noor Beauty Salon',
  tagline: 'Your Radiant Self Awaits',
  description:
    'Experience luxury beauty at Noor — where every visit transforms your confidence',
  phone: '01711726728',
  phoneDisplay: '01711-726728',
  whatsapp: '8801711726728',
  address:
    'ABC Mehjabeen Square (3rd Floor), 1/1 New Bailey Road, Ramna, Dhaka, Bangladesh',
  hours: 'Everyday: 11:00 AM – 9:00 PM',
  social: {
    facebook: 'https://www.facebook.com/noorbeautysalondhk',
    instagram: 'https://www.instagram.com/noor_beauty_salon1',
    whatsapp:
      'https://wa.me/8801711726728?text=Hello%20Noor%20Beauty!%20I%27m%20interested%20in%20your%20services.',
  },
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const services = [
  { name: 'Hair Cutting', tagline: 'Precision cuts', priceFrom: 800 },
  { name: 'Hair Color', tagline: 'Rich, vibrant hues', priceFrom: 2500 },
  { name: 'Facial', tagline: 'Glowing skin', priceFrom: 1500 },
  { name: 'Nails', tagline: 'Manicure & extension', priceFrom: 1200 },
  { name: 'Body Spa', tagline: 'Ultimate relaxation', priceFrom: 800 },
  { name: 'Makeup', tagline: 'Bridal & special', priceFrom: 8000 },
]

// NOTE: the full, detailed service menu (every category, tiered pricing,
// packages) lives in lib/services-data.ts — that is the single source of truth
// used by the /services page.
