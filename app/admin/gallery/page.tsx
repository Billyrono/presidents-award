'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { GalleryImage } from '@/lib/types'
import { toDirectImageUrl } from '@/lib/content'
import { CustomSelect } from '@/components/custom-select'
import { FocusPointPicker } from '@/components/focus-point-picker'
import { Plus, Pencil, Trash2, X, Info, Layers, CheckCircle } from 'lucide-react'

const DEFAULT_CATEGORIES = ['Adventure', 'Service', 'Skills', 'Recreation', 'Recognition']

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [showBulk, setShowBulk] = useState(false)
    const [showNewCat, setShowNewCat] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)
    const [form, setForm] = useState({
        title: '', category: 'Adventure', description: '',
        image_url: '', focus_point: 50, coming_soon: false, sort_order: 0,
    })

    // New category form
    const [newCatName, setNewCatName] = useState('')

    // Bulk add state
    const [bulkLinks, setBulkLinks] = useState('')
    const [bulkCategory, setBulkCategory] = useState('Adventure')
    const [bulkPrefix, setBulkPrefix] = useState('')
    const [bulkDescription, setBulkDescription] = useState('')
    const [bulkFocus, setBulkFocus] = useState(50)
    const [bulkSaving, setBulkSaving] = useState(false)
    const [bulkResult, setBulkResult] = useState<{ count: number } | null>(null)

    const fetchImages = async () => {
        const { data } = await supabase.from('gallery').select('*').order('sort_order')
        const imgs = data || []
        setImages(imgs)
        // Build categories from existing data + defaults
        const dbCats = [...new Set(imgs.map(i => i.category))]
        const allCats = [...new Set([...DEFAULT_CATEGORIES, ...dbCats])]
        setCategories(allCats)
        setLoading(false)
    }

    useEffect(() => { fetchImages() }, [])

    const resetForm = () => {
        setForm({ title: '', category: 'Adventure', description: '', image_url: '', focus_point: 50, coming_soon: false, sort_order: 0 })
        setEditingId(null)
        setShowForm(false)
    }

    const handleSave = async () => {
        let result
        if (editingId) {
            result = await supabase.from('gallery').update(form).eq('id', editingId)
        } else {
            result = await supabase.from('gallery').insert(form)
        }
        if (result.error) {
            console.error('Save error:', result.error)
            alert(`Save failed: ${result.error.message}`)
            return
        }
        resetForm()
        fetchImages()
    }

    const handleEdit = (img: GalleryImage) => {
        setForm({
            title: img.title, category: img.category,
            description: img.description || '', image_url: img.image_url || '',
            focus_point: img.focus_point ?? 50,
            coming_soon: img.coming_soon, sort_order: img.sort_order,
        })
        setEditingId(img.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Delete this image?')) {
            await supabase.from('gallery').delete().eq('id', id)
            fetchImages()
        }
    }

    // Create new category
    const handleCreateCategory = () => {
        if (newCatName.trim()) {
            const name = newCatName.trim()
            setCategories(prev => [...prev, name])
            // Set as the active category in whichever context opened it
            if (showBulk) {
                setBulkCategory(name)
            } else {
                setForm(f => ({ ...f, category: name }))
            }
            setNewCatName('')
            setShowNewCat(false)
        }
    }

    // Bulk add handler
    const handleBulkAdd = async () => {
        const lines = bulkLinks
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0)

        if (lines.length === 0) return

        setBulkSaving(true)
        const maxOrder = images.length > 0 ? Math.max(...images.map(i => i.sort_order)) : 0
        const rows = lines.map((url, i) => ({
            title: bulkPrefix ? `${bulkPrefix} ${i + 1}` : `${bulkCategory} ${images.length + i + 1}`,
            category: bulkCategory,
            description: bulkDescription,
            image_url: url,
            focus_point: bulkFocus,
            coming_soon: false,
            sort_order: maxOrder + i + 1,
        }))

        await supabase.from('gallery').insert(rows)
        setBulkSaving(false)
        setBulkResult({ count: rows.length })
        setBulkLinks('')
        setBulkPrefix('')
        setBulkDescription('')
        fetchImages()
        setTimeout(() => { setShowBulk(false); setBulkResult(null) }, 2000)
    }

    const bulkPreviewLinks = bulkLinks.split('\n').map(l => l.trim()).filter(l => l.length > 0)

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Gallery</h1>
                    <p className="text-muted-foreground text-sm mt-1">{images.length} images · {categories.length} categories</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => { setShowBulk(true); setBulkResult(null) }} className="bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-muted/70 transition-colors flex items-center gap-2 border border-border">
                        <Layers className="w-4 h-4" /> Bulk Add
                    </button>
                    <button onClick={() => { resetForm(); setShowForm(true) }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Image
                    </button>
                </div>
            </div>

            {/* Tip */}
            <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10 flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground/70">
                    <strong className="text-primary">Tip:</strong> Use <strong>Bulk Add</strong> to paste multiple Google Drive links at once. Set the category, title prefix, and description — they&apos;ll appear as hover info on the public gallery.
                </div>
            </div>

            {/* ───── New Category Modal ───── */}
            {showNewCat && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center px-4">
                    <div className="bg-card rounded-2xl p-6 w-full max-w-sm border border-border shadow-xl">
                        <h3 className="text-lg font-display font-bold text-foreground mb-4">New Category</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category Name*</label>
                                <input
                                    value={newCatName}
                                    onChange={e => setNewCatName(e.target.value)}
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="e.g. Community, Leadership"
                                    autoFocus
                                    onKeyDown={e => e.key === 'Enter' && handleCreateCategory()}
                                />
                                <p className="text-xs text-muted-foreground mt-1">This name will appear as the category label in filters and hover info on the public gallery.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button onClick={handleCreateCategory} disabled={!newCatName.trim()} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                                Create Category
                            </button>
                            <button onClick={() => { setShowNewCat(false); setNewCatName('') }} className="bg-muted text-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-muted/70 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ───── Bulk Add Modal ───── */}
            {showBulk && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
                    <div className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-lg border border-border shadow-xl mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-bold flex items-center gap-2">
                                <Layers className="w-5 h-5 text-primary" /> Bulk Add Images
                            </h2>
                            <button onClick={() => { setShowBulk(false); setBulkResult(null) }} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        {bulkResult ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <p className="text-lg font-semibold text-foreground">{bulkResult.count} images added!</p>
                                <p className="text-sm text-muted-foreground mt-1">You can edit titles and descriptions individually now.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Paste image URLs <span className="text-muted-foreground font-normal">(one per line)</span></label>
                                    <textarea
                                        value={bulkLinks}
                                        onChange={e => setBulkLinks(e.target.value)}
                                        rows={6}
                                        className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y font-mono"
                                        placeholder={`https://drive.google.com/file/d/abc123/view\nhttps://drive.google.com/file/d/def456/view`}
                                    />
                                    {bulkPreviewLinks.length > 0 && (
                                        <p className="text-xs text-muted-foreground mt-1">{bulkPreviewLinks.length} link{bulkPreviewLinks.length !== 1 ? 's' : ''} detected</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <CustomSelect
                                        value={bulkCategory}
                                        options={categories}
                                        onChange={setBulkCategory}
                                        placeholder="Select category"
                                        allowCreate
                                        onCreateNew={() => setShowNewCat(true)}
                                        createLabel="Create new category..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title prefix</label>
                                        <input value={bulkPrefix} onChange={e => setBulkPrefix(e.target.value)} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. Aberdares III" />
                                        <p className="text-xs text-muted-foreground mt-1">&quot;{bulkPrefix || bulkCategory} 1&quot;, &quot;{bulkPrefix || bulkCategory} 2&quot;, etc.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Hover description</label>
                                        <input value={bulkDescription} onChange={e => setBulkDescription(e.target.value)} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. Third AJ at Aberdares" />
                                        <p className="text-xs text-muted-foreground mt-1">Shown below the title on hover</p>
                                    </div>
                                </div>

                                {/* Focus point — simple slider for bulk */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image focus <span className="text-muted-foreground font-normal">({bulkFocus}%)</span></label>
                                    <input
                                        type="range" min={0} max={100} value={bulkFocus}
                                        onChange={e => setBulkFocus(parseInt(e.target.value))}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                                        <span>Top</span><span>Center</span><span>Bottom</span>
                                    </div>
                                </div>

                                {/* Live hover preview */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Gallery hover preview</label>
                                    <div className="rounded-xl overflow-hidden border border-border relative aspect-[4/3] bg-muted/20 max-w-[200px]">
                                        {bulkPreviewLinks.length > 0 && toDirectImageUrl(bulkPreviewLinks[0]) ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={toDirectImageUrl(bulkPreviewLinks[0])!} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No preview</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4">
                                            <span className="text-teal-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">{bulkCategory}</span>
                                            <p className="text-white font-display font-bold text-sm">{bulkPrefix || bulkCategory} 1</p>
                                            <p className="text-white/80 text-[11px] mt-0.5">{bulkDescription || 'Description will appear here'}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5">This is how each image will look on hover in the public gallery</p>
                                </div>

                                {/* Thumbnail grid preview */}
                                {bulkPreviewLinks.length > 1 && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">All images ({bulkPreviewLinks.length})</label>
                                        <div className="grid grid-cols-5 gap-1.5 max-h-32 overflow-y-auto">
                                            {bulkPreviewLinks.slice(0, 15).map((url, i) => {
                                                const directUrl = toDirectImageUrl(url)
                                                return (
                                                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted/30 border border-border">
                                                        {directUrl ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={directUrl} alt={`${i + 1}`} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">#{i + 1}</div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                            {bulkPreviewLinks.length > 15 && (
                                                <div className="aspect-square rounded-lg bg-muted/30 border border-border flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                                                    +{bulkPreviewLinks.length - 15}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={handleBulkAdd}
                                        disabled={bulkPreviewLinks.length === 0 || bulkSaving}
                                        className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {bulkSaving ? (
                                            <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Adding...</>
                                        ) : (
                                            <>Add {bulkPreviewLinks.length} Image{bulkPreviewLinks.length !== 1 ? 's' : ''}</>
                                        )}
                                    </button>
                                    <button onClick={() => setShowBulk(false)} className="bg-muted text-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/70 transition-colors">Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ───── Single Add/Edit Modal ───── */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
                    <div className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-2xl border border-border shadow-xl mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-bold">{editingId ? 'Edit' : 'New'} Gallery Image</h2>
                            <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="grid md:grid-cols-[1fr,1.2fr] gap-6">
                            {/* Left — Image & Focus */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image URL</label>
                                    <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Google Drive link or path" />
                                </div>
                                {form.image_url && toDirectImageUrl(form.image_url) ? (
                                    <div className="rounded-xl border border-border overflow-hidden bg-muted/10">
                                        <div className="bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground border-b border-border flex items-center justify-between">
                                            <span>Image Focus</span>
                                            <span className="font-mono text-primary">{typeof form.focus_point === 'number' ? form.focus_point : 50}%</span>
                                        </div>
                                        <div className="p-3">
                                            <FocusPointPicker
                                                imageUrl={toDirectImageUrl(form.image_url)!}
                                                value={typeof form.focus_point === 'number' ? form.focus_point : 50}
                                                onChange={(v) => setForm({ ...form, focus_point: v })}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-border bg-muted/10 aspect-video flex items-center justify-center">
                                        <p className="text-xs text-muted-foreground text-center px-4">Paste an image URL above to<br />preview and set focal point</p>
                                    </div>
                                )}
                            </div>

                            {/* Right — Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title*</label>
                                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Image title (shown on hover)" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category*</label>
                                    <CustomSelect
                                        value={form.category}
                                        options={categories}
                                        onChange={(v) => setForm({ ...form, category: v })}
                                        placeholder="Select category"
                                        allowCreate
                                        onCreateNew={() => setShowNewCat(true)}
                                        createLabel="Create new category..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description <span className="text-muted-foreground font-normal">(shown on hover)</span></label>
                                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" placeholder="Brief description" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={form.coming_soon} onChange={e => setForm({ ...form, coming_soon: e.target.checked })} className="rounded" /> Coming Soon placeholder
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                            <button onClick={handleSave} className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button onClick={resetForm} className="bg-muted text-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/70 transition-colors">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ───── Grid ───── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => {
                    const displayUrl = toDirectImageUrl(img.image_url)
                    return (
                        <div key={img.id} className="bg-card rounded-xl border border-border overflow-hidden group">
                            <div className="relative aspect-[4/3]">
                                {displayUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={displayUrl}
                                        alt={img.title}
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: `center ${img.focus_point ?? 50}%` }}
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${img.coming_soon ? 'bg-amber-50' : 'bg-muted/30'}`}>
                                        <p className={`text-xs font-medium ${img.coming_soon ? 'text-amber-600' : 'text-muted-foreground'}`}>
                                            {img.coming_soon ? 'Coming Soon' : 'No image'}
                                        </p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => handleEdit(img)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Pencil className="w-4 h-4 text-white" /></button>
                                    <button onClick={() => handleDelete(img.id)} className="p-2 bg-white/20 rounded-lg hover:bg-red-500/50"><Trash2 className="w-4 h-4 text-white" /></button>
                                </div>
                                {img.focus_point != null && img.focus_point !== 50 && (
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                                        ↕ {img.focus_point}%
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="font-medium text-sm text-foreground truncate">{img.title}</p>
                                <p className="text-xs text-muted-foreground">{img.category}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {images.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No gallery images yet.</div>
            )}
        </div>
    )
}
