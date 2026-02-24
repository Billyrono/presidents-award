# Admin Panel Management Guide

## President's Award — Kirinyaga University Chapter

---

## Accessing the Admin Panel

1. Open the website and scroll to the very bottom (footer).
2. Click the **President's Award logo** — it's a hidden link to the admin panel.
3. You'll be taken to `/admin/login`.
4. Sign in with your admin credentials (email + password).

> **Note:** The admin panel only works on **tablets and desktops**. It will not open on mobile phones — this is intentional for security.

---

## Admin Users

| Role | Name | Access Level |
|------|------|-------------|
| **Admin** | *(system administrator)* | Full access to all sections |
| **PR Lead** | *(to be assigned)* | News, Gallery |
| **Chairperson** | *(to be assigned)* | All sections |
| **Vice Chairperson** | *(to be assigned)* | All sections |

### Setting Up User Accounts

All admin users are managed through **Supabase Authentication**:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Authentication → Users**
3. Click **Add User** → **Create New User**
4. Enter the user's email and a temporary password
5. Share the credentials with the user — they can change their password after first login

---

## Admin Sections

### Dashboard (`/admin`)
- Overview of site statistics
- Quick links to all management sections

### News Articles (`/admin/news`)
- **Add Article**: Click "Add Article" → fill in title, date, category, summary
- **Write Content**: Use the **markdown toolbar** to format articles:
  - **B** = Bold, **I** = Italic, **S** = Strikethrough
  - **H2/H3** = Headings and subheadings
  - **" "** = Blockquotes
  - **•** = Bullet lists, **1.** = Numbered lists
  - **🔗** = Insert links
  - **—** = Horizontal divider
  - Click **Preview** to see how the article will look before publishing
- **Manage**: Toggle featured ⭐, toggle published 👁️, edit ✏️, or delete 🗑️

### Expeditions (`/admin/expeditions`)
- Add and manage expedition records
- Include dates, locations, and descriptions

### Gallery (`/admin/gallery`)
- **Add Images**: Enter image URL, title, category, and description
- **Bulk Add**: Paste multiple image URLs at once
- **Focus Point**: Set where the image should be focused when cropped
- **Categories**: Create and manage photo categories
- Images appear on the public gallery page automatically

### Applications (`/admin/applications`)
- **View-only** — you cannot edit applications
- See all student applications from the Join page
- **Search** by name, email, or faculty
- **Click** on any application to expand and see full details
- **Contact applicants** directly:
  - 📧 Email
  - 📞 Phone call
  - 💬 WhatsApp (opens with a pre-written welcome message)

### Settings (`/admin/settings`)
- Site configuration and preferences

---

## Writing News Articles — Markdown Reference

When writing news content in the admin panel, you can use these formatting shortcuts:

| What you type | What it looks like |
|---|---|
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `## Heading` | Large heading |
| `### Subheading` | Smaller heading |
| `> quote` | Blockquote |
| `- item` | • Bullet list |
| `1. item` | 1. Numbered list |
| `[link text](https://url.com)` | Clickable link |
| `---` | Horizontal line |

Or just use the **toolbar buttons** at the top of the editor — no need to memorize syntax!

---

## Adding Gallery Images

1. Upload your images to **Google Drive** or any image hosting service
2. Get the **direct image URL** (for Google Drive, use the sharing link)
3. Go to **Admin → Gallery → Add Image**
4. Paste the URL, fill in title and category
5. Set the **focus point** to control how the image is cropped
6. The image will appear on the public gallery page immediately

---

## Important Notes

- **Always sign out** when you're done (click the logout icon in the sidebar)
- **Don't share admin credentials** — each user should have their own account
- **News articles** can be saved as drafts (unpublished) and published later
- **Applications** cannot be deleted from the admin panel — they are permanent records
- The admin panel is **not accessible on mobile phones** for security
