'use client'

import { useEffect, useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getNews } from '@/lib/content'
import type { NewsArticle } from '@/lib/types'

const categoryColors: Record<string, string> = {
    'Expeditions': 'bg-primary/10 text-primary',
    'Recognition': 'bg-[#C9A84C]/10 text-[#C9A84C]',
    'Programs': 'bg-teal-600/10 text-teal-600',
    'Service': 'bg-red-500/10 text-red-600',
    'Growth': 'bg-teal-600/10 text-teal-600',
}

export default function NewsPage() {
    const [newsItems, setNewsItems] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNews().then(data => { setNewsItems(data); setLoading(false) })
    }, [])

    if (loading) return (
        <>
            <PageHero title="News & Updates" subtitle="Stay informed about our chapter's activities, expeditions, and achievements." badge="Latest Updates" badgeIcon="newspaper" />
            <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        </>
    )

    return (
        <>
            <PageHero
                title="News & Updates"
                subtitle="Stay informed about our chapter's activities, expeditions, and achievements."
                badge="Latest Updates"
                badgeIcon="newspaper"
            />

            {/* Featured News */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Featured Stories</h2>
                            <div className="w-24 h-1 bg-primary mx-auto" />
                        </div>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {newsItems.filter(n => n.featured).map((item, i) => (
                            <ScrollReveal key={item.id} delay={i * 100}>
                                <Link href={`/news/${item.slug}`} className="block h-full">
                                    <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/15 hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full group">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Calendar className="w-4 h-4 text-teal-600" />
                                            <span className="text-sm font-semibold text-teal-600">{item.date}</span>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[item.category] || 'bg-muted text-foreground'}`}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                                        <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                                            Read more <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* All News */}
                    <ScrollReveal>
                        <h2 className="text-2xl font-display font-bold text-foreground mb-8">All Updates</h2>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {newsItems.filter(n => !n.featured).map((item, i) => (
                            <ScrollReveal key={item.id} delay={i * 60}>
                                <Link href={`/news/${item.slug}`} className="block">
                                    <div className="group bg-muted/30 border-l-4 border-primary/20 hover:border-primary pl-6 pr-6 py-6 rounded-lg transition-all hover:shadow-md hover:bg-primary/5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-teal-600">{item.date}</span>
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[item.category] || 'bg-muted text-foreground'}`}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                                        <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                                            Read more <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 md:px-8 bg-muted/30">
                <ScrollReveal>
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Want to be part of the story?</h2>
                        <p className="text-muted-foreground mb-6">Join our chapter and create your own transformative experience.</p>
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Apply Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </>
    )
}
