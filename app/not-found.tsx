import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="text-center max-w-lg">
                <div className="mb-8">
                    <span className="text-[120px] md:text-[160px] font-display font-bold leading-none bg-gradient-to-b from-primary to-primary/20 bg-clip-text text-transparent">
                        404
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    Trail Not Found
                </h1>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                    Looks like you&apos;ve wandered off the path! This page doesn&apos;t exist — but there&apos;s plenty to explore back at camp.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/programs"
                        className="inline-flex items-center justify-center gap-2 bg-muted/50 text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors border border-border"
                    >
                        Our Programs
                    </Link>
                    <Link
                        href="/join"
                        className="inline-flex items-center justify-center gap-2 bg-muted/50 text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors border border-border"
                    >
                        Join Us
                    </Link>
                </div>

                <p className="text-xs text-muted-foreground mt-12">
                    President&apos;s Award — Kirinyaga University Chapter
                </p>
            </div>
        </div>
    )
}
