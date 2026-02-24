'use client'

import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Calendar, ArrowLeft, ArrowRight, User, Tag, Clock, Share2 } from 'lucide-react'
import { getNewsBySlug, getNewsSlugs, toDirectImageUrl } from '@/lib/content'
import type { NewsArticle } from '@/lib/types'

const categoryColors: Record<string, string> = {
    'Expeditions': 'bg-primary/10 text-primary',
    'Recognition': 'bg-[#C9A84C]/10 text-[#C9A84C]',
    'Programs': 'bg-teal-600/10 text-teal-600',
    'Service': 'bg-red-500/10 text-red-600',
    'Growth': 'bg-teal-600/10 text-teal-600',
}

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const [article, setArticle] = useState<NewsArticle | null>(null)
    const [allSlugs, setAllSlugs] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const [a, slugs] = await Promise.all([
                getNewsBySlug(slug),
                getNewsSlugs(),
            ])
            setArticle(a)
            setAllSlugs(slugs)
            setLoading(false)
        }
        fetch()
    }, [slug])

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
    }

    if (!article) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <h1 className="text-2xl font-display font-bold text-foreground mb-2">Article Not Found</h1>
                <p className="text-muted-foreground mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/news" className="text-primary font-semibold hover:underline">← Back to News</Link>
            </div>
        )
    }

    const currentIndex = allSlugs.indexOf(slug)
    const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
    const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null
    const paragraphs = (article.content || '').split('\n\n').filter(Boolean)
    const featuredUrl = toDirectImageUrl(article.featured_image)
    const readTime = Math.max(1, Math.ceil((article.content || '').split(' ').length / 200))

    return (
        <>
            {/* Blog Hero */}
            <section className="relative bg-primary pt-12 pb-20 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <Link href="/news" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All News
                    </Link>

                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[article.category] || 'bg-white/10 text-white'}`}>
                            {article.category}
                        </span>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> {article.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> {readTime} min read
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Description / Subtitle */}
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                        {article.description}
                    </p>

                    {/* Author / Published by */}
                    {article.published_by && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-white/80" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{article.published_by}</p>
                                <p className="text-white/50 text-xs">Published on {article.date}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Image — overlapping hero */}
            {featuredUrl && (
                <section className="px-4 md:px-8 -mt-10 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={featuredUrl}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Content */}
            <section className="py-16 px-4 md:px-8 bg-background">
                <div className="max-w-3xl mx-auto">
                    {/* Article body — blog typography */}
                    <article className="prose-custom">
                        {paragraphs.map((paragraph, i) => {
                            // Support basic formatting: lines starting with ## become h2, ### become h3
                            if (paragraph.startsWith('### ')) {
                                return (
                                    <ScrollReveal key={i} delay={i * 40}>
                                        <h3 className="text-xl font-display font-bold text-foreground mt-10 mb-4">
                                            {paragraph.replace('### ', '')}
                                        </h3>
                                    </ScrollReveal>
                                )
                            }
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <ScrollReveal key={i} delay={i * 40}>
                                        <h2 className="text-2xl font-display font-bold text-foreground mt-12 mb-4">
                                            {paragraph.replace('## ', '')}
                                        </h2>
                                    </ScrollReveal>
                                )
                            }
                            return (
                                <ScrollReveal key={i} delay={i * 40}>
                                    <p className="text-foreground/80 leading-[1.9] text-[1.125rem] mb-6 font-serif">
                                        {paragraph}
                                    </p>
                                </ScrollReveal>
                            )
                        })}
                    </article>

                    {/* Share + Tags */}
                    <div className="mt-12 pt-8 border-t border-border">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-muted-foreground" />
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[article.category] || 'bg-muted text-foreground'}`}>
                                    {article.category}
                                </span>
                            </div>
                            {article.published_by && (
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" />
                                    Published by <strong className="text-foreground">{article.published_by}</strong>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Prev / Next Navigation */}
                    <div className="mt-10 pt-8 border-t border-border">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                            {prevSlug ? (
                                <Link href={`/news/${prevSlug}`} className="group flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Previous Story</span>
                                </Link>
                            ) : <div />}
                            <div className="text-center">
                                <Link href="/news" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                                    All News
                                </Link>
                            </div>
                            {nextSlug ? (
                                <Link href={`/news/${nextSlug}`} className="group flex items-center justify-end gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                                    <span>Next Story</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : <div />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
