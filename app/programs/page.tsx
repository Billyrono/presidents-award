import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Heart, Zap, Dumbbell, Compass, Home, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const pillars = [
    {
        icon: Heart,
        title: 'Voluntary Service',
        description: 'Awardees commit their time and skills to serve communities within and beyond the university. Activities include charity outreach, mentorship programs, environmental conservation, and supporting local initiatives.',
        details: ['Charity outreach programs', 'Mentorship for younger students', 'Environmental conservation', 'Supporting local community initiatives'],
    },
    {
        icon: Zap,
        title: 'Skills Development',
        description: 'Members pursue personal talents and professional skills that build capabilities to enhance personal and career readiness.',
        details: ['Public speaking & leadership', 'First aid training', 'Digital literacy & entrepreneurship', 'Language learning'],
    },
    {
        icon: Dumbbell,
        title: 'Physical Recreation',
        description: 'Encouraging healthy living, awardees take part in regular sporting activities that improve both mental and physical wellness.',
        details: ['Running & cycling', 'Hiking expeditions', 'University sports clubs', 'Fitness & wellness activities'],
    },
    {
        icon: Compass,
        title: 'Adventurous Journey',
        description: 'Participants undertake a challenging journey in a small team in an unfamiliar environment, requiring determination, physical effort, perseverance and cooperation to complete.',
        details: ['Two journeys in Aberdares', 'One journey in Ngong Hills', 'Team navigation & survival', 'Purpose-driven expeditions'],
    },
]

const levels = [
    {
        name: 'Bronze',
        duration: '6 months minimum',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        circleBg: 'bg-amber-600',
        requirements: ['Complete 4 core activities', 'Log regular activities', 'Participate in group expedition'],
    },
    {
        name: 'Silver',
        duration: '12 months minimum',
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        circleBg: 'bg-gray-400',
        requirements: ['Complete all 4 activities at higher level', 'Extended expedition', 'Community service project'],
    },
    {
        name: 'Gold',
        duration: '18 months minimum',
        textColor: 'text-[#C9A84C]',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        circleBg: 'bg-[#C9A84C]',
        requirements: ['All 4 activities plus Gold Residential', 'Major expedition', 'Significant community impact', 'State House ceremony'],
    },
]

export default function ProgramsPage() {
    return (
        <>
            <PageHero
                title="Our Programs"
                subtitle="Four core activities designed to build discipline, teamwork, resilience, and a spirit of volunteerism."
                badge="Core Activities"
                badgeIcon="layers"
            />

            {/* Pillars */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">The Four Pillars</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Participants, referred to as Awardees, engage in experiential learning across four key sections
                            </p>
                            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
                        </div>
                    </ScrollReveal>

                    <div className="space-y-8">
                        {pillars.map((pillar, i) => {
                            const Icon = pillar.icon
                            return (
                                <ScrollReveal key={i} delay={i * 80}>
                                    <div className="bg-teal-600/5 rounded-2xl p-8 md:p-10 border border-teal-600/15 hover:shadow-lg transition-all duration-300">
                                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 rounded-xl bg-teal-600 p-3 text-white">
                                                    <Icon className="w-full h-full" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-display font-bold text-foreground mb-3">{pillar.title}</h3>
                                                <p className="text-foreground/70 leading-relaxed mb-5">{pillar.description}</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {pillar.details.map((detail, j) => (
                                                        <div key={j} className="flex items-center gap-2 text-sm text-foreground/60">
                                                            <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                                            {detail}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Gold Residential */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-xl bg-[#C9A84C] p-3 text-white">
                                        <Home className="w-full h-full" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">Gold Residential Project</h3>
                                    <p className="text-foreground/70 leading-relaxed mb-5">
                                        At the Gold level, participants complete a Gold Residential Project, working in unfamiliar environments which foster independence, cultural awareness, and adaptability. The chapter has delivered two impactful residential projects:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-foreground/70">
                                            <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                                            <span>A <strong>water project at Kianyaga Children&apos;s Home</strong>, enhancing access to basic needs</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-foreground/70">
                                            <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                                            <span>Thematic <strong>painting of two classrooms at Raimu Special Unit</strong>, creating a friendly and inspiring learning environment for children with special needs</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Award Levels */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Award Levels</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Progress from Bronze through Silver to the prestigious Gold Award
                            </p>
                            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {levels.map((level, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className={`${level.bgColor} rounded-2xl p-8 border-2 ${level.borderColor} hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                                    <div className={`w-16 h-16 rounded-full ${level.circleBg} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                                        <span className="text-white text-2xl font-display font-bold">{level.name[0]}</span>
                                    </div>
                                    <h3 className={`text-2xl font-display font-bold ${level.textColor} text-center mb-2`}>{level.name}</h3>
                                    <div className="text-center mb-6">
                                        <p className="text-xs text-muted-foreground">{level.duration}</p>
                                    </div>
                                    <ul className="space-y-3 flex-1">
                                        {level.requirements.map((req, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                                                <CheckCircle className={`w-4 h-4 ${level.textColor} flex-shrink-0 mt-0.5`} />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={300}>
                        <div className="text-center mt-12">
                            <Link
                                href="/join"
                                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Start Your Journey <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    )
}
