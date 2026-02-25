'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Expedition, Project } from '@/lib/types'
import { Plus, Pencil, Trash2, X, Mountain, Home } from 'lucide-react'

type Tab = 'expeditions' | 'projects'

export default function AdminExpeditionsPage() {
    const [tab, setTab] = useState<Tab>('expeditions')
    const [expeditions, setExpeditions] = useState<Expedition[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState({
        name: '', location: '', date: '', description: '', coming_soon: false, sort_order: 0,
    })

    const fetchAll = async () => {
        const [{ data: exps }, { data: projs }] = await Promise.all([
            supabase.from('expeditions').select('*').order('sort_order'),
            supabase.from('projects').select('*').order('sort_order'),
        ])
        setExpeditions(exps || [])
        setProjects(projs || [])
        setLoading(false)
    }

    useEffect(() => { fetchAll() }, [])

    const table = tab === 'expeditions' ? 'expeditions' : 'projects'
    const items = tab === 'expeditions' ? expeditions : projects

    const resetForm = () => {
        setForm({ name: '', location: '', date: '', description: '', coming_soon: false, sort_order: 0 })
        setEditingId(null)
        setShowForm(false)
    }

    const handleSave = async () => {
        const payload = tab === 'expeditions'
            ? { ...form, type: 'adventure' }
            : form
        if (editingId) {
            await supabase.from(table).update(payload).eq('id', editingId)
        } else {
            await supabase.from(table).insert(payload)
        }
        resetForm()
        fetchAll()
    }

    const handleEdit = (item: Expedition | Project) => {
        setForm({
            name: item.name, location: item.location, date: item.date,
            description: item.description, coming_soon: item.coming_soon,
            sort_order: item.sort_order,
        })
        setEditingId(item.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm(`Delete this ${tab === 'expeditions' ? 'expedition' : 'project'}?`)) {
            await supabase.from(table).delete().eq('id', id)
            fetchAll()
        }
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Expeditions & Projects</h1>
                    <p className="text-muted-foreground text-sm mt-1">{expeditions.length} Adventurous Journeys · {projects.length} Residential Projects</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true) }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add {tab === 'expeditions' ? 'Expedition' : 'Project'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted/50 rounded-lg p-1 mb-6 w-fit">
                <button
                    onClick={() => setTab('expeditions')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === 'expeditions' ? 'bg-card shadow text-primary' : 'text-foreground/60 hover:text-foreground'}`}
                >
                    <Mountain className="w-4 h-4" /> Adventurous Journeys ({expeditions.length})
                </button>
                <button
                    onClick={() => setTab('projects')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === 'projects' ? 'bg-card shadow text-primary' : 'text-foreground/60 hover:text-foreground'}`}
                >
                    <Home className="w-4 h-4" /> Residential Projects ({projects.length})
                </button>
            </div>

            {/* Stats banner */}
            <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
                <p className="text-sm text-foreground/70">
                    <strong className="text-primary">Auto-updated across the site:</strong> AJ count ({expeditions.length}) and RP count ({projects.length}) are pulled live from these tables. Adding or removing entries updates the hero, home, and achievements pages automatically.
                </p>
            </div>

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto">
                    <div className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-lg border border-border shadow-xl mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-bold">
                                {editingId ? 'Edit' : 'New'} {tab === 'expeditions' ? 'Expedition' : 'Project'}
                            </h2>
                            <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name*</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder={tab === 'expeditions' ? 'Aberdares Expedition IV' : 'Community School Project'} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Range</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs text-muted-foreground mb-1">Start</label>
                                            <input
                                                type="date"
                                                value={form.date.split(' - ')[0] || ''}
                                                onChange={e => {
                                                    const end = form.date.split(' - ')[1] || ''
                                                    const start = e.target.value
                                                    const formatted = end ? `${start} - ${end}` : start
                                                    setForm({ ...form, date: formatted })
                                                }}
                                                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-muted-foreground mb-1">End</label>
                                            <input
                                                type="date"
                                                value={form.date.split(' - ')[1] || ''}
                                                onChange={e => {
                                                    const start = form.date.split(' - ')[0] || ''
                                                    const end = e.target.value
                                                    const formatted = start ? `${start} - ${end}` : end
                                                    setForm({ ...form, date: formatted })
                                                }}
                                                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={form.coming_soon} onChange={e => setForm({ ...form, coming_soon: e.target.checked })} className="rounded" /> Coming Soon
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button onClick={resetForm} className="bg-muted text-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/70 transition-colors">Cancel</button>
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
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Location</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Date</th>
                                <th className="text-right px-4 py-3 font-medium text-foreground/70">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3 font-medium text-foreground">
                                        <div className="flex items-center gap-2">
                                            {tab === 'expeditions' ? <Mountain className="w-4 h-4 text-teal-600" /> : <Home className="w-4 h-4 text-amber-500" />}
                                            {item.name}
                                            {item.coming_soon && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">SOON</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{item.location || '—'}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{item.date || '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => handleEdit(item)} className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {items.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No {tab === 'expeditions' ? 'expeditions' : 'projects'} yet.
                    </div>
                )}
            </div>
        </div>
    )
}
