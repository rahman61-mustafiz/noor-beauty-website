// =====================================================================
// NOOR Beauty Salon — full service catalogue (single source of truth)
// Transcribed from the printed Service List. Edit prices/names here only.
//
// Three kinds of category:
//   - 'simple'  : each service has ONE price.
//   - 'tiered'  : each service has several prices under shared column labels
//                 (e.g. Hair Omega Treatment -> Short / Medium / Long).
//                 These render as hover-to-reveal cards on the Services page.
//   - 'packages': named bundles with an included-items list and a total price
//                 (optionally an offer price vs a struck-through regular price).
// All prices are in BDT.
// =====================================================================

export type SimpleItem = { name: string; price: number; note?: string }
export type TieredItem = { name: string; prices: number[]; note?: string }
export type PackageItem = {
  name: string
  occasion?: string
  price: number
  regularPrice?: number // struck-through original when there is an offer
  includes: string[]
  note?: string
}

export type Category =
  | { id: string; title: string; subtitle?: string; note?: string; kind: 'simple'; items: SimpleItem[] }
  | { id: string; title: string; subtitle?: string; note?: string; kind: 'tiered'; tierLabels: string[]; items: TieredItem[] }
  | { id: string; title: string; subtitle?: string; note?: string; kind: 'packages'; packages: PackageItem[] }

