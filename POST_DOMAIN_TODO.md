# Post-Domain Launch TODO

> Everything that needs to be done once the domain is purchased.
> Domain placeholder: `mysite.com` — replace with actual domain.

---

## 1. Domain & Deployment

- [ ] Purchase domain
- [ ] Configure DNS records (point to Vercel / hosting provider)
- [ ] Add custom domain in Vercel project settings
- [ ] Enable HTTPS / SSL certificate (auto on Vercel)
- [ ] Update `next.config.js` with production domain if needed
- [ ] Set environment variables in production (Supabase URL, anon key, etc.)
- [ ] Update all hardcoded `localhost` or dev URLs to production domain
- [ ] Update `sitemap.xml` / `robots.txt` with production URL
- [ ] Update meta tags, Open Graph URLs, and canonical links

---

## 2. User Accounts & Roles

### Create Accounts
- [ ] Create Supabase Auth user: **chair@mysite.com** → role: `chair`
- [ ] Create Supabase Auth user: **vicechair@mysite.com** → role: `vice_chair`
- [ ] Create Supabase Auth user: **pr@mysite.com** → role: `pr`

### Role-Based Access Control (RBAC)

| Feature | Admin (Chair) | Vice Chair | PR |
|---|:---:|:---:|:---:|
| **Gallery** — add/edit/delete images | ✅ | ✅ | ✅ |
| **News** — create/edit/publish articles | ✅ | ✅ | ✅ |
| **Upcoming Events** — add/edit posters | ✅ | ✅ | ✅ |
| **Applications** — view/manage all | ✅ | ✅ | ❌ |
| **Expeditions** — add/edit/delete | ✅ | ✅ | ❌ |
| **Residential Projects** — add/edit/delete | ✅ | ✅ | ❌ |
| **Site Settings** — edit global settings | ✅ | ❌ | ❌ |
| **User Management** — manage roles/users | ✅ | ❌ | ❌ |
| **Delete content** — hard delete anything | ✅ | ❌ | ❌ |

- [ ] Add `role` column to Supabase `auth.users` metadata or create a `user_roles` table
- [ ] Create RLS (Row Level Security) policies per role
- [ ] Add role checks in admin pages — hide unauthorized sections
- [ ] Show/hide admin nav items based on role
- [ ] Test each role's access thoroughly

---

## 3. Upcoming Events Section (Homepage)

- [ ] Create `events` table in Supabase:
  ```
  id, title, description, date, location, poster_url, 
  details, is_active, sort_order, created_by, created_at
  ```
- [ ] Add `Event` type to `lib/types.ts`
- [ ] Add `getEvents()` function to `lib/content.ts`
- [ ] Create homepage "Upcoming Events" section with poster cards
- [ ] Create admin page `/admin/events` for PR/Vice Chair/Admin to:
  - Upload event poster image
  - Set title, date, location, description, full details
  - Toggle active/inactive
  - Reorder events
- [ ] Display events on homepage in a visually appealing carousel/grid
- [ ] Auto-hide past events or mark them as completed

---

## 4. Email Service

### Options Comparison

| Feature | Resend | Supabase Edge Functions + SMTP | Nodemailer (self-hosted) |
|---|---|---|---|
| **Free tier** | 100 emails/day, 3K/month | Edge Functions free tier; SMTP cost varies | Free (but need SMTP) |
| **Setup** | Very easy (API key) | Moderate (write edge function + SMTP config) | Moderate |
| **Deliverability** | Excellent (built-in) | Depends on SMTP provider | Depends on SMTP |
| **Templates** | React Email support | Manual HTML | Manual HTML |
| **Custom domain** | ✅ Easy | ✅ Via SMTP provider | ✅ Via SMTP |
| **Reliability** | Production-grade | Depends on edge function + SMTP | Self-managed |
| **Analytics** | Opens, clicks, bounces | Manual | Manual |
| **Cost at scale** | $20/month for 50K emails | Edge functions free; SMTP costs | SMTP costs only |

**Recommendation:** **Resend** — easiest setup, best deliverability, React Email templates, generous free tier.

### Email Tasks
- [ ] Choose email provider (Resend recommended)
- [ ] Set up email domain verification (SPF, DKIM, DMARC records)
- [ ] Implement email templates:
  - [ ] Application confirmation email (to applicant)
  - [ ] Application notification email (to admin/chair)
  - [ ] Contact form submission notification
  - [ ] Event announcement email (optional)
- [ ] Create API route `/api/send-email` for sending emails
- [ ] Connect contact form to email service
- [ ] Connect application form to send confirmation emails

---

## 5. Application Form Integration

- [ ] ~~Clear test data~~ ✅ (see instructions below)
- [ ] Connect application form submissions to email notifications
- [ ] Add application status workflow (received → under review → accepted/rejected)
- [ ] Add email notification when application status changes
- [ ] Optional: application dashboard for applicants to check status

---

## 6. Content & SEO

- [ ] Add real content to all pages (about, pillars, etc.)
- [ ] Add proper `<title>` and meta descriptions for all pages
- [ ] Set up Google Analytics / Vercel Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Add favicon and app icons for all sizes
- [ ] Set up Open Graph images for social sharing

---

## 7. Security & Compliance

- [ ] Enable Supabase RLS on all tables
- [ ] Review and update Terms of Service with real domain
- [ ] Review and update Privacy Policy with real domain
- [ ] Ensure cookie consent is working properly
- [ ] Set up rate limiting on forms (application, contact)
- [ ] Add CAPTCHA to public forms (optional)

---

## 8. Testing & Launch

- [ ] Test all forms on production domain
- [ ] Test email delivery
- [ ] Test role-based access for all 3 users
- [ ] Test mobile responsiveness on real devices
- [ ] Test gallery sub-category navigation
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Final review with stakeholders

---

## Priority Order
1. 🔴 Domain + Deployment
2. 🔴 Clear test data & fresh start
3. 🟠 User accounts + RBAC
4. 🟠 Email service setup
5. 🟡 Upcoming events section
6. 🟡 Content & SEO
7. 🟢 Security hardening
8. 🟢 Final testing
