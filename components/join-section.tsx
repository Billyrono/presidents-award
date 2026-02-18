'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react'

export function JoinSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    school: '',
    interests: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We will contact you soon.')
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      school: '',
      interests: '',
      message: ''
    })
  }

  return (
    <section id="join" className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted/20 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">Ready to Transform?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of young Kenyans who have already discovered their potential through the President's Award.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">Get Started</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+254..."
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Age</label>
                  <Input
                    type="number"
                    name="age"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">School</label>
                  <Input
                    type="text"
                    name="school"
                    placeholder="Your school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">What interests you most?</label>
                <Input
                  type="text"
                  name="interests"
                  placeholder="e.g., Adventure, Community Service..."
                  value={formData.interests}
                  onChange={handleChange}
                  className="border-border focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Tell us about yourself</label>
                <Textarea
                  name="message"
                  placeholder="Why do you want to join the President's Award program?"
                  value={formData.message}
                  onChange={handleChange}
                  className="border-border focus:border-primary min-h-32 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Submit Application
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                Have questions? Our team is here to guide you through the application process.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href="tel:+254123456789"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-foreground">Call Us</p>
                  <p className="text-muted-foreground text-sm">+254 (0) 123 456 789</p>
                  <p className="text-muted-foreground text-xs mt-1">Mon - Fri, 9am - 5pm EAT</p>
                </div>
              </a>

              <a
                href="mailto:info@presidentsaward.ke"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground text-sm">info@presidentsaward.ke</p>
                  <p className="text-muted-foreground text-xs mt-1">We'll respond within 24 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Headquarters</p>
                  <p className="text-muted-foreground text-sm">Raimu, Kenya</p>
                  <p className="text-muted-foreground text-xs mt-1">Visit us for more information</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all text-primary hover:text-white"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all text-primary hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all text-primary hover:text-white"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
