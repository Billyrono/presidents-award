# Kenya's President's Award - Official Website

A vibrant, modern website for Kenya's premier youth development program. Built with Next.js 15, React 19, Tailwind CSS, and Playfair Display typography.

## 🌟 Features

- **Hero Section**: Stunning full-screen hero with Mount Kenya imagery and compelling call-to-action
- **About Section**: Program overview with mission, vision, and core values  
- **5 Core Pillars**: Interactive showcase of Skills, Service, Adventure, Recreation, and Residential programs
- **Achievements**: Milestones, featured expeditions, and community impact statistics
- **Gallery**: Visual showcase of expeditions and projects (Aberdares, Ngong Hills, Kianyaga, Raimu)
- **News & Updates**: Latest events, programs, and announcements
- **Recruitment Form**: Easy sign-up process with contact information
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

## 🎨 Design System

### Colors
- **Primary**: Deep Forest Green (131° 62% 32%) - Authority & Growth
- **Secondary**: Vibrant Gold (44° 87% 50%) - Achievement & Excellence  
- **Accent**: Sunset Orange (32° 98% 50%) - Energy & Adventure
- **Backgrounds**: Clean whites and soft neutrals

### Typography
- **Headings**: Playfair Display - Elegant, sophisticated serif
- **Body**: Inter - Clean, modern sans-serif

## 📋 Website Sections

1. **Hero** - #WORLDREADY message with Mount Kenya background
2. **About** - Program introduction, mission, and values
3. **Activities** - 5 core pillars (Skills, Service, Adventure, Recreation, Residential)
4. **Achievements** - Stats, milestones, and featured expeditions
5. **Gallery** - Photo showcase of expeditions and projects
6. **News** - Latest updates and program announcements
7. **Join** - Recruitment form and contact details
8. **Footer** - Navigation and social media links

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view the website.

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with navbar
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles & design tokens
├── components/
│   ├── navbar.tsx                 # Navigation bar
│   ├── hero.tsx                   # Hero section
│   ├── about-section.tsx          # About & Mission
│   ├── activities-section.tsx     # 5 Pillars
│   ├── achievements-section.tsx   # Milestones & Stats
│   ├── gallery-section.tsx        # Photo gallery
│   ├── news-section.tsx           # News & Updates
│   ├── join-section.tsx           # Recruitment form
│   ├── custom-footer.tsx          # Footer
│   └── ui/                        # shadcn/ui components
├── public/
│   ├── hero-bg.jpg                # Mount Kenya hero image
│   ├── adventure.jpg              # Adventure photo
│   └── community.jpg              # Community service photo
└── tailwind.config.ts             # Tailwind configuration
```

## 🎯 Key Content

**Featured Expeditions & Projects:**
- Mount Kenya Summit (Aberdares National Park)
- Ngong Hills Traverse
- Kianyaga Children's Home Service
- Raimu Special Unit (Leadership Residential)

**Statistics:**
- 20+ Gold Awards at State House
- 1000+ Lives Transformed
- 50+ Expeditions Completed
- 500+ Community Projects

## 📞 Contact Information

- **Email**: info@presidentsaward.ke
- **Phone**: +254 (0) 123 456 789
- **Location**: Raimu, Kenya
- **Motto**: #WORLDREADY

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **React**: 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form**: React Hook Form
- **Fonts**: Playfair Display + Inter (Google Fonts)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎨 Customization

All content can be easily customized:
- **Colors**: Edit CSS variables in `app/globals.css`
- **Text**: Modify content in individual component files
- **Images**: Replace files in `/public` directory
- **Contact Info**: Update in `components/join-section.tsx` and `components/custom-footer.tsx`

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Kenya's President's Award** - Transform lives through adventure, service, and personal growth. *#WORLDREADY*
