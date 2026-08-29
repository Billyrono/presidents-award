'use client'

import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { Shield, Database, Cookie, UserCheck, Mail, Lock, Eye, FileText, Server, Trash2, Globe } from 'lucide-react'
import Link from 'next/link'

const sections = [
    {
        icon: Database,
        title: 'Information We Collect',
        content: (
            <>
                <p>When you apply to join our program through the application form, we collect:</p>
                <ul className="list-none space-y-2 mt-4">
                    {['Full name', 'Email address', 'Phone number', 'Faculty and year of study', 'Areas of interest and personal message'].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-4">We also collect basic technical data through essential cookies needed to keep the website functioning (such as authentication sessions).</p>
            </>
        ),
    },
    {
        icon: UserCheck,
        title: 'How We Use Your Information',
        content: (
            <>
                <p>Your personal information is used to:</p>
                <ul className="list-none space-y-2 mt-4">
                    {[
                        'Process your application to the President\u2019s Award program',
                        'Contact you about your application status and program activities',
                        'Add you to relevant communication groups (e.g., WhatsApp groups) with your consent',
                        'Improve our services and website experience',
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-5 p-4 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/15">
                    <p className="text-sm font-medium text-[#C9A84C]">
                        <Lock className="w-4 h-4 inline mr-2 -mt-0.5" />
                        We do <strong>not</strong> sell, trade, or share your personal data with third parties for marketing purposes.
                    </p>
                </div>
            </>
        ),
    },
    {
        icon: Cookie,
        title: 'Cookies',
        content: (
            <>
                <p>This website uses only <strong>essential cookies</strong> required for the site to function properly:</p>
                <div className="mt-4 space-y-3">
                    {[
                        { name: 'Authentication cookies', desc: 'To keep administrators signed in securely' },
                        { name: 'Preference cookies', desc: 'To remember your cookie consent choice' },
                    ].map((cookie) => (
                        <div key={cookie.name} className="flex items-start gap-3 p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/60 mt-1.5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-foreground text-sm">{cookie.name}</p>
                                <p className="text-muted-foreground text-sm mt-0.5">{cookie.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-5 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <p className="text-sm font-medium text-emerald-400">
                        <Eye className="w-4 h-4 inline mr-2 -mt-0.5" />
                        We do not use any tracking, analytics, or advertising cookies. Zero trackers. Zero ads.
                    </p>
                </div>
            </>
        ),
    },
    {
        icon: Server,
        title: 'Data Storage & Security',
        content: (
            <>
                <p>Your data is stored securely using industry-standard encryption and access controls.</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { icon: Lock, label: 'End-to-end encryption', desc: 'All data transmitted via HTTPS' },
                        { icon: Server, label: 'Secure hosting', desc: 'Industry-compliant infrastructure' },
                        { icon: Shield, label: 'Access controls', desc: 'Role-based admin permissions' },
                        { icon: Trash2, label: 'Data minimization', desc: 'We only collect what we need' },
                    ].map((item) => (
                        <div key={item.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                            <item.icon className="w-4 h-4 text-[#C9A84C]/60 mb-2.5" />
                            <p className="font-semibold text-sm text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </>
        ),
    },
    {
        icon: FileText,
        title: 'Data Protection & Your Rights',
        content: (
            <>
                <p>In accordance with Kenya&apos;s <strong>Data Protection Act, 2019</strong>, you have the right to:</p>
                <div className="mt-4 space-y-3">
                    {[
                        { right: 'Access', desc: 'Request a copy of the personal data we hold about you' },
                        { right: 'Correction', desc: 'Request correction of inaccurate or incomplete data' },
                        { right: 'Deletion', desc: 'Request permanent erasure of your personal data' },
                        { right: 'Withdrawal', desc: 'Withdraw consent for data processing at any time' },
                        { right: 'Portability', desc: 'Receive your data in a structured, commonly used format' },
                    ].map((item, i) => (
                        <div key={item.right} className="flex items-start gap-4">
                            <span className="w-6 h-6 rounded-full border border-[#C9A84C]/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-[#C9A84C]">
                                {i + 1}
                            </span>
                            <div>
                                <p className="font-semibold text-foreground text-sm">{item.right}</p>
                                <p className="text-muted-foreground text-sm mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ),
    },
    {
        icon: Globe,
        title: 'Third-Party Services',
        content: (
            <>
                <p>This website may use the following third-party services:</p>
                <ul className="list-none space-y-2 mt-4">
                    {[
                        'Supabase — for secure data storage and authentication',
                        'Resend — for transactional email delivery',
                        'Vercel — for website hosting and deployment',
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-4">These services have their own privacy policies governing how they process data. We encourage you to review them.</p>
            </>
        ),
    },
    {
        icon: Mail,
        title: 'Contact Us',
        content: (
            <>
                <p>If you have any questions about this privacy policy or wish to exercise your data rights, contact us at:</p>
                <div className="mt-5 p-6 rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03]">
                    <p className="font-display font-bold text-foreground text-lg mb-3">President&apos;s Award</p>
                    <p className="text-sm text-muted-foreground mb-1">Kirinyaga University Chapter</p>
                    <div className="w-8 h-px bg-[#C9A84C]/30 my-4" />
                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="text-muted-foreground">Email: </span>
                            <a href="mailto:info@presidentsaward.ke" className="text-[#C9A84C] font-semibold hover:underline">info@presidentsaward.ke</a>
                        </p>
                        <p>
                            <span className="text-muted-foreground">Phone: </span>
                            <a href="tel:+254123456789" className="text-[#C9A84C] font-semibold hover:underline">+254 (0) 123 456 789</a>
                        </p>
                        <p>
                            <span className="text-muted-foreground">Location: </span>
                            <span className="text-foreground">Kirinyaga University, Kerugoya, Kenya</span>
                        </p>
                    </div>
                </div>
            </>
        ),
    },
]

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageHero
                eyebrow="Governance"
                title="Privacy Policy"
                titleGold="& Data Protection"
                subtitle="Transparency is a value we hold as seriously as service. Here's exactly how we collect, use, and protect your personal information."
            />

            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-3xl mx-auto">
                    {/* Last updated + quick stats */}
                    <MotionReveal>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-14 pb-8 border-b border-white/[0.06]">
                            <p className="text-muted-foreground text-sm">
                                Last updated: <span className="text-foreground font-medium">February 2026</span>
                            </p>
                            <div className="flex gap-6">
                                {[
                                    { label: 'Trackers', value: '0' },
                                    { label: 'Ad Cookies', value: '0' },
                                    { label: 'Data Sales', value: '0' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <p className="text-xl font-display font-bold text-emerald-400">{stat.value}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionReveal>

                    {/* Sections */}
                    {sections.map((section, i) => (
                        <MotionReveal key={section.title} delay={i * 40}>
                            <div className="mb-14 last:mb-0">
                                <div className="flex items-center gap-3.5 mb-5">
                                    <div className="w-10 h-10 rounded-xl border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                                        <section.icon className="w-[18px] h-[18px] text-[#C9A84C]/70" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-display font-bold text-foreground">{section.title}</h2>
                                </div>
                                <div className="pl-[54px] text-foreground/75 leading-relaxed text-[15px] space-y-3">
                                    {section.content}
                                </div>
                            </div>
                        </MotionReveal>
                    ))}

                    {/* Bottom nav */}
                    <MotionReveal delay={300}>
                        <div className="mt-16 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-muted-foreground">
                                © {new Date().getFullYear()} President&apos;s Award — Kirinyaga University Chapter
                            </p>
                            <div className="flex gap-6 text-sm">
                                <Link href="/" className="text-muted-foreground hover:text-[#C9A84C] transition-colors">Home</Link>
                                <Link href="/join" className="text-muted-foreground hover:text-[#C9A84C] transition-colors">Join Us</Link>
                                <Link href="/news" className="text-muted-foreground hover:text-[#C9A84C] transition-colors">Chronicles</Link>
                            </div>
                        </div>
                    </MotionReveal>
                </div>
            </section>
        </>
    )
}
