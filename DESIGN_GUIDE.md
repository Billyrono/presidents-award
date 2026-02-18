# President's Award Website - Design Guide

## 🎨 Visual Identity

### Color System

#### Primary Colors
```css
--primary: 131 62% 32%;        /* Forest Green #1F6B3B */
--primary-foreground: white;
```
**Usage**: Primary buttons, links, headings, accent borders

#### Secondary Colors
```css
--secondary: 44 87% 50%;       /* Vibrant Gold #CCAD00 */
--secondary-foreground: dark;
```
**Usage**: Achievement highlights, badges, secondary accents

#### Accent Colors
```css
--accent: 32 98% 50%;          /* Sunset Orange #FF6B35 */
--accent-foreground: white;
```
**Usage**: Energy moments, CTAs, hover states

#### Neutral Colors
```css
--background: 0 0% 99%;        /* Near white #FCFCFC */
--foreground: 0 0% 12%;        /* Dark charcoal #1F1F1F */
--muted: 0 0% 90%;             /* Light gray #E5E5E5 */
--border: 0 0% 92%;            /* Border gray #EBEBEB */
```

### Font Specifications

#### Display Font (Headings)
```
Font Family: Playfair Display
Weights: 500, 600, 700, 800, 900
Usage: Page titles, section headings, hero text
Characteristics: Elegant, serif, sophisticated
```

#### Body Font (Text)
```
Font Family: Inter
Weights: 300, 400, 500, 600, 700
Usage: Body text, descriptions, UI labels
Characteristics: Clean, modern, sans-serif
```

#### Code Font (Optional)
```
Font Family: Fira Code
Usage: Code snippets, technical text
```

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero Title | 3-4.5rem | 700 | 1.2 |
| Section Title | 2.25-3rem | 700 | 1.2 |
| Subheading | 1.5-1.875rem | 600 | 1.3 |
| Body Text | 1rem | 400 | 1.5-1.6 |
| Small Text | 0.875rem | 400 | 1.4 |
| Button Text | 0.875-1rem | 600 | 1.2 |

---

## 🎭 Component Styles

### Hero Section
```
Background: Full-screen image + dark overlay
Text: White on dark background
Gradient: Yellow/Gold accent for highlight
CTA: Primary green buttons
Stats: Amber & yellow text on dark
```

### Activity Cards (5 Pillars)
```
Layout: Grid (responsive: 1 col mobile, 5 col desktop)
Background: Colored backgrounds (light tints)
Icon: Colored circle with icon
Title: Dark text, semibold
Text: Muted gray text
Hover: Scale + shadow effect
```

### Achievement Cards
```
Layout: Grid (4 columns desktop)
Background: Light muted gradient
Icon: Small primary colored circle
Number: Large primary text
Label: Muted gray
Border: Light border with hover effect
```

### News Items
```
Layout: Vertical stack
Border: Colored left border
Title: Dark, bold
Date: Primary text with calendar icon
Category: Colored badge
Description: Muted gray text
Hover: Background color change + underline effect
```

### Form Elements
```
Input: White background, light border
Focus: Primary border color + ring
Label: Dark text, semibold
Button: Full-width green primary button
Placeholder: Muted gray text
```

### Buttons

#### Primary Button
```
Background: Forest Green (#1F6B3B)
Foreground: White
Hover: Darken by 10%
Padding: 12px 32px
Border Radius: 8px
Font Weight: 600
```

#### Secondary Button
```
Background: Transparent
Border: 2px solid border color
Foreground: Dark text
Hover: Background color change
```

---

## 📐 Spacing System

### Margin & Padding Scale
```
xs: 0.5rem    (8px)
sm: 1rem      (16px)
md: 1.5rem    (24px)
lg: 2rem      (32px)
xl: 3rem      (48px)
2xl: 4rem     (64px)
```

### Section Spacing
```
Vertical Padding: 5rem (80px) per section
Horizontal Padding: 1rem mobile, 2rem desktop
Gap Between Components: 2-3rem
```

---

## 🎯 Layout Patterns

### Section Structure
```html
<section class="py-20 px-4 md:px-8">
  <div class="max-w-6xl mx-auto">
    <!-- Heading -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-display font-bold">
      <div class="w-24 h-1 bg-gradient">
    <!-- Content -->
    <div class="grid ...">
  </div>
</section>
```

### Grid Layouts
```
Mobile: 1 column
Tablet: 2 columns
Desktop: 3-4 columns (depending on content)
Gap: 1.5rem (24px)
```

---

## 🎬 Animation & Interactions

