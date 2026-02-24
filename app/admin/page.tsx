'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Newspaper, Mountain, ImageIcon, Settings, Home, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
    const [counts, setCounts] = useState({ news: 0, expeditions: 0, projects: 0, gallery: 0 })

    useEffect(() => {
        const fetchCounts = async () => {
            const [newsRes, expRes, projRes, galRes] = await Promise.all([
                supabase.from('news').select('id', { count: 'exact', head: true }),
                supabase.from('expeditions').select('id', { count: 'exact', head: true }),
                supabase.from('projects').select('id', { count: 'exact', head: true }),
                supabase.from('gallery').select('id', { count: 'exact', head: true }),
            ])
            setCounts({
                news: newsRes.count || 0,
                expeditions: expRes.count || 0,
                projects: projRes.count || 0,
                gallery: galRes.count || 0,
            })
        }
        fetchCounts()
    }, [])

    const cards = [
        { label: 'News Articles', count: counts.news, icon: Newspaper, href: '/admin/news', color: 'bg-blue-500' },
        { label: 'Adventurous Journeys', count: counts.expeditions, icon: Mountain, href: '/admin/expeditions', color: 'bg-teal-600' },
        { label: 'Residential Projects', count: counts.projects, icon: Home, href: '/admin/expeditions', color: 'bg-amber-500' },
        { label: 'Gallery Images', count: counts.gallery, icon: ImageIcon, href: '/admin/gallery', color: 'bg-purple-500' },
        { label: 'Settings', count: null, icon: Settings, href: '/admin/settings', color: 'bg-gray-500' },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage your site content from here.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {cards.map((card) => {
                    const Icon = card.icon
                    return (
                        <Link key={card.label} href={card.href}>
                            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all group">
                                <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-display font-bold text-foreground text-lg">{card.label}</h3>
                                {card.count !== null && (
                                    <p className="text-3xl font-bold text-primary mt-1">{card.count}</p>
                                )}
                                <div className="flex items-center text-primary text-sm font-medium mt-3 gap-1 group-hover:gap-2 transition-all">
                                    Manage <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-display font-bold text-foreground mb-2">Quick Tips</h2>
                <ul className="text-muted-foreground text-sm leading-relaxed space-y-2">
                    <li>• Adding a new expedition or project automatically updates all stats (AJ/RP counts) across the site.</li>
                    <li>• For gallery images, you can paste a <strong>Google Drive share link</strong> — it&apos;ll be converted to a direct image URL automatically.</li>
                    <li>• Award levels (Bronze, Silver &amp; Gold) are all presented at State House.</li>
                </ul>
            </div>
        </div>
    )
}
