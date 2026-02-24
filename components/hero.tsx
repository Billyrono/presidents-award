'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteStats } from '@/lib/content'

const HERO_IMAGES = [
  { src: '/Hero/Home/hero-bg.jpg', position: 'center center' },
  { src: '/Hero/Home/20240928_112021.jpg', position: 'center 30%' },
  { src: '/Hero/Home/DSC_2956.JPG', position: 'center center' },
  { src: '/Hero/Home/IMG_2386.jpg', position: 'center center' },
  { src: '/Hero/Home/IMG_4896.jpg', position: 'center 50%' },
]

const SLIDE_DURATION = 7000  // 7s per slide
const FADE_DURATION = 1800   // 1.8s crossfade
const KEN_BURNS_DURATION = 12 // 12s for full zoom/pan cycle

// Ken Burns presets — each slide gets a unique slow zoom & pan direction
const KEN_BURNS_PRESETS = [
  { from: 'scale(1.0) translate(0%, 0%)', to: 'scale(1.15) translate(-2%, -1%)' },
  { from: 'scale(1.15) translate(2%, 0%)', to: 'scale(1.0) translate(0%, 1%)' },
  { from: 'scale(1.0) translate(-1%, 1%)', to: 'scale(1.12) translate(1%, -1%)' },
  { from: 'scale(1.12) translate(0%, -1%)', to: 'scale(1.0) translate(-1%, 0%)' },
  { from: 'scale(1.0) translate(1%, 0%)', to: 'scale(1.18) translate(-1%, -2%)' },
]

