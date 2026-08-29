'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, Shield, Check } from 'lucide-react'

export function CookieConsent() {
    const [visible, setVisible] = useState(false)
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 2000)
            return () => clearTimeout(timer)
        }
    }, [])

    const accept = (type: 'all' | 'essential') => {
        localStorage.setItem('cookie-consent', type)
        setExiting(true)
        setTimeout(() => setVisible(false), 400)
    }

    if (!visible) return null

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6 transition-all duration-500 ${
                exiting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100 animate-in slide-in-from-bottom duration-700'
            }`}
        >
            <div className="max-w-2xl mx-auto rounded-2xl border border-[#C9A84C]/15 bg-[#0d1410]/95 backdrop-blur-xl shadow-[0_-8px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

                <div className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                        {/* Cookie icon */}
                        <div className="w-11 h-11 rounded-xl border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                            <Cookie className="w-5 h-5 text-[#C9A84C]/70" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-white text-[15px] mb-1.5">
                                We Respect Your Privacy
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                We use only essential cookies — no trackers, no ads, no data selling. Just what&apos;s needed to keep things running.{' '}
                                <Link href="/privacy" className="text-[#C9A84C] font-medium hover:underline underline-offset-2">
                                    Read our Privacy Policy →
                                </Link>
                            </p>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3 mt-4 mb-5">
                                {[
                                    { icon: Shield, label: 'Zero trackers' },
                                    { icon: X, label: 'No ad cookies' },
                                    { icon: Check, label: 'GDPR-ready' },
                                ].map((badge) => (
                                    <span key={badge.label} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400/80 border border-emerald-500/15 bg-emerald-500/5 px-2.5 py-1 rounded-lg">
                                        <badge.icon className="w-3 h-3" />
                                        {badge.label}
                                    </span>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-2.5">
                                <button
                                    onClick={() => accept('all')}
                                    className="bg-[#C9A84C] text-[#0a0f0d] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e8cc82] transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={() => accept('essential')}
                                    className="border border-white/15 text-white/70 px-6 py-2.5 rounded-xl text-sm font-medium hover:border-white/25 hover:text-white transition-all duration-300"
                                >
                                    Essential Only
                                </button>
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => accept('essential')}
                            className="p-1.5 hover:bg-white/5 rounded-lg flex-shrink-0 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/30 hover:text-white/60 transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
