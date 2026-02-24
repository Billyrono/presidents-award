'use client'

import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Shield, Database, Cookie, UserCheck, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageHero
                title="Privacy Policy"
                subtitle="How we collect, use, and protect your personal information."
                badge="Your Privacy Matters"
                badgeIcon="shield"
            />

            <section className="py-16 px-4 md:px-8 bg-background">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <p className="text-muted-foreground text-sm mb-12">
                            Last updated: February 2026
                        </p>
                    </ScrollReveal>

                    {/* Section 1 */}
                    <ScrollReveal>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Database className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-foreground">Information We Collect</h2>
                            </div>
                            <div className="pl-[52px] space-y-3 text-foreground/80 leading-relaxed">
                                <p>When you apply to join our program through the application form, we collect:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Full name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Faculty and year of study</li>
                                    <li>Areas of interest and personal message</li>
                                </ul>
                                <p>We also collect basic technical data through essential cookies needed to keep the website functioning (such as authentication sessions).</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Section 2 */}
                    <ScrollReveal delay={60}>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-foreground">How We Use Your Information</h2>
                            </div>
                            <div className="pl-[52px] space-y-3 text-foreground/80 leading-relaxed">
                                <p>Your personal information is used to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Process your application to the President&apos;s Award program</li>
                                    <li>Contact you about your application status and program activities</li>
                                    <li>Add you to relevant communication groups (e.g., WhatsApp groups) with your consent</li>
                                    <li>Improve our services and website experience</li>
                                </ul>
                                <p>We do <strong>not</strong> sell, trade, or share your personal data with third parties for marketing purposes.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Section 3 */}
                    <ScrollReveal delay={120}>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Cookie className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-foreground">Cookies</h2>
                            </div>
                            <div className="pl-[52px] space-y-3 text-foreground/80 leading-relaxed">
                                <p>This website uses only <strong>essential cookies</strong> required for the site to function properly:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li><strong>Authentication cookies</strong> — to keep administrators signed in securely</li>
                                    <li><strong>Preference cookies</strong> — to remember your cookie consent choice</li>
                                </ul>
                                <p>We do not use any tracking, analytics, or advertising cookies.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Section 4 */}
                    <ScrollReveal delay={180}>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-foreground">Data Protection & Your Rights</h2>
                            </div>
                            <div className="pl-[52px] space-y-3 text-foreground/80 leading-relaxed">
                                <p>In accordance with Kenya&apos;s <strong>Data Protection Act, 2019</strong>, you have the right to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Request access to your personal data</li>
                                    <li>Request correction of inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Withdraw consent for data processing</li>
                                </ul>
                                <p>Your data is stored securely using industry-standard encryption and access controls provided by our hosting infrastructure.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Section 5 */}
                    <ScrollReveal delay={240}>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-foreground">Contact Us</h2>
                            </div>
                            <div className="pl-[52px] space-y-3 text-foreground/80 leading-relaxed">
                                <p>If you have any questions about this privacy policy or wish to exercise your data rights, contact us at:</p>
                                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                                    <p className="font-semibold text-foreground">President&apos;s Award — Kirinyaga University Chapter</p>
                                    <p>Email: <a href="mailto:info@presidentsaward.ke" className="text-primary font-semibold hover:underline">info@presidentsaward.ke</a></p>
                                    <p>Phone: <a href="tel:+254123456789" className="text-primary font-semibold hover:underline">+254 (0) 123 456 789</a></p>
                                    <p>Location: Kirinyaga University, Kerugoya, Kenya</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    )
}
