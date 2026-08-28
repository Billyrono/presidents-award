import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { Heart, Zap, Dumbbell, Compass, Home, ArrowRight, CheckCircle2, Award, Sparkles, ChevronRight, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: "The Programme — President's Award Kirinyaga University",
    description: "Explore the structured development framework: Bronze, Silver, and Gold award tiers across five pillars of personal growth and national impact.",
}

const pillars = [
    {
        id: 'voluntary-service',
        num: '01',
        icon: Heart,
        title: 'Voluntary Service',
        subtitle: 'Community Impact & Empathy',
        commitment: 'Sustained weekly commitment',
        description: 'Instilling a deep-rooted ethos of selfless contribution. Award candidates dedicate structured hours to welfare outreach, educational mentorship, and environmental conservation projects within Kirinyaga and beyond.',
        activities: [
            'Outreach & support for vulnerable community homes',
            'Academic & life-skills mentorship for local schools',
            'Environmental restoration & regional tree-planting',
            'Campus-led emergency response & welfare drives',
        ],
    },
    {
        id: 'skills-development',
        num: '02',
        icon: Zap,
        title: 'Skills Development',
        subtitle: 'Craft, Intellect & Vocational Mastery',
        commitment: 'Individual discipline & practice',
        description: 'Cultivating personal talents and practical proficiencies. Candidates select a distinct discipline — from digital innovation and public diplomacy to practical arts — pursuing measurable mastery.',
        activities: [
            'Executive communication & debate mastery',
            'Certified first aid & emergency care proficiency',
            'Software literacy, coding & entrepreneurial acumen',
            'Foreign languages & cultural diplomacy',
        ],
    },
    {
        id: 'physical-recreation',
        num: '03',
        icon: Dumbbell,
        title: 'Physical Recreation',
        subtitle: 'Endurance, Discipline & Vitality',
        commitment: 'Regular progressive training',
        description: 'Strengthening mental grit through athletic discipline. Participants pursue regular physical regimens, enhancing cardiovascular stamina, mental clarity, and personal resilience.',
        activities: [
            'Long-distance road running & circuit fitness',
            'Cross-country cycling & highland trail runs',
            'Competitive collegiate athletics & team sports',
            'Stamina training tailored for high-altitude treks',
        ],
    },
    {
        id: 'adventurous-journey',
        num: '04',
        icon: Compass,
        title: 'Adventurous Journey',
        subtitle: 'Wilderness Navigation & Team Fortitude',
        commitment: 'Multi-day remote expeditions',
        description: 'The defining test of self-reliance. Small teams plan, navigate, and execute self-sufficient wilderness expeditions across demanding terrains including the Aberdare Ranges and Ngong Hills.',
        activities: [
            'Four successful Aberdares mountain expeditions (AJ I–IV)',
            'Ngong Hills ridgeline traverse & bivouac survival',
            'Topographical mapping, compass navigation & campcraft',
            'Team conflict resolution under extreme elements',
        ],
    },
    {
        id: 'gold-residential',
        num: '05',
        icon: Home,
        title: 'Gold Residential Project',
        subtitle: 'The Pinnacle Civic Immersion',
        commitment: '5 consecutive days on-site',
        description: 'Exclusive to the Gold Award level. Candidates live and work away from home in an unfamiliar community setting, delivering an intensive shared community service initiative alongside peers.',
        activities: [
            'Water infrastructure installation at Kianyaga Children\'s Home',
            'Classroom construction & painting at Raimu Special Unit',
            'Cross-county community immersion & welfare delivery',
            'Upcoming 2026 Gold Civic Initiative (In Planning)',
        ],
        goldOnly: true,
    },
]

