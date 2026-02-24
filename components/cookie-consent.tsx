'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            // Small delay so it doesn't flash immediately on page load
            const timer = setTimeout(() => setVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const accept = (type: 'all' | 'essential') => {
        localStorage.setItem('cookie-consent', type)
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5 md:p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Cookie className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-foreground text-sm mb-1">We value your privacy</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We use essential cookies to keep you signed in and make the site work. No tracking or advertising cookies are used.{' '}
                            <Link href="/privacy" className="text-primary font-semibold hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                onClick={() => accept('all')}
                                className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={() => accept('essential')}
                                className="bg-muted text-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-muted/70 transition-colors"
                            >
                                Essential Only
                            </button>
                        </div>
                    </div>
                    <button onClick={() => accept('essential')} className="p-1.5 hover:bg-muted rounded-lg flex-shrink-0">
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>
        </div>
    )
}
