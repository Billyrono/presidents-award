'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'

const categories = ['All', 'Adventure', 'Service', 'Skills', 'Recreation', 'Recognition']

const galleryImages = [
    {
        title: 'Aberdares Expedition',
        category: 'Adventure',
        description: 'Navigating through the challenging terrain of Aberdares National Park.',
        src: '/Gallery/Adventure/Aberdare/IMG_4627.jpg',
    },
    {
        title: 'Ngong Hills Trek',
        category: 'Adventure',
        description: 'Traversing the scenic seven ridges of Ngong Hills.',
        src: '/Gallery/Adventure/Ngong/IMG_20250201_112340.jpg',
    },
    {
        title: 'Kianyaga Water Project',
        category: 'Service',
        description: 'Gold Residential project: water project at Kianyaga Children\'s Home.',
        src: '/Gallery/Service/Water project/f84f82b4-15a0-4918-a077-3e264a3ef870.jpg',
    },
    {
        title: 'Gold Award Ceremony',
        category: 'Recognition',
        description: 'Gold Award presentation at State House by the President of Kenya.',
        src: '/Gallery/Recognition/Award ceremony/award-ceremony.jpg',
    },
    {
        title: 'Award Group Photo',
        category: 'Recognition',
        description: 'Celebrating award completion at Kirinyaga University.',
        src: '/Gallery/Recognition/Award group/DSC_3006.JPG',
    },
    {
        title: 'Leadership Workshop',
        category: 'Skills',
        description: 'Interactive leadership and public speaking development sessions.',
        src: null, // placeholder
    },
    {
        title: 'First Aid Training',
        category: 'Skills',
        description: 'Learning life-saving first aid skills during skills development.',
        src: null, // placeholder
    },
    {
        title: 'University Sports',
        category: 'Recreation',
        description: 'Physical recreation activities promoting fitness and wellness.',
        src: null, // placeholder
    },
    {
        title: 'Team Building',
        category: 'Recreation',
        description: 'Building camaraderie through group activities and university sports.',
        src: null, // placeholder
    },
    {
        title: 'Camp Life',
        category: 'Adventure',
        description: 'Bonding during adventurous journeys in the Aberdares.',
        src: null, // placeholder
    },
    {
        title: 'Mentorship Program',
        category: 'Service',
        description: 'Awardees mentoring younger participants in skills development.',
        src: null, // placeholder
    },
    {
        title: 'Raimu Special Unit',
        category: 'Service',
        description: 'Thematic painting of classrooms for children with special needs.',
        src: null, // placeholder
    },
]

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory)

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((image, index) => (
                            <ScrollReveal key={`${activeCategory}-${index}`} delay={index * 60}>
                                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-xl">
                                    {image.src ? (
                                        <Image
                                            src={image.src}
                                            alt={image.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        /* Placeholder for missing images */
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
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No images in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
