'use client'

import { Award, Users, Mountain, Smile } from 'lucide-react'

const milestones = [
  {
    icon: Award,
    number: '20+',
    title: 'Gold Awards',
    description: 'Presented at State House, Kenya\'s highest recognition'
  },
  {
    icon: Users,
    number: '1000+',
    title: 'Participants',
    description: 'Young leaders transformed and empowered'
  },
  {
    icon: Mountain,
    number: '50+',
    title: 'Expeditions',
    description: 'Across Kenya\'s most challenging landscapes'
  },
  {
    icon: Smile,
    number: '500+',
    title: 'Community Projects',
    description: 'Lives changed through service'
  }
]

const expeditions = [
  {
    name: 'Mount Kenya Summit',
    location: 'Aberdares National Park',
    description: 'Challenge yourself at 5,199m—Kenya\'s second highest peak.'
  },
  {
    name: 'Ngong Hills Traverse',
    location: 'Nairobi Region',
    description: 'Navigate iconic ridges while building team cohesion.'
  },
  {
    name: 'Kianyaga Children\'s Home',
    location: 'Service Program',
    description: 'Empower vulnerable children through mentorship and support.'
  },
  {
    name: 'Raimu Special Unit',
    location: 'Leadership Lab',
    description: 'Intensive residential experience for award completion.'
  }
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">Milestones & Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            return (
              <div key={index} className="bg-gradient-to-br from-muted/30 to-muted/5 rounded-2xl p-8 text-center border border-border hover:border-primary/30 transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4 mx-auto">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-4xl font-display font-bold text-primary mb-2">{milestone.number}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            )
          })}
        </div>

        {/* Featured Expeditions */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8">Featured Expeditions & Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expeditions.map((exp, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <h4 className="text-xl font-display font-bold text-primary mb-2">{exp.name}</h4>
                <p className="text-sm font-semibold text-secondary mb-3">{exp.location}</p>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
