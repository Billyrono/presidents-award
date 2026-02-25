'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { getGallery } from '@/lib/content'
import { toDirectImageUrl } from '@/lib/content'
import type { GalleryImage as GalleryImageType } from '@/lib/types'
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft } from 'lucide-react'

// Extract sub-group name by stripping trailing numbers
function getSubGroup(title: string) {
    const match = title.match(/^(.+?)\s*\d*$/)
    return match ? match[1].trim() : title
}

interface SubGroupTile {
    name: string
    category: string
    coverImage: GalleryImageType
    images: GalleryImageType[]
}

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<string[]>(['All'])

    // Two-level navigation: null = show sub-group tiles, string = show that sub-group's images
    const [activeSubGroup, setActiveSubGroup] = useState<SubGroupTile | null>(null)

    // Lightbox state (within a sub-group)
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    useEffect(() => {
        getGallery().then(data => {
            const withImages = data.filter(img => img.image_url && img.image_url.trim() !== '')
            setGalleryImages(withImages)
            const cats = ['All', ...new Set(withImages.map(img => img.category).filter(Boolean))]
            setCategories(cats)
            setLoading(false)
        })
    }, [])

    // Build sub-group tiles from filtered images
    const subGroupTiles = useMemo(() => {
        const source = activeCategory === 'All'
            ? galleryImages
            : galleryImages.filter(img => img.category === activeCategory)

        const map = new Map<string, SubGroupTile>()
        source.forEach(img => {
            const sg = getSubGroup(img.title)
            const key = `${img.category}::${sg}`
            if (!map.has(key)) {
                map.set(key, { name: sg, category: img.category, coverImage: img, images: [] })
            }
            map.get(key)!.images.push(img)
        })
        return Array.from(map.values())
    }, [galleryImages, activeCategory])

    // When category changes, go back to sub-group tiles view
    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat)
        setActiveSubGroup(null)
        setLightboxIndex(null)
    }

    // Open a sub-group's images
    const openSubGroup = (tile: SubGroupTile) => {
        setActiveSubGroup(tile)
        setLightboxIndex(null)
    }

    // Go back to tiles
    const backToTiles = () => {
        setActiveSubGroup(null)
        setLightboxIndex(null)
    }

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null)
    }, [])

    const goPrev = useCallback(() => {
        setLightboxIndex(i => i !== null ? Math.max(0, i - 1) : null)
    }, [])

    const goNext = useCallback(() => {
        if (!activeSubGroup) return
        setLightboxIndex(i => i !== null ? Math.min(activeSubGroup.images.length - 1, i + 1) : null)
    }, [activeSubGroup])

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') goPrev()
            if (e.key === 'ArrowRight') goNext()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [lightboxIndex, closeLightbox, goPrev, goNext])

    const lightboxImage = activeSubGroup && lightboxIndex !== null ? activeSubGroup.images[lightboxIndex] : null

    return (
        <>
            <PageHero
                title="Gallery"
                subtitle="Moments of transformation, achievement, and community impact from the Kirinyaga University chapter."
                badge="Our Moments"
                badgeIcon="camera"
            />

            {/* Category Filter */}
            <section className="py-6 px-4 md:px-8 bg-card border-b border-border/50 sticky top-16 md:top-20 z-30 backdrop-blur-md">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-muted/50 text-foreground/70 hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 md:px-8 bg-background">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
                    ) : activeSubGroup ? (
                        /* ═══════ LEVEL 2: Sub-group images ═══════ */
                        <>
                            {/* Back button + sub-group header */}
                            <div className="mb-8">
                                <button
                                    onClick={backToTiles}
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back to {activeCategory === 'All' ? 'Gallery' : activeCategory}
                                </button>
                                <span className="text-primary text-xs font-bold uppercase tracking-wider">{activeSubGroup.category}</span>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">{activeSubGroup.name}</h2>
                                {activeSubGroup.coverImage.description && (
                                    <p className="text-foreground/70 text-sm mt-2 max-w-2xl">{activeSubGroup.coverImage.description}</p>
                                )}
                                <p className="text-muted-foreground text-xs mt-2">{activeSubGroup.images.length} photo{activeSubGroup.images.length !== 1 ? 's' : ''}</p>
                            </div>

                            {/* Images grid — clean hover, zoom only */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {activeSubGroup.images.map((image, index) => {
                                    const displayUrl = toDirectImageUrl(image.image_url)
                                    return (
                                        <ScrollReveal key={image.id} delay={index * 40}>
                                            <div
                                                className="group relative overflow-hidden rounded-xl aspect-[4/3] border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                                                onClick={() => displayUrl && setLightboxIndex(index)}
                                            >
                                                {displayUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={displayUrl}
                                                        alt={image.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        style={{ objectPosition: `center ${image.focus_point ?? 50}%` }}
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                                                        <p className="text-muted-foreground/50 text-sm">No image</p>
                                                    </div>
                                                )}
                                            </div>
                                        </ScrollReveal>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        /* ═══════ LEVEL 1: Sub-group tiles ═══════ */
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {subGroupTiles.map((tile, index) => {
                                    const displayUrl = toDirectImageUrl(tile.coverImage.image_url)
                                    return (
                                        <ScrollReveal key={`${tile.category}::${tile.name}`} delay={index * 60}>
                                            <div
                                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-xl"
                                                onClick={() => openSubGroup(tile)}
                                            >
                                                {displayUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={displayUrl}
                                                        alt={tile.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        style={{ objectPosition: `center ${tile.coverImage.focus_point ?? 50}%` }}
                                                    />
                                                ) : tile.coverImage.coming_soon ? (
                                                    <div className="absolute inset-0 bg-[#C9A84C]/8">
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="text-center px-4">
                                                                <p className="text-[#C9A84C]/60 font-display text-lg font-bold">{tile.name}</p>
                                                                <p className="text-muted-foreground/50 text-xs mt-1">Coming Soon</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="absolute inset-0 bg-teal-600/8">
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="text-center px-4">
                                                                <p className="text-primary/40 font-display text-lg font-bold">{tile.name}</p>
                                                                <p className="text-muted-foreground/40 text-xs mt-1">Photo coming soon</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                                    <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">{tile.category}</span>
                                                    <h3 className="text-white font-display font-bold text-lg mb-1">{tile.name}</h3>
                                                    {tile.coverImage.description && <p className="text-white/80 text-sm">{tile.coverImage.description}</p>}
                                                    <div className="absolute top-4 right-4">
                                                        <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                                                            {tile.images.length} photo{tile.images.length !== 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Always-visible label at bottom */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                                                    <h3 className="text-white font-display font-bold text-base">{tile.name}</h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-white/60 text-xs">{tile.category}</span>
                                                        <span className="text-white/30">·</span>
                                                        <span className="text-white/60 text-xs">{tile.images.length} photo{tile.images.length !== 1 ? 's' : ''}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    )
                                })}
                            </div>

                            {subGroupTiles.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-muted-foreground text-lg">No images in this category yet. Check back soon!</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* ───── Lightbox ───── */}
            {lightboxImage && (() => {
                const lightboxUrl = toDirectImageUrl(lightboxImage.image_url)
                return (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
                            <div>
                                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">{activeSubGroup?.category}</span>
                                <h3 className="text-white font-display font-bold text-lg">{activeSubGroup?.name}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                {activeSubGroup && (
                                    <span className="text-white/50 text-sm font-mono">
                                        {(lightboxIndex ?? 0) + 1} / {activeSubGroup.images.length}
                                    </span>
                                )}
                                <button className="p-2 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
                                    <X className="w-7 h-7" />
                                </button>
                            </div>
                        </div>

                        {/* Prev */}
                        {lightboxIndex !== null && lightboxIndex > 0 && (
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                                onClick={(e) => { e.stopPropagation(); goPrev() }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}

                        {/* Next */}
                        {lightboxIndex !== null && activeSubGroup && lightboxIndex < activeSubGroup.images.length - 1 && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                                onClick={(e) => { e.stopPropagation(); goNext() }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}

                        {/* Image */}
                        <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center pt-16" onClick={(e) => e.stopPropagation()}>
                            {lightboxUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={lightboxUrl}
                                    alt={lightboxImage.title}
                                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                                />
                            )}
                            <div className="text-center mt-4">
                                {lightboxImage.description && <p className="text-white/60 text-sm">{lightboxImage.description}</p>}
                            </div>
                        </div>

                        {/* Thumbnail strip */}
                        {activeSubGroup && activeSubGroup.images.length > 1 && (
                            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 z-10">
                                <div className="flex gap-2 justify-center overflow-x-auto max-w-3xl mx-auto pb-1">
                                    {activeSubGroup.images.map((img, i) => {
                                        const thumbUrl = toDirectImageUrl(img.image_url)
                                        return (
                                            <button
                                                key={img.id}
                                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                                                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === lightboxIndex
                                                    ? 'border-primary ring-2 ring-primary/30 scale-110'
                                                    : 'border-white/20 opacity-50 hover:opacity-80'
                                                    }`}
                                            >
                                                {thumbUrl && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={thumbUrl}
                                                        alt={img.title}
                                                        className="w-full h-full object-cover"
                                                        style={{ objectPosition: `center ${img.focus_point ?? 50}%` }}
                                                    />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })()}
        </>
    )
}
