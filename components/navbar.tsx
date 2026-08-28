'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/about' },
    { label: 'The Programme', href: '/programs' },
    { label: 'Honour Roll', href: '/achievements' },
    { label: 'The Gallery', href: '/gallery' },
    { label: 'Chronicles', href: '/news' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    // Scroll detection
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 25)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => { setIsOpen(false) }, [pathname])

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href)

    return (
        <>
            {/* Main Navbar */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ${scrolled
                    ? 'bg-[#070b09]/95 backdrop-blur-xl shadow-2xl py-3'
                    : 'bg-gradient-to-b from-[#070b09]/90 via-[#070b09]/50 to-transparent py-4 md:py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center justify-between">

                        {/* Brand Logo & Chapter Title */}
                        <Link href="/" className="flex items-center group flex-shrink-0">
                            <Image
                                src="/Logo/PA Logo Dark.svg"
                                alt="President's Award Crest"
                                width={56}
                                height={56}
                                className="w-12 h-12 md:w-14 md:h-14 object-contain transition-opacity duration-300 group-hover:opacity-80"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const active = isActive(link.href)
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="relative group py-1"
                                    >
                                        <span className={`text-[11px] font-accent font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${active
                                            ? 'text-[#C9A84C]'
                                            : 'text-white/80 group-hover:text-white'
                                            }`}>
                                            {link.label}
                                        </span>
                                        {/* Gold Underline Indicator */}
                                        <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C9A84C] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`} />
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* CTA & Mobile Hamburger */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/join"
                                className="hidden sm:inline-flex items-center text-[10.5px] font-accent font-bold tracking-[0.2em] uppercase px-5 py-2.5 border border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10 hover:bg-[#C9A84C] hover:text-[#070b09] transition-all duration-300 rounded-sm shadow-sm hover:shadow-lg"
                            >
                                Enrol Now
                            </Link>

                            <button
                                className="lg:hidden p-2 rounded-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                                onClick={() => setIsOpen(v => !v)}
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen
                                        ? <motion.div key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5 text-[#C9A84C]" /></motion.div>
                                        : <motion.div key="m" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.div>
                                    }
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-Screen Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 bg-[#070b09] flex flex-col justify-between"
                    >
                        {/* Top bar */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <div className="flex items-center">
                                <Image src="/Logo/PA Logo Dark.svg" alt="President's Award Crest" width={52} height={52} className="w-12 h-12 object-contain" />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white/70 hover:text-[#C9A84C] transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Items */}
                        <nav className="flex flex-col justify-center px-8 space-y-2 py-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-3 text-2xl font-display font-bold border-b border-white/5 transition-colors ${isActive(link.href) ? 'text-[#C9A84C]' : 'text-white/80 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 + navLinks.length * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                className="pt-6"
                            >
                                <Link
                                    href="/join"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full inline-flex items-center justify-center text-xs font-accent font-bold tracking-[0.2em] uppercase px-8 py-4 bg-[#C9A84C] text-[#070b09] hover:bg-[#d8b758] rounded-sm transition-all duration-300 shadow-xl"
                                >
                                    Enrol in the Award
                                </Link>
                            </motion.div>
                        </nav>

                        {/* Bottom Tag */}
                        <div className="px-8 pb-8 pt-4 border-t border-white/10 text-center">
                            <p className="text-[#C9A84C]/60 text-[10px] font-accent font-bold tracking-[0.25em] uppercase">
                                The Duke of Edinburgh&apos;s International Award · Kenya
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
