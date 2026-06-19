import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rayane Toumi — AI Portfolio',
  description: 'Talk with AI Rayane, a digital twin of Rayane Toumi — AI & Software Engineering student at ENSIA.',
  keywords: ['Rayane Toumi', 'AI', 'Portfolio', 'ENSIA', 'Machine Learning', 'Digital Twin'],
  openGraph: {
    title: 'Rayane Toumi — AI Portfolio',
    description: 'Enter my digital universe. Ask AI Rayane anything.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF4FA2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
