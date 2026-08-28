'use client'

import Image from 'next/image'

interface PageHeroProps {
    eyebrow?: string
    title: string
    titleGold?: string
    subtitle?: string
    image?: string
}

export function PageHero({ eyebrow, title, titleGold, subtitle, image = '/Hero/Home/hero-bg.jpg' }: PageHeroProps) {
    const bgImage = image || '/Hero/Home/hero-bg.jpg'

    return (
        <section className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden bg-[#0a0f0d] text-white">
            {/* Background Photography with Dark Editorial Multi-Layer Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt=""
                    fill
                    priority
                    className="object-cover object-center scale-105 filter brightness-[0.65] contrast-[1.08]"
                />
                {/* Deep atmospheric overlay so image does not shout */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#080d0b]/92 via-[#0d1410]/86 to-[#080d0b]/94" />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,10,8,0.75)_100%)]" />
                {/* Subtle gold luxury ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
                {/* Micro-dot grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {eyebrow && (
                    <div className="flex items-center justify-center gap-3 mb-5 animate-fade-in">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
                        <p className="text-[10.5px] font-accent font-bold tracking-[0.3em] uppercase text-[#C9A84C]">
                            {eyebrow}
                        </p>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
                    </div>
                )}

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-4 animate-slide-up drop-shadow-sm">
                    {title}
                    {titleGold && (
                        <span className="block text-[#C9A84C] italic font-normal mt-1.5 font-display">
                            {titleGold}
                        </span>
                    )}
                </h1>

                {/* Refined Gold Crest / Divider */}
                <div className="flex items-center justify-center gap-3 my-6 animate-scale-in">
                    <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
                    <span className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C] bg-[#C9A84C]/40" />
                    <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#C9A84C]/50 to-[#C9A84C]/80" />
                </div>

                {subtitle && (
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed font-normal animate-slide-up-delay">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Bottom subtle border */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
        </section>
    )
}
