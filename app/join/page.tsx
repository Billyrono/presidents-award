'use client'

import { useState, useEffect } from 'react'
import { PageHero } from '@/components/page-hero'
import { MotionReveal } from '@/components/motion-reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Instagram, Facebook, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getSettings } from '@/lib/content'

const faqs = [
    {
        question: "Who can participate in the President's Award at Kirinyaga University?",
        answer: "The programme is open to all Kirinyaga University students from any faculty. Whether you're in first year or final year, you're welcome to enrol.",
    },
    {
        question: 'How much does it cost to participate?',
        answer: 'The registration fee is affordable and covers your programme materials, assessment, and certification. Fees are paid periodically throughout the programme, not all at once. Contact us for current fee details.',
    },
    {
        question: 'How long does each award level take?',
        answer: 'Bronze requires a minimum of 6 months, Silver 12 months, and Gold 18 months. You can take longer if needed — the programme is flexible. You may also enter directly at Gold level, though the minimum 18-month duration still applies.',
    },
    {
        question: 'Do I need prior experience in adventure activities?',
        answer: 'No prior experience is required. All participants receive training and preparation before expeditions. We build your skills progressively through the five core sections.',
    },
    {
        question: 'What happens after I complete the programme?',
        answer: "At each level, you receive an internationally recognised certificate. Gold Award recipients are honoured at a State House ceremony where the President of Kenya personally presents the awards — over 20 members from our chapter have achieved this. After completing Gold, you may join the Award Holders Association – Kenya (AHA-K) and access the Global Award Alumni Network (GAAN).",
    },
]

