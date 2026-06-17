import type { Metadata } from 'next'
import './globals.css'
import SiteChrome from './components/SiteChrome'
import SettingsProvider from './components/SettingsProvider'
import { getSettings } from '@/lib/settings'

// Built from editable Settings (SEO title, meta description, Google verification).
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: [
      'beauty salon Dhaka',
      'luxury salon Bailey Road',
      'bridal makeup Dhaka',
      'hair color Dhaka',
      'Noor Beauty',
    ],
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      type: 'website',
      locale: 'en_US',
    },
    verification: s.googleVerification ? { google: s.googleVerification } : undefined,
  }
}

// Runs before paint to apply the saved (or system) theme with no flash of light mode.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-paper text-ink antialiased dark:bg-ink dark:text-paper">
        <SettingsProvider value={settings}>
          <SiteChrome>{children}</SiteChrome>
        </SettingsProvider>
      </body>
    </html>
  )
}
