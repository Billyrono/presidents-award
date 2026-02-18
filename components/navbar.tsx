'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group -ml-2">
            <Image
              src="/Logo/PA Logo.svg"
              alt="President's Award Logo"
              width={60}
              height={60}
              className="w-12 h-12 md:w-16 md:h-16"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                  ? 'text-primary bg-primary/8 font-semibold'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="block h-0.5 bg-primary rounded-full mt-0.5 animate-scale-in" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold">
              <Link href="/join">Join Now</Link>
            </Button>

            <button
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-4 pt-2 bg-white border-t border-border/30 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.href)
                ? 'text-primary bg-primary/8 font-semibold'
                : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold">
              <Link href="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
