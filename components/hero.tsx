'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteStats } from '@/lib/content'

export function Hero() {
  const [stats, setStats] = useState({
    totalAwards: '20+', awardLevels: 'Bronze, Silver & Gold',
    ajCount: 4, rpCount: 3, pillarsCount: 5
  })

  useEffect(() => {
    getSiteStats().then(setStats)
  }, [])

  return (
    <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Hero/Home/hero-bg.jpg"
        alt="President's Award Kirinyaga University"
        fill
        className="object-cover -z-10"
        priority
        quality={85}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center flex-1">
        <div className="mb-3 md:mb-4 inline-block">
          <span className="text-xs md:text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30">
            Kirinyaga University Chapter
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-3 md:mb-4 text-white leading-tight drop-shadow-lg">
          President&apos;s Award
          <span className="text-[#C9A84C] block drop-shadow-lg">
            Empowering Youth
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
          Impacting positive life skills and ethical values to young people for a better society. Discover your potential and become #WORLDREADY.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold">
            <Link href="/join">Start Your Journey</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold border-2 border-white text-white bg-white/10 hover:bg-white/20">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-3xl">
          <div className="text-center rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.totalAwards}</div>
            <p className="text-white/80 text-xs md:text-sm">Awards at State House</p>
          </div>
          <div className="text-center rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.ajCount}</div>
            <p className="text-white/80 text-xs md:text-sm">Adventurous Journeys</p>
          </div>
          <div className="text-center rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.rpCount}</div>
            <p className="text-white/80 text-xs md:text-sm">Residential Projects</p>
          </div>
          <div className="text-center rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.pillarsCount}</div>
            <p className="text-white/80 text-xs md:text-sm">Core Pillars</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
      </div>
    </section>
  )
}
