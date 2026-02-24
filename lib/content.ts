import { supabase } from './supabase'
import type { Expedition, Project, NewsArticle, GalleryImage, SiteSetting } from './types'

// ── Expeditions (Adventurous Journeys) ───────────────────────

export async function getExpeditions(): Promise<Expedition[]> {
    const { data, error } = await supabase
        .from('expeditions')
        .select('*')
        .order('sort_order', { ascending: true })
    if (error) {
        console.error('Error fetching expeditions:', error)
        return []
    }
    return data || []
}

// ── Residential Projects ─────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
    if (error) {
        console.error('Error fetching projects:', error)
        return []
    }
    return data || []
}

// ── News ─────────────────────────────────────────────────────

export async function getNews(): Promise<NewsArticle[]> {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
    if (error) {
        console.error('Error fetching news:', error)
        return []
    }
    return data || []
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single()
    if (error) {
        console.error('Error fetching news article:', error)
        return null
    }
    return data
}

export async function getNewsSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('news')
        .select('slug')
        .eq('published', true)
    if (error) return []
    return (data || []).map(n => n.slug)
}

// ── Gallery ──────────────────────────────────────────────────

export async function getGallery(): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true })
    if (error) {
        console.error('Error fetching gallery:', error)
        return []
    }
    return data || []
}

// ── Settings ─────────────────────────────────────────────────

export async function getSettings(): Promise<Record<string, string>> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
    if (error) {
        console.error('Error fetching settings:', error)
        return {}
    }
    const settings: Record<string, string> = {}
        ; (data || []).forEach((s: SiteSetting) => {
            settings[s.key] = s.value
        })
    return settings
}

export async function getSetting(key: string): Promise<string> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single()
    if (error) return ''
    return data?.value || ''
}

// ── Combined Stats ───────────────────────────────────────────

export async function getSiteStats() {
    const [expeditions, projects, settings] = await Promise.all([
        getExpeditions(),
        getProjects(),
        getSettings(),
    ])
    return {
        totalAwards: settings['total_awards'] || '20+',
        awardLevels: settings['award_levels'] || 'Bronze, Silver & Gold',
        ajCount: expeditions.length,
        rpCount: projects.length,
        pillarsCount: 5,
        enrollmentStatus: settings['enrollment_status'] || 'Growing',
    }
}

// ── Image URL Helpers ────────────────────────────────────────

/**
 * Convert a Google Drive share link to an embeddable direct URL.
 * Accepts links like:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 * Returns a direct image URL, or the original URL if not a Drive link.
 */
export function toDirectImageUrl(url: string | null): string | null {
    if (!url) return null

    // Google Drive file link: /file/d/FILE_ID/...
    const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
    if (driveFileMatch) {
        return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`
    }

    // Google Drive open link: ?id=FILE_ID
    const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/)
    if (driveOpenMatch) {
        return `https://lh3.googleusercontent.com/d/${driveOpenMatch[1]}`
    }

    // Already a direct URL or local path
    return url
}
