'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'
import {
    LayoutDashboard,
    Newspaper,
    Mountain,
    ImageIcon,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Home,
    Users,
} from 'lucide-react'

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'News', href: '/admin/news', icon: Newspaper },
    { label: 'Expeditions', href: '/admin/expeditions', icon: Mountain },
    { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Applications', href: '/admin/applications', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
]

function getBreadcrumbs(pathname: string) {
    const crumbs = [{ label: 'Admin', href: '/admin' }]
    if (pathname === '/admin') return crumbs
    const segment = pathname.replace('/admin/', '')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    crumbs.push({ label, href: pathname })
    return crumbs
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login')
            } else {
                setUser(session?.user || null)
            }
            setLoading(false)
        }
        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login')
            }
            setUser(session?.user || null)
        })

        return () => subscription.unsubscribe()
    }, [router, pathname])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    // Login page — no chrome at all
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        )
    }

    if (!user) return null

    const breadcrumbs = getBreadcrumbs(pathname)

    return (
        <div className="h-screen flex overflow-hidden bg-muted/20">
            {/* Mobile device gate — blocks phones */}
            <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-8 md:hidden">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <LayoutDashboard className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground mb-3">Desktop Required</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        The admin panel is optimized for larger screens. Please use a <strong>tablet</strong>, <strong>laptop</strong>, or <strong>desktop</strong> to access the dashboard.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                        <Home className="w-4 h-4" /> Back to Website
                    </Link>
                </div>
            </div>
            {/* Sidebar — fixed height, no scroll */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
                {/* Admin Header */}
                <div className="flex-shrink-0 p-6 border-b border-border">
                    <Link href="/admin" className="flex items-center gap-3">
                        <Image src="/Logo/PA Logo.svg" alt="Logo" width={36} height={36} />
                        <div>
                            <h2 className="font-display font-bold text-sm text-foreground">Admin Panel</h2>
                            <p className="text-[10px] text-muted-foreground">President&apos;s Award KyU</p>
                        </div>
                    </Link>
                </div>

                {/* Nav — scrollable if many items */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-foreground/60 hover:text-foreground hover:bg-muted/50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom section — pinned */}
                <div className="flex-shrink-0 p-4 border-t border-border space-y-2">
                    <div className="px-4 py-2">
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-all">
                        <Home className="w-4 h-4" />
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main — takes remaining space */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top bar with breadcrumbs — sticky, never scrolls */}
                <header className="flex-shrink-0 bg-card border-b border-border px-4 md:px-8 py-3 flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted/50 lg:hidden">
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-sm">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={crumb.href} className="flex items-center gap-1.5">
                                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
                                {i === breadcrumbs.length - 1 ? (
                                    <span className="font-semibold text-foreground">{crumb.label}</span>
                                ) : (
                                    <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                        {crumb.label}
                                    </Link>
                                )}
                            </span>
                        ))}
                    </nav>
                </header>

                {/* Page content — this is the only scrollable area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
            </div>
        </div>
    )
}
