'use client'

import { useEffect, useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Award, Users, Mountain, Tent, MapPin, Quote, TrendingUp, Home } from 'lucide-react'
import { getExpeditions, getProjects, getSiteStats } from '@/lib/content'
import type { Expedition, Project } from '@/lib/types'

const testimonials = [
    {
        quote: 'The President\'s Award gave me the confidence to lead. Completing the adventurous journey in the Aberdares showed me that no challenge is too great when you have the right team.',
        name: 'Gold Awardee',
        role: 'Kirinyaga University Chapter',
    },
    {
        quote: 'Through community service at Kianyaga Children\'s Home, I discovered my passion for helping others. The skills I gained are ones I use every single day.',
        name: 'Silver Participant',
        role: 'Kirinyaga University Chapter',
    },
    {
        quote: 'This program changed my life. From a shy student to a confident leader — I\'m proud to have received my Award at State House.',
        name: 'Gold Awardee',
        role: 'Kirinyaga University Chapter',
    },
]

export default function AchievementsPage() {
    const [expeditions, setExpeditions] = useState<Expedition[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [stats, setStats] = useState({
        totalAwards: '20+', awardLevels: 'Bronze, Silver & Gold',
        ajCount: 4, rpCount: 3, pillarsCount: 5, enrollmentStatus: 'Growing',
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getExpeditions(), getProjects(), getSiteStats()]).then(([exps, projs, s]) => {
            setExpeditions(exps.filter(e => !e.coming_soon))
            setProjects(projs.filter(p => !p.coming_soon))
            setStats(s)
            setLoading(false)
        })
    }, [])

    const milestones = [
        { icon: Award, number: stats.totalAwards, title: 'Awards at State House', description: `${stats.awardLevels} — presented by the President of Kenya` },
        { icon: Users, number: stats.enrollmentStatus, title: 'Enrollment', description: 'Increasing participation of students from diverse faculties each academic year' },
        { icon: Tent, number: String(stats.ajCount), title: 'Adventurous Journeys', description: 'Successfully completed across Kenya — Aberdares and Ngong Hills' },
        { icon: Mountain, number: String(stats.rpCount), title: 'Residential Projects', description: 'Impactful community projects serving vulnerable communities' },
    ]

    return (
        <>
            <PageHero
                title="Milestones & Achievements"
                subtitle="Celebrating the journeys, service projects, and award recipients that define our chapter."
                badge="Our Impact"
                badgeIcon="trophy"
            />

            {/* Stats Grid */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">By the Numbers</h2>
                            <div className="w-24 h-1 bg-primary mx-auto" />
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {milestones.map((milestone, i) => {
                            const Icon = milestone.icon
                            return (
                                <ScrollReveal key={i} delay={i * 80}>
                                    <div className="bg-muted/30 rounded-2xl p-8 text-center border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                                        <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-600/10 rounded-full mb-4">
                                            <Icon className="w-7 h-7 text-teal-600" />
                                        </div>
                                        <div className="text-4xl font-display font-bold text-primary mb-2">{milestone.number}</div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                    </div>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Adventurous Journeys */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Adventurous Journeys</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                From Aberdares peaks to Ngong Hills ridges — building resilience and teamwork
                            </p>
                            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
                        </div>
                    </ScrollReveal>
                    {loading ? (
                        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {expeditions.map((exp, i) => (
                                <ScrollReveal key={exp.id} delay={i * 80}>
                                    <div className="bg-card rounded-2xl p-8 border-2 border-primary/15 hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full group">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-display font-bold text-primary group-hover:text-primary/80 transition-colors">{exp.name}</h3>
                                            <span className="text-xs font-bold bg-teal-600/10 text-teal-600 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                                                <Tent className="w-3 h-3 inline mr-1" />Adventure
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                            <span className="text-sm font-semibold text-teal-600">{exp.location}</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                                        {exp.date && <p className="mt-3 text-xs font-medium text-primary/70">{exp.date}</p>}
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Residential Projects */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Residential Projects</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Community service that creates lasting impact
                            </p>
                            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
                        </div>
                    </ScrollReveal>
                    {!loading && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {projects.map((proj, i) => (
                                <ScrollReveal key={proj.id} delay={i * 80}>
                                    <div className="bg-card rounded-2xl p-8 border-2 border-[#C9A84C]/15 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300 h-full group">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-display font-bold text-[#C9A84C] group-hover:text-[#C9A84C]/80 transition-colors">{proj.name}</h3>
                                            <span className="text-xs font-bold bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                                                <Home className="w-3 h-3 inline mr-1" />Residential
                                            </span>
                                        </div>
                                        {proj.location && (
                                            <div className="flex items-center gap-2 mb-4">
                                                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-amber-600">{proj.location}</span>
                                            </div>
                                        )}
                                        <p className="text-muted-foreground leading-relaxed">{proj.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Leadership Growth */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
                            <div className="flex items-start gap-6">
                                <TrendingUp className="w-12 h-12 text-teal-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">Leadership Growth</h3>
                                    <p className="text-foreground/80 leading-relaxed mb-4">
                                        Many of our alumni have advanced into leadership roles in university clubs, organizations, and community initiatives. The program provides continuous volunteer services that support social welfare, environmental protection, and youth empowerment.
                                    </p>
                                    <p className="text-foreground/80 leading-relaxed">
                                        Looking ahead, the program aims to expand partnerships with other clubs and societies, local organizations, and support more students through the Award levels — ensuring every participant becomes <strong className="text-primary">#WORLDREADY</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 md:px-8 bg-primary text-white">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">What Awardees Say</h2>
                            <div className="w-24 h-1 bg-secondary mx-auto" />
                        </div>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15 h-full flex flex-col">
                                    <Quote className="w-8 h-8 text-[#C9A84C] mb-4 flex-shrink-0" />
                                    <p className="text-white/90 leading-relaxed mb-6 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                                    <div>
                                        <p className="font-semibold text-white">{t.name}</p>
                                        <p className="text-white/60 text-sm">{t.role}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
