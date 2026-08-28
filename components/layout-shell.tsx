'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { CustomFooter } from '@/components/custom-footer'
import { CookieConsent } from '@/components/cookie-consent'
import { ScrollProgress } from '@/components/scroll-progress'
import { CustomCursor } from '@/components/custom-cursor'

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith('/admin')

    if (isAdmin) {
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen">{children}</main>
            <CustomFooter />
            <CookieConsent />
            <ScrollProgress />
            <CustomCursor />
        </>
    )
}


