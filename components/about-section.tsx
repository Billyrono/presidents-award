'use client'

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">About the Program</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-primary/10 rounded-2xl p-8">
              <p className="text-lg text-foreground leading-relaxed font-light mb-6">
                The President's Award is Kenya's most prestigious youth development initiative, designed to nurture excellence, resilience, and service leadership among young people.
              </p>
              <p className="text-lg text-foreground leading-relaxed font-light">
                We believe every young person has untapped potential. Through carefully designed challenges spanning adventure, service, skills development, and physical recreation, participants discover what they're truly capable of achieving.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6 py-2">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Our Vision</h3>
              <p className="text-muted-foreground">Empower Kenya's youth to become confident, capable leaders ready to serve their communities and the world.</p>
            </div>
            <div className="border-l-4 border-accent pl-6 py-2">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Our Mission</h3>
              <p className="text-muted-foreground">Provide transformative experiences that develop character, build resilience, and inspire lifelong service.</p>
            </div>
            <div className="border-l-4 border-secondary pl-6 py-2">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Core Values</h3>
              <p className="text-muted-foreground">Excellence, Integrity, Service, Courage, and Community are the pillars guiding every initiative.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
