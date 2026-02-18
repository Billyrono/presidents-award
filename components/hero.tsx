'use client'

import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero-bg.jpg"
        alt="President's Award Kirinyaga University"
        fill
        className="object-cover -z-10"
        priority
        quality={85}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            Kirinyaga University Chapter
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-white leading-tight drop-shadow-lg">
          President&apos;s Award
          <span className="text-[#C9A84C] block drop-shadow-lg">
            Empowering Youth
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
          Impacting positive life skills and ethical values to young people for a better society. Discover your potential and become #WORLDREADY.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-6 text-base font-semibold">
            <Link href="/join">Start Your Journey</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg px-8 py-6 text-base font-semibold border-2 border-white text-white hover:bg-white/10">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-[#C9A84C] mb-2">20+</div>
            <p className="text-white/80 text-sm md:text-base">Gold Awards at State House</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-[#C9A84C] mb-2">3</div>
            <p className="text-white/80 text-sm md:text-base">Adventurous Journeys</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-[#C9A84C] mb-2">2</div>
            <p className="text-white/80 text-sm md:text-base">Residential Projects</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-[#C9A84C] mb-2">4</div>
            <p className="text-white/80 text-sm md:text-base">Core Pillars</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  )
}
