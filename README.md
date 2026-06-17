# Noor Beauty Salon — Website

Luxury beauty salon website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Color palette (strict)

- **Black** `#0A0A0A`
- **Gold** `#D4AF37`
- **White** `#FFFFFF`

Nothing else. All defined in `tailwind.config.ts`.

## Font

Open Sans (loaded via Google Fonts in `app/globals.css`).

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

## Project structure

```
noor-beauty/
├── app/
│   ├── components/        Reusable React components
│   │   ├── Navbar.tsx     Sticky nav with animated underlines
│   │   ├── Hero.tsx       Hero section (fade-in)
│   │   ├── ServicesGrid.tsx   Service cards (staggered, hover lift)
│   │   ├── Testimonials.tsx   Client reviews with star ratings
│   │   ├── CTASection.tsx     Final call-to-action
│   │   └── Footer.tsx     Footer + connected social links
│   ├── services/          Services page (placeholder)
│   ├── gallery/           Gallery page (placeholder)
│   ├── booking/           Booking page (placeholder)
│   ├── about/             About page (placeholder)
│   ├── contact/           Contact page (placeholder)
│   ├── globals.css        Theme + reusable classes
│   ├── layout.tsx         Root layout + SEO metadata
│   └── page.tsx           Homepage
├── lib/
│   └── config.ts          Site info, nav links, services (edit here once)
├── tailwind.config.ts     Black/gold/white theme + animations
└── package.json
```

## Social links

All connected in `lib/config.ts`:
- Facebook: facebook.com/noorbeautysalondhk
- Instagram: instagram.com/noor_beauty_salon1
- WhatsApp: wa.me/8801711726728

## Next steps (not yet built)

- [ ] Services page with category detail
- [ ] Gallery page (before/after, lightbox)
- [ ] Booking flow (service → date/time → confirm)
- [ ] About + Contact pages
- [ ] MongoDB + Cloudinary for testimonials & gallery
- [ ] Admin dashboard
- [ ] Deploy to Vercel + point noor-salon.com

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then add your domain `noor-salon.com` in the Vercel dashboard.
