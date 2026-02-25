'use client'

import { useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Instagram, Facebook, ChevronDown, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const faqs = [
    {
        question: 'Who can participate in the President\'s Award at Kirinyaga University?',
        answer: 'The program is open to all Kirinyaga University students from any faculty. Whether you\'re in first year or final year, you\'re welcome to join.',
    },
    {
        question: 'How much does it cost to participate?',
        answer: 'The registration fee is affordable and covers your program materials, assessment, and certification. Fees are paid periodically throughout the program, not all at once. Contact us for current fee details.',
    },
    {
        question: 'How long does each award level take?',
        answer: 'Bronze requires a minimum of 6 months, Silver requires 12 months, and Gold requires 18 months. You can take longer if needed \u2014 the program is flexible. You can also enter the Gold level directly without completing Bronze or Silver, though the minimum duration remains 18 months.',
    },
    {
        question: 'Do I need prior experience in adventure activities?',
        answer: 'No prior experience is needed! All participants receive training and preparation before expeditions. We build your skills progressively through the four core activities.',
    },
    {
        question: 'What happens after I complete the program?',
        answer: 'At each level, you receive an internationally recognized certificate. Gold Award recipients are honored at a special ceremony at State House, Nairobi, where the President of Kenya personally presents the awards — 20+ members from our chapter have achieved this. After completing the Gold level, you can become a volunteer with the President\'s Award or join the Award Holders Association – Kenya (AHA-K), a network of award holders who support current participants. Through the Duke of Edinburgh\'s International Award, there are also opportunities to travel abroad for international forums, exchanges, and the Global Award Alumni Network (GAAN).',
    },
]

export default function JoinPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        faculty: '',
        year: '',
        interests: '',
        message: '',
    })

    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submittedName, setSubmittedName] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')

        const { error: dbError } = await supabase.from('applications').insert({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            faculty: formData.faculty,
            year_of_study: formData.year,
            interests: formData.interests,
            message: formData.message,
        })

        setSubmitting(false)

        if (dbError) {
            setError('Something went wrong. Please try again or contact us directly.')
            console.error('Application submit error:', dbError)
            return
        }

        setSubmittedName(formData.fullName)
        setSubmitted(true)
        setFormData({ fullName: '', email: '', phone: '', faculty: '', year: '', interests: '', message: '' })
    }

    return (
        <>
            <PageHero
                title="Join the Program"
                subtitle="Take the first step toward discovering your full potential. Apply today and become #WORLDREADY."
                badge="Start Your Journey"
                badgeIcon="rocket"
            />

            {/* Form + Contact */}
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Form */}
                        <ScrollReveal>
                            <div className="bg-muted/20 rounded-2xl p-8 border border-border shadow-sm">
                                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Application Form</h2>

                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-teal-600" />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-foreground mb-2">Application Received!</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Thank you for your interest in the President&apos;s Award, <strong>{submittedName}</strong>!
                                        </p>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                            We&apos;ve received your application and our recruitment team will get back to you within a few days via <strong>WhatsApp</strong> or <strong>email</strong>. Keep an eye on your inbox!
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-primary font-semibold text-sm hover:underline"
                                        >
                                            Submit another application
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {error && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                                                {error}
                                            </div>
                                        )}
                                        <div>
                                            <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
                                            <Input type="text" name="fullName" placeholder="Your full name" value={formData.fullName} onChange={handleChange} required className="border-border focus:border-primary" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                                                <Input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="border-border focus:border-primary" />
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold text-foreground block mb-2">Phone</label>
                                                <Input type="tel" name="phone" placeholder="+254..." value={formData.phone} onChange={handleChange} required className="border-border focus:border-primary" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-semibold text-foreground block mb-2">Faculty</label>
                                                <Input type="text" name="faculty" placeholder="Your faculty" value={formData.faculty} onChange={handleChange} required className="border-border focus:border-primary" />
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold text-foreground block mb-2">Year of Study</label>
                                                <Input type="text" name="year" placeholder="e.g., Year 2" value={formData.year} onChange={handleChange} required className="border-border focus:border-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-foreground block mb-2">What interests you most?</label>
                                            <Input type="text" name="interests" placeholder="e.g., Adventure, Community Service..." value={formData.interests} onChange={handleChange} className="border-border focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-foreground block mb-2">Tell us about yourself</label>
                                            <Textarea name="message" placeholder="Why do you want to join the President's Award program?" value={formData.message} onChange={handleChange} className="border-border focus:border-primary min-h-32 resize-none" />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-60"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Application'}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </ScrollReveal>

                        {/* Contact Info */}
                        <ScrollReveal delay={100}>
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-display font-bold text-foreground mb-4">Get in Touch</h2>
                                    <p className="text-muted-foreground">
                                        Have questions about the Kirinyaga University chapter? Our team is here to guide you.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="tel:+254123456789"
                                        className="flex items-start gap-4 p-5 rounded-xl hover:bg-primary/5 transition-colors group border border-transparent hover:border-primary/10"
                                    >
                                        <Phone className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <p className="font-semibold text-foreground">Call Us</p>
                                            <p className="text-muted-foreground text-sm">+254 (0) 123 456 789</p>
                                            <p className="text-muted-foreground text-xs mt-1">Mon – Fri, 9am – 5pm EAT</p>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:info@presidentsaward.ke"
                                        className="flex items-start gap-4 p-5 rounded-xl hover:bg-primary/5 transition-colors group border border-transparent hover:border-primary/10"
                                    >
                                        <Mail className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <p className="font-semibold text-foreground">Email</p>
                                            <p className="text-muted-foreground text-sm">info@presidentsaward.ke</p>
                                            <p className="text-muted-foreground text-xs mt-1">We&apos;ll respond within 24 hours</p>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/20 border border-border/50">
                                        <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-foreground">Location</p>
                                            <p className="text-muted-foreground text-sm">Kirinyaga University, Kerugoya</p>
                                            <p className="text-muted-foreground text-xs mt-1">Kirinyaga County, Kenya</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold text-foreground mb-4">Follow Us</p>
                                    <div className="flex gap-3">
                                        <a href="https://facebook.com/presidentsawardkyu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-teal-600/10 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all text-teal-600 hover:text-white" title="Facebook">
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                        <a href="https://instagram.com/presidentsawardkyu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-teal-600/10 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all text-teal-600 hover:text-white" title="Instagram">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                        <a href="https://tiktok.com/@theawardkyu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-teal-600/10 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all text-teal-600 hover:text-white" title="TikTok">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.28 6.28 0 001.88-4.48V8.76a8.26 8.26 0 004.84 1.56v-3.45a4.85 4.85 0 01-1.14-.18z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 md:px-8 bg-muted/30">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
                                Frequently Asked Questions
                            </h2>
                            <div className="w-24 h-1 bg-primary mx-auto" />
                        </div>
                    </ScrollReveal>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={i} delay={i * 60}>
                                <div className="border border-border rounded-xl overflow-hidden hover:border-primary/20 transition-colors">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/20 transition-colors"
                                    >
                                        <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                                        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
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
