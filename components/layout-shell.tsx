'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { CustomFooter } from '@/components/custom-footer'

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith('/admin')

    if (isAdmin) {
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            <main className="pt-16 md:pt-20">{children}</main>
            <CustomFooter />
        </>
    )
}
