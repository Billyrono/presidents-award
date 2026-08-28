import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { Shield, Users, Sparkles, Heart, Target, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: "Our Story — President's Award Kirinyaga University",
    description: "Learn about the President's Award chapter at Kirinyaga University. Our mission, values, and journey as part of the globally recognised Duke of Edinburgh's International Award.",
}

const values = [
    { icon: Shield, title: 'Discipline', description: 'Building self-discipline through structured challenges and consistent commitment to personal growth.' },
    { icon: Users, title: 'Teamwork', description: 'Learning to collaborate, support one another, and achieve collective goals through shared experiences.' },
    { icon: Sparkles, title: 'Resilience', description: 'Developing the mental and physical fortitude to overcome obstacles and persist through difficulty.' },
    { icon: Heart, title: 'Volunteerism', description: 'Cultivating a spirit of service and giving back to communities within and beyond the university.' },
    { icon: Target, title: 'Leadership', description: 'Many alumni have advanced into leadership roles in university clubs, organisations, and community initiatives.' },
    { icon: Eye, title: 'Excellence', description: 'Striving for the highest standards, as recognised by Gold Awards presented at the Kenyan State House.' },
]

const timeline = [
    { marker: 'Founded', title: 'Chapter Established', description: "The President's Award – Kenya at Kirinyaga University was established to bring the Duke of Edinburgh's International Award to the university community, providing students with opportunities for personal development, leadership, and community service." },
    { marker: 'Growing', title: 'Expanding Enrolment', description: 'Growing participation of students from diverse faculties each academic year, expanding the programme\'s reach across the university.' },
    { marker: '5 Expeditions', title: 'Adventurous Journeys', description: 'Successfully completed five adventurous journeys — four in the Aberdares and one in Ngong Hills — testing endurance and building remarkable teamwork.' },
    { marker: '20+ Gold', title: 'State House Honourees', description: 'More than 20 members of the Kirinyaga University chapter have been awarded their Gold Award at the Kenyan State House by the President of Kenya.' },
]

export default function AboutPage() {
    return (
        <>
            <PageHero
                eyebrow="President's Award · Kirinyaga University"
                title="Our Story"
                titleGold="The Legacy"
                subtitle="A symbol of youth empowerment, leadership development, and community service — built by students, for students."
                image="/Hero/Home/IMG_2386.jpg"
            />

            {/* Programme & Mission */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <MotionReveal>
                            <div className="h-full border border-primary/15 rounded-sm p-8 md:p-10 relative overflow-hidden group hover:border-primary/30 hover:-translate-y-1 transition-all duration-400">
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="h-px w-6 bg-[#C9A84C]/50" />
                                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">The Programme</p>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                                    Globally Recognised.<br />
                                    <span className="text-primary italic">Locally Transformative.</span>
                                </h2>
                                <p className="text-foreground/65 leading-relaxed font-light">
                                    As part of the globally recognised Duke of Edinburgh&apos;s International Award, the President&apos;s Award provides young people with opportunities to discover their potential, cultivate essential life skills, and contribute meaningfully to society.
                                </p>
                            </div>
                        </MotionReveal>
                        <MotionReveal delay={0.12}>
                            <div className="h-full border border-[#C9A84C]/20 rounded-sm p-8 md:p-10 relative overflow-hidden group hover:border-[#C9A84C]/40 hover:-translate-y-1 transition-all duration-400">
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C9A84C] to-[#C9A84C]/20 rounded-full" />
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="h-px w-6 bg-[#C9A84C]/50" />
                                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Our Mission</p>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                                    Positive Life Skills.
                                    <span className="block text-[#C9A84C] italic">Ethical Values.</span>
                                </h2>
                                <p className="text-foreground/65 leading-relaxed font-light">
                                    To impact positive life skills and ethical values to young people for a better society — through structured activities that encourage personal growth and social impact, instilling discipline, teamwork, resilience, and volunteerism.
                                </p>
                            </div>
                        </MotionReveal>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Our Values</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground max-w-xl">
                            The Principles That
                            <span className="block text-primary italic">Guide Every Journey</span>
                        </h2>
                    </MotionReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {values.map((value, i) => {
                            const Icon = value.icon
                            return (
                                <MotionReveal key={i} delay={i * 0.08}>
                                    <div className="bg-card rounded-sm p-7 border border-border hover:border-primary/25 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400 h-full">
                                        <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center mb-5">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-display font-bold text-foreground mb-3">{value.title}</h3>
                                        <p className="text-foreground/55 leading-relaxed text-sm font-light">{value.description}</p>
                                    </div>
                                </MotionReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline — The Journey */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-5xl mx-auto">
                    <MotionReveal className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">The Journey</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                            Milestones &amp;
                            <span className="block text-primary italic">Defining Moments</span>
                        </h2>
                    </MotionReveal>
                    <div className="relative">
                        {/* Vertical gold line */}
                        <div className="absolute left-[1.75rem] top-2 bottom-2 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent" />
                        <div className="space-y-10">
                            {timeline.map((item, i) => (
                                <MotionReveal key={i} delay={i * 0.1}>
                                    <div className="relative pl-16">
                                        {/* Gold dot */}
                                        <div className="absolute left-[1.25rem] top-1 w-2 h-2 rounded-full bg-[#C9A84C] ring-4 ring-background" />
                                        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1 rounded-sm mb-3 bg-[#C9A84C]/5">
                                            {item.marker}
                                        </span>
                                        <h3 className="text-xl font-display font-bold text-foreground mb-2">{item.title}</h3>
                                        <p className="text-foreground/55 leading-relaxed font-light">{item.description}</p>
                                    </div>
                                </MotionReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Can Participate */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-foreground">
                <div className="max-w-4xl mx-auto text-center">
                    <MotionReveal>
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#C9A84C]/80">Eligibility</p>
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            Who Can Enrol?
                        </h2>
                        <p className="text-white/60 text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                            The programme is open to all Kirinyaga University students regardless of faculty. If you are ready for a challenge, we are ready for you. Participants progress through three distinct award levels:
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-10">
                            {[
                                { name: 'Bronze', duration: '6 months', color: 'text-amber-500' },
                                { name: 'Silver', duration: '12 months', color: 'text-slate-300' },
                                { name: 'Gold', duration: '18 months', color: 'text-[#C9A84C]' },
                            ].map((l) => (
                                <div key={l.name} className="text-center border border-white/8 rounded-sm p-5">
                                    <div className={`text-2xl font-display font-bold ${l.color} mb-1`}>{l.name}</div>
                                    <p className="text-white/35 text-xs tracking-wide">{l.duration}</p>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/join"
                            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d4b55a] text-foreground text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300"
                        >
                            Enrol in the Award <ArrowRight className="w-4 h-4" />
                        </Link>
                    </MotionReveal>
                </div>
            </section>
        </>
    )
}