export const serviceCategories: Category[] = [
  // ---------------------------------------------------------------- HAIR
  {
    id: 'hair-cut',
    title: 'Hair Cut & Style',
    kind: 'simple',
    items: [
      { name: 'U Cut', price: 300 },
      { name: 'V Cut', price: 300 },
      { name: 'Straight Cut', price: 300 },
      { name: 'Front Layer', price: 400 },
      { name: 'Blank Cut', price: 500 },
      { name: 'Boy Cut', price: 500 },
      { name: 'Front Layer & Bangs', price: 600 },
      { name: 'Trimming', price: 600 },
      { name: 'Diana Cut', price: 600 },
      { name: 'Bob Cut', price: 600 },
      { name: 'Tweak Cut', price: 600 },
      { name: 'Feather Cut', price: 800 },
      { name: 'Full Layer', price: 800 },
      { name: 'Step Cut', price: 800 },
      { name: 'Farah Cut', price: 800 },
      { name: 'Thai Bob Cut', price: 800 },
      { name: 'Emo Cut', price: 800 },
      { name: 'Butterfly Cut', price: 1000 },
      { name: 'Volume Layer', price: 1000 },
      { name: 'Razor Cut', price: 1000 },
    ],
  },
  {
    id: 'hair-color',
    title: 'Hair Color',
    subtitle: 'Choose regular or premium product',
    note: 'For previously coloured hair, an extra charge applies.',
    kind: 'tiered',
    tierLabels: ['Regular', 'Premium'],
    items: [
      { name: 'Stick', prices: [300, 500] },
      { name: 'Funky Color Stick', prices: [500, 1000] },
      { name: 'Root Touch', prices: [3000, 3000] },
      { name: 'Base Color', prices: [3000, 6000] },
      { name: 'Cap Stick', prices: [4000, 8000] },
      { name: 'Cap Stick with Base', prices: [5000, 10000] },
      { name: 'Foil Stick', prices: [6000, 10000] },
      { name: 'Highlight', prices: [6000, 10000] },
      { name: 'Balayage', prices: [7000, 12000] },
      { name: 'Ombre', prices: [8000, 15000] },
    ],
  },
  {
    id: 'hair-treatment',
    title: 'Hair Treatment',
    subtitle: 'Priced by hair length',
    kind: 'tiered',
    tierLabels: ['Short', 'Medium', 'Long'],
    items: [
      { name: 'Hair Wash', prices: [200, 350, 500] },
      { name: 'Hot Oil Massage', prices: [500, 500, 500] },
      { name: 'Ginger Treatment', prices: [1000, 2000, 3000] },
      { name: 'Onion Treatment', prices: [1000, 2000, 3000] },
      { name: 'Organic Protein Treatment', prices: [1200, 2500, 3500] },
      { name: 'Smoothing Spa', prices: [1500, 2000, 3000] },
      { name: 'Keratin Spa Treatment', prices: [2000, 3000, 4000] },
      { name: 'Bond Repair', prices: [2000, 3000, 4000] },
      { name: 'Nano Treatment', prices: [2000, 3500, 5000] },
      { name: 'Ampule Treatment', prices: [2500, 3000, 3500] },
      { name: 'Anti Hair Fall Treatment', prices: [2500, 4000, 6000] },
      { name: 'Ozone Treatment', prices: [2500, 5000, 7000] },
      { name: 'Korean Hair Smoothing', prices: [3500, 4000, 5000] },
      { name: 'Detox Treatment', prices: [4000, 4000, 4000] },
      { name: 'Premium Arabian Treatment', prices: [4000, 6000, 8000] },
      { name: 'Hair Glossing Treatment', prices: [5000, 5000, 5000] },
      { name: 'Scalp Reduction', prices: [5000, 5500, 6000] },
      { name: 'Brazilian Spa Treatment', prices: [5000, 7500, 10000] },
      { name: 'Premium Turkish Treatment', prices: [6000, 8000, 10000] },
    ],
  },
  {
    id: 'shine-set',
    title: 'Shine Set',
    subtitle: 'Straightening, smoothing & bonding — priced by hair length',
    kind: 'tiered',
    tierLabels: ['Short', 'Medium', 'Long'],
    items: [
      { name: 'Hair Smoothing', prices: [7500, 10000, 12000] },
      { name: 'Permanent Hair Straight', prices: [8000, 10000, 12000] },
      { name: 'Keratin Treatment', prices: [8000, 12000, 15000] },
      { name: 'Hair Shine Rebonding', prices: [10000, 12000, 15000] },
      { name: 'Brazilian Botox Treatment', prices: [12000, 17000, 20000] },
      { name: 'Botox Treatment', prices: [12000, 18000, 25000] },
      { name: "L'oreal Advance Treatment", prices: [12000, 18000, 25000] },
      { name: 'R.P Treatment', prices: [12000, 18000, 25000] },
      { name: 'Hair Omega Treatment', prices: [15000, 20000, 25000] },
    ],
  },
  {
    id: 'hair-setting',
    title: 'Hair Setting & Styling',
    subtitle: 'Priced by hair length',
    kind: 'tiered',
    tierLabels: ['Short', 'Medium', 'Long'],
    items: [
      { name: 'Hair Ornaments', prices: [500, 500, 500] },
      { name: 'Front Setting', prices: [600, 600, 600] },
      { name: 'Normal Bun', prices: [800, 800, 800] },
      { name: 'Hair Flower', prices: [1000, 1000, 1000] },
      { name: 'Messy Bun', prices: [1200, 1200, 1200] },
      { name: 'Front Braid', prices: [1500, 1500, 1500] },
      { name: 'Pincer Braid', prices: [1500, 1500, 1500] },
      { name: 'Ringless', prices: [1500, 1500, 1500] },
      { name: 'Ring Braid', prices: [1500, 1500, 1500] },
      { name: 'Side Bun', prices: [1500, 1500, 1500] },
      { name: 'Hair Iron', prices: [2000, 2000, 2000] },
      { name: 'Blow Dry', prices: [2000, 2000, 2000] },
      { name: 'Flower Bun', prices: [2000, 2000, 2000] },
      { name: 'Sleek Bun', prices: [2000, 2000, 2000] },
      { name: 'Pearl Bun', prices: [2000, 2000, 2000] },
      { name: 'Braid Bun', prices: [2000, 2000, 2000] },
      { name: 'Hair Curl', prices: [2000, 3000, 4000] },
      { name: 'Hair Wave', prices: [2000, 3000, 4000] },
      { name: 'Any Bun with Flower', prices: [3000, 3000, 3000] },
    ],
  },

  // --------------------------------------------------------------- SKIN
  {
    id: 'facial',
    title: 'Facial',
    kind: 'simple',
    items: [
      { name: 'Deep Purifying Facial', price: 1000 },
      { name: 'Fruit Facial', price: 1500 },
      { name: 'Whitening Facial', price: 2000 },
      { name: 'Vitamin-C Facial', price: 2000 },
      { name: 'D-Tan Facial', price: 2000 },
      { name: 'Bright & Shine Facial', price: 2000 },
      { name: 'Facial with Glow Boost Pack', price: 2000 },
      { name: 'Ayurvedic Facial', price: 2000 },
      { name: 'Red Rose Facial', price: 2000 },
      { name: 'Pink Glossy Facial', price: 2000 },
      { name: 'Hydro Jelly Facial', price: 2500 },
      { name: 'Lavender Extract Facial', price: 2500 },
      { name: '24 Caret Foil Gold Facial', price: 2500 },
      { name: 'Diamond Silk Facial', price: 2500 },
      { name: 'Elegant Pearl Facial', price: 2500 },
      { name: 'Clarify Ozone Facial', price: 2500 },
      { name: 'Clove Acne Facial', price: 2500 },
      { name: 'Therma Herb Facial', price: 3000 },
      { name: 'Blue Lotus Facial with Ice', price: 3000 },
      { name: 'Vampire / Skin Revamp Facial', price: 3000 },
      { name: 'Collagen Facial', price: 3000 },
      { name: 'Retirant Retinol Facial', price: 3000 },
      { name: 'Black Diamond Facial', price: 3000 },
      { name: 'Hydra Facial', price: 3000 },
      { name: 'Oxygen Facial', price: 3500 },
      { name: 'Wine Facial', price: 3500 },
      { name: 'Bio Hydra Facial', price: 3500 },
      { name: 'Face Lifting Facial', price: 3500 },
      { name: 'Cupping Facial', price: 4000 },
      { name: 'Ice-Crystal Facial', price: 4000 },
      { name: 'Velvet Glam Facial', price: 4000 },
      { name: 'Hydra Boost Facial', price: 4500 },
      { name: 'Skin Peel-off Facial', price: 4500 },
      { name: 'Detox Facial', price: 5000 },
      { name: 'Advance Bio-Hydra Facial', price: 5000 },
      { name: 'Korean Glass Skin Facial', price: 5000 },
    ],
  },
  {
    id: 'glow-polish',
    title: 'Glow Polish & Brightening',
    kind: 'simple',
    items: [
      { name: 'Back Massage', price: 500 },
      { name: 'Back Facial', price: 1000 },
      { name: 'Bikini Brightening with Glow Polish', price: 1000 },
      { name: 'Neck Brightening with Glow Polish', price: 1000 },
      { name: 'Underarm Brightening with Glow Polish', price: 1000 },
      { name: 'Full Face Polish', price: 1000 },
      { name: 'Half Hand & Leg Polish', price: 1200 },
      { name: 'Full Hand & Leg Polish', price: 2000 },
      { name: 'Full Back Polish', price: 2000 },
      { name: 'Full Body Glow Polish', price: 6000 },
    ],
  },
  {
    id: 'waxing',
    title: 'Waxing',
    kind: 'simple',
    items: [
      { name: 'Eye Brow Wax', price: 200 },
      { name: 'Upper Lip Wax', price: 200 },
      { name: 'Chin Wax', price: 200 },
      { name: 'Under Arm Wax', price: 600 },
      { name: 'Half Leg Wax', price: 800 },
      { name: 'Half Hand Wax', price: 800 },
      { name: 'Full Face Wax', price: 1000 },
      { name: 'Full Leg Wax', price: 1200 },
      { name: 'Full Hand Wax', price: 1200 },
      { name: 'Bikini Wax', price: 1500 },
      { name: 'Brazilian with Bikini', price: 2000 },
      { name: 'Full Body with Bikini', price: 5000 },
    ],
  },

  // -------------------------------------------------------- NAILS / LASH
  {
    id: 'pedi-mani',
    title: 'Pedicure & Manicure',
    kind: 'simple',
    items: [
      { name: 'Classic Pedi / Mani', price: 1500 },
      { name: 'Beetroot Pedi / Mani', price: 2000 },
      { name: 'Whitening Pedi & Mani', price: 2000 },
      { name: 'Crystal Pedi & Mani', price: 3000 },
      { name: 'Hot Stone Pedi / Mani', price: 3000 },
      { name: 'D-light Pedi / Mani', price: 3000 },
      { name: 'Russian Paraffin Pedi / Mani', price: 3500 },
      { name: 'Turkish Pedi / Mani', price: 4000 },
      { name: 'Hydra Boost Premium Pedi / Mani', price: 4000 },
      { name: 'Premium Red Rose Pedi / Mani', price: 4000 },
      { name: 'Premium Arabic Pedi / Mani', price: 5000 },
    ],
  },
  {
    id: 'nail-extension',
    title: 'Nail Extension',
    subtitle: 'Prices are for 2 hands',
    kind: 'simple',
    items: [
      { name: 'One Color Gel Extension', price: 2000 },
      { name: 'French Nail Extension', price: 2000 },
      { name: 'Poly Acrylic Gel Extension', price: 3000 },
      { name: 'Magnetic Gel Extension', price: 4000 },
      { name: 'Gel with Shimmer / Glitter / Stone', price: 4000 },
      { name: 'Acrylic Powder Extension', price: 4000 },
      { name: 'Nail Extension Only', price: 1500, note: 'Add-on' },
      { name: 'Foil / Glitter / Shimmer', price: 500, note: 'Add-on' },
      { name: 'Flower / Stone / Pearl', price: 2000, note: 'Add-on' },
      { name: 'Disco Glitter / Blooming Gel / Marble / Ombre / Stick Foil', price: 2000, note: 'Add-on' },
    ],
  },
  {
    id: 'lash-brow',
    title: 'Eye Lash & Brow',
    kind: 'simple',
    items: [
      { name: 'Mole Remove', price: 2000 },
      { name: 'Freckles Remove', price: 2000 },
      { name: 'Volume Eye Lash', price: 3000 },
      { name: 'Lash Lifting', price: 3000 },
      { name: 'Cat Eye / Doll Eye Lash', price: 3500 },
      { name: 'Wispy Eye', price: 4000 },
      { name: 'Eye Brow Micro Blending', price: 4000 },
      { name: 'Hybrid Eye Lash', price: 4200 },
      { name: 'Mega Volume', price: 5000 },
    ],
  },
  {
    id: 'mehedi',
    title: 'Mehedi (Henna)',
    subtitle: 'Priced by coverage',
    kind: 'tiered',
    tierLabels: ['1 hand · 1 side', 'Both hands · 1 side', '1 hand · both sides', 'Both hands · both sides'],
    items: [{ name: 'Henna Apply', prices: [600, 1200, 1200, 2400] }],
  },

  // ---------------------------------------------------------- BODY SPA
  {
    id: 'body-spa-massage',
    title: 'Body Spa — Massage',
    subtitle: 'Choose your duration',
    kind: 'tiered',
    tierLabels: ['30 Min', '45 Min', '60 Min'],
    items: [
      { name: 'Oil Base Foot Massage', prices: [800, 1200, 1500] },
      { name: 'Hot Stone Massage', prices: [1000, 1500, 1800] },
      { name: 'Full Body Spa', prices: [1500, 1800, 2200] },
      { name: 'Hot Oil Massage (Full Body)', prices: [1800, 2200, 2500] },
      { name: 'Pain Relief Hot Stone Massage', prices: [2000, 2200, 2500] },
    ],
  },
  {
    id: 'body-spa-packages',
    title: 'Body Spa — Packages',
    kind: 'simple',
    items: [
      { name: 'Classic Body Spa', price: 4000 },
      { name: 'Classic Oil Body Spa', price: 5000 },
      { name: 'Hot Stone with Oil Body Spa', price: 6000 },
      { name: 'Relax & Rejuvenate Spa', price: 8000 },
      { name: 'Noor Signature Body Spa', price: 10000 },
    ],
  },

  // ----------------------------------------------------------- PACKAGES
  {
    id: 'makeup-packages',
    title: 'Makeup Packages',
    kind: 'packages',
    packages: [
      { name: 'Makeup Package 1', price: 3000, includes: ['Simple Look', 'Sharee Draping', 'Normal Hair Style'] },
      { name: 'Makeup Package 2', price: 5000, includes: ['Elegant Look', 'Modern / Classy Hair Design', 'Hijab', 'Jewelry Setting', 'Sharee Draping'] },
      { name: 'Makeup Package 3', price: 8000, includes: ['Gorgeous Glam', 'Eye Look (Glitter / Shimmer)', 'Party Hair Style', 'Jewelry Setting', 'Sharee Draping'] },
      { name: 'Makeup Package 4', price: 10000, includes: ['Base Preparation Cure', 'High End Foundation', 'Customized Eye Look', 'Eye Look (Glitter / Shimmer)', 'Jewelry Setting', 'Sharee Draping'] },
    ],
  },
  {
    id: 'bridal-packages',
    title: 'Bridal Packages',
    kind: 'packages',
    packages: [
      {
        name: 'Bridal Package 1',
        occasion: 'Engagement / Akhd Look',
        price: 8000,
        includes: ['Eye Look', 'Full Face Makeup (Matte)', 'Basic Hair Style', 'Jewelry Setting', 'Dopatta / Hijab Setting'],
      },
      {
        name: 'Bridal Package 2',
        occasion: 'Engagement / Akhd Look',
        price: 15000,
        includes: [
          'Double Cleansing Facial (Free)',
          'Neck Massage (Free)',
          'Glowy or Dewy Base Makeup (High-End Products with Colorful Eye)',
          'Hand & Neck Makeup (Free)',
          'Dopatta / Hijab Setting / Sharee Draping / Lehenga Setting',
          'Hair Setting (Basic or Modern Style)',
        ],
      },
      {
        name: 'Bridal Package 3',
        occasion: 'Wedding / Reception',
        price: 20000,
        includes: [
          'Bridal Gold Facial (Free)',
          'Hand Massage with Brightening Cream (Free)',
          'Full Face Makeup & Trendy Eye Look with High-End Products',
          'Hand & Neck Makeup',
          'Dopatta / Hijab Setting / Sharee Draping / Lehenga Setting',
          'Nail Extension with Nail Paint',
          'Customized Hair Style',
        ],
      },
      {
        name: 'Bridal Package 4',
        occasion: 'Wedding / Reception',
        price: 25000,
        includes: [
          'Red Rose Whitening Facial with Cherry Mask (Free)',
          'Eye Brow / Upper Lip Clean (Free)',
          "Pakistani Inspired Makeup with Kashee's Products",
          'Pakistani Glittering Eye Look',
          'Dopatta / Hijab Setting / Sharee Draping / Lehenga Setting',
          'Jewelry Setting & Hand Makeup',
          'Customized Hair Style with Extension',
        ],
      },
      {
        name: 'Bridal Package 5',
        occasion: 'Wedding / Reception',
        price: 30000,
        includes: [
          'Korean Glass Skin Facial (Vitamin-C / Sakura Mask) (Free)',
          'Bridal Whitening Pedicure & Manicure (Free)',
          'Any Customized Makeup Look with High-End Products',
          'Dopatta / Hijab Setting / Sharee Draping / Lehenga Setting',
          'Customized Hair Style with Extension',
          'Hand & Neck Makeup',
          'Nail Extension & Volume Eye Lash',
        ],
      },
    ],
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Packages',
    kind: 'packages',
    packages: [
      {
        name: 'Petal Touch Bridal Care',
        price: 5000,
        includes: [
          'Glossy Gel Finish Pedicure & Manicure',
          'Full Face Threading & Soft Massage',
          'Crystal Bright Skin Polish Facial',
          'Underarm Wax & Full Hand, Arm Wax',
          'Warm Essence Oil Scalp Therapy Hair Treatment',
        ],
      },
      {
        name: 'Bride to Be Glam Ritual',
        price: 10000,
        includes: [
          'Aqua Spa with Warm Paraffin Foot Therapy Pedicure',
          'Aqua Spa and Warm Paraffin Manicure',
          'Hydro Dewy Glass & Instant Bright Facial',
          'Moisture Shine Hair Bath',
          'Underarms & Full Hand & Full Leg Wax',
          'Hair Cut (any) with Blow Dry',
        ],
      },
      {
        name: 'Signature Luxury Bridal Experience',
        price: 15000,
        includes: [
          'Paris French Tip Manicure',
          'Royal Foot Relaxation & Refresh Pedicure',
          'Tan Clear & Golden Radiance Bridal Facial',
          'Hair Strength Rebuild Therapy Treatment',
          'Full Body Wax, Soft Cleansing / or Full Body Glowing Polish',
          'Smooth & Glowy Back Shine Treatment',
        ],
      },
    ],
  },
  {
    id: 'noor-packages',
    title: 'Noor Packages',
    kind: 'packages',
    packages: [
      {
        name: 'Noor Package 1',
        price: 2500,
        includes: ['Summer Shine Facial with Gold Pack', 'Classic Pedicure', 'Basic Hair Cut', 'Hot Oil Massage', 'Shampoo (any length) with Smoothing Blow-Dry'],
      },
      {
        name: 'Noor Package 2',
        price: 3000,
        includes: ['Red Rose Facial', 'Back Massage with Scrubbing', 'Underarms Waxing', 'Eyebrow, Upper Lip Threading', 'Hot Oil Massage', 'Shampoo (any length) with Smoothing Blow-Dry'],
      },
      {
        name: 'Noor Package 3',
        price: 3500,
        includes: ['Facial with Glow Boost Pack', 'D-Tan Pedicure', 'Hot Oil Massage', 'Basic Hair Cut', 'Half Leg Wax', 'Shampoo (any length) with Smoothing Blow-Dry'],
      },
      {
        name: 'Noor Package 4',
        price: 4000,
        includes: ['Protein Treatment (any length hair)', 'Fruit Facial', 'Classic Manicure & Pedicure', 'Eye Brow Pluck', 'Shampoo with Hair Smoothing Spa'],
      },
      {
        name: 'Noor Package 5',
        price: 5000,
        includes: ['Hydra Facial', 'Premium Oil Massage with Silk & Shine Shampoo', 'Keratin Hair Spa', 'Foot Scrubbing with Hot Stone Oil Massage'],
      },
    ],
  },
  {
    id: 'happy-hour',
    title: 'Happy Hour Packages',
    subtitle: 'Limited-time offer pricing',
    kind: 'packages',
    packages: [
      {
        name: 'Happy Hour Package 1',
        price: 3000,
        regularPrice: 4000,
        includes: ['Classic Pedicure & Manicure', 'Back Massage', 'Fruit Facial', 'Oil Massage', 'Shampoo (any length)'],
      },
      {
        name: 'Happy Hour Package 2',
        price: 4000,
        regularPrice: 5400,
        includes: ['Full Hand Waxing', 'Full Leg Waxing', 'Double Cleansing Facial', 'Oil Massage', 'Shampoo (any length)', 'Massage Pedi & Mani'],
      },
      {
        name: 'Happy Hour Package 3',
        price: 4000,
        regularPrice: 5400,
        includes: ['Spa Facial', 'Classic Pedicure & Manicure', 'Full Hand Wax', 'Full Leg Wax', 'Full Face Threading', 'Hot Oil Massage (scalp only)', 'Shampoo (any length)'],
      },
    ],
  },
  {
    id: 'special-offers',
    title: 'Special Offers',
    kind: 'packages',
    packages: [
      {
        name: 'Princess Package',
        price: 1500,
        regularPrice: 2000,
        includes: ['Hair Cut', 'Princess Pedicure', 'Oil Massage & Mild Scalp Purifier'],
      },
      {
        name: 'Teenage Package',
        price: 1500,
        regularPrice: 2000,
        includes: ['Under Arm Wax', 'Soft Face Cleansing', 'Sparkling Pedi & Mani'],
      },
      {
        name: 'Corporate Offer',
        price: 4500,
        note: 'Employees must bring their ID card to avail this offer.',
        includes: ['Smooth & Silky Hair Spa', 'Any Hair Cut', 'Hydra Jelly Facial', 'Half Leg Wax', 'Half Hand Wax', 'Full Face Threading'],
      },
    ],
  },
]
