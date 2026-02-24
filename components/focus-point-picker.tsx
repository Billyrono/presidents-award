'use client'

import { useRef, useState, useCallback } from 'react'

type FocusPointPickerProps = {
    imageUrl: string
    value: number // 0-100
    onChange: (value: number) => void
}

export function FocusPointPicker({ imageUrl, value, onChange }: FocusPointPickerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState(false)

    const updateFromEvent = useCallback((clientY: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
        onChange(Math.round(y * 100))
    }, [onChange])

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setDragging(true)
        updateFromEvent(e.clientY)

        const onMove = (ev: MouseEvent) => updateFromEvent(ev.clientY)
        const onUp = () => {
            setDragging(false)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setDragging(true)
        updateFromEvent(e.touches[0].clientY)

        const onMove = (ev: TouchEvent) => {
            ev.preventDefault()
            updateFromEvent(ev.touches[0].clientY)
        }
        const onUp = () => {
            setDragging(false)
            window.removeEventListener('touchmove', onMove)
            window.removeEventListener('touchend', onUp)
        }
        window.addEventListener('touchmove', onMove, { passive: false })
        window.addEventListener('touchend', onUp)
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                {/* Full image with drag handle */}
                <div
                    ref={containerRef}
                    className={`relative w-28 h-40 rounded-lg overflow-hidden border-2 ${dragging ? 'border-primary shadow-lg' : 'border-border'} transition-all select-none flex-shrink-0`}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt="Full"
                        className="w-full h-full object-cover object-center pointer-events-none"
                        draggable={false}
                    />
                    {/* Darken outside the crop zone */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Top dim */}
                        <div
                            className="absolute left-0 right-0 top-0 bg-black/50 transition-all"
                            style={{ height: `${Math.max(0, value - 18.75)}%` }}
                        />
                        {/* Bottom dim */}
                        <div
                            className="absolute left-0 right-0 bottom-0 bg-black/50 transition-all"
                            style={{ height: `${Math.max(0, 100 - value - 18.75)}%` }}
                        />
                    </div>
                    {/* Drag line */}
                    <div
                        className="absolute left-0 right-0 pointer-events-none transition-all"
                        style={{ top: `${value}%`, transform: 'translateY(-50%)' }}
                    >
                        <div className="relative flex items-center">
                            <div className="absolute left-0 right-0 h-[2px] bg-primary shadow-sm" />
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md" />
                        </div>
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                        {value}%
                    </div>
                </div>

                {/* Arrow + Crop preview */}
                <div className="flex flex-col items-center gap-1">
                    <span className="text-muted-foreground text-xs">→</span>
                </div>

                {/* Preview of how it'll look cropped in the gallery */}
                <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt="Cropped preview"
                        className="w-full h-full object-cover pointer-events-none transition-all"
                        style={{ objectPosition: `center ${value}%` }}
                        draggable={false}
                    />
                    <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Gallery view
                    </div>
                </div>
            </div>
            <p className="text-xs text-muted-foreground">Drag the handle to set the focal point. The right shows how it&apos;ll look cropped in the gallery grid.</p>
        </div>
    )
}
