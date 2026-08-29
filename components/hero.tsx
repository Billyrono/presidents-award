'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteStats } from '@/lib/content'
import { ArrowRight, Award, Compass, Mountain, Shield } from 'lucide-react'

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

const KEN_BURNS_PRESETS = [
  { from: 'scale(1.0) translate(0%, 0%)', to: 'scale(1.12) translate(-1.5%, -1%)' },
  { from: 'scale(1.12) translate(1.5%, 0%)', to: 'scale(1.0) translate(0%, 1%)' },
  { from: 'scale(1.0) translate(-1%, 1%)', to: 'scale(1.1) translate(1%, -1%)' },
  { from: 'scale(1.1) translate(0%, -1%)', to: 'scale(1.0) translate(-1%, 0%)' },
  { from: 'scale(1.0) translate(1%, 0%)', to: 'scale(1.14) translate(-1%, -1.5%)' },
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

  useEffect(() => {
    const advance = () => {
      setIsTransitioning(true)
      setPrevIndex(currentIndex)
      const next = (currentIndex + 1) % HERO_IMAGES.length

      setTimeout(() => {
        setCurrentIndex(next)
      }, 50)

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
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#070b09] text-white pt-28 md:pt-32 pb-8 md:pb-12">

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
      `}</style>

      {/* Carousel Background Images */}
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
              alt={`President's Award slide ${index + 1}`}
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

      {/* 50% overlay — visible darkening while photography still shines through */}
      <div className="absolute inset-0 z-[3] bg-[#070b09]/50" />
      {/* Top-gradient so navbar links stay readable */}
      <div className="absolute top-0 inset-x-0 h-40 z-[3] bg-gradient-to-b from-[#070b09]/70 to-transparent" />

      {/* Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto py-4">

        {/* Eyebrow Label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <span className="text-[10px] md:text-[11px] font-accent font-bold tracking-[0.3em] uppercase text-[#C9A84C]">
            President&apos;s Award · Kirinyaga University
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-display font-bold text-white leading-[1.08] tracking-tight mb-2 drop-shadow-md">
          President&apos;s Award
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-display italic text-[#C9A84C] mb-6 font-normal">
          Kirinyaga University Chapter
        </p>

        {/* Subline */}
        <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed font-light mb-8">
          An expedition into your potential. A journey toward significance. Cultivating leadership, resilience, and voluntary service recognized at the highest national levels.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-center items-center mb-10">
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] hover:bg-[#d8b758] text-[#070b09] text-[11px] font-accent font-bold tracking-[0.2em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Enrol in the Award</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 border border-white/75 text-white/90 hover:bg-white/10 hover:border-[#C9A84C] text-[11px] font-accent font-bold tracking-[0.2em] uppercase px-7 py-3.5 rounded-sm transition-all duration-300 whitespace-nowrap"
          >
            Explore The Programme
          </Link>
        </div>

        {/* Stat Badges — no glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-3xl">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-display font-bold text-[#C9A84C]">{stats.totalAwards}</p>
            <p className="text-[10px] md:text-[10.5px] font-accent tracking-wider uppercase text-white/60 mt-1">State House Laureates</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-display font-bold text-[#C9A84C]">{stats.ajCount}</p>
            <p className="text-[10px] md:text-[10.5px] font-accent tracking-wider uppercase text-white/60 mt-1">Mountain Traverses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-display font-bold text-[#C9A84C]">{stats.rpCount}</p>
            <p className="text-[10px] md:text-[10.5px] font-accent tracking-wider uppercase text-white/60 mt-1">Civic Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-display font-bold text-[#C9A84C]">{stats.pillarsCount}</p>
            <p className="text-[10px] md:text-[10.5px] font-accent tracking-wider uppercase text-white/60 mt-1">Award Pillars</p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="relative z-10 flex items-center gap-2 pt-4">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setIsTransitioning(true)
              setPrevIndex(currentIndex)
              setTimeout(() => setCurrentIndex(i), 50)
              setTimeout(() => { setIsTransitioning(false); setPrevIndex(-1) }, FADE_DURATION + 100)
            }}
            className={`h-[2.5px] transition-all duration-500 rounded-full ${i === currentIndex ? 'w-10 bg-[#C9A84C]' : 'w-4 bg-white/25 hover:bg-white/50'
              }`}
          />
        ))}
      </div>
    </section>
  )
}
