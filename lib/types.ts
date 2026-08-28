export type Expedition = {
    id: string
    name: string
    type: string
    location: string
    date: string
    description: string
    coming_soon: boolean
    sort_order: number
    created_at: string
}

export type Project = {
    id: string
    name: string
    location: string
    date: string
    description: string
    coming_soon: boolean
    sort_order: number
    created_at: string
}

export type NewsArticle = {
    id: string
    slug: string
    title: string
    date: string
    category: string
    description: string
    content: string
    featured_image: string | null
    published_by: string
    featured: boolean
    published: boolean
    sort_order: number
    created_at: string
}

export type GalleryImage = {
    id: string
    title: string
    category: string
    description: string
    image_url: string | null
    focus_point: number // 0-100 percentage (0=top, 50=center, 100=bottom)
    coming_soon: boolean
    sort_order: number
    created_at: string
}

export type SiteSetting = {
    id: string
    key: string
    value: string
    updated_at: string
}

export type Event = {
    id: string
    title: string
    description: string | null
    date: string | null
    location: string | null
    poster_url: string | null
    details: string | null
    is_active: boolean
    sort_order: number
    created_by: string | null
    created_at: string
}

export type Application = {
    id: string
    full_name: string
    email: string
    phone: string
    faculty: string
    year_of_study: string
    interests: string | null
    message: string | null
    status: 'received' | 'under_review' | 'accepted' | 'rejected'
    status_updated_at: string | null
    admin_notes: string | null
    created_at: string
}