const tiers = [
    {
        name: 'Bronze Award',
        roman: 'Level I',
        tagline: 'Foundation & Self-Discovery',
        duration: '6 Months Minimum',
        accentColor: 'text-[#cd7f32]',
        borderColor: 'border-[#cd7f32]/30',
        badgeBg: 'bg-[#cd7f32]/10 text-[#cd7f32] border-[#cd7f32]/30',
        minAge: '14+ Years',
        expedition: '2 Days / 1 Night expedition',
        summary: 'The initiation into disciplined growth. Introduces candidates to all four foundational sections.',
        deliverables: [
            '3 months each in Service, Skills & Physical Recreation',
            'Plus 3 additional months in one chosen major section',
            'Qualifying 2-day adventurous journey in the wilderness',
            'Official Bronze Certificate of Accomplishment',
        ],
    },
    {
        name: 'Silver Award',
        roman: 'Level II',
        tagline: 'Commitment & Fortitude',
        duration: '12 Months Minimum',
        accentColor: 'text-slate-300',
        borderColor: 'border-slate-400/40',
        badgeBg: 'bg-slate-400/10 text-slate-300 border-slate-400/30',
        minAge: '15+ Years',
        expedition: '3 Days / 2 Nights expedition',
        summary: 'Elevating expectations with sustained community projects and rigorous endurance challenges.',
        deliverables: [
            '6 months sustained effort across core pillars',
            'Advanced team navigation across highland wilderness',
            'Demonstrated leadership in student peer mentorship',
            'Official Silver National Honour Certification',
        ],
    },
    {
        name: 'Gold Award',
        roman: 'Level III — Pinnacle',
        tagline: 'Supreme Distinction & State Recognition',
        duration: '18 Months Minimum',
        accentColor: 'text-[#C9A84C]',
        borderColor: 'border-[#C9A84C]',
        badgeBg: 'bg-[#C9A84C]/20 text-[#C9A84C] border-[#C9A84C]/50',
        minAge: '16+ Years',
        expedition: '4 Days / 3 Nights expedition + Residential',
        summary: 'The ultimate accolade. Culminates in a personal presentation ceremony at State House by the Head of State.',
        featured: true,
        deliverables: [
            '12 months dedicated mastery across all 4 core sections',
            'Completion of the intensive 5-day Gold Residential Project',
            'Demanding 4-day mountain wilderness expedition',
            'Personal Award Presentation by the President of Kenya at State House',
        ],
    },
]

