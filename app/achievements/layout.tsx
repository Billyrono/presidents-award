import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Achievements — President's Award Kirinyaga University",
    description: "Celebrating our Gold Award recipients honored at State House, expedition milestones, and the impact of the President's Award program.",
}

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
