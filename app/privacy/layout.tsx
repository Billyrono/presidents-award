import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Privacy Policy — President's Award Kirinyaga University",
    description: "How we collect, use, and protect your personal information in compliance with Kenya's Data Protection Act, 2019.",
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