export default function JoinPage() {
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', faculty: '', year: '', interests: '', message: '',
    })
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submittedName, setSubmittedName] = useState('')
    const [error, setError] = useState('')
    const [contact, setContact] = useState({
        phone: '+254 (0) 123 456 789',
        email: 'info@presidentsaward.ke',
        location: 'Kirinyaga University, Kerugoya',
    })

    useEffect(() => {
        getSettings().then(s => {
            setContact({
                phone: s.contact_phone || '+254 (0) 123 456 789',
                email: s.contact_email || 'info@presidentsaward.ke',
                location: s.contact_location || 'Kirinyaga University, Kerugoya',
            })
        })
    }, [])

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
            return
        }

        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'application', name: formData.fullName, ...formData }),
        }).catch(() => { })

        setSubmittedName(formData.fullName)
        setSubmitted(true)
        setFormData({ fullName: '', email: '', phone: '', faculty: '', year: '', interests: '', message: '' })
    }

    return (
        <>
            <PageHero
                eyebrow="President's Award · Kirinyaga University"
                title="Your Award Journey"
                titleGold="Begins Here."
                subtitle="The President's Award at Kirinyaga University is more than a programme — it is a commitment to becoming your fullest self."
                image="/Hero/Home/IMG_2386.jpg"
            />

            {/* Form + Contact */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_0.7fr] gap-12 md:gap-20 items-start">

                        {/* Application Form */}
                        <MotionReveal>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-[#C9A84C]/50" />
                                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Enrolment</p>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
                                Application Form
                            </h2>

                            <div className="border border-border rounded-sm p-8 bg-card">
                                {submitted ? (
                                    <div className="text-center py-10">
                                        <div className="w-16 h-16 rounded-sm border border-primary/30 flex items-center justify-center mx-auto mb-5">
                                            <CheckCircle className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-foreground mb-3">Application Received</h3>
                                        <p className="text-foreground/60 mb-2 font-light">
                                            Thank you, <strong className="text-foreground font-semibold">{submittedName}</strong>.
                                        </p>
                                        <p className="text-foreground/55 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-light">
                                            Our team will contact you within a few days via <strong className="text-foreground/80">WhatsApp</strong> or <strong className="text-foreground/80">email</strong>. Keep an eye on your inbox.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
                                        >
                                            Submit another application
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {error && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-sm px-4 py-3 text-sm">
                                                {error}
                                            </div>
                                        )}
                                        <div>
                                            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">Full Name</label>
                                            <Input name="fullName" placeholder="Your full name" value={formData.fullName} onChange={handleChange} required className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">Email</label>
                                                <Input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0" />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">Phone</label>
                                                <Input type="tel" name="phone" placeholder="+254..." value={formData.phone} onChange={handleChange} required className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">Faculty</label>
                                                <Input name="faculty" placeholder="Your faculty" value={formData.faculty} onChange={handleChange} required className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0" />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">Year of Study</label>
                                                <Input name="year" placeholder="e.g., Year 2" value={formData.year} onChange={handleChange} required className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">What interests you most?</label>
                                            <Input name="interests" placeholder="e.g., Adventure, Community Service..." value={formData.interests} onChange={handleChange} className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0" />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-foreground/60 block mb-2">Tell us about yourself</label>
                                            <Textarea name="message" placeholder="Why do you want to join the President's Award programme?" value={formData.message} onChange={handleChange} className="rounded-sm border-border/60 focus:border-primary focus-visible:ring-0 min-h-32 resize-none" />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#d4b55a] text-foreground text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-sm transition-all duration-300 disabled:opacity-60"
                                        >
                                            {submitting ? 'Submitting...' : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </MotionReveal>

                        {/* Contact + Social */}
                        <MotionReveal delay={0.15} direction="left">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-[#C9A84C]/50" />
                                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Get in Touch</p>
                            </div>
                            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                                Reach Out
                            </h2>
                            <p className="text-foreground/55 mb-8 font-light">
                                Have questions about the Kirinyaga University chapter? Our team is here to guide you.
                            </p>

                            <div className="space-y-3 mb-10">
                                {[
                                    { href: `tel:${contact.phone.replace(/[^0-9+]/g, '')}`, icon: Phone, label: 'Call Us', value: contact.phone, sub: 'Mon–Fri, 9am–5pm EAT' },
                                    { href: `mailto:${contact.email}`, icon: Mail, label: 'Email Us', value: contact.email, sub: 'We respond within 24 hours' },
                                ].map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <a key={item.label} href={item.href} className="flex items-start gap-4 p-5 border border-border rounded-sm hover:border-primary/25 hover:bg-primary/3 transition-all group">
                                            <div className="w-9 h-9 rounded-sm border border-primary/25 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                                                <p className="text-foreground/60 text-sm">{item.value}</p>
                                                <p className="text-foreground/35 text-xs mt-0.5">{item.sub}</p>
                                            </div>
                                        </a>
                                    )
                                })}
                                <div className="flex items-start gap-4 p-5 border border-border rounded-sm bg-muted/20">
                                    <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">Location</p>
                                        <p className="text-foreground/60 text-sm">{contact.location}</p>
                                        <p className="text-foreground/35 text-xs mt-0.5">Kirinyaga County, Kenya</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">Follow Our Journey</p>
                            <div className="flex gap-3">
                                {[
                                    { href: 'https://facebook.com/presidentsawardkyu', label: 'Facebook', svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
                                    { href: 'https://instagram.com/presidentsawardkyu', label: 'Instagram', svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
                                    { href: 'https://tiktok.com/@theawardkyu', label: 'TikTok', svg: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.28 6.28 0 001.88-4.48V8.76a8.26 8.26 0 004.84 1.56v-3.45a4.85 4.85 0 01-1.14-.18z" /> },
                                ].map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                        className="w-11 h-11 border border-border rounded-sm flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 transition-all">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.svg}</svg>
                                    </a>
                                ))}
                            </div>
                        </MotionReveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 md:py-32 px-6 md:px-10 bg-muted/30">
                <div className="max-w-3xl mx-auto">
                    <MotionReveal className="mb-14">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A84C]/50" />
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">Common Questions</p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                            Frequently Asked
                            <span className="block text-primary italic">Questions</span>
                        </h2>
                    </MotionReveal>

                    <div className="divide-y divide-border">
                        {faqs.map((faq, i) => (
                            <MotionReveal key={i} delay={i * 0.06}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-start justify-between py-6 text-left gap-4 group"
                                >
                                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {faq.question}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 mt-0.5 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-foreground/55 leading-relaxed font-light">{faq.answer}</p>
                                </div>
                            </MotionReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
