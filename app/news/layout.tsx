import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "News & Updates — President's Award Kirinyaga University",
    description: "Latest news, expedition reports, recognition stories, and updates from the President's Award – Kirinyaga University Chapter.",
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
