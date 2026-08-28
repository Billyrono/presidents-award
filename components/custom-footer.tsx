'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getSettings } from '@/lib/content'
import { ArrowUpRight, MapPin, Mail, Phone, Shield, Award } from 'lucide-react'

export function CustomFooter() {
    const currentYear = new Date().getFullYear()
    const [contact, setContact] = useState({
        phone: '+254 (0) 123 456 789',
        email: 'info@presidentsaward.ke',
        location: 'Kirinyaga University, Main Campus, Kerugoya',
    })

    useEffect(() => {
        getSettings().then(s => {
            setContact({
                phone: s.contact_phone || '+254 (0) 123 456 789',
                email: s.contact_email || 'info@presidentsaward.ke',
                location: s.contact_location || 'Kirinyaga University, Main Campus, Kerugoya',
            })
        })
    }, [])

    return (
        <footer className="relative bg-[#070b09] text-white overflow-hidden border-t border-[#C9A84C]/20">
            {/* Ambient gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Ornamental Ribbon */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12 border-b border-white/5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="h-px w-8 bg-[#C9A84C]/60" />
                            <span className="text-[10px] font-accent font-bold tracking-[0.3em] uppercase text-[#C9A84C]">
                                The Duke of Edinburgh&apos;s International Award · Kenya
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                            President&apos;s Award <span className="text-[#C9A84C] italic font-normal">— Kirinyaga University Chapter</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-2.5 bg-[#C9A84C] hover:bg-[#d8b758] text-[#070b09] font-bold text-[11px] tracking-[0.2em] uppercase px-7 py-3.5 rounded-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <span>Enrol In The Award</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Columns */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">

                    {/* Column 1: Chapter Crest & Ethos (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-4 group">
                            <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-white/5 border border-white/10 p-1 flex items-center justify-center">
                                <Image
                                    src="/Logo/PA Logo Dark.svg"
                                    alt="President's Award Crest"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            <div>
                                <p className="font-display font-bold text-lg text-white group-hover:text-[#C9A84C] transition-colors leading-snug">
                                    President&apos;s Award
                                </p>
                                <p className="text-white/45 text-[11px] tracking-wider uppercase font-medium">
                                    Kirinyaga University
                                </p>
                            </div>
                        </Link>

                        <p className="text-white/60 text-sm leading-relaxed font-light">
                            Empowering young minds through disciplined challenge, selfless service, and transformative leadership. Fostering future leaders recognised by the highest office of the Republic of Kenya.
                        </p>

                        <div className="flex items-center gap-2 text-xs text-[#C9A84C]/80 font-medium">
                            <Shield className="w-4 h-4 text-[#C9A84C]" />
                            <span>Over 20 Gold Awardees Honoured at State House</span>
                        </div>

                        {/* Social Links */}
                        <div className="pt-2">
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 mb-3">Official Channels</p>
                            <div className="flex gap-2.5">
                                {[
                                    { href: 'https://facebook.com/presidentsawardkyu', label: 'Facebook', svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
                                    { href: 'https://instagram.com/presidentsawardkyu', label: 'Instagram', svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
                                    { href: 'https://tiktok.com/@theawardkyu', label: 'TikTok', svg: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.28 6.28 0 001.88-4.48V8.76a8.26 8.26 0 004.84 1.56v-3.45a4.85 4.85 0 01-1.14-.18z" /> },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={s.label}
                                        className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5 transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.svg}</svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Navigation (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <p className="text-[11px] font-accent font-bold tracking-[0.25em] uppercase text-[#C9A84C]">
                            Navigation
                        </p>
                        <ul className="space-y-2.5 text-sm">
                            {[
                                { label: 'Our Story & Legacy', href: '/about' },
                                { label: 'The Award Programme', href: '/programs' },
                                { label: 'Honour Roll & Expeditions', href: '/achievements' },
                                { label: 'Visual Chronicle (Gallery)', href: '/gallery' },
                                { label: 'Dispatches & News', href: '/news' },
                                { label: 'Candidate Enrolment', href: '/join' },
                                { label: 'Privacy & Governance', href: '/privacy' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="text-white/60 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 font-light"
                                    >
                                        <span className="text-[#C9A84C]/40 text-xs">›</span>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: The Framework (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <p className="text-[11px] font-accent font-bold tracking-[0.25em] uppercase text-[#C9A84C]">
                            Framework
                        </p>
                        <ul className="space-y-2.5 text-sm text-white/60 font-light">
                            <li><span className="text-white/80 font-medium">01.</span> Voluntary Service</li>
                            <li><span className="text-white/80 font-medium">02.</span> Skills Development</li>
                            <li><span className="text-white/80 font-medium">03.</span> Physical Recreation</li>
                            <li><span className="text-white/80 font-medium">04.</span> Adventurous Journey</li>
                            <li><span className="text-[#C9A84C] font-medium">05.</span> Residential Project</li>
                        </ul>
                        <div className="pt-2">
                            <span className="inline-block text-[10px] font-bold tracking-widest uppercase border border-[#C9A84C]/30 text-[#C9A84C] px-2.5 py-1 rounded-sm bg-[#C9A84C]/5">
                                Bronze · Silver · Gold
                            </span>
                        </div>
                    </div>

                    {/* Column 4: Chapter Secretariat (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <p className="text-[11px] font-accent font-bold tracking-[0.25em] uppercase text-[#C9A84C]">
                            Chapter Secretariat
                        </p>
                        <div className="space-y-3.5 text-sm text-white/60 font-light">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium text-xs uppercase tracking-wider">Location</p>
                                    <p className="text-xs text-white/60 mt-0.5">{contact.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium text-xs uppercase tracking-wider">Direct Enquiries</p>
                                    <a href={`mailto:${contact.email}`} className="text-xs text-white/60 hover:text-[#C9A84C] transition-colors mt-0.5 block">
                                        {contact.email}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium text-xs uppercase tracking-wider">Secretariat Line</p>
                                    <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="text-xs text-white/60 hover:text-[#C9A84C] transition-colors mt-0.5 block">
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Regal Seal & Credits */}
            <div className="border-t border-white/10 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <p className="font-light">
                        © {currentYear} President&apos;s Award — Kirinyaga University Chapter. All rights reserved.
                    </p>
                    <p className="text-center font-light flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-[#C9A84C]" />
                        <span>Under the Patronage of the President of the Republic of Kenya</span>
                    </p>
                    <p className="font-light">
                        Digital Experience by{' '}
                        <a
                            href="https://maronlabs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-[#C9A84C] transition-colors font-medium"
                        >
                            maronlabs
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
