import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#FF4FA2',
          blush: '#FFD6EA',
          soft: '#FF85C2',
          rose: '#FF1A80',
          light: '#FFF0F7',
        },
        rose: {
          gold: '#B76E79',
        },
        cream: '#FFF8F0',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'orb-pulse': 'orb-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255,79,162,0.3), 0 0 40px rgba(255,79,162,0.1)' },
          '100%': { boxShadow: '0 0 60px rgba(255,79,162,0.6), 0 0 100px rgba(255,79,162,0.3)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.025)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'orb-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
