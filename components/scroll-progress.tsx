'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollProgress() {
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrolled = docHeight > 0 ? scrollTop / docHeight : 0
            setProgress(scrolled)
            setVisible(scrollTop > 200)
        }

        window.addEventListener('scroll', update, { passive: true })
        update()
        return () => window.removeEventListener('scroll', update)
    }, [])

    const radius = 20
    const circumference = 2 * Math.PI * radius
    const offset = circumference - progress * circumference

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group ${visible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            style={{ background: 'transparent' }}
        >
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full bg-foreground/10 backdrop-blur-sm border border-border/50" />

            {/* SVG progress ring */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 48 48"
            >
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--primary) / 0.15)"
                    strokeWidth="2.5"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-150"
                />
            </svg>

            {/* Arrow icon */}
            <ArrowUp className="w-4 h-4 text-foreground relative z-10 group-hover:text-primary transition-colors" />
        </button>
    )
}
