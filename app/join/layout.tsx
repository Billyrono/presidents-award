import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Join the Program — President's Award Kirinyaga University",
    description: "Apply to join the President's Award program at Kirinyaga University. Start your journey toward Bronze, Silver, or Gold and become #WORLDREADY.",
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
