'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Zap, Dumbbell, Compass, Home as HomeIcon, Check } from 'lucide-react'
import { MotionReveal } from '@/components/motion-reveal'
import { Counter } from '@/components/counter'
import { Hero } from '@/components/hero'
import { UpcomingEventsSection } from '@/components/upcoming-events-section'
import { supabase } from '@/lib/supabase'

// ─── Data ─────────────────────────────────────────────────────────────────────

const levels = [
    {
        name: 'Bronze',
        tagline: 'The First Step',
        duration: '6 months minimum',
        description: 'Build foundational habits through service, skills development, and physical challenge. Your journey into the Award begins here.',
        activities: ['Voluntary Service', 'Skills Development', 'Physical Recreation', 'Adventurous Journey'],
        style: {
            border: 'border-amber-800/25',
            accent: 'text-amber-700',
            badge: 'bg-amber-700/10 text-amber-700 border-amber-700/20',
            dot: 'bg-amber-700',
        },
    },
    {
        name: 'Silver',
        tagline: 'The Commitment',
        duration: '12 months minimum',
        description: 'Deepen your dedication. Push further, serve more meaningfully, and begin to emerge as a leader within your community.',
        activities: ['Voluntary Service', 'Skills Development', 'Physical Recreation', 'Adventurous Journey'],
        style: {
            border: 'border-slate-400/25',
            accent: 'text-slate-500',
            badge: 'bg-slate-400/10 text-slate-500 border-slate-400/20',
            dot: 'bg-slate-400',
        },
    },
    {
        name: 'Gold',
        tagline: 'The Pinnacle',
        duration: '18 months minimum',
        description: 'The highest distinction of the Award. A residential project, a State House ceremony, and a certificate recognised across 130+ countries.',
        activities: ['Voluntary Service', 'Skills Development', 'Physical Recreation', 'Adventurous Journey', 'Residential Project'],
        featured: true,
        style: {
            border: 'border-[#C9A84C]/40',
            accent: 'text-[#C9A84C]',
            badge: 'bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/25',
            dot: 'bg-[#C9A84C]',
        },
    },
]

const pillars = [
    { num: '01', icon: Heart, title: 'Voluntary Service', description: 'Dedicate time to your community. Develop empathy, leadership, and civic responsibility through meaningful, sustained service.', slug: 'voluntary-service' },
    { num: '02', icon: Zap, title: 'Skills Development', description: 'Master a new skill or deepen an existing one. Creative, practical, or intellectual — the pursuit of excellence is entirely yours.', slug: 'skills-development' },
    { num: '03', icon: Dumbbell, title: 'Physical Recreation', description: 'Commit to your physical wellbeing through sport, fitness, or outdoor activity. Strengthen the body that carries your ambition.', slug: 'physical-recreation' },
    { num: '04', icon: Compass, title: 'Adventurous Journey', description: 'Plan and complete an expedition through Kenya\'s wilderness. Navigate, collaborate, and discover what resilience truly means.', slug: 'adventurous-journey' },
    { num: '05', icon: HomeIcon, title: 'Residential Project', description: 'Gold level only. Spend purposeful time away from home in a shared residential environment alongside new companions.', slug: 'gold-residential' },
]

const impacts = [
    { to: 20, suffix: '+', label: 'Gold Award Recipients', sub: 'Honoured at State House, Nairobi' },
    { to: 4, suffix: '', label: 'Adventurous Journeys', sub: 'Completed across Kenya' },
    { to: 3, suffix: '', label: 'Residential Projects', sub: 'Transformative experiences' },
    { to: 5, suffix: '', label: 'Award Pillars', sub: 'A complete development framework' },
]

type NewsItem = {
    id: string
    title: string
    excerpt?: string
    image_url?: string
    created_at: string
    slug?: string
}

