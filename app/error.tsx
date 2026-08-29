'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw, Map } from 'lucide-react'

const quips = [
    "Our servers are doing the adventurous journey section… unplanned.",
    "Something broke. Probably not as badly as a tent in the rain, though.",
    "This is awkward. Like forgetting your compass on expedition day.",
    "Houston, we have a problem. And it's not the altitude.",
    "The server tripped over a rock on the trail. Give it a moment.",
    "Internal server error. Our hamster powering the servers needs a break.",
]

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [quip] = useState(() => quips[Math.floor(Math.random() * quips.length)])
    const [pulse, setPulse] = useState(true)

    useEffect(() => {
        console.error('Page error:', error)
        const timer = setInterval(() => setPulse(p => !p), 2000)
        return () => clearInterval(timer)
    }, [error])

    return (
        <div className="min-h-screen bg-[#0a0f0d] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,80,50,0.06)_0%,transparent_60%)]" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Warning icon */}
            <div className="relative mb-10">
                <div
                    className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center relative transition-all duration-1000 ${
                        pulse ? 'border border-red-500/30' : 'border border-red-500/10'
                    }`}
                >
                    <div className="absolute inset-0 rounded-full bg-red-500/5 blur-xl" />
                    <AlertTriangle className="w-14 h-14 md:w-16 md:h-16 text-red-500/60" />
                </div>
            </div>

            {/* 500 Number */}
            <div className="relative mb-2">
                <span className="text-[100px] md:text-[140px] lg:text-[180px] font-display font-bold leading-none tracking-tighter bg-gradient-to-b from-red-500 via-red-500/50 to-transparent bg-clip-text text-transparent select-none">
                    500
                </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 text-center">
                Camp Under Repair
            </h1>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
                <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C] bg-[#C9A84C]/40" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
            </div>

            {/* Quip */}
            <p className="text-white/50 text-center max-w-md leading-relaxed mb-10 text-sm md:text-base italic">
                &ldquo;{quip}&rdquo;
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => reset()}
                    className="group inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] text-[#0a0f0d] px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#e8cc82] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/80 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300"
                >
                    <Home className="w-4 h-4" />
                    Back to Base Camp
                </Link>
            </div>

            {/* Footer tag */}
            <p className="absolute bottom-8 text-[11px] tracking-[0.2em] uppercase text-white/20 font-medium">
                President&apos;s Award — Kirinyaga University Chapter
            </p>
        </div>
    )
}
