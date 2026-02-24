'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/types'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X } from 'lucide-react'
import { CustomSelect } from '@/components/custom-select'
import { MarkdownEditor } from '@/components/markdown-editor'

export default function AdminNewsPage() {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState({
        slug: '', title: '', date: '', category: 'Expeditions',
        description: '', content: '', featured_image: '', published_by: '',
        featured: false, published: true, sort_order: 0,
    })

    const categories = ['Expeditions', 'Recognition', 'Programs', 'Service', 'Growth']

    const fetchArticles = async () => {
        const { data } = await supabase.from('news').select('*').order('sort_order')
        setArticles(data || [])
        setLoading(false)
    }

    useEffect(() => { fetchArticles() }, [])

    const resetForm = () => {
        setForm({ slug: '', title: '', date: '', category: 'Expeditions', description: '', content: '', featured_image: '', published_by: '', featured: false, published: true, sort_order: 0 })
        setEditingId(null)
        setShowForm(false)
    }

    const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const handleSave = async () => {
        const payload = { ...form, slug: form.slug || generateSlug(form.title) }
        if (editingId) {
            await supabase.from('news').update(payload).eq('id', editingId)
        } else {
            await supabase.from('news').insert(payload)
        }
        resetForm()
        fetchArticles()
    }

    const handleEdit = (article: NewsArticle) => {
        setForm({
            slug: article.slug, title: article.title, date: article.date,
            category: article.category, description: article.description,
            content: article.content || '', featured_image: article.featured_image || '',
            published_by: article.published_by || '',
            featured: article.featured, published: article.published,
            sort_order: article.sort_order,
        })
        setEditingId(article.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Delete this article?')) {
            await supabase.from('news').delete().eq('id', id)
            fetchArticles()
        }
    }

    const toggleFeatured = async (id: string, current: boolean) => {
        await supabase.from('news').update({ featured: !current }).eq('id', id)
        fetchArticles()
    }

    const togglePublished = async (id: string, current: boolean) => {
        await supabase.from('news').update({ published: !current }).eq('id', id)
        fetchArticles()
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">News Articles</h1>
                    <p className="text-muted-foreground text-sm mt-1">{articles.length} articles</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true) }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Article
                </button>
            </div>

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto">
                    <div className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-2xl border border-border shadow-xl mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-bold">{editingId ? 'Edit' : 'New'} Article</h2>
                            <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title*</label>
                                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Article title" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug</label>
                                    <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="auto-generated" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date*</label>
                                    <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. February 2026" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category*</label>
                                    <CustomSelect
                                        value={form.category}
                                        options={categories}
                                        onChange={(v) => setForm({ ...form, category: v })}
                                        placeholder="Select category"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Summary*</label>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" placeholder="Short description shown on the news listing" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Content (Markdown)</label>
                                <MarkdownEditor
                                    value={form.content}
                                    onChange={(v) => setForm({ ...form, content: v })}
                                    placeholder="Write your article using the toolbar above. Use **bold**, ## headings, > quotes, and more..."
                                    rows={8}
                                />
                                <p className="text-xs text-muted-foreground mt-1.5">Use the toolbar buttons or type markdown syntax directly. Click Preview to see how it will look.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                                <input value={form.featured_image} onChange={e => setForm({ ...form, featured_image: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="/Gallery/Adventure/photo.jpg or Google Drive link" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Published By</label>
                                <input value={form.published_by} onChange={e => setForm({ ...form, published_by: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. PA KyU Media Team" />
                            </div>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" /> Featured
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="rounded" /> Published
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                                {editingId ? 'Update' : 'Create'} Article
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
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Title</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Category</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Date</th>
                                <th className="text-center px-4 py-3 font-medium text-foreground/70">Status</th>
                                <th className="text-right px-4 py-3 font-medium text-foreground/70">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {articles.map((a) => (
                                <tr key={a.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">{a.title}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => toggleFeatured(a.id, a.featured)} title="Toggle featured">
                                                <Star className={`w-4 h-4 ${a.featured ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-muted-foreground/30'}`} />
                                            </button>
                                            <button onClick={() => togglePublished(a.id, a.published)} title="Toggle published">
                                                {a.published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground/30" />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => handleEdit(a)} className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(a.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {articles.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">No articles yet. Click &quot;Add Article&quot; to create one.</div>
                )}
            </div>
        </div>
    )
}
