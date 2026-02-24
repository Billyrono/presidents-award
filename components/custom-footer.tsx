'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Mail } from 'lucide-react'
import { useState } from 'react'

export function CustomFooter() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for subscribing!')
    setEmail('')
  }

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/admin" className="flex items-center gap-3" title="">
              <Image
                src="/Logo/PA Logo.svg"
                alt="President's Award Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-xl font-display font-bold">President&apos;s Award</h3>
                <p className="text-white/70 text-xs font-semibold">Kirinyaga University Chapter</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Empowering youth through challenge, service, and personal growth. Part of the Duke of Edinburgh&apos;s International Award.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Programs</Link></li>
              <li><Link href="/achievements" className="hover:text-white transition-colors">Achievements</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li className="hover:text-white transition-colors">
                <a href="tel:+254123456789">+254 (0) 123 456 789</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="mailto:info@presidentsaward.ke">info@presidentsaward.ke</a>
              </li>
              <li>Kirinyaga University, Kerugoya</li>
              <li className="pt-2">
                <Link href="/join" className="inline-block text-primary-foreground bg-primary/80 hover:bg-primary px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Join the Program →
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">Get the latest news and expedition updates.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <div className="relative flex-1 min-w-0">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/15 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60 transition-colors min-w-0"
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/80 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60 flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-[#C9A84C]" /> for Kenya&apos;s future leaders by <a href="https://maronlabs.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white font-semibold transition-colors">maronlabs</a>
          </p>
          <p className="text-sm text-white/60">
            © {currentYear} President&apos;s Award — Kirinyaga University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
