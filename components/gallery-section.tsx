'use client'

export function GallerySection() {
  const galleryImages = [
    {
      title: 'Mountain Summit',
      category: 'Adventure',
      placeholder: 'Aberdares expedition'
    },
    {
      title: 'Team Building',
      category: 'Recreation',
      placeholder: 'Group activities'
    },
    {
      title: 'Community Service',
      category: 'Service',
      placeholder: 'Kianyaga project'
    },
    {
      title: 'Leadership Workshop',
      category: 'Skills',
      placeholder: 'Raimu program'
    },
    {
      title: 'Ngong Hills Trek',
      category: 'Adventure',
      placeholder: 'Scenic traverse'
    },
    {
      title: 'Award Ceremony',
      category: 'Recognition',
      placeholder: 'State House'
    }
  ]

  return (
    <section id="gallery" className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted/20 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Moments of transformation, achievement, and community impact
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 aspect-square border border-primary/20 hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl"
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-accent text-sm font-semibold mb-2">{image.category}</span>
                <h3 className="text-white font-display font-bold text-xl text-center">{image.title}</h3>
              </div>

              {/* Text label in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary/60 font-display text-lg font-bold">{image.placeholder}</p>
                  <p className="text-muted-foreground/40 text-sm mt-2">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
