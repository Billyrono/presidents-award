'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Home, Map, ArrowRight, Compass } from 'lucide-react'

const quips = [
    "Even the best explorers take a wrong turn sometimes.",
    "This trail? Doesn't exist. But your Award journey does.",
    "You've ventured beyond the map. Time to head back to camp.",
    "Not all who wander are lost — but you definitely are.",
    "This page went on an adventurous journey… and never came back.",
    "Error 404: Page not found. Possibly eaten by a lion on expedition.",
]

export default function NotFound() {
    const [quip, setQuip] = useState('')
    const [compassAngle, setCompassAngle] = useState(0)

    useEffect(() => {
        setQuip(quips[Math.floor(Math.random() * quips.length)])

        const interval = setInterval(() => {
            setCompassAngle(prev => prev + 0.5)
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-[#0a0f0d] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Floating Compass */}
            <div className="relative mb-10">
                <div
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#C9A84C]/20 flex items-center justify-center relative"
                    style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}
                >
                    <div className="absolute inset-0 rounded-full bg-[#C9A84C]/5 blur-xl" />
                    <Compass
                        className="w-14 h-14 md:w-18 md:h-18 text-[#C9A84C]/70"
                        style={{ transform: `rotate(${compassAngle}deg)`, transition: 'transform 0.05s linear' }}
                    />
                </div>
            </div>

            {/* 404 Number */}
            <div className="relative mb-2">
                <span className="text-[100px] md:text-[140px] lg:text-[180px] font-display font-bold leading-none tracking-tighter bg-gradient-to-b from-[#C9A84C] via-[#C9A84C]/50 to-transparent bg-clip-text text-transparent select-none">
                    404
                </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 text-center">
                Lost in the Wilderness
            </h1>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
                <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C] bg-[#C9A84C]/40" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
            </div>

            {/* Witty quip */}
            <p className="text-white/50 text-center max-w-md leading-relaxed mb-10 text-sm md:text-base italic">
                &ldquo;{quip}&rdquo;
            </p>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="group inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] text-[#0a0f0d] px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#e8cc82] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
                >
                    <Home className="w-4 h-4" />
                    Back to Base Camp
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </Link>
                <Link
                    href="/programs"
                    className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/80 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300"
                >
                    <Map className="w-4 h-4" />
                    Explore Programs
                </Link>
            </div>

            {/* Footer tag */}
            <p className="absolute bottom-8 text-[11px] tracking-[0.2em] uppercase text-white/20 font-medium">
                President&apos;s Award — Kirinyaga University Chapter
            </p>

            <style jsx>{`
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.05); }
                    50% { box-shadow: 0 0 40px rgba(201,168,76,0.12); }
                }
            `}</style>
        </div>
    )
}
