'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface MotionRevealProps {
    children: React.ReactNode
    delay?: number
    className?: string
    direction?: 'up' | 'left' | 'right' | 'none'
    duration?: number
    /** Show a shimmer skeleton placeholder before the element animates in */
    showSkeleton?: boolean
}

export function MotionReveal({
    children,
    delay = 0,
    className,
    direction = 'up',
    duration = 0.7,
    showSkeleton = false,
}: MotionRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const isRevealed = isInView

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : 0,
            x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    }

    return (
        <div ref={ref} className={`${className || ''} relative`}>
            {/* Skeleton placeholder — visible BEFORE the content animates in */}
            {showSkeleton && !isRevealed && (
                <div className="absolute inset-0 rounded-sm overflow-hidden z-[1]">
                    <div className="gallery-skeleton" style={{ borderRadius: 'inherit' }}>
                        <div className="gallery-skeleton-icon">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {/* Animated content */}
            <motion.div
                initial="hidden"
                animate={isRevealed ? 'visible' : 'hidden'}
                variants={variants}
                transition={{
                    duration,
                    delay: delay / 1000,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-[2]"
            >
                {children}
            </motion.div>
        </div>
    )
}
