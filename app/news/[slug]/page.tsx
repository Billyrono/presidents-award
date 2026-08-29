'use client'

import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { MotionReveal } from '@/components/motion-reveal'
import { Calendar, ArrowLeft, ArrowRight, User, Clock, Share2, Award, Bookmark } from 'lucide-react'
import { getNewsBySlug, getNewsSlugs, toDirectImageUrl } from '@/lib/content'
import type { NewsArticle } from '@/lib/types'

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
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#070b09]">
                <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!article) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#070b09] text-white">
                <h1 className="text-3xl font-display font-bold mb-3">Gazette Dispatch Not Found</h1>
                <p className="text-white/60 mb-8 font-light">The requested chronicle record is not available or has been moved.</p>
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-xs font-accent font-bold tracking-widest uppercase text-[#C9A84C] border-b border-[#C9A84C]/40 pb-0.5"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Chronicles
                </Link>
            </div>
        )
    }

    const currentIndex = allSlugs.indexOf(slug)
    const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
    const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null
    const featuredUrl = toDirectImageUrl(article.featured_image)
    const readTime = Math.max(1, Math.ceil((article.content || '').split(' ').length / 200))

    return (
        <>
            {/* Editorial Article Hero — NYT Gazette Style */}
            <section className="relative bg-[#070b09] text-white pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-10 overflow-hidden border-b border-[#C9A84C]/25">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                        }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {/* Navigation */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-xs font-accent font-bold tracking-[0.2em] uppercase text-[#C9A84C] hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Gazette</span>
                        </Link>
                        <span className="text-[10px] font-accent font-bold tracking-[0.25em] uppercase text-white/40">
                            Kirinyaga Chapter Dispatch
                        </span>
                    </div>

                    {/* Classic NYT-Style Masthead Banner */}
                    <div className="mb-6">
                        <p className="font-masthead text-lg sm:text-xl md:text-2xl text-[#C9A84C] tracking-wide select-none drop-shadow-sm">
                            The Chapter Gazette
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-1 text-[9.5px] font-accent font-bold tracking-[0.22em] uppercase text-white/40">
                            <span>Vol. {new Date().getFullYear() - 2017}</span>
                            <span>·</span>
                            <span>{article.category || 'Official Record'}</span>
                            <span>·</span>
                            <span>{article.date}</span>
                        </div>
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/35 to-transparent mt-3" />
                    </div>

                    {/* Article Headline — Chomsky / Old English / Cloister Black style */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-masthead font-normal text-white mb-6 leading-[1.18] tracking-normal max-w-3xl mx-auto drop-shadow-md">
                        {article.title}
                    </h1>

                    {/* Standfirst / Summary (Deck) */}
                    {article.description && (
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-serif italic max-w-2xl mx-auto mb-8">
                            {article.description}
                        </p>
                    )}

                    {/* Framed Editorial Byline Bar */}
                    <div className="border-y border-white/10 py-3.5 max-w-xl mx-auto flex items-center justify-between text-xs text-white/60 font-serif">
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 uppercase tracking-widest text-[10px] font-sans font-bold">By</span>
                            <span className="text-white font-medium">{article.published_by || 'Secretariat Staff'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/45 text-[11px] font-sans font-medium uppercase tracking-wider">
                            <span>{article.date}</span>
                            <span>·</span>
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overlapping Hero Plate Image (if present) */}
            {featuredUrl && (
                <section className="px-6 md:px-10 -mt-10 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-[16/9] rounded-sm overflow-hidden shadow-2xl border border-[#C9A84C]/30 bg-[#070b09]">
                            {featuredUrl.startsWith('/') ? (
                                <Image
                                    src={featuredUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                                    priority
                                    quality={90}
                                />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={featuredUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Article Content — NYT Editorial Typesetting */}
            <section className="py-20 px-6 md:px-10 bg-background">
                <div className="max-w-3xl mx-auto">
                    <article className="space-y-6 text-foreground/85 leading-[1.9] text-base md:text-lg font-serif font-normal">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-12 mb-6 tracking-tight border-b border-border pb-2">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mt-12 mb-4 tracking-tight">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-lg md:text-xl font-display font-bold text-foreground mt-10 mb-4 tracking-tight">{children}</h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-foreground/85 leading-[1.9] text-base md:text-lg mb-6 font-serif">{children}</p>
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-semibold text-foreground">{children}</strong>
                                ),
                                em: ({ children }) => (
                                    <em className="italic text-foreground/90 font-serif">{children}</em>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80 font-serif">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/80 font-serif">{children}</ol>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-foreground text-xl md:text-2xl leading-relaxed">
                                        {children}
                                    </blockquote>
                                ),
                            }}
                        >
                            {article.content || ''}
                        </ReactMarkdown>
                    </article>

                    {/* Pagination Nav between Articles */}
                    <div className="mt-16 pt-10 border-t border-border flex items-center justify-between gap-4">
                        {prevSlug ? (
                            <Link
                                href={`/news/${prevSlug}`}
                                className="inline-flex items-center gap-2 text-xs font-accent font-bold tracking-widest uppercase text-primary hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Previous Dispatch
                            </Link>
                        ) : <div />}

                        {nextSlug && (
                            <Link
                                href={`/news/${nextSlug}`}
                                className="inline-flex items-center gap-2 text-xs font-accent font-bold tracking-widest uppercase text-primary hover:text-foreground transition-colors"
                            >
                                Next Dispatch <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
