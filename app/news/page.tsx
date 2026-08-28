'use client'

import { useEffect, useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { ArrowRight, Calendar, BookOpen, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { getNews } from '@/lib/content'
import type { NewsArticle } from '@/lib/types'

export default function ChroniclesPage() {
    const [newsItems, setNewsItems] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNews().then(data => { setNewsItems(data); setLoading(false) })
    }, [])

    const featured = newsItems.filter(n => n.featured)
    const rest = newsItems.filter(n => !n.featured)
    const leadArticle = featured.length > 0 ? featured[0] : (newsItems.length > 0 ? newsItems[0] : null)
    const secondaryFeatured = featured.slice(1)

    return (
        <>
            <PageHero
                eyebrow="The Chapter Gazette · Official Dispatches"
                title="The Chronicles"
                titleGold="Dispatches, Records &amp; Bulletins"
                subtitle="Official announcements, expedition logs, investiture reports, and transformative stories from the Kirinyaga University Chapter."
                image="/Hero/Home/hero-bg.jpg"
            />

            {/* Editorial Lead Section */}
            <section className="py-20 md:py-28 px-6 md:px-10 bg-background">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : newsItems.length === 0 ? (
                        <MotionReveal className="text-center py-24">
                            <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                            <p className="text-muted-foreground text-lg font-light">No chronicles published yet. Check back soon for official dispatches.</p>
                        </MotionReveal>
                    ) : (
                        <div className="space-y-20">

                            {/* Lead Story Magazine Spread */}
                            {leadArticle && (
                                <MotionReveal>
                                    <div className="border-b border-border pb-16">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                                            <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">
                                                Lead Gazette Dispatch
                                            </p>
                                        </div>

                                        <Link href={`/news/${leadArticle.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                            {(leadArticle as any).image_url && (
                                                <div className="lg:col-span-7 overflow-hidden rounded-sm aspect-[16/10] bg-[#070b09] border border-border group-hover:border-[#C9A84C] transition-colors duration-400">
                                                    <img
                                                        src={(leadArticle as any).image_url}
                                                        alt={leadArticle.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                            )}

                                            <div className={`${(leadArticle as any).image_url ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-accent font-bold tracking-[0.2em] uppercase text-[#C9A84C] border border-[#C9A84C]/30 px-2.5 py-0.5 rounded-sm bg-[#C9A84C]/5">
                                                        {leadArticle.category || 'Gazette'}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground font-mono">{leadArticle.date}</span>
                                                </div>

                                                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                                    {leadArticle.title}
                                                </h2>

                                                <p className="text-foreground/65 text-base font-light leading-relaxed">
                                                    {leadArticle.description}
                                                </p>

                                                <div className="pt-2">
                                                    <span className="inline-flex items-center gap-2 text-[11px] font-accent font-bold tracking-[0.2em] uppercase text-primary border-b border-primary/30 pb-0.5 group-hover:border-primary group-hover:gap-3 transition-all">
                                                        <span>Read Complete Dispatch</span>
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </MotionReveal>
                            )}

                            {/* Secondary Featured Dispatches */}
                            {secondaryFeatured.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="h-px w-8 bg-[#C9A84C]/50" />
                                        <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-muted-foreground">
                                            Featured Bulletins
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {secondaryFeatured.map((item, i) => (
                                            <MotionReveal key={item.id} delay={i * 0.08} className="h-full">
                                                <Link href={`/news/${item.slug}`} className="group flex flex-col justify-between h-full bg-card border border-border hover:border-primary/40 rounded-sm p-6 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-400">
                                                    <div>
                                                        {(item as any).image_url && (
                                                            <div className="aspect-[16/9] overflow-hidden rounded-sm mb-5 bg-[#070b09]">
                                                                <img
                                                                    src={(item as any).image_url}
                                                                    alt={item.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-3 mb-3 text-xs">
                                                            <span className="text-[#C9A84C] font-accent font-bold tracking-wider uppercase text-[10px]">{item.category}</span>
                                                            <span className="text-muted-foreground/60">·</span>
                                                            <span className="text-muted-foreground font-mono text-[11px]">{item.date}</span>
                                                        </div>

                                                        <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                                                            {item.title}
                                                        </h3>

                                                        <p className="text-foreground/60 text-sm font-light leading-relaxed line-clamp-3">
                                                            {item.description}
                                                        </p>
                                                    </div>

                                                    <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs text-primary font-bold tracking-wider uppercase">
                                                        <span>Read More</span>
                                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </Link>
                                            </MotionReveal>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Chronological Archive Index */}
                            {rest.length > 0 && (
                                <div className="pt-8">
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="h-px w-8 bg-[#C9A84C]/50" />
                                        <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-muted-foreground">
                                            Chronicle Archive
                                        </p>
                                    </div>

                                    <div className="divide-y divide-border border-y border-border">
                                        {rest.map((item, i) => (
                                            <MotionReveal key={item.id} delay={i * 0.05}>
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                    className="group flex flex-col md:flex-row md:items-center justify-between py-6 px-4 -mx-4 hover:bg-muted/40 transition-colors gap-4"
                                                >
                                                    <div className="flex items-start md:items-center gap-6">
                                                        <span className="text-xs text-muted-foreground font-mono w-28 flex-shrink-0">
                                                            {item.date}
                                                        </span>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-[9.5px] font-accent font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
                                                                    {item.category}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-lg md:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                                                                {item.title}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-xs font-accent font-bold tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 self-end md:self-auto">
                                                        <span>Inspect</span>
                                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </Link>
                                            </MotionReveal>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter / Join Strip */}
            <section className="py-20 px-6 md:px-10 bg-[#070b09] text-white border-t border-[#C9A84C]/25">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-[#C9A84C]/50" />
                        <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">Be Part of the Chronicle</p>
                        <span className="h-px w-8 bg-[#C9A84C]/50" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                        Write Your Chapter in Our History
                    </h2>
                    <p className="text-white/65 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                        Every expedition, community project, and Gold Award begins with a candidate&apos;s single decision to enrol.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-2.5 bg-[#C9A84C] hover:bg-[#d8b758] text-[#070b09] font-bold text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                        >
                            <span>Enrol Candidate Application</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
