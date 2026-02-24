import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Target, Eye, Sparkles, Shield, Users, Heart, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
    title: "About — President's Award Kirinyaga University",
    description: "Learn about the President's Award chapter at Kirinyaga University. Our mission, values, journey, and how to participate in the Duke of Edinburgh's International Award program.",
}

const values = [
    { icon: Shield, title: 'Discipline', description: 'Building self-discipline through structured challenges and consistent commitment to personal growth.' },
    { icon: Users, title: 'Teamwork', description: 'Learning to collaborate, support one another, and achieve collective goals through shared experiences.' },
    { icon: Sparkles, title: 'Resilience', description: 'Developing the mental and physical fortitude to overcome obstacles and persist through difficulty.' },
    { icon: Heart, title: 'Volunteerism', description: 'Cultivating a spirit of service and giving back to communities within and beyond the university.' },
    { icon: Target, title: 'Leadership', description: 'Many alumni have advanced into leadership roles in university clubs, organizations, and community initiatives.' },
    { icon: Eye, title: 'Excellence', description: 'Striving for the highest standards, as recognized by Gold Awards presented at the Kenyan State House.' },
]

const timeline = [
    { year: 'Established', title: 'Chapter Founded', description: 'The President\'s Award chapter was established at Kirinyaga University, bringing the Duke of Edinburgh\'s International Award program to the university community.' },
    { year: 'Growing', title: 'Increasing Enrollment', description: 'Growing participation of students from diverse faculties each academic year, expanding the program\'s reach across the university.' },
    { year: 'Expeditions', title: 'Three Adventurous Journeys', description: 'Successfully completed three adventurous journeys — two in the Aberdares and one in Ngong Hills — testing endurance and building teamwork.' },
    { year: 'Impact', title: '20+ Gold Award Recipients', description: '20 members of the Kirinyaga University chapter have been awarded their Gold Award at the Kenyan State House by the President of Kenya.' },
]

export default function AboutPage() {
    return (
        <>
            <PageHero
                title="About Our Chapter"
                subtitle="The President's Award – Kirinyaga University Chapter: a symbol of youth empowerment, leadership development, and community service."
                badge="Kirinyaga University"
                badgeIcon="info"
            />

            {/* Vision & Mission */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-primary/5 rounded-2xl p-8 border-l-4 border-primary h-full">
                                <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Program</h2>
                                <p className="text-foreground/80 leading-relaxed text-lg">
                                    As part of the globally recognized Duke of Edinburgh&apos;s International Award, the President&apos;s Award provides young people with opportunities to discover their potential, cultivate essential life skills, and contribute meaningfully to society.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <div className="bg-teal-600/5 rounded-2xl p-8 border-l-4 border-teal-600 h-full">
                                <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h2>
                                <p className="text-foreground/80 leading-relaxed text-lg">
                                    To impact positive life skills and ethical values to young people for a better society. We achieve this through structured activities that encourage personal growth and social impact, instilling discipline, teamwork, resilience, and volunteerism.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Our Values</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide every initiative, expedition, and interaction
                            </p>
                            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, i) => {
                            const Icon = value.icon
                            return (
                                <ScrollReveal key={i} delay={i * 80}>
                                    <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                                        <div className="w-12 h-12 rounded-xl bg-teal-600/10 flex items-center justify-center mb-5">
                                            <Icon className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-foreground mb-3">{value.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                    </div>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Our Journey</h2>
                            <div className="w-24 h-1 bg-primary mx-auto" />
                        </div>
                    </ScrollReveal>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <ScrollReveal key={i} delay={i * 100}>
                                    <div className="relative pl-20">
                                        <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-background border-4 border-primary shadow-md" />
                                        <span className="inline-block text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-display font-bold text-foreground mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Can Participate */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 text-center">
                            <GraduationCap className="w-12 h-12 text-teal-600 mx-auto mb-6" />
                            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Who Can Participate?</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                                The program is open to Kirinyaga University students. Whether you&apos;re in any faculty — if you&apos;re ready for a challenge, we&apos;re ready for you. Participants progress through three award levels:
                            </p>
                            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                                <div className="text-center">
                                    <div className="text-2xl font-display font-bold text-primary">Bronze</div>
                                    <p className="text-sm text-muted-foreground">6 months</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-display font-bold text-gray-500">Silver</div>
                                    <p className="text-sm text-muted-foreground">12 months</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-display font-bold text-[#C9A84C]">Gold</div>
                                    <p className="text-sm text-muted-foreground">18 months</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    )
}
