'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, Home, RefreshCw, ArrowRight } from 'lucide-react'

const quips = [
    "Our servers are doing the adventurous journey section… unplanned.",
    "Something broke. Probably not as badly as a tent in the rain, though.",
    "This is awkward. Like forgetting your compass on expedition day.",
    "Houston, we have a problem. And it's not the altitude.",
    "The server tripped over a rock on the trail. Give it a moment.",
    "Internal server error. Our hamster powering the servers needs a break.",
]

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [quip] = useState(() => quips[Math.floor(Math.random() * quips.length)])
    const [pulse, setPulse] = useState(true)

    useEffect(() => {
        console.error('Global error:', error)
        const timer = setInterval(() => setPulse(p => !p), 2000)
        return () => clearInterval(timer)
    }, [error])

    return (
        <html>
            <body style={{ margin: 0, padding: 0, background: '#0a0f0d', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Background glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, rgba(201,80,50,0.06) 0%, transparent 60%)',
                    }} />

                    {/* Warning icon */}
                    <div style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        border: `1px solid rgba(220,80,50,${pulse ? 0.3 : 0.1})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 32,
                        position: 'relative',
                        transition: 'border-color 2s ease',
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'rgba(220,80,50,0.05)',
                            filter: 'blur(20px)',
                        }} />
                        <AlertTriangle style={{ width: 48, height: 48, color: '#dc5032', opacity: 0.8 }} />
                    </div>

                    {/* 500 Number */}
                    <span style={{
                        fontSize: 'clamp(80px, 15vw, 160px)',
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(to bottom, #dc5032, rgba(220,80,50,0.2))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 8,
                        userSelect: 'none',
                    }}>
                        500
                    </span>

                    {/* Heading */}
                    <h1 style={{
                        fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                        fontWeight: 700,
                        marginBottom: 12,
                        textAlign: 'center',
                    }}>
                        Camp Under Repair
                    </h1>

                    {/* Gold divider */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 20,
                    }}>
                        <span style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
                        <span style={{
                            width: 6,
                            height: 6,
                            transform: 'rotate(45deg)',
                            border: '1px solid #C9A84C',
                            background: 'rgba(201,168,76,0.4)',
                        }} />
                        <span style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
                    </div>

                    {/* Quip */}
                    <p style={{
                        color: 'rgba(255,255,255,0.45)',
                        textAlign: 'center',
                        maxWidth: 420,
                        lineHeight: 1.7,
                        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                        fontStyle: 'italic',
                        marginBottom: 40,
                    }}>
                        &ldquo;{quip}&rdquo;
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                        <button
                            onClick={() => reset()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                background: '#C9A84C',
                                color: '#0a0f0d',
                                padding: '14px 28px',
                                borderRadius: 12,
                                fontWeight: 600,
                                fontSize: 14,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#e8cc82'
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.25)'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = '#C9A84C'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <RefreshCw style={{ width: 16, height: 16 }} />
                            Try Again
                        </button>
                        <a
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: 'rgba(255,255,255,0.8)',
                                padding: '14px 28px',
                                borderRadius: 12,
                                fontWeight: 600,
                                fontSize: 14,
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                                e.currentTarget.style.color = '#C9A84C'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                                e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                            }}
                        >
                            <Home style={{ width: 16, height: 16 }} />
                            Back to Base Camp
                        </a>
                    </div>

                    {/* Footer */}
                    <p style={{
                        position: 'absolute',
                        bottom: 32,
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.15)',
                        fontWeight: 500,
                    }}>
                        President&apos;s Award — Kirinyaga University Chapter
                    </p>
                </div>
            </body>
        </html>
    )
}
