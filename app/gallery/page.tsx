'use client'

import { useEffect, useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { getGallery } from '@/lib/content'
import { toDirectImageUrl } from '@/lib/content'
import type { GalleryImage as GalleryImageType } from '@/lib/types'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<string[]>(['All'])
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    useEffect(() => {
        getGallery().then(data => {
            // Only show entries that have a real image URL on public gallery
            const withImages = data.filter(img => img.image_url && img.image_url.trim() !== '')
            setGalleryImages(withImages)
            const cats = ['All', ...new Set(withImages.map(img => img.category).filter(Boolean))]
            setCategories(cats)
            setLoading(false)
        })
    }, [])

    const filtered = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory)

    const lightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

    const goPrev = () => {
        if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
    }
    const goNext = () => {
        if (lightboxIndex !== null && lightboxIndex < filtered.length - 1) setLightboxIndex(lightboxIndex + 1)
    }

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null)
            if (e.key === 'ArrowLeft') goPrev()
            if (e.key === 'ArrowRight') goNext()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    })



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
                                onClick={() => setActiveCategory(cat)}
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

            {/* Gallery Grid */}
            <section className="py-16 px-4 md:px-8 bg-background">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((image, index) => {
                                const displayUrl = toDirectImageUrl(image.image_url)
                                return (
                                    <ScrollReveal key={image.id} delay={index * 60}>
                                        <div
                                            className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-xl"
                                            onClick={() => displayUrl && setLightboxIndex(index)}
                                        >
                                            {displayUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={displayUrl}
                                                    alt={image.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    style={{ objectPosition: `center ${image.focus_point ?? 50}%` }}
                                                />
                                            ) : image.coming_soon ? (
                                                <div className="absolute inset-0 bg-[#C9A84C]/8">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-center px-4">
                                                            <p className="text-[#C9A84C]/60 font-display text-lg font-bold">{image.title}</p>
                                                            <p className="text-muted-foreground/50 text-xs mt-1">Coming Soon</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 bg-teal-600/8">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-center px-4">
                                                            <p className="text-primary/40 font-display text-lg font-bold">{image.title}</p>
                                                            <p className="text-muted-foreground/40 text-xs mt-1">Photo coming soon</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">{image.category}</span>
                                                <h3 className="text-white font-display font-bold text-lg mb-1">{image.title}</h3>
                                                <p className="text-white/80 text-sm">{image.description}</p>
                                                {displayUrl && (
                                                    <div className="absolute top-4 right-4">
                                                        <ZoomIn className="w-5 h-5 text-white/60" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    )}

                    {!loading && filtered.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No images in this category yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ───── Lightbox ───── */}
            {lightboxImage && (() => {
                const lightboxUrl = toDirectImageUrl(lightboxImage.image_url)
                return (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* Close */}
                        <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10" onClick={() => setLightboxIndex(null)}>
                            <X className="w-7 h-7" />
                        </button>

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
                        {lightboxIndex !== null && lightboxIndex < filtered.length - 1 && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                                onClick={(e) => { e.stopPropagation(); goNext() }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}

                        {/* Image — full view, no crop */}
                        <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                            {lightboxUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={lightboxUrl}
                                    alt={lightboxImage.title}
                                    className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                                />
                            )}
                            <div className="text-center mt-4">
                                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">{lightboxImage.category}</span>
                                <h3 className="text-white font-display font-bold text-lg mt-1">{lightboxImage.title}</h3>
                                {lightboxImage.description && <p className="text-white/60 text-sm mt-1">{lightboxImage.description}</p>}
                                <p className="text-white/30 text-xs mt-2">{lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filtered.length}</p>
                            </div>
                        </div>
                    </div>
                )
            })()}
        </>
    )
}
