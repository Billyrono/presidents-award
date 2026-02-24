'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Phone, MessageCircle, Calendar, User, Search, ChevronDown, ChevronUp } from 'lucide-react'

type Application = {
    id: string
    full_name: string
    email: string
    phone: string
    faculty: string
    year_of_study: string
    interests: string
    message: string
    created_at: string
}

export default function AdminApplicationsPage() {
    const [apps, setApps] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [expandedId, setExpandedId] = useState<string | null>(null)

    useEffect(() => {
        const fetchApps = async () => {
            const { data } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false })
            setApps(data || [])
            setLoading(false)
        }
        fetchApps()
    }, [])

    const filtered = apps.filter(a =>
        a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        a.email?.toLowerCase().includes(search.toLowerCase()) ||
        a.faculty?.toLowerCase().includes(search.toLowerCase())
    )

    const formatDate = (iso: string) => {
        try {
            return new Date(iso).toLocaleDateString('en-KE', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })
        } catch { return iso }
    }

    const whatsappLink = (phone: string, name: string) => {
        const cleanPhone = phone.replace(/[^0-9+]/g, '')
        const message = encodeURIComponent(`Hi ${name}, this is from the President's Award – Kirinyaga University Chapter. We received your application and would like to get in touch!`)
        return `https://wa.me/${cleanPhone.replace('+', '')}?text=${message}`
    }

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
    )

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Applications</h1>
                    <p className="text-muted-foreground text-sm mt-1">{apps.length} total applications</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by name, email, or faculty..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
            </div>

            {/* Applications List */}
            <div className="space-y-3">
                {filtered.map(app => (
                    <div key={app.id} className="bg-card rounded-xl border border-border overflow-hidden">
                        {/* Main row */}
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                            onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-foreground text-sm truncate">{app.full_name}</p>
                                    <p className="text-muted-foreground text-xs truncate">{app.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground mr-4">
                                    <span>{app.faculty}</span>
                                    <span>Year {app.year_of_study}</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(app.created_at)}
                                    </span>
                                </div>
                                {/* Contact actions */}
                                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                    <a
                                        href={`mailto:${app.email}`}
                                        title="Send email"
                                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={`tel:${app.phone}`}
                                        title="Call"
                                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={whatsappLink(app.phone, app.full_name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="WhatsApp"
                                        className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </a>
                                </div>
                                {expandedId === app.id ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                )}
                            </div>
                        </div>

                        {/* Expanded details */}
                        {expandedId === app.id && (
                            <div className="border-t border-border bg-muted/10 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground text-xs mb-1">Phone</p>
                                        <p className="text-foreground font-medium">{app.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs mb-1">Faculty</p>
                                        <p className="text-foreground font-medium">{app.faculty}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs mb-1">Year of Study</p>
                                        <p className="text-foreground font-medium">{app.year_of_study}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs mb-1">Applied</p>
                                        <p className="text-foreground font-medium">{formatDate(app.created_at)}</p>
                                    </div>
                                    {app.interests && (
                                        <div className="md:col-span-2">
                                            <p className="text-muted-foreground text-xs mb-1">Interests</p>
                                            <p className="text-foreground">{app.interests}</p>
                                        </div>
                                    )}
                                    {app.message && (
                                        <div className="md:col-span-2">
                                            <p className="text-muted-foreground text-xs mb-1">Message</p>
                                            <p className="text-foreground leading-relaxed">{app.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    {search ? 'No applications match your search.' : 'No applications yet. They\'ll appear here when students apply.'}
                </div>
            )}
        </div>
    )
}
