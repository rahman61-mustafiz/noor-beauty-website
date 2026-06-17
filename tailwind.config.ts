import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Strict 3-color palette: black, gold, white
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C766',
          dark: '#B8941F',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#1A1A1A',
          muted: '#2C2C2C',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          off: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 175, 55, 0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease forwards',
        scaleIn: 'scaleIn 0.6s ease forwards',
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 2s infinite',
      },
      boxShadow: {
        gold: '0 8px 25px rgba(212, 175, 55, 0.4)',
        'gold-lg': '0 15px 40px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
