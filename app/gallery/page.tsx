'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { getGallery, toDirectImageUrl } from '@/lib/content'
import type { GalleryImage as GalleryImageType } from '@/lib/types'
import { X, ChevronLeft, ChevronRight, ArrowLeft, Camera, Sparkles, Layers } from 'lucide-react'

// Extract sub-group name by stripping trailing numbers
function getSubGroup(title: string) {
    const match = title.match(/^(.+?)\s*\d*$/)
    return match ? match[1].trim() : title
}

function isExternal(url: string | null) {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://')
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
    const [activeSubGroup, setActiveSubGroup] = useState<SubGroupTile | null>(null)
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

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat)
        setActiveSubGroup(null)
        setLightboxIndex(null)
    }

    const openSubGroup = (tile: SubGroupTile) => {
        setActiveSubGroup(tile)
        setLightboxIndex(null)
    }

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

    const renderImage = (url: string | null, alt: string, fill: boolean, priority: boolean = false, focusPoint?: number, className?: string) => {
        if (!url) return null
        const directUrl = toDirectImageUrl(url)
        if (!directUrl) return null

        if (isExternal(directUrl)) {
            return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={directUrl}
                    alt={alt}
                    className={className || 'w-full h-full object-cover'}
                    style={focusPoint !== undefined ? { objectPosition: `center ${focusPoint}%` } : undefined}
                    loading={priority ? 'eager' : 'lazy'}
                />
            )
        }

        if (fill) {
            return (
                <Image
                    src={directUrl}
                    alt={alt}
                    fill
                    className={className || 'object-cover'}
                    style={focusPoint !== undefined ? { objectPosition: `center ${focusPoint}%` } : undefined}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={priority}
                    quality={85}
                />
            )
        }

        return (
            <Image
                src={directUrl}
                alt={alt}
                width={800}
                height={600}
                className={className || 'w-full h-full object-cover'}
                style={focusPoint !== undefined ? { objectPosition: `center ${focusPoint}%` } : undefined}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={priority}
                quality={85}
            />
        )
    }

    return (
        <>
            <PageHero
                eyebrow="Visual Archive · Moments of Distinction"
                title="The Visual Gallery"
                titleGold="Chronicles in Photography"
                subtitle="A photographic record of leadership, wilderness expeditions, community service, and presidential honours."
                image="/Hero/Home/DSC_2956.JPG"
            />

            {/* Curatorial Filter Strip */}
            <section className="py-6 px-6 md:px-10 bg-[#070b09] border-b border-[#C9A84C]/20 sticky top-16 md:top-20 z-30 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <Layers className="w-4 h-4 text-[#C9A84C]" />
                        <span className="font-accent tracking-widest uppercase text-[10px] text-white/70">Collection:</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-2 text-[11px] font-accent font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-sm ${
                                    activeCategory === cat
                                        ? 'bg-[#C9A84C] text-[#070b09] shadow-lg'
                                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Content Area */}
            <section className="py-20 md:py-28 px-6 md:px-10 bg-background min-h-[60vh]">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : activeSubGroup ? (
                        /* ═══════ LEVEL 2: Sub-group images ═══════ */
                        <div>
                            {/* Breadcrumb Header */}
                            <div className="mb-12 pb-6 border-b border-border">
                                <button
                                    onClick={backToTiles}
                                    className="inline-flex items-center gap-2 text-xs font-accent font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-4 group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <span>Back to Archive</span>
                                </button>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="h-px w-6 bg-[#C9A84C]/60" />
                                    <span className="text-[10px] font-accent font-bold tracking-[0.25em] uppercase text-[#C9A84C]">
                                        {activeSubGroup.category}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                                    {activeSubGroup.name}
                                </h2>
                                {activeSubGroup.coverImage.description && (
                                    <p className="text-foreground/60 text-sm md:text-base font-light mt-3 max-w-3xl leading-relaxed">
                                        {activeSubGroup.coverImage.description}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-3 font-mono">
                                    {activeSubGroup.images.length} Archival Photograph{activeSubGroup.images.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {activeSubGroup.images.map((image, index) => {
                                    const displayUrl = toDirectImageUrl(image.image_url)
                                    return (
                                        <MotionReveal key={image.id} delay={index * 40}>
                                            <div
                                                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-400 cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1"
                                                onClick={() => displayUrl && setLightboxIndex(index)}
                                            >
                                                {renderImage(image.image_url, image.title, true, index < 4, image.focus_point, 'object-cover transition-transform duration-700 group-hover:scale-105')}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                    <span className="text-white text-xs font-accent font-bold tracking-wider uppercase flex items-center gap-1.5">
                                                        <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> Inspect
                                                    </span>
                                                </div>
                                            </div>
                                        </MotionReveal>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        /* ═══════ LEVEL 1: Sub-group Collection Tiles ═══════ */
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subGroupTiles.map((tile, index) => {
                                    const displayUrl = toDirectImageUrl(tile.coverImage.image_url)
                                    return (
                                        <MotionReveal key={`${tile.category}::${tile.name}`} delay={index * 60} className="h-full">
                                            <div
                                                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
                                                onClick={() => openSubGroup(tile)}
                                            >
                                                {renderImage(tile.coverImage.image_url, tile.name, true, index < 3, tile.coverImage.focus_point, 'object-cover transition-transform duration-700 group-hover:scale-108')}

                                                {/* Ambient gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/95 via-[#070b09]/40 to-transparent transition-opacity duration-300" />

                                                {/* Top Badge */}
                                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                                                    <span className="bg-[#070b09]/80 backdrop-blur-md text-[#C9A84C] text-[9.5px] font-accent font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm border border-[#C9A84C]/30">
                                                        {tile.category}
                                                    </span>
                                                    <span className="bg-[#070b09]/80 backdrop-blur-md text-white/80 text-[10px] font-mono px-2.5 py-1 rounded-sm border border-white/10">
                                                        {tile.images.length} {tile.images.length === 1 ? 'Plate' : 'Plates'}
                                                    </span>
                                                </div>

                                                {/* Bottom Typography */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-1.5">
                                                    <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug">
                                                        {tile.name}
                                                    </h3>
                                                    {tile.coverImage.description && (
                                                        <p className="text-white/65 text-xs line-clamp-2 font-light leading-relaxed">
                                                            {tile.coverImage.description}
                                                        </p>
                                                    )}
                                                    <div className="pt-2 flex items-center gap-1.5 text-[10.5px] font-accent font-bold tracking-[0.18em] uppercase text-[#C9A84C] group-hover:translate-x-1 transition-transform">
                                                        <span>View Collection</span>
                                                        <span className="text-xs">→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </MotionReveal>
                                    )
                                })}
                            </div>

                            {subGroupTiles.length === 0 && (
                                <div className="text-center py-24">
                                    <Camera className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                                    <p className="text-muted-foreground text-base font-light">No photographs found in this collection category.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* ───── Full-Screen Dark Luxury Lightbox ───── */}
            {lightboxImage && (() => {
                const lightboxUrl = toDirectImageUrl(lightboxImage.image_url)
                return (
                    <div
                        className="fixed inset-0 bg-[#070b09]/95 z-50 flex items-center justify-center backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20 border-b border-white/10 bg-[#070b09]/80 backdrop-blur-md">
                            <div>
                                <span className="text-[#C9A84C] text-[10px] font-accent font-bold tracking-[0.25em] uppercase">
                                    {activeSubGroup?.category}
                                </span>
                                <h3 className="text-white font-display font-bold text-xl">{activeSubGroup?.name}</h3>
                            </div>
                            <div className="flex items-center gap-6">
                                {activeSubGroup && (
                                    <span className="text-white/60 text-xs font-mono tracking-widest">
                                        {(lightboxIndex ?? 0) + 1} / {activeSubGroup.images.length}
                                    </span>
                                )}
                                <button className="p-2 text-white/70 hover:text-[#C9A84C] transition-colors" onClick={closeLightbox}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Prev */}
                        {lightboxIndex !== null && lightboxIndex > 0 && (
                            <button
                                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-[#C9A84C] hover:text-[#070b09] rounded-sm text-white transition-all duration-300 z-20 border border-white/10"
                                onClick={(e) => { e.stopPropagation(); goPrev() }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}

                        {/* Next */}
                        {lightboxIndex !== null && activeSubGroup && lightboxIndex < activeSubGroup.images.length - 1 && (
                            <button
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-[#C9A84C] hover:text-[#070b09] rounded-sm text-white transition-all duration-300 z-20 border border-white/10"
                                onClick={(e) => { e.stopPropagation(); goNext() }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}

                        {/* Image Showcase */}
                        <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center pt-20" onClick={(e) => e.stopPropagation()}>
                            {lightboxUrl && (
                                isExternal(lightboxUrl) ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={lightboxUrl}
                                        alt={lightboxImage.title}
                                        className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl border border-white/10"
                                    />
                                ) : (
                                    <Image
                                        src={lightboxUrl}
                                        alt={lightboxImage.title}
                                        width={1200}
                                        height={800}
                                        className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl border border-white/10"
                                        quality={95}
                                        priority
                                    />
                                )
                            )}
                            <div className="text-center mt-4 max-w-xl">
                                {lightboxImage.description && (
                                    <p className="text-white/70 text-sm font-light leading-relaxed">{lightboxImage.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Bar */}
                        {activeSubGroup && activeSubGroup.images.length > 1 && (
                            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 z-20 bg-[#070b09]/80 backdrop-blur-md border-t border-white/10">
                                <div className="flex gap-2.5 justify-center overflow-x-auto max-w-3xl mx-auto pb-1">
                                    {activeSubGroup.images.map((img, i) => {
                                        const thumbUrl = toDirectImageUrl(img.image_url)
                                        return (
                                            <button
                                                key={img.id}
                                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                                                className={`flex-shrink-0 w-16 h-12 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                                                    i === lightboxIndex
                                                        ? 'border-[#C9A84C] scale-105'
                                                        : 'border-white/20 opacity-40 hover:opacity-80'
                                                }`}
                                            >
                                                {thumbUrl && renderImage(img.image_url, img.title, true, false, img.focus_point, 'object-cover')}
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
