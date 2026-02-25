import type { Metadata } from 'next'
import './globals.css'
import { LayoutShell } from '@/components/layout-shell'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: "President's Award — Kirinyaga University | #WORLDREADY",
  description: "Kirinyaga University President's Award Chapter. Empowering youth through adventure, service, skills development, and personal growth.",
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: '48x48' },
    ],
    apple: '/favicons/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/favicons/safari-pinned-tab.svg', color: '#1a1a1a' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#1a1a1a',
    'msapplication-config': '/browserconfig.xml',
  },
  openGraph: {
    type: 'website',
    title: "President's Award — Kirinyaga University",
    description: "Empowering youth through adventure, service, skills development, and personal growth. #WORLDREADY",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "President's Award — Kirinyaga University",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "President's Award — Kirinyaga University",
    description: "Empowering youth through adventure, service, skills development, and personal growth. #WORLDREADY",
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