// ─── Eyebrow label ─────────────────────────────────────────────────────────────

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <span className={`h-px w-8 ${light ? 'bg-[#C9A84C]/60' : 'bg-[#C9A84C]/50'}`} />
            <p className={`text-[10px] font-bold tracking-[0.25em] uppercase ${light ? 'text-[#C9A84C]/90' : 'text-muted-foreground'}`}>
                {children}
            </p>
        </div>
    )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
    const [news, setNews] = useState<NewsItem[]>([])

    useEffect(() => {
        supabase
            .from('news')
            .select('id, title, excerpt, image_url, created_at, slug')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(3)
            .then(({ data }) => { if (data) setNews(data) })
    }, [])

    return (
        <>
            <Hero />

            {/* ── 1. MANIFESTO ──────────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-foreground overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <MotionReveal>
                        <div className="flex gap-6 md:gap-10 items-stretch">
                            {/* Gold left border */}
                            <div className="w-[3px] bg-gradient-to-b from-[#C9A84C]/80 via-[#C9A84C]/40 to-transparent flex-shrink-0 rounded-full" />
                            <div>
                                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold italic text-white leading-tight">
                                    &ldquo;The Award doesn&apos;t change{' '}
                                    <span className="text-[#C9A84C]">what you do</span>
                                    {' '}—<br className="hidden md:block" />
                                    it changes{' '}
                                    <span className="text-[#C9A84C]">who you become.</span>&rdquo;
                                </p>
                                <p className="mt-8 text-white/35 text-[10px] tracking-[0.3em] uppercase font-semibold">
                                    President&apos;s Award · Kirinyaga University Chapter
                                </p>
                            </div>
                        </div>
                    </MotionReveal>
                </div>
            </section>

            {/* ── 2. ABOUT THE AWARD ────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-[1fr_0.6fr] gap-16 md:gap-24 items-center">
                        {/* Left — editorial copy */}
                        <MotionReveal>
                            <Eyebrow>About the Award</Eyebrow>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-8">
                                More Than a Programme.
                                <span className="block text-primary italic">A Transformation.</span>
                            </h2>
                            <div className="space-y-5 text-foreground/70 leading-relaxed text-base md:text-lg font-light mb-8">
                                <p>
                                    The President&apos;s Award — Kirinyaga University Chapter is Kenya&apos;s chapter of the globally
                                    recognised Duke of Edinburgh&apos;s International Award. We stand as a symbol of youth empowerment,
                                    leadership development, and community service.
                                </p>
                                <p>
                                    Our mission is to impact positive life skills and ethical values to young people for a better
                                    society — through structured activities that encourage personal growth and lasting social impact.
                                </p>
                            </div>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.18em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
                            >
                                Our Story <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </MotionReveal>

                        {/* Right — stat column */}
                        <MotionReveal delay={0.15} direction="left">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { num: '20+', label: 'Gold Award Recipients' },
                                    { num: '3', label: 'Award Levels' },
                                    { num: '5', label: 'Award Pillars' },
                                    { num: '2018', label: 'Year Established' },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className="bg-primary/5 border border-primary/10 rounded-sm p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="text-3xl md:text-4xl font-display font-bold text-[#C9A84C] mb-2">{s.num}</div>
                                        <p className="text-[11px] font-semibold tracking-wide uppercase text-foreground/50">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </MotionReveal>
                    </div>
                </div>
            </section>

            {/* ── 3. THE LEVELS ─────────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="text-center mb-16">
                        <Eyebrow>The Levels</Eyebrow>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                            Three Tiers of Distinction
                        </h2>
                        <p className="text-foreground/55 mt-4 text-base font-light max-w-xl mx-auto">
                            Each level demands more. Each reward runs deeper.
                        </p>
                    </MotionReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {levels.map((level, i) => (
                            <MotionReveal key={level.name} delay={i * 0.12}>
                                <div className={`relative h-full border ${level.style.border} ${level.featured ? 'bg-foreground' : 'bg-card'} rounded-sm p-8 hover:-translate-y-2 transition-all duration-400 group`}>
                                    {level.featured && (
                                        <div className="absolute -top-3 left-8">
                                            <span className="bg-[#C9A84C] text-foreground text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                                                Highest Distinction
                                            </span>
                                        </div>
                                    )}
                                    <div className={`inline-flex text-[9px] font-bold tracking-[0.22em] uppercase border px-3 py-1 rounded-sm mb-5 ${level.style.badge}`}>
                                        {level.name}
                                    </div>
                                    <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${level.style.accent}`}>
                                        {level.tagline}
                                    </p>
                                    <p className={`text-sm mb-1 font-medium ${level.featured ? 'text-white/50' : 'text-muted-foreground'}`}>
                                        {level.duration}
                                    </p>
                                    <p className={`text-sm leading-relaxed mb-7 font-light ${level.featured ? 'text-white/70' : 'text-foreground/65'}`}>
                                        {level.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {level.activities.map((act) => (
                                            <li key={act} className="flex items-center gap-2.5 text-xs">
                                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${level.style.dot}`} />
                                                <span className={level.featured ? 'text-white/70' : 'text-foreground/60'}>{act}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </MotionReveal>
                        ))}
                    </div>

                    <MotionReveal delay={0.4} className="text-center mt-12">
                        <Link
                            href="/programs"
                            className="inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.18em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
                        >
                            Explore the Full Programme <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </MotionReveal>
                </div>
            </section>

            {/* ── 4. THE 5 PILLARS ──────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-5xl mx-auto">
                    <MotionReveal className="mb-16">
                        <Eyebrow>The Five Pillars</Eyebrow>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                            A Framework for
                            <span className="block text-primary italic">Whole-Person Growth</span>
                        </h2>
                    </MotionReveal>

                    <div className="divide-y divide-border">
                        {pillars.map((pillar, i) => {
                            const Icon = pillar.icon
                            return (
                                <MotionReveal key={pillar.num} delay={i * 0.08}>
                                    <Link href={`/programs#${pillar.slug}`} className="group flex items-start gap-8 py-8 hover:bg-primary/3 -mx-4 px-4 rounded-sm transition-colors">
                                        <div className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-[#C9A84C]/25 leading-none flex-shrink-0 group-hover:text-[#C9A84C]/50 transition-colors duration-300 w-16 text-right">
                                            {pillar.num}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Icon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                                                <h3 className="text-lg md:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {pillar.title}
                                                </h3>
                                            </div>
                                            <p className="text-foreground/55 text-sm md:text-base leading-relaxed font-light">
                                                {pillar.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                                    </Link>
                                </MotionReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── 5. IMPACT ─────────────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-foreground">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="text-center mb-20">
                        <Eyebrow light>Our Impact</Eyebrow>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                            Building Leaders at
                            <span className="block text-[#C9A84C] italic">Kirinyaga University</span>
                        </h2>
                    </MotionReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {impacts.map((item, i) => (
                            <MotionReveal key={item.label} delay={i * 0.1} className="text-center">
                                <div className="text-5xl md:text-7xl font-display font-bold text-[#C9A84C] mb-3 leading-none">
                                    <Counter to={item.to} suffix={item.suffix} duration={2.2} />
                                </div>
                                <p className="text-white font-semibold text-sm md:text-base mb-1">{item.label}</p>
                                <p className="text-white/35 text-[11px] tracking-wide">{item.sub}</p>
                            </MotionReveal>
                        ))}
                    </div>

                    <MotionReveal delay={0.4} className="text-center mt-16">
                        <Link
                            href="/achievements"
                            className="inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#C9A84C] border-b border-[#C9A84C]/30 pb-0.5 hover:border-[#C9A84C] transition-colors"
                        >
                            View the Honour Roll <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </MotionReveal>
                </div>
            </section>

            {/* ── 6. CHRONICLES PREVIEW ─────────────────────────────────── */}
            {news.length > 0 && (
                <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                    <div className="max-w-7xl mx-auto">
                        <MotionReveal className="flex items-end justify-between mb-14">
                            <div>
                                <Eyebrow>From the Chronicles</Eyebrow>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                                    Latest Dispatches
                                </h2>
                            </div>
                            <Link
                                href="/news"
                                className="hidden md:inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.18em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
                            >
                                All Chronicles <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </MotionReveal>

                        <div className="grid md:grid-cols-3 gap-6">
                            {news.map((item, i) => (
                                <MotionReveal key={item.id} delay={i * 0.1}>
                                    <Link
                                        href={`/news/${item.slug || item.id}`}
                                        className="group block bg-card border border-border rounded-sm overflow-hidden hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl transition-all duration-400"
                                    >
                                        {item.image_url ? (
                                            <div className="aspect-[16/9] overflow-hidden bg-muted">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-[16/9] bg-primary/8 flex items-center justify-center">
                                                <span className="text-[10px] tracking-[0.2em] uppercase text-primary/40 font-semibold">Chronicles</span>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                                                {new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                            <h3 className="font-display font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors mb-2">
                                                {item.title}
                                            </h3>
                                            {item.excerpt && (
                                                <p className="text-foreground/55 text-sm leading-relaxed font-light line-clamp-2">{item.excerpt}</p>
                                            )}
                                        </div>
                                    </Link>
                                </MotionReveal>
                            ))}
                        </div>

                        <MotionReveal className="text-center mt-10 md:hidden">
                            <Link href="/news" className="inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.18em] uppercase text-primary border-b border-primary/30 pb-0.5">
                                All Chronicles <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </MotionReveal>
                    </div>
                </section>
            )}

            {/* ── UPCOMING EVENTS (auto-hides when empty) ───────────────── */}
            <UpcomingEventsSection />

            {/* ── 7. CTA ────────────────────────────────────────────────── */}
            <section className="py-32 md:py-44 px-6 md:px-10 bg-primary">
                <div className="max-w-3xl mx-auto text-center">
                    <MotionReveal>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="h-px w-10 bg-white/30" />
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C9A84C]">Enrol Today</p>
                            <span className="h-px w-10 bg-white/30" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
                            Your Award Journey
                            <span className="block italic text-[#C9A84C]">Begins Here.</span>
                        </h2>
                        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
                            The President&apos;s Award at Kirinyaga University is more than a programme — it is a commitment to becoming your fullest self.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/join"
                                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#d4b55a] text-[#070b09] text-[11px] font-bold tracking-[0.18em] uppercase px-10 py-4 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Enrol in the Award
                            </Link>
                            <Link
                                href="/programs"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 text-[11px] font-bold tracking-[0.18em] uppercase px-10 py-4 rounded-sm transition-all duration-300"
                            >
                                Explore the Programme
                            </Link>
                        </div>
                    </MotionReveal>
                </div>
            </section>
        </>
    )
}
