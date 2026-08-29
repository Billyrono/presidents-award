'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { getGallery, toDirectImageUrl, toSizedImageUrl } from '@/lib/content'
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

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = '' }
        }
    }, [lightboxIndex])

    const lightboxImage = activeSubGroup && lightboxIndex !== null ? activeSubGroup.images[lightboxIndex] : null

    const renderImage = (url: string | null, alt: string, fill: boolean, priority: boolean = false, focusPoint?: number, className?: string, imageWidth: number = 600) => {
        if (!url) return null
        // Use sized URL for optimized loading (smaller tiles = smaller downloads)
        const sizedUrl = toSizedImageUrl(url, imageWidth)
        const directUrl = toDirectImageUrl(url)
        if (!sizedUrl && !directUrl) return null
        const src = sizedUrl || directUrl!

        // Shimmer skeleton that sits behind the image
        const skeleton = (
            <div className="gallery-skeleton">
                <div className="gallery-skeleton-icon">
                    <Camera className="w-8 h-8" />
                </div>
            </div>
        )

        if (isExternal(src)) {
            return (
                <>
                    {skeleton}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={alt}
                        className={`relative z-[2] ${className || 'w-full h-full object-cover'}`}
                        style={focusPoint !== undefined ? { objectPosition: `center ${focusPoint}%` } : undefined}
                        loading={priority ? 'eager' : 'lazy'}
                    />
                </>
            )
        }

        if (fill) {
            return (
                <>
                    {skeleton}
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className={`z-[2] ${className || 'object-cover'}`}
                        style={focusPoint !== undefined ? { objectPosition: `center ${focusPoint}%` } : undefined}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={priority}
                        quality={85}
                    />
                </>
            )
        }

        return (
            <>
                {skeleton}
                <Image
                    src={src}
                    alt={alt}
                    width={imageWidth}
                    height={Math.round(imageWidth * 0.75)}
                    className={`relative z-[2] ${className || 'w-full h-full object-cover'}`}
                    style={focusPoint !== undefined ? { objectPosition: `center ${focusPoint}%` } : undefined}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={priority}
                    quality={85}
                />
            </>
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
                        /* ═══════ LEVEL 2: Sub-group — Curatorial Exhibition View ═══════ */
                        <div>
                            {/* Exhibition Header */}
                            <div className="mb-16 pb-8 border-b border-border">
                                <button
                                    onClick={backToTiles}
                                    className="inline-flex items-center gap-2.5 text-xs font-accent font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-6 group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
                                    <span>Return to Archive</span>
                                </button>

                                <div className="flex items-center gap-3 mb-3">
                                    <span className="h-px w-8 bg-[#C9A84C]/60" />
                                    <span className="text-[10px] font-accent font-bold tracking-[0.3em] uppercase text-[#C9A84C]">
                                        {activeSubGroup.category}
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight leading-tight">
                                    {activeSubGroup.name}
                                </h2>
                                {activeSubGroup.coverImage.description && (
                                    <p className="text-foreground/55 text-base md:text-lg font-light mt-5 max-w-3xl leading-relaxed">
                                        {activeSubGroup.coverImage.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 mt-5">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-accent font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                        <Camera className="w-3.5 h-3.5" />
                                        {activeSubGroup.images.length} Photograph{activeSubGroup.images.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Magazine Layout — Lead hero + grid */}
                            {activeSubGroup.images.length === 1 ? (
                                /* Single image — full-width showcase */
                                <MotionReveal>
                                    <div
                                        className="group relative overflow-hidden rounded-sm aspect-[16/9] bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-500 cursor-pointer shadow-xl"
                                        onClick={() => setLightboxIndex(0)}
                                    >
                                        {renderImage(activeSubGroup.images[0].image_url, activeSubGroup.images[0].title, true, true, activeSubGroup.images[0].focus_point, 'object-cover transition-transform duration-700 group-hover:scale-[1.03]', 1000)}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="inline-flex items-center gap-2 bg-[#070b09]/80 backdrop-blur-sm text-white text-[10px] font-accent font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-sm border border-[#C9A84C]/30">
                                                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> View Full Size
                                            </span>
                                        </div>
                                    </div>
                                </MotionReveal>
                            ) : activeSubGroup.images.length === 2 ? (
                                /* Two images — side by side */
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {activeSubGroup.images.map((image, index) => (
                                        <MotionReveal key={image.id} delay={index * 80}>
                                            <div
                                                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
                                                onClick={() => setLightboxIndex(index)}
                                            >
                                                {renderImage(image.image_url, image.title, true, true, image.focus_point, 'object-cover transition-transform duration-700 group-hover:scale-[1.04]', 800)}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                                <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <p className="text-white text-sm font-display font-bold">{image.title}</p>
                                                    <span className="inline-flex items-center gap-1.5 mt-2 text-[#C9A84C] text-[10px] font-accent font-bold tracking-[0.18em] uppercase">
                                                        <Sparkles className="w-3 h-3" /> Inspect
                                                    </span>
                                                </div>
                                            </div>
                                        </MotionReveal>
                                    ))}
                                </div>
                            ) : (
                                /* 3+ images — Lead hero image + staggered grid */
                                <div className="space-y-6">
                                    {/* Lead Image — cinematic widescreen */}
                                    <MotionReveal>
                                        <div
                                            className="group relative overflow-hidden rounded-sm aspect-[21/9] md:aspect-[2.4/1] bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-500 cursor-pointer shadow-xl"
                                            onClick={() => setLightboxIndex(0)}
                                        >
                                            {renderImage(activeSubGroup.images[0].image_url, activeSubGroup.images[0].title, true, true, activeSubGroup.images[0].focus_point, 'object-cover transition-transform duration-700 group-hover:scale-[1.03]', 1200)}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                <div>
                                                    <p className="text-white font-display font-bold text-lg md:text-xl">{activeSubGroup.images[0].title}</p>
                                                    {activeSubGroup.images[0].description && (
                                                        <p className="text-white/60 text-sm font-light mt-1 max-w-lg line-clamp-1">{activeSubGroup.images[0].description}</p>
                                                    )}
                                                </div>
                                                <span className="inline-flex items-center gap-2 bg-[#070b09]/80 backdrop-blur-sm text-white text-[10px] font-accent font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-sm border border-[#C9A84C]/30 flex-shrink-0">
                                                    <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> View
                                                </span>
                                            </div>
                                        </div>
                                    </MotionReveal>

                                    {/* Remaining images — elegant masonry-ish grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                        {activeSubGroup.images.slice(1).map((image, index) => (
                                            <MotionReveal key={image.id} delay={Math.min((index + 1) * 40, 300)}>
                                                <div
                                                    className={`group relative overflow-hidden rounded-sm bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                                                        index === 0 && activeSubGroup.images.length > 3
                                                            ? 'aspect-[4/5] md:row-span-2'
                                                            : 'aspect-[4/3]'
                                                    }`}
                                                    onClick={() => setLightboxIndex(index + 1)}
                                                >
                                                    {renderImage(image.image_url, image.title, true, index < 3, image.focus_point, 'object-cover transition-transform duration-700 group-hover:scale-[1.05]', 600)}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b09]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                        <p className="text-white text-sm font-display font-bold line-clamp-1">{image.title}</p>
                                                        <span className="inline-flex items-center gap-1.5 mt-1.5 text-[#C9A84C] text-[10px] font-accent font-bold tracking-[0.18em] uppercase">
                                                            <Sparkles className="w-3 h-3" /> Inspect
                                                        </span>
                                                    </div>
                                                </div>
                                            </MotionReveal>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* ═══════ LEVEL 1: Sub-group Collection Tiles ═══════ */
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subGroupTiles.map((tile, index) => {
                                    const displayUrl = toDirectImageUrl(tile.coverImage.image_url)
                                    return (
                                        <MotionReveal key={`${tile.category}::${tile.name}`} delay={index < 3 ? 0 : Math.min((Math.floor(index / 3)) * 80, 300)} className="h-full">
                                            <div
                                                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-[#070b09] border border-border hover:border-[#C9A84C] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
                                                onClick={() => openSubGroup(tile)}
                                            >
                                                {renderImage(tile.coverImage.image_url, tile.name, true, index < 6, tile.coverImage.focus_point, 'object-cover transition-transform duration-700 group-hover:scale-105', 500)}

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

            {/* ───── Premium Full-Screen Lightbox ───── */}
            {lightboxImage && (() => {
                const lightboxUrl = toDirectImageUrl(lightboxImage.image_url)
                const totalImages = activeSubGroup?.images.length ?? 0
                const currentNum = (lightboxIndex ?? 0) + 1

                return (
                    <div
                        className="fixed inset-0 z-[60] flex flex-col"
                        style={{ backgroundColor: 'rgba(7, 11, 9, 0.97)' }}
                    >
                        {/* ── Top Bar ── */}
                        <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5 border-b border-white/8 bg-[#070b09]/60 backdrop-blur-xl flex-shrink-0 z-10">
                            <div className="min-w-0">
                                <span className="text-[#C9A84C] text-[9px] md:text-[10px] font-accent font-bold tracking-[0.3em] uppercase block">
                                    {activeSubGroup?.category}
                                </span>
                                <h3 className="text-white font-display font-bold text-base md:text-lg truncate mt-0.5">
                                    {activeSubGroup?.name}
                                </h3>
                            </div>
                            <div className="flex items-center gap-5 flex-shrink-0">
                                <span className="text-white/40 text-[11px] font-accent font-bold tracking-[0.2em] uppercase">
                                    {currentNum} <span className="text-white/20">of</span> {totalImages}
                                </span>
                                <button
                                    className="p-2.5 rounded-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                                    onClick={closeLightbox}
                                    aria-label="Close lightbox"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* ── Main Image Area ── */}
                        <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-0">
                            {/* Navigation Arrows */}
                            {lightboxIndex !== null && lightboxIndex > 0 && (
                                <button
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#C9A84C] text-white/70 hover:text-[#070b09] transition-all duration-300 border border-white/10 hover:border-[#C9A84C] backdrop-blur-sm"
                                    onClick={goPrev}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}
                            {lightboxIndex !== null && activeSubGroup && lightboxIndex < activeSubGroup.images.length - 1 && (
                                <button
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#C9A84C] text-white/70 hover:text-[#070b09] transition-all duration-300 border border-white/10 hover:border-[#C9A84C] backdrop-blur-sm"
                                    onClick={goNext}
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            )}

                            {/* Image Display — always use <img> for reliability with external URLs */}
                            <div className="w-full h-full flex items-center justify-center px-16 md:px-24 py-6">
                                {lightboxUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={lightboxUrl}
                                        src={toSizedImageUrl(lightboxImage.image_url, 1600) || lightboxUrl}
                                        alt={lightboxImage.title}
                                        className="max-w-full max-h-full object-contain rounded-sm select-none"
                                        style={{
                                            filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.6))',
                                        }}
                                        draggable={false}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-3 text-white/30">
                                        <Camera className="w-12 h-12" />
                                        <p className="text-sm font-accent tracking-wider uppercase">Image unavailable</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Bottom Filmstrip ── */}
                        {activeSubGroup && totalImages > 1 && (
                            <div className="flex-shrink-0 border-t border-white/8 bg-[#070b09]/80 backdrop-blur-xl py-3 px-4 md:px-8">
                                <div className="flex gap-2 justify-center overflow-x-auto max-w-4xl mx-auto scrollbar-hide">
                                    {activeSubGroup.images.map((img, i) => {
                                        const thumbUrl = toSizedImageUrl(img.image_url, 200)
                                        const isActive = i === lightboxIndex
                                        return (
                                            <button
                                                key={img.id}
                                                onClick={() => setLightboxIndex(i)}
                                                className={`flex-shrink-0 rounded-sm overflow-hidden transition-all duration-300 ${
                                                    isActive
                                                        ? 'w-20 h-14 md:w-24 md:h-16 ring-2 ring-[#C9A84C] ring-offset-1 ring-offset-[#070b09] opacity-100 scale-105'
                                                        : 'w-16 h-11 md:w-20 md:h-14 opacity-35 hover:opacity-70 hover:scale-[1.02]'
                                                }`}
                                            >
                                                {thumbUrl && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={thumbUrl!}
                                                        alt={img.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
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
