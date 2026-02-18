import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Award, Users, Mountain, Tent, MapPin, Quote, TrendingUp } from 'lucide-react'

const milestones = [
    { icon: Award, number: '20+', title: 'Gold Awards', description: 'Received at the Kenyan State House by the President of Kenya — the highest recognition' },
    { icon: Users, number: 'Growing', title: 'Enrollment', description: 'Increasing participation of students from diverse faculties each academic year' },
    { icon: Tent, number: '3', title: 'Adventurous Journeys', description: 'Successfully completed across Kenya — two in Aberdares and one in Ngong Hills' },
    { icon: Mountain, number: '2', title: 'Residential Projects', description: 'Impactful community projects at Kianyaga Children\'s Home and Raimu Special Unit' },
]

const expeditions = [
    {
        name: 'Aberdares Expedition I',
        location: 'Aberdares National Park',
        description: 'Our first adventurous journey, pushing participants through challenging terrain with determination, physical effort, and team cooperation.',
        difficulty: 'Adventure',
    },
    {
        name: 'Aberdares Expedition II',
        location: 'Aberdares National Park',
        description: 'A return to the Aberdares with a new cohort, building on lessons learned and pushing boundaries further.',
        difficulty: 'Adventure',
    },
    {
        name: 'Ngong Hills Traverse',
        location: 'Nairobi Region',
        description: 'Navigating the iconic seven ridges of Ngong Hills — testing navigation, endurance, and teamwork in an unfamiliar environment.',
        difficulty: 'Adventure',
    },
    {
        name: 'Kianyaga Children\'s Home',
        location: 'Gold Residential',
        description: 'A water project enhancing access to basic needs for vulnerable children, demonstrating the power of community service at the Gold level.',
        difficulty: 'Residential',
    },
    {
        name: 'Raimu Special Unit',
        location: 'Gold Residential',
        description: 'Thematic painting of two classrooms, creating a friendly and inspiring learning environment for children with special needs.',
        difficulty: 'Residential',
    },
]

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
        quote: 'This program changed my life. From a shy student to a confident leader — I\'m proud to have received my Gold Award at State House.',
        name: 'Gold Awardee',
        role: 'Kirinyaga University Chapter',
    },
]

export default function AchievementsPage() {
    return (
        <>
            <PageHero
                title="Milestones & Achievements"
                subtitle="Celebrating the journeys, service projects, and Gold Award recipients that define our chapter."
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

            {/* Featured Expeditions */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Expeditions & Projects</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                From Aberdares peaks to community impact — the experiences that define our chapter
                            </p>
                            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
                        </div>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        {expeditions.map((exp, i) => (
                            <ScrollReveal key={i} delay={i * 80}>
                                <div className="bg-card rounded-2xl p-8 border-2 border-primary/15 hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full group">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-display font-bold text-primary group-hover:text-primary/80 transition-colors">{exp.name}</h3>
                                        <span className="text-xs font-bold bg-teal-600/10 text-teal-600 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                                            {exp.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                        <span className="text-sm font-semibold text-teal-600">{exp.location}</span>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Growth */}
            <section className="py-20 px-4 md:px-8 bg-background">
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
