import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gallery — President's Award Kirinyaga University",
    description: "View photos and memories from our expeditions, community service, award ceremonies, and chapter activities.",
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
