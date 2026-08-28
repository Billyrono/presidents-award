'use client'

import { useEffect, useRef, useState } from 'react'

type BgZone = 'dark' | 'olive' | 'gold' | 'light'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [isHovering, setIsHovering] = useState(false)
  const [zone, setZone] = useState<BgZone>('dark')
  const [activated, setActivated] = useState(false)
  const [mouseInWindow, setMouseInWindow] = useState(true)

  useEffect(() => {
    let styleEl: HTMLStyleElement | null = null

    const onFirstMove = () => {
      document.removeEventListener('mousemove', onFirstMove)
      setActivated(true)

      // Inject global cursor:none
      styleEl = document.createElement('style')
      styleEl.id = 'custom-cursor-hide'
      styleEl.textContent = 'html, body, *, *::before, *::after { cursor: none !important; }'
      document.head.appendChild(styleEl)
    }

    document.addEventListener('mousemove', onFirstMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onFirstMove)
      if (styleEl) styleEl.remove()
      const existing = document.getElementById('custom-cursor-hide')
      if (existing) existing.remove()
    }
  }, [])

  useEffect(() => {
    if (!activated) return

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        const bg = getComputedBackgroundColor(el as HTMLElement)
        setZone(detectZone(bg))
      }
    }

    const onMouseEnter = () => setMouseInWindow(true)
    const onMouseLeave = () => setMouseInWindow(false)

    const onMouseOver = (e: MouseEvent) => {
      if (isClickable(e.target as HTMLElement)) setIsHovering(true)
    }
    const onMouseOut = (e: MouseEvent) => {
      if (isClickable(e.target as HTMLElement)) setIsHovering(false)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })

    const animate = () => {
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.18
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.18
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.09
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.09

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [activated])

  if (!activated || !mouseInWindow) return null

  // ── Colour mapping ────────────────────────────────────────────
  // On dark/black  → gold cursor
  // On olive green → white cursor
  // On gold        → black cursor
  // On white/light → olive green cursor
  const colors = ZONE_COLORS[zone]

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          width: isHovering ? 10 : 7,
          height: isHovering ? 10 : 7,
          borderRadius: '50%',
          backgroundColor: colors.dot,
          willChange: 'transform',
          transition: 'width 0.25s ease, height 0.25s ease',
        }}
      />

      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: 'none',
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          borderRadius: '50%',
          border: `1.5px solid ${colors.ring}`,
          backgroundColor: isHovering ? colors.ringFill : 'transparent',
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      />
    </>
  )
}

// ── Colour table ────────────────────────────────────────────────

const ZONE_COLORS: Record<BgZone, { dot: string; ring: string; ringFill: string }> = {
  dark:  { dot: '#C9A84C', ring: 'rgba(201,168,76,0.3)',  ringFill: 'rgba(201,168,76,0.08)' },   // gold
  olive: { dot: '#FFFFFF', ring: 'rgba(255,255,255,0.3)',  ringFill: 'rgba(255,255,255,0.08)' },   // white
  gold:  { dot: '#070b09', ring: 'rgba(7,11,9,0.3)',       ringFill: 'rgba(7,11,9,0.08)' },        // black
  light: { dot: '#4A5A3A', ring: 'rgba(74,90,58,0.25)',    ringFill: 'rgba(74,90,58,0.06)' },      // olive
}

// ── Helpers ──────────────────────────────────────────────────────

function isClickable(el: HTMLElement): boolean {
  return !!(
    el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]') ||
    window.getComputedStyle(el).cursor === 'pointer'
  )
}

function getComputedBackgroundColor(el: HTMLElement): string {
  let current: HTMLElement | null = el
  while (current) {
    const bg = window.getComputedStyle(current).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return bg
    }
    current = current.parentElement
  }
  return 'rgb(255, 255, 255)'
}

function detectZone(color: string): BgZone {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return 'light'
  const r = Number(match[1])
  const g = Number(match[2])
  const b = Number(match[3])

  // Check for gold: high red, moderate green, low blue (C9A84C = 201,168,76)
  if (r > 150 && g > 120 && g < 200 && b < 110 && r > b * 1.5) {
    return 'gold'
  }

  // Check for olive green: moderate-low rgb, green slightly dominant (4A5A3A = 74,90,58)
  if (r < 120 && g < 130 && b < 100 && g > r * 0.8 && g > b) {
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    if (luminance > 0.15 && luminance < 0.45) {
      return 'olive'
    }
  }

  // General luminance check for dark vs light
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (luminance < 0.3) return 'dark'
  return 'light'
}
