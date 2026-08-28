'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
    to: number
    suffix?: string
    duration?: number
    className?: string
}

export function Counter({ to, suffix = '', duration = 2, className }: CounterProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        let startTime: number
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * to))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(to)
        }
        requestAnimationFrame(step)
    }, [isInView, to, duration])

    return (
        <span ref={ref} className={className}>
            {count}{suffix}
        </span>
    )
}