export default function ProgramsPage() {
    return (
        <>
            <PageHero
                eyebrow="The Framework of Distinction"
                title="The Award Programme"
                titleGold="Five Pillars · Three Levels of Honour"
                subtitle="An internationally calibrated framework transforming university scholars into resilient, purpose-driven leaders ready for national and global prominence."
                image="/Hero/Home/20240928_112021.jpg"
            />

            {/* Philosophy Manifesto Bar */}
            <section className="bg-[#0c120e] text-white py-12 px-6 md:px-10 border-b border-[#C9A84C]/20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-sm bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                            <Award className="w-6 h-6 text-[#C9A84C]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-accent font-bold tracking-[0.25em] uppercase text-[#C9A84C]">Universal Standard</p>
                            <h3 className="text-lg md:text-xl font-display font-bold text-white">Recognised Across 130+ Nations</h3>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                        <span className="flex items-center gap-2 font-light">
                            <Sparkles className="w-4 h-4 text-[#C9A84C]" /> Non-Competitive Ethos
                        </span>
                        <span className="flex items-center gap-2 font-light">
                            <Shield className="w-4 h-4 text-[#C9A84C]" /> Individual Self-Paced Growth
                        </span>
                    </div>
                </div>
            </section>

            {/* The 3 Tiers / Levels */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="text-center mb-20">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">Progression</p>
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                            Three Tiers of Distinction
                        </h2>
                        <p className="text-foreground/60 mt-4 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                            Each level increases in commitment, duration, and difficulty — demanding greater self-reliance, leadership, and community impact.
                        </p>
                    </MotionReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {tiers.map((tier, i) => (
                            <MotionReveal key={tier.name} delay={i * 0.12} className="h-full">
                                <div
                                    className={`relative h-full flex flex-col justify-between rounded-sm p-8 md:p-10 border-2 transition-all duration-400 ${
                                        tier.featured
                                            ? 'bg-[#0a0f0d] text-white border-[#C9A84C] shadow-2xl scale-[1.02]'
                                            : 'bg-card text-foreground border-border hover:border-primary/40 hover:-translate-y-1.5'
                                    }`}
                                >
                                    {tier.featured && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                            <span className="bg-[#C9A84C] text-[#070b09] text-[9.5px] font-accent font-bold tracking-[0.25em] uppercase px-5 py-1 shadow-md">
                                                Presented at State House
                                            </span>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-[10px] font-accent font-bold tracking-[0.2em] uppercase border px-3 py-1 rounded-sm ${tier.badgeBg}`}>
                                                {tier.roman}
                                            </span>
                                            <span className={`text-xs font-semibold tracking-wider uppercase ${tier.featured ? 'text-white/40' : 'text-foreground/40'}`}>
                                                {tier.duration}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 tracking-tight">
                                            {tier.name}
                                        </h3>
                                        <p className={`text-xs font-medium tracking-wide mb-6 ${tier.accentColor}`}>
                                            {tier.tagline}
                                        </p>

                                        <p className={`text-sm leading-relaxed mb-8 font-light ${tier.featured ? 'text-white/70' : 'text-foreground/60'}`}>
                                            {tier.summary}
                                        </p>

                                        <div className={`p-4 rounded-sm mb-8 border ${tier.featured ? 'bg-white/5 border-white/10' : 'bg-muted/40 border-border/60'}`}>
                                            <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${tier.featured ? 'text-[#C9A84C]' : 'text-primary'}`}>
                                                Expedition Challenge
                                            </p>
                                            <p className={`text-xs ${tier.featured ? 'text-white/80' : 'text-foreground/75'}`}>
                                                {tier.expedition}
                                            </p>
                                        </div>

                                        <div className="space-y-3 mb-8">
                                            <p className={`text-[10.5px] font-accent font-bold tracking-[0.2em] uppercase ${tier.featured ? 'text-white/45' : 'text-foreground/45'}`}>
                                                Requirements &amp; Milestones
                                            </p>
                                            {tier.deliverables.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-2.5 text-sm">
                                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.featured ? 'text-[#C9A84C]' : 'text-primary'}`} />
                                                    <span className={`font-light leading-snug ${tier.featured ? 'text-white/80' : 'text-foreground/70'}`}>
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-current/10">
                                        <Link
                                            href="/join"
                                            className={`w-full inline-flex items-center justify-center gap-2 text-[10.5px] font-bold tracking-[0.2em] uppercase py-3.5 rounded-sm transition-all duration-300 ${
                                                tier.featured
                                                    ? 'bg-[#C9A84C] hover:bg-[#d8b758] text-[#070b09]'
                                                    : 'border border-foreground/20 hover:border-primary hover:bg-primary hover:text-white'
                                            }`}
                                        >
                                            <span>Enrol for {tier.name.split(' ')[0]}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </MotionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Five Pillars Section */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-muted/25 border-t border-border">
                <div className="max-w-7xl mx-auto">
                    <MotionReveal className="mb-20">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10.5px] font-accent font-bold tracking-[0.28em] uppercase text-[#C9A84C]">The Core Sections</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                            The Five Pillars of Development
                        </h2>
                        <p className="text-foreground/60 mt-4 max-w-2xl text-base md:text-lg font-light leading-relaxed">
                            No single pillar stands alone. A complete awardee develops harmony between altruism, physical resilience, mental acuity, and wilderness leadership.
                        </p>
                    </MotionReveal>

                    <div className="space-y-8">
                        {pillars.map((pillar, i) => {
                            const Icon = pillar.icon
                            return (
                                <MotionReveal key={pillar.id} delay={i * 0.08}>
                                    <div
                                        id={pillar.id}
                                        className={`scroll-mt-28 rounded-sm p-8 md:p-12 border transition-all duration-400 ${
                                            pillar.goldOnly
                                                ? 'bg-gradient-to-br from-[#0c130f] to-[#070b09] text-white border-[#C9A84C]/40 shadow-xl'
                                                : 'bg-card text-foreground border-border hover:border-primary/30 hover:shadow-lg'
                                        }`}
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                            {/* Column A: Number & Icon */}
                                            <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-sm flex items-center justify-center ${pillar.goldOnly ? 'bg-[#C9A84C]/20 border border-[#C9A84C]/40' : 'bg-primary/10 border border-primary/20'}`}>
                                                        <Icon className={`w-7 h-7 ${pillar.goldOnly ? 'text-[#C9A84C]' : 'text-primary'}`} />
                                                    </div>
                                                    <span className={`text-4xl md:text-5xl font-display font-bold leading-none ${pillar.goldOnly ? 'text-[#C9A84C]' : 'text-foreground/20'}`}>
                                                        {pillar.num}
                                                    </span>
                                                </div>

                                                <div className="lg:mt-4">
                                                    <span className={`inline-block text-[10px] font-accent font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm ${
                                                        pillar.goldOnly
                                                            ? 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30'
                                                            : 'bg-muted text-foreground/70 border border-border'
                                                    }`}>
                                                        {pillar.commitment}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Column B: Title & Editorial Description */}
                                            <div className="lg:col-span-5 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                                                        {pillar.title}
                                                    </h3>
                                                </div>
                                                <p className={`text-xs font-semibold uppercase tracking-widest ${pillar.goldOnly ? 'text-[#C9A84C]' : 'text-primary'}`}>
                                                    {pillar.subtitle}
                                                </p>
                                                <p className={`text-sm leading-relaxed font-light ${pillar.goldOnly ? 'text-white/75' : 'text-foreground/65'}`}>
                                                    {pillar.description}
                                                </p>
                                            </div>

                                            {/* Column C: Structured Activities */}
                                            <div className={`lg:col-span-4 p-6 rounded-sm border ${pillar.goldOnly ? 'bg-white/5 border-white/10' : 'bg-muted/30 border-border/60'}`}>
                                                <p className={`text-[10.5px] font-accent font-bold tracking-[0.2em] uppercase mb-4 ${pillar.goldOnly ? 'text-[#C9A84C]' : 'text-foreground/60'}`}>
                                                    Demonstrated Outcomes
                                                </p>
                                                <ul className="space-y-2.5">
                                                    {pillar.activities.map((act, j) => (
                                                        <li key={j} className="flex items-start gap-2.5 text-xs md:text-sm">
                                                            <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pillar.goldOnly ? 'text-[#C9A84C]' : 'text-primary'}`} />
                                                            <span className={`font-light leading-snug ${pillar.goldOnly ? 'text-white/85' : 'text-foreground/75'}`}>
                                                                {act}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </MotionReveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Enrolment Invitation Banner */}
            <section className="py-24 px-6 md:px-10 bg-[#070b09] text-white relative overflow-hidden border-t border-[#C9A84C]/20">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <span className="h-px w-10 bg-[#C9A84C]/50" />
                        <p className="text-[10.5px] font-accent font-bold tracking-[0.3em] uppercase text-[#C9A84C]">
                            Your Journey Awaits
                        </p>
                        <span className="h-px w-10 bg-[#C9A84C]/50" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                        Begin Your Pursuit of Distinction
                    </h2>
                    <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Enrolment is open to every student of Kirinyaga University. Join a fellowship of achievers whose journey leads to the highest honours in Kenya.
                    </p>

                    <Link
                        href="/join"
                        className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#d8b758] text-[#070b09] font-bold text-[11px] tracking-[0.2em] uppercase px-9 py-4 rounded-sm transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                    >
                        <span>Submit Candidacy Application</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    )
}
