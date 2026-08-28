'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Event } from '@/lib/types'
import { Plus, Pencil, Trash2, X, Calendar, Eye, EyeOff, MapPin } from 'lucide-react'
import { useAdminRole } from '@/lib/admin-role-context'

export default function AdminEventsPage() {
    const role = useAdminRole()
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState({
        title: '', description: '', date: '', location: '',
        poster_url: '', details: '', is_active: true, sort_order: 0,
    })

    const fetchEvents = async () => {
        const { data } = await supabase.from('events').select('*').order('sort_order')
        setEvents(data || [])
        setLoading(false)
    }

    useEffect(() => { fetchEvents() }, [])

    const resetForm = () => {
        setForm({ title: '', description: '', date: '', location: '', poster_url: '', details: '', is_active: true, sort_order: 0 })
        setEditingId(null)
        setShowForm(false)
    }

    const handleSave = async () => {
        if (!form.title.trim()) return
        if (editingId) {
            await supabase.from('events').update(form).eq('id', editingId)
        } else {
            await supabase.from('events').insert(form)
        }
        resetForm()
        fetchEvents()
    }

    const handleEdit = (event: Event) => {
        setForm({
            title: event.title,
            description: event.description || '',
            date: event.date || '',
            location: event.location || '',
            poster_url: event.poster_url || '',
            details: event.details || '',
            is_active: event.is_active,
            sort_order: event.sort_order,
        })
        setEditingId(event.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Delete this event? This cannot be undone.')) {
            await supabase.from('events').delete().eq('id', id)
            fetchEvents()
        }
    }

    const toggleActive = async (id: string, current: boolean) => {
        await supabase.from('events').update({ is_active: !current }).eq('id', id)
        fetchEvents()
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '—'
        try {
            return new Date(dateStr).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
        } catch {
            return dateStr
        }
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Events</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {events.filter(e => e.is_active).length} active · {events.length} total
                    </p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true) }}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Event
                </button>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
                <p className="text-sm text-foreground/70">
                    <strong className="text-primary">Active events</strong> appear automatically in the &quot;Upcoming Events&quot; section on the homepage.
                    Toggle the eye icon to show/hide. Poster images support Google Drive share links.
                </p>
            </div>

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto">
                    <div className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-lg border border-border shadow-xl mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-bold">{editingId ? 'Edit' : 'New'} Event</h2>
                            <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title*</label>
                                <input
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="e.g. Recruitment Drive 2026"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm({ ...form, date: e.target.value })}
                                        className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input
                                        value={form.location}
                                        onChange={e => setForm({ ...form, location: e.target.value })}
                                        className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                        placeholder="e.g. KyU Main Hall"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Short Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    rows={2}
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                                    placeholder="Brief summary shown on the event card"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Poster Image URL</label>
                                <input
                                    value={form.poster_url}
                                    onChange={e => setForm({ ...form, poster_url: e.target.value })}
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="Google Drive share link or direct image URL"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Google Drive links are converted automatically.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Details</label>
                                <textarea
                                    value={form.details}
                                    onChange={e => setForm({ ...form, details: e.target.value })}
                                    rows={3}
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                                    placeholder="Additional info, requirements, registration link..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input
                                        type="number"
                                        value={form.sort_order}
                                        onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    />
                                </div>
                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.is_active}
                                            onChange={e => setForm({ ...form, is_active: e.target.checked })}
                                            className="rounded"
                                        />
                                        Active (visible on site)
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSave}
                                className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                {editingId ? 'Update' : 'Create'} Event
                            </button>
                            <button
                                onClick={resetForm}
                                className="bg-muted text-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/70 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Event</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Date</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Location</th>
                                <th className="text-center px-4 py-3 font-medium text-foreground/70">Visible</th>
                                <th className="text-right px-4 py-3 font-medium text-foreground/70">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {events.map((event) => (
                                <tr key={event.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary/60 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-foreground">{event.title}</p>
                                                {event.description && (
                                                    <p className="text-xs text-muted-foreground truncate max-w-[220px]">{event.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{formatDate(event.date)}</td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {event.location ? (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />{event.location}
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button onClick={() => toggleActive(event.id, event.is_active)} title="Toggle visibility">
                                            {event.is_active
                                                ? <Eye className="w-4 h-4 text-green-500 mx-auto" />
                                                : <EyeOff className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="p-2 hover:bg-primary/10 rounded-lg text-primary"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            {(role === 'chair' || role === 'admin') && (
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {events.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p>No events yet. Click &quot;Add Event&quot; to create your first one.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
