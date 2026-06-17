import { createAdminClient } from '@/lib/supabase/admin'
import { updateSettings, uploadHeroMedia } from './actions'

export const dynamic = 'force-dynamic'

const input =
  'w-full rounded-sm border border-paper/15 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold'

function Field({
  name,
  label,
  value,
  hint,
  textarea,
}: {
  name: string
  label: string
  value: string
  hint?: string
  textarea?: boolean
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-paper/70">{label}</label>
      {textarea ? (
        <textarea name={name} defaultValue={value} rows={3} className={input} />
      ) : (
        <input name={name} defaultValue={value} className={input} />
      )}
      {hint && <p className="mt-1 text-xs text-paper/40">{hint}</p>}
    </div>
  )
}

export default async function AdminSettings() {
  const db = createAdminClient()
  const { data } = await db.from('site_settings').select('*').eq('id', 1).single()
  const r = data ?? {}

  return (
    <div className="max-w-3xl">
      <h1 className="mb-1 text-3xl font-bold text-paper">Site Settings</h1>
      <p className="mb-8 text-sm text-paper/50">
        These update everywhere on the public site — navbar, footer, contact, booking and more.
      </p>

      <form action={updateSettings} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field name="name" label="Short name" value={r.name ?? ''} hint="e.g. Noor" />
          <Field name="full_name" label="Full name" value={r.full_name ?? ''} hint="e.g. Noor Beauty Salon" />
          <Field name="tagline" label="Tagline" value={r.tagline ?? ''} />
          <Field name="hours" label="Opening hours" value={r.hours ?? ''} />
          <Field name="phone" label="Phone (for calls)" value={r.phone ?? ''} hint="Digits only, e.g. 01711726728" />
          <Field name="phone_display" label="Phone (display)" value={r.phone_display ?? ''} hint="e.g. 01711-726728" />
          <Field name="whatsapp" label="WhatsApp number" value={r.whatsapp ?? ''} hint="With country code, e.g. 8801711726728" />
          <Field name="facebook" label="Facebook URL" value={r.facebook ?? ''} />
          <Field name="instagram" label="Instagram URL" value={r.instagram ?? ''} />
        </div>
        <Field name="address" label="Address" value={r.address ?? ''} textarea />
        <Field name="description" label="Description / homepage intro" value={r.description ?? ''} textarea />

        {/* SEO */}
        <div className="border-t border-paper/10 pt-6">
          <h2 className="mb-1 text-lg font-semibold text-paper">Search Engine (SEO)</h2>
          <p className="mb-5 text-sm text-paper/50">
            Controls how your site appears on Google. Safe to leave blank for now — sensible defaults are used.
          </p>
          <div className="space-y-5">
            <Field
              name="meta_title"
              label="SEO title"
              value={r.meta_title ?? ''}
              hint="The clickable title in Google results. ~60 characters."
            />
            <Field
              name="meta_description"
              label="Meta description"
              value={r.meta_description ?? ''}
              textarea
              hint="The grey summary Google shows under your title. ~155 characters."
            />
            <Field
              name="google_verification"
              label="Google site verification code"
              value={r.google_verification ?? ''}
              hint="From Google Search Console → verify via 'HTML tag' → paste only the content value here. Leave blank until you have it."
            />
          </div>
        </div>

        <button className="btn-gold">Save Settings</button>
      </form>

      {/* Homepage Hero */}
      <div className="mt-12 rounded-sm border border-paper/10 bg-ink-soft p-6">
        <h2 className="mb-1 text-lg font-semibold text-paper">Homepage Hero</h2>
        <p className="mb-5 text-sm text-paper/50">
          The big image (and optional video) at the very top of the homepage. The video, if set,
          plays over the image.
        </p>

        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-paper/50">Current image</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.hero_image ?? '/images/home/hero-1.jpg'}
              alt="Current hero"
              className="aspect-video w-full rounded-sm border border-paper/10 object-cover"
            />
          </div>
          <div>
            <p className="mb-1 text-xs text-paper/50">Current video {r.hero_video ? '' : '(none)'}</p>
            {r.hero_video ? (
              <video src={r.hero_video} muted loop autoPlay playsInline className="aspect-video w-full rounded-sm border border-paper/10 object-cover" />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-sm border border-dashed border-paper/15 text-xs text-paper/40">
                No video — image shows
              </div>
            )}
          </div>
        </div>

        <form action={uploadHeroMedia} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-paper/70">Replace image</label>
            <input type="file" name="hero_image" accept="image/*" className={`${input} file:mr-3 file:rounded-sm file:border-0 file:bg-gold file:px-3 file:py-1 file:text-ink`} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">Replace video (optional)</label>
            <input type="file" name="hero_video" accept="video/*" className={`${input} file:mr-3 file:rounded-sm file:border-0 file:bg-gold file:px-3 file:py-1 file:text-ink`} />
          </div>
          <div className="sm:col-span-2">
            <button className="btn-gold">Upload Hero Media</button>
          </div>
        </form>
      </div>
    </div>
  )
}
