'use client'

import { useEffect, useState } from 'react'
import { getEvents, toDirectImageUrl } from '@/lib/content'
import type { Event } from '@/lib/types'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Calendar, MapPin } from 'lucide-react'

export function UpcomingEventsSection() {
    const [events, setEvents] = useState<Event[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getEvents().then(data => {
            setEvents(data)
            setLoaded(true)
        })
    }, [])

    // Render nothing until loaded, or if no active events
    if (!loaded || events.length === 0) return null

    return (
        <section className="py-20 px-4 md:px-8 bg-muted/40">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase mb-5">
                            <Calendar className="w-3.5 h-3.5" />
                            Upcoming Events
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                            Don&apos;t Miss Out
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            Stay connected with what&apos;s happening at the President&apos;s Award chapter.
                        </p>
                        <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, i) => {
                        const imgUrl = event.poster_url ? toDirectImageUrl(event.poster_url) : null
                        const dateStr = event.date
                            ? (() => {
                                try {
                                    return new Date(event.date).toLocaleDateString('en-KE', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })
                                } catch {
                                    return event.date
                                }
                            })()
                            : null

                        return (
                            <ScrollReveal key={event.id} delay={i * 80}>
                                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                                    {/* Poster */}
                                    {imgUrl ? (
                                        <div className="aspect-video relative overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={imgUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-primary/5 flex items-center justify-center">
                                            <Calendar className="w-14 h-14 text-primary/15" />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="font-display font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors leading-snug">
                                            {event.title}
                                        </h3>
                                        <div className="space-y-1.5 mb-3">
                                            {dateStr && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                                                    {dateStr}
                                                </div>
                                            )}
                                            {event.location && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                                                    {event.location}
                                                </div>
                                            )}
                                        </div>
                                        {event.description && (
                                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                                {event.description}
                                            </p>
                                        )}
                                        {event.details && (
                                            <p className="text-xs text-primary/70 mt-3 pt-3 border-t border-border leading-relaxed">
                                                {event.details}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
