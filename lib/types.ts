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
