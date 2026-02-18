'use client'

import { Calendar, ArrowRight } from 'lucide-react'

const newsItems = [
  {
    date: 'February 2024',
    title: 'Spring Expeditions Launch',
    description: 'New cohorts begin their journey with Mount Kenya and Ngong Hills expeditions. Join our next intake for an unforgettable adventure.',
    category: 'Expeditions'
  },
  {
    date: 'January 2024',
    title: 'Community Impact Report Released',
    description: 'Our 2023 impact shows 500+ community projects completed across Kenya, benefiting over 5,000 beneficiaries.',
    category: 'Impact'
  },
  {
    date: 'December 2023',
    title: 'State House Gold Awards Ceremony',
    description: 'Twenty exceptional participants received their Gold Awards at State House in a prestigious ceremony celebrating their achievements.',
    category: 'Recognition'
  },
  {
    date: 'November 2023',
    title: 'Skills Academy Now Open for Registration',
    description: 'New leadership and technical skills workshops launched. Limited spots available for January cohort.',
    category: 'Programs'
  }
]

export function NewsSection() {
  return (
    <section id="news" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">News & Updates</h2>
          <p className="text-lg text-muted-foreground">
            Stay informed about expeditions, events, and opportunities to transform your life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="group bg-gradient-to-r from-muted/30 to-transparent border-l-4 border-primary/30 hover:border-primary pl-6 pr-6 py-6 rounded-lg transition-all hover:shadow-md hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm font-semibold text-primary">{item.date}</span>
                </div>
                <span className="text-xs font-bold bg-secondary/20 text-secondary px-3 py-1 rounded-full">{item.category}</span>
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">{item.description}</p>
              <div className="flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
