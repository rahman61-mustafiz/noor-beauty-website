'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { useSettings } from './SettingsProvider'

export default function FloatingWhatsApp() {
  const siteConfig = useSettings()
  return (
    <a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
                 rounded-full bg-gold text-ink shadow-gold transition-transform
                 duration-300 hover:-translate-y-1 hover:bg-white"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
