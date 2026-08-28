'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Application } from '@/lib/types'
import { Mail, Phone, MessageCircle, Calendar, User, Search, ChevronDown, ChevronUp, ShieldX, StickyNote } from 'lucide-react'
import { useAdminRole } from '@/lib/admin-role-context'

type StatusKey = Application['status']

const STATUS_CONFIG: Record<StatusKey, { label: string; badge: string; dot: string }> = {
    received: {
        label: 'Received',
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
    },
    under_review: {
        label: 'Under Review',
        badge: 'bg-amber-100 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
    },
    accepted: {
        label: 'Accepted',
        badge: 'bg-green-100 text-green-700 border-green-200',
        dot: 'bg-green-500',
    },
    rejected: {
        label: 'Rejected',
        badge: 'bg-red-100 text-red-700 border-red-200',
        dot: 'bg-red-500',
    },
}

export default function AdminApplicationsPage() {
    const role = useAdminRole()
    const [apps, setApps] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [statusFilter, setStatusFilter] = useState<StatusKey | 'all'>('all')
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [savingNoteId, setSavingNoteId] = useState<string | null>(null)
    const [noteValues, setNoteValues] = useState<Record<string, string>>({})

    useEffect(() => {
        const fetchApps = async () => {
            const { data } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false })
            const list = data || []
            setApps(list)
            // Pre-populate note editor values
            const notes: Record<string, string> = {}
            list.forEach((a: Application) => { notes[a.id] = a.admin_notes || '' })
            setNoteValues(notes)
            setLoading(false)
        }
        fetchApps()
    }, [])

    // Role guard — PR cannot see applications
    if (role === 'pr') {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <ShieldX className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">Access Restricted</h2>
                <p className="text-muted-foreground text-sm">Your role does not have permission to view applications.</p>
            </div>
        )
    }

    const filtered = apps.filter(a => {
        const matchesSearch =
            a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            a.email?.toLowerCase().includes(search.toLowerCase()) ||
            a.faculty?.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'all' || a.status === statusFilter
        return matchesSearch && matchesStatus
    })

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

    const updateStatus = async (id: string, status: StatusKey) => {
        setUpdatingId(id)
        await supabase.from('applications').update({
            status,
            status_updated_at: new Date().toISOString(),
        }).eq('id', id)
        setApps(prev => prev.map(a => a.id === id ? { ...a, status, status_updated_at: new Date().toISOString() } : a))
        setUpdatingId(null)
    }

    const saveNote = async (id: string) => {
        setSavingNoteId(id)
        await supabase.from('applications').update({ admin_notes: noteValues[id] }).eq('id', id)
        setApps(prev => prev.map(a => a.id === id ? { ...a, admin_notes: noteValues[id] } : a))
        setSavingNoteId(null)
    }

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
    )

    const statusCounts = apps.reduce((acc, a) => {
        acc[a.status] = (acc[a.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Applications</h1>
                    <p className="text-muted-foreground text-sm mt-1">{apps.length} total</p>
                </div>
            </div>

            {/* Status tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
                {(['all', 'received', 'under_review', 'accepted', 'rejected'] as const).map(s => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${statusFilter === s
                            ? 'bg-primary text-white border-primary'
                            : 'bg-card border-border text-muted-foreground hover:border-primary/40'
                            }`}
                    >
                        {s !== 'all' && <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[s as StatusKey].dot}`} />}
                        {s === 'all' ? `All (${apps.length})` : `${STATUS_CONFIG[s as StatusKey].label} (${statusCounts[s] || 0})`}
                    </button>
                ))}
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
                {filtered.map(app => {
                    const status = (app.status || 'received') as StatusKey
                    const statusCfg = STATUS_CONFIG[status]
                    return (
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
                                    {/* Status badge */}
                                    <span className={`hidden sm:flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusCfg.badge}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                                        {statusCfg.label}
                                    </span>
                                    <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground mr-2">
                                        <span>{app.faculty}</span>
                                        <span>Year {app.year_of_study}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(app.created_at)}
                                        </span>
                                    </div>
                                    {/* Contact actions */}
                                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                        <a href={`mailto:${app.email}`} title="Send email" className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </a>
                                        <a href={`tel:${app.phone}`} title="Call" className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </a>
                                        <a href={whatsappLink(app.phone, app.full_name)} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors">
                                            <MessageCircle className="w-4 h-4" />
                                        </a>
                                    </div>
                                    {expandedId === app.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                                </div>
                            </div>

                            {/* Expanded details */}
                            {expandedId === app.id && (
                                <div className="border-t border-border bg-muted/10 p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-5">
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

                                    {/* Status changer */}
                                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border mb-4">
                                        <p className="text-xs font-semibold text-muted-foreground">Update Status:</p>
                                        {(['received', 'under_review', 'accepted', 'rejected'] as StatusKey[]).map(s => (
                                            <button
                                                key={s}
                                                disabled={status === s || updatingId === app.id}
                                                onClick={() => updateStatus(app.id, s)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all disabled:opacity-60 ${status === s
                                                    ? `${STATUS_CONFIG[s].badge} ring-2 ring-offset-1 ring-current`
                                                    : `bg-card border-border hover:${STATUS_CONFIG[s].badge} text-muted-foreground`
                                                    }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[s].dot}`} />
                                                {STATUS_CONFIG[s].label}
                                            </button>
                                        ))}
                                        {updatingId === app.id && <span className="text-xs text-muted-foreground">Saving...</span>}
                                    </div>

                                    {/* Admin notes */}
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
                                            <StickyNote className="w-3.5 h-3.5" /> Internal Notes (not visible to applicant)
                                        </label>
                                        <textarea
                                            value={noteValues[app.id] || ''}
                                            onChange={e => setNoteValues(prev => ({ ...prev, [app.id]: e.target.value }))}
                                            rows={2}
                                            placeholder="Add notes about this applicant..."
                                            className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                                        />
                                        <button
                                            onClick={() => saveNote(app.id)}
                                            disabled={savingNoteId === app.id}
                                            className="mt-1.5 text-xs text-primary font-semibold hover:underline disabled:opacity-50"
                                        >
                                            {savingNoteId === app.id ? 'Saving...' : 'Save Note'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    {search || statusFilter !== 'all' ? 'No applications match your filters.' : 'No applications yet. They\'ll appear here when students apply.'}
                </div>
            )}
        </div>
    )
}
