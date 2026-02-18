import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { CustomFooter } from '@/components/custom-footer'

export const metadata: Metadata = {
  title: "President's Award — Kirinyaga University | #WORLDREADY",
  description: "Kirinyaga University President's Award Chapter. Empowering youth through adventure, service, skills development, and personal growth.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <CustomFooter />
      </body>
    </html>
  )
}