### Hover Effects
- **Cards**: Scale 1.05 + shadow increase
- **Buttons**: Opacity change + slight shift
- **Links**: Color change + underline animation
- **Icons**: Rotation or scale effect

### Transitions
```css
transition: all 300ms ease-out;
```

### Animations
- Scroll indicator: Infinite bounce
- Underline: Smooth width change
- Fade in: On scroll into view
- Slide up: Content on page load

---

## 🌈 Gradient Combinations

### Hero Gradient
```css
from-yellow-200 via-amber-200 to-yellow-100
```

### Card Gradients
```css
from-primary to-teal-500         /* Blue-Green */
from-red-500 to-pink-500         /* Red-Pink */
from-orange-500 to-red-500       /* Orange-Red */
```

### Text Gradients
```css
bg-gradient-to-r from-primary via-accent to-primary
bg-clip-text text-transparent
```

---

## ♿ Accessibility Features

### Color Contrast
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- All buttons have sufficient contrast

### ARIA Labels
- Buttons have descriptive text or aria-label
- Icons have aria-hidden="true" when decorative
- Form fields have associated labels

### Keyboard Navigation
- All interactive elements are focusable
- Tab order makes logical sense
- Focus indicators are visible

### Semantic HTML
- Proper heading hierarchy (h1 → h6)
- Form elements use `<label>` tags
- Buttons use `<button>` elements
- Links use `<a>` elements

---

## 📱 Responsive Design

### Breakpoints
```css
Mobile: max-width: 640px
Tablet: 641px - 1024px
Desktop: 1025px+
```

### Mobile Optimizations
- Single column layouts
- Larger touch targets (44px minimum)
- Simplified navigation (hamburger menu)
- Full-width components
- Readable font sizes (16px minimum)

### Desktop Enhancements
- Multi-column grids
- Horizontal layouts
- Expanded navigation
- Hover effects enabled
- Optimized whitespace

---

## 🖼️ Image Specifications

### Hero Background
- **Format**: JPG (optimized)
- **Dimensions**: 1920x1080 (16:9 aspect ratio)
- **Size**: < 500KB
- **Alt Text**: Descriptive location/activity

### Gallery Images
- **Format**: JPG or WebP
- **Aspect Ratio**: Square (1:1) or 4:3
- **Optimization**: Compressed for web
- **Lazy Loading**: Enabled

### Icons
- **Format**: SVG (Lucide icons)
- **Size**: 20-64px depending on context
- **Color**: Inherit from parent or set color

---

## 🎨 Dark Mode Support

All color tokens support dark mode through CSS custom properties:

```css
:root { /* Light mode */ }
.dark { /* Dark mode */ }
```

### Dark Mode Colors
```css
--background: 0 0% 8%;
--foreground: 0 0% 96%;
--primary: 131 62% 50%;
--secondary: 44 87% 60%;
```

---

## 📊 Component Showcase

### Navigation Bar
```
Height: 64px (mobile) / 80px (desktop)
Background: White with backdrop blur
Border: Bottom light gray
Padding: 1rem horizontal
Items: Flexbox with spacing
```

### Hero Section
```
Height: 100vh (full screen)
Background: Image + dark overlay
Content: Centered flex column
CTA: Side-by-side buttons
Animation: Scroll indicator bounce
```

### Activity Cards
```
Layout: 5 columns (desktop), 1 (mobile)
Height: Auto
Shadow: On hover
Border: 2px transparent, hover color
```

### Form
```
Layout: 2 column grid (desktop)
Inputs: Full width
Spacing: 1rem gap
Button: Full width at bottom
```

---

## 🚀 Performance Notes

- Images optimized with Next.js Image component
- CSS uses Tailwind utilities (no custom bloat)
- Minimal JavaScript animations
- Hardware-accelerated CSS transforms
- No unnecessary re-renders in React

---

## 📋 Brand Guidelines Summary

| Aspect | Specification |
|--------|---------------|
| **Primary Color** | Forest Green #1F6B3B |
| **Secondary Color** | Vibrant Gold #CCAD00 |
| **Accent Color** | Sunset Orange #FF6B35 |
| **Display Font** | Playfair Display |
| **Body Font** | Inter |
| **Button Style** | Rounded (8px) Primary Green |
| **Spacing** | Multiples of 8px |
| **Typography** | Sophisticated yet modern |
| **Tone** | Professional, inspiring, action-oriented |

---

**Design Guide Version**: 1.0
**Last Updated**: February 2024
**Framework**: Tailwind CSS
**Compliance**: WCAG 2.1 Level AA
