'use client'

import { Zap, Heart, Compass, Dumbbell, Home } from 'lucide-react'

const activities = [
  {
    icon: Zap,
    title: 'Skills Development',
    description: 'Master practical competencies that strengthen your confidence and career readiness. Learn leadership, communication, and technical skills.',
    color: 'from-accent to-yellow-400',
    bgColor: 'bg-accent/10'
  },
  {
    icon: Heart,
    title: 'Voluntary Service',
    description: 'Give back to your community through meaningful projects. Make a tangible difference in lives while discovering your purpose.',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/10'
  },
  {
    icon: Compass,
    title: 'Adventurous Journey',
    description: 'Challenge yourself on epic expeditions across Kenya. Summit mountains, navigate wilderness, and discover inner strength.',
    color: 'from-primary to-teal-500',
    bgColor: 'bg-primary/10'
  },
  {
    icon: Dumbbell,
    title: 'Physical Recreation',
    description: 'Develop fitness, discipline, and teamwork through sport. Build a healthy lifestyle while strengthening camaraderie.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: Home,
    title: 'Gold Residential',
    description: 'The capstone experience. Live, learn, and grow with fellow achievers at our prestigious residential program.',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/10'
  }
]

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">The 5 Pillars</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every participant progresses through five essential pillars, each designed to unlock a different dimension of your potential
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div
                key={index}
                className={`group ${activity.bgColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-transparent hover:border-foreground/10 cursor-default`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${activity.color} p-3 mb-6 text-white transition-transform group-hover:-rotate-6`}>
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{activity.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
