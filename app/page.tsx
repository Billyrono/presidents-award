import Link from 'next/link'
import { Hero } from '@/components/hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Zap, Heart, Compass, Dumbbell, Home, ArrowRight, Award, Users, Mountain, Tent } from 'lucide-react'
import { Button } from '@/components/ui/button'

const pillars = [
  { icon: Heart, title: 'Voluntary Service', bg: 'bg-teal-500/10', iconBg: 'bg-teal-600', slug: 'voluntary-service' },
  { icon: Zap, title: 'Skills Development', bg: 'bg-teal-500/10', iconBg: 'bg-teal-600', slug: 'skills-development' },
  { icon: Dumbbell, title: 'Physical Recreation', bg: 'bg-teal-500/10', iconBg: 'bg-teal-600', slug: 'physical-recreation' },
  { icon: Compass, title: 'Adventurous Journey', bg: 'bg-teal-500/10', iconBg: 'bg-teal-600', slug: 'adventurous-journey' },
  { icon: Home, title: 'Gold Residential', bg: 'bg-teal-500/10', iconBg: 'bg-teal-600', slug: 'gold-residential' },
]

const stats = [
  { icon: Award, number: '20+', label: 'Gold Awards at State House' },
  { icon: Tent, number: '4', label: 'Adventurous Journeys' },
  { icon: Mountain, number: '2', label: 'Residential Projects' },
  { icon: Users, number: 'Growing', label: 'Annual Enrollment' },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About Preview */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
                About Our Chapter
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
              <p className="text-lg text-foreground leading-relaxed font-light mb-6">
                The President&apos;s Award – Kirinyaga University Chapter stands as a symbol of youth empowerment, leadership development, and community service. As part of the globally recognized Duke of Edinburgh&apos;s International Award, the program provides young people with opportunities to discover their potential.
              </p>
              <p className="text-lg text-foreground leading-relaxed font-light mb-8">
                Our mission is to impact positive life skills and ethical values to young people for a better society through structured activities that encourage personal growth and social impact.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Learn more about us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillars Preview */}
      <section className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Core Activities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Five key sections that shape well-rounded, responsible young leaders
              </p>
              <div className="w-24 h-1 bg-primary mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <Link href={`/programs#${pillar.slug}`}>
                    <div className={`${pillar.bg} rounded-2xl p-6 text-center group hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-foreground/10 cursor-pointer`}>
                      <div className={`w-14 h-14 rounded-xl ${pillar.iconBg} p-3 mb-4 mx-auto text-white transition-transform group-hover:-rotate-6`}>
                        <Icon className="w-full h-full" />
                      </div>
                      <h3 className="font-display font-bold text-foreground text-sm md:text-base">{pillar.title}</h3>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Explore all programs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Impact</h2>
              <p className="text-white/80 text-lg">Building leaders at Kirinyaga University</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-[#C9A84C]" />
                    <div className="text-3xl md:text-4xl font-display font-bold text-[#C9A84C] mb-2">{stat.number}</div>
                    <p className="text-white/80 font-medium text-sm">{stat.label}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold hover:gap-3 transition-all"
              >
                View all achievements <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Ready to Become #WORLDREADY?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join the Kirinyaga University chapter and discover your potential through adventure, service, and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-6 text-base font-semibold">
                <Link href="/join">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg px-8 py-6 text-base font-semibold border-2">
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
