'use client'

import { Info, Layers, Trophy, Camera, Newspaper, Rocket } from 'lucide-react'

const iconMap = {
    info: Info,
    layers: Layers,
    trophy: Trophy,
    camera: Camera,
    newspaper: Newspaper,
    rocket: Rocket,
} as const

interface PageHeroProps {
    title: string
    subtitle?: string
    badge?: string
    badgeIcon?: keyof typeof iconMap
}

export function PageHero({ title, subtitle, badge, badgeIcon }: PageHeroProps) {
    const BadgeIcon = badgeIcon ? iconMap[badgeIcon] : null

    return (
        <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-primary">
            {/* Decorative circles */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {badge && (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6 animate-fade-in">
                        {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                        {badge}
                    </span>
                )}
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight animate-slide-up">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up-delay">
                        {subtitle}
                    </p>
                )}
                <div className="w-24 h-1 bg-secondary mx-auto mt-8 rounded-full animate-scale-in" />
            </div>
        </section>
    )
}
