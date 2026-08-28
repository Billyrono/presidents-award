'use client'

import { useEffect, useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { Counter } from '@/components/counter'
import { Award, Tent, Mountain, MapPin, Quote, ArrowRight, ShieldCheck, Landmark, CheckCircle2, Compass, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getExpeditions, getProjects, getSiteStats } from '@/lib/content'
import type { Expedition, Project } from '@/lib/types'

const testimonials = [
    {
        quote: "The President's Award has been the defining journey of my university life. From navigating the freezing ridges of the Aberdares to teaching children in remote communities, it forged a level of grit I didn't know I possessed. Receiving my Gold Award at State House was the proudest day of my life.",
        name: 'Denis Kamotho',
        role: 'Gold Awardee',
        credential: 'State House Honouree · Kirinyaga Chapter',
        initials: 'DK',
    },
    {
        quote: "There were nights on the mountain when cold and exhaustion tested every ounce of our willpower. But completing each expedition proved that limits are self-imposed. The Award transforms how you approach every challenge in life and career.",
        name: 'Beryl Murimi',
        role: 'Gold Awardee',
        credential: 'State House Honouree · Kirinyaga Chapter',
        initials: 'BM',
    },
    {
        quote: "Balancing engineering coursework with intense community projects and high-altitude treks demanded total discipline. The Award instilled leadership reflexes that set our alumni apart in every professional arena.",
        name: 'Margaret Karanja',
        role: 'Gold Awardee',
        credential: 'State House Honouree · Kirinyaga Chapter',
        initials: 'MK',
    },
]

export default function AchievementsPage() {
    const [expeditions, setExpeditions] = useState<Expedition[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [stats, setStats] = useState({ totalAwards: '20+', ajCount: 4, rpCount: 3, pillarsCount: 5 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getExpeditions(), getProjects(), getSiteStats()]).then(([exps, projs, s]) => {
            setExpeditions(exps.filter(e => !e.coming_soon))
            setProjects(projs.filter(p => !p.coming_soon))
            setStats(s)
            setLoading(false)
        })
    }, [])

    return (
        <>
            <PageHero
                eyebrow="Roll of Distinction · State House Recognition"
                title="The Honour Roll"
                titleGold="Journeys, Projects &amp; Laureates"
                subtitle="Documenting our chapter's greatest milestones — from gruelling mountain expeditions to the presidential presentation ceremonies at State House, Nairobi."
                image="/Hero/Home/DSC_2956.JPG"
            />

            {/* State House Presidential Recognition Showcase */}
            <section className="bg-[#070b09] text-white py-16 px-6 md:px-10 border-b border-[#C9A84C]/25 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <Landmark className="w-5 h-5 text-[#C9A84C]" />
                                <span className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">
                                    State House Presidential Investiture
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                                Over 20 Kirinyaga University Scholars Honoured by the Head of State
                            </h2>
                            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-3xl">
                                The Gold Award represents the zenith of youth accomplishment in Kenya. Our laureates are formally conferred by the President of the Republic of Kenya in an investiture ceremony at State House, standing as testament to unyielding discipline and civic excellence.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex lg:justify-end">
                            <div className="p-6 rounded-sm bg-white/5 border border-[#C9A84C]/40 text-center w-full max-w-xs">
                                <Award className="w-8 h-8 text-[#C9A84C] mx-auto mb-2" />
                                <div className="text-4xl font-display font-bold text-[#C9A84C] mb-1">
                                    <Counter to={20} suffix="+" duration={2.2} />
                                </div>
                                <p className="text-xs font-semibold tracking-widest uppercase text-white/90">Gold Awardees</p>
                                <p className="text-[11px] text-white/50 mt-1">Conferred at State House, Nairobi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Metric Counters */}
            <section className="py-20 px-6 md:px-10 bg-[#0c120e] text-white border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                        {[
                            { to: 20, suffix: '+', label: 'State House Honours', desc: 'Conferred by the President of Kenya' },
                            { to: 5, suffix: '', label: 'Mountain Expeditions', desc: 'Aberdares & Ngong Hills Traversed' },
                            { to: 3, suffix: '', label: 'Residential Projects', desc: 'High-impact civic infrastructure' },
                            { to: 100, suffix: '%', label: 'Completion Standard', desc: 'Rigorous international verification' },
                        ].map((item, i) => (
                            <MotionReveal key={item.label} delay={i * 0.1} className={`text-center ${i > 0 ? 'pt-6 lg:pt-0 lg:px-6' : 'lg:pr-6'}`}>
                                <div className="text-4xl md:text-6xl font-display font-bold text-[#C9A84C] mb-2 leading-none">
                                    <Counter to={item.to} suffix={item.suffix} duration={2.2} />
                                </div>
                                <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                                <p className="text-white/40 text-xs font-light">{item.desc}</p>
                            </MotionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Adventurous Journeys Log */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">Wilderness Traverses</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                            The Expedition Logbook
                        </h2>
                        <p className="text-foreground/60 mt-4 max-w-2xl text-base md:text-lg font-light leading-relaxed">
                            Self-sufficient, multi-day wilderness expeditions across demanding highland topography — fostering team fortitude and crisis resilience.
                        </p>
                    </MotionReveal>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {expeditions.map((exp, i) => (
                                <MotionReveal key={exp.id} delay={i * 0.08} className="h-full">
                                    <div className="bg-card rounded-sm p-8 md:p-10 border border-border hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-400 h-full flex flex-col justify-between group">
                                        <div>
                                            <div className="flex items-start justify-between gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                                    <Tent className="w-6 h-6 text-primary" />
                                                </div>
                                                <span className="text-[10px] font-accent font-bold tracking-[0.2em] uppercase border border-primary/20 text-primary bg-primary/5 px-3 py-1 rounded-sm">
                                                    Official Expedition
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                                                {exp.name}
                                            </h3>

                                            {exp.location && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MapPin className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                                                    <span className="text-xs font-semibold text-[#C9A84C] tracking-wide">{exp.location}</span>
                                                </div>
                                            )}

                                            <p className="text-foreground/65 text-sm leading-relaxed font-light mb-6">
                                                {exp.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-foreground/45 font-light">
                                            <span className="flex items-center gap-1.5">
                                                <Compass className="w-3.5 h-3.5 text-primary" /> Wilderness Navigation
                                            </span>
                                            {exp.date && (
                                                <span className="flex items-center gap-1.5 font-medium text-foreground/60">
                                                    <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" /> {exp.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </MotionReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Gold Residential Projects */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-muted/30 border-t border-border">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">Civic Legacy</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                            Gold Residential Projects
                        </h2>
                        <p className="text-foreground/60 mt-4 max-w-2xl text-base md:text-lg font-light leading-relaxed">
                            Tangible, permanent infrastructure and community welfare projects built entirely through student initiative.
                        </p>
                    </MotionReveal>

                    {!loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((proj, i) => (
                                <MotionReveal key={proj.id} delay={i * 0.08} className="h-full">
                                    <div className="bg-card rounded-sm p-8 md:p-10 border border-[#C9A84C]/30 hover:border-[#C9A84C] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-400 h-full flex flex-col justify-between group">
                                        <div>
                                            <div className="flex items-start justify-between gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-sm bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                                                    <Mountain className="w-6 h-6 text-[#C9A84C]" />
                                                </div>
                                                <span className="text-[10px] font-accent font-bold tracking-[0.2em] uppercase border border-[#C9A84C]/40 text-[#C9A84C] bg-[#C9A84C]/5 px-3 py-1 rounded-sm">
                                                    Gold Civic Project
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-[#C9A84C] transition-colors mb-3 leading-snug">
                                                {proj.name}
                                            </h3>

                                            {proj.location && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MapPin className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                                                    <span className="text-xs font-semibold text-[#C9A84C] tracking-wide">{proj.location}</span>
                                                </div>
                                            )}

                                            <p className="text-foreground/65 text-sm leading-relaxed font-light mb-6">
                                                {proj.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-[#C9A84C] font-medium">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            <span>Completed &amp; Commissioned Community Asset</span>
                                        </div>
                                    </div>
                                </MotionReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials from State House Laureates */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-[#070b09] text-white border-t border-[#C9A84C]/25">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="text-center mb-20">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">Awardee Testimonies</p>
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                            Voices of Our State House Laureates
                        </h2>
                    </MotionReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <MotionReveal key={i} delay={i * 0.12} className="h-full">
                                <div className="bg-white/5 rounded-sm p-8 md:p-10 border border-white/10 h-full flex flex-col justify-between hover:border-[#C9A84C]/50 hover:-translate-y-1.5 transition-all duration-400">
                                    <div>
                                        <Quote className="w-8 h-8 text-[#C9A84C] mb-6" />
                                        <p className="text-white/80 leading-relaxed font-light text-sm md:text-base italic mb-8">
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3.5 pt-6 border-t border-white/10">
                                        <div className="w-10 h-10 rounded-sm bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center font-display font-bold text-[#C9A84C] text-sm">
                                            {t.initials}
                                        </div>
                                        <div>
                                            <p className="font-display font-bold text-white text-base leading-snug">{t.name}</p>
                                            <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{t.role}</p>
                                            <p className="text-white/40 text-[11px] font-light mt-0.5">{t.credential}</p>
                                        </div>
                                    </div>
                                </div>
                            </MotionReveal>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#d8b758] text-[#070b09] font-bold text-[11px] tracking-[0.2em] uppercase px-9 py-4 rounded-sm transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                        >
                            <span>Begin Your Award Journey</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