export function Hero() {
  const [stats, setStats] = useState({
    totalAwards: '20+', awardLevels: 'Bronze, Silver & Gold',
    ajCount: 4, rpCount: 3, pillarsCount: 5
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(-1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    getSiteStats().then(setStats)
  }, [])

  // Auto-advance with cinematic crossfade
  useEffect(() => {
    const advance = () => {
      setIsTransitioning(true)
      setPrevIndex(currentIndex)
      const next = (currentIndex + 1) % HERO_IMAGES.length

      // Start fading in the next slide
      setTimeout(() => {
        setCurrentIndex(next)
      }, 50)

      // End transition after fade completes
      setTimeout(() => {
        setIsTransitioning(false)
        setPrevIndex(-1)
      }, FADE_DURATION + 100)
    }

    timeoutRef.current = setTimeout(advance, SLIDE_DURATION)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex])

  return (
    <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col items-center justify-center overflow-hidden">

      {/* Ken Burns CSS */}
      <style jsx>{`
        @keyframes kenBurns0 {
          from { transform: ${KEN_BURNS_PRESETS[0].from}; }
          to   { transform: ${KEN_BURNS_PRESETS[0].to}; }
        }
        @keyframes kenBurns1 {
          from { transform: ${KEN_BURNS_PRESETS[1].from}; }
          to   { transform: ${KEN_BURNS_PRESETS[1].to}; }
        }
        @keyframes kenBurns2 {
          from { transform: ${KEN_BURNS_PRESETS[2].from}; }
          to   { transform: ${KEN_BURNS_PRESETS[2].to}; }
        }
        @keyframes kenBurns3 {
          from { transform: ${KEN_BURNS_PRESETS[3].from}; }
          to   { transform: ${KEN_BURNS_PRESETS[3].to}; }
        }
        @keyframes kenBurns4 {
          from { transform: ${KEN_BURNS_PRESETS[4].from}; }
          to   { transform: ${KEN_BURNS_PRESETS[4].to}; }
        }
        .hero-slide {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          will-change: transform, opacity;
        }
        .hero-slide-active {
          opacity: 1;
          transition: opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-slide-inactive {
          opacity: 0;
          transition: opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-slide-prev {
          opacity: 1;
          transition: opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .kb-0 { animation: kenBurns0 ${KEN_BURNS_DURATION}s ease-in-out forwards; }
        .kb-1 { animation: kenBurns1 ${KEN_BURNS_DURATION}s ease-in-out forwards; }
        .kb-2 { animation: kenBurns2 ${KEN_BURNS_DURATION}s ease-in-out forwards; }
        .kb-3 { animation: kenBurns3 ${KEN_BURNS_DURATION}s ease-in-out forwards; }
        .kb-4 { animation: kenBurns4 ${KEN_BURNS_DURATION}s ease-in-out forwards; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in {
          animation: fadeInUp 1s ease-out forwards;
        }
        .hero-fade-in-delay-1 { animation-delay: 0.2s; opacity: 0; }
        .hero-fade-in-delay-2 { animation-delay: 0.4s; opacity: 0; }
        .hero-fade-in-delay-3 { animation-delay: 0.6s; opacity: 0; }
        .hero-fade-in-delay-4 { animation-delay: 0.8s; opacity: 0; }

        /* Progress bar for current slide */
        @keyframes slideProgress {
          from { width: 0; }
          to   { width: 100%; }
        }
        .slide-progress {
          animation: slideProgress ${SLIDE_DURATION}ms linear forwards;
        }
      `}</style>

      {/* Carousel Background Images with Ken Burns */}
      {HERO_IMAGES.map((image, index) => {
        const isActive = currentIndex === index
        const isPrev = prevIndex === index && isTransitioning
        let slideClass = 'hero-slide hero-slide-inactive'
        if (isActive) slideClass = `hero-slide hero-slide-active kb-${index}`
        else if (isPrev) slideClass = `hero-slide hero-slide-prev kb-${index}`

        return (
          <div
            key={image.src}
            className={slideClass}
            style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
          >
            <Image
              src={image.src}
              alt={`President's Award - Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              sizes="120vw"
              style={{ objectPosition: image.position }}
            />
          </div>
        )
      })}

      {/* Dark cinematic overlay — multi-layer for depth */}
      <div className="absolute inset-0 z-[3]" style={{
        background: `
          linear-gradient(to bottom,
            rgba(0,0,0,0.55) 25%,
            rgba(0,0,0,0.40) 50%,
            rgba(0,0,0,0.45) 75%,
            rgba(0,0,0,0.70) 100%
          )
        `
      }} />
      {/* Side vignette */}
      <div className="absolute inset-0 z-[3]" style={{
        background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)`
      }} />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center flex-1">
        <div className="mb-3 md:mb-4 inline-block hero-fade-in hero-fade-in-delay-1">
          <span className="text-xs md:text-sm font-semibold text-white bg-white/15 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/25 shadow-lg">
            Kirinyaga University Chapter
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-3 md:mb-4 text-white leading-tight hero-fade-in hero-fade-in-delay-2" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          President&apos;s Award
          <span className="text-[#C9A84C] block" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Empowering Youth
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed font-light hero-fade-in hero-fade-in-delay-3" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
          Impacting positive life skills and ethical values to young people for a better society. Discover your potential and become #WORLDREADY.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-10 hero-fade-in hero-fade-in-delay-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold shadow-xl">
            <Link href="/join">Start Your Journey</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-xl">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-3xl hero-fade-in hero-fade-in-delay-4">
          <div className="text-center rounded-xl p-3 md:p-4 bg-black/20 backdrop-blur-sm">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.totalAwards}</div>
            <p className="text-white/80 text-xs md:text-sm">Awards at State House</p>
          </div>
          <div className="text-center rounded-xl p-3 md:p-4 bg-black/20 backdrop-blur-sm">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.ajCount}</div>
            <p className="text-white/80 text-xs md:text-sm">Adventurous Journeys</p>
          </div>
          <div className="text-center rounded-xl p-3 md:p-4 bg-black/20 backdrop-blur-sm">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.rpCount}</div>
            <p className="text-white/80 text-xs md:text-sm">Residential Projects</p>
          </div>
          <div className="text-center rounded-xl p-3 md:p-4 bg-black/20 backdrop-blur-sm">
            <div className="text-2xl md:text-4xl font-display font-bold text-[#C9A84C] mb-1">{stats.pillarsCount}</div>
            <p className="text-white/80 text-xs md:text-sm">Core Pillars</p>
          </div>
        </div>
      </div>

      {/* Subtle slide progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-white/10">
        <div
          key={currentIndex}
          className="h-full bg-[#C9A84C]/60 slide-progress"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
      </div>
    </section>
  )
}
