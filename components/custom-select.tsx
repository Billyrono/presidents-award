'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Plus } from 'lucide-react'

type CustomSelectProps = {
    value: string
    options: string[]
    onChange: (value: string) => void
    placeholder?: string
    allowCreate?: boolean
    onCreateNew?: () => void
    createLabel?: string
}

export function CustomSelect({
    value,
    options,
    onChange,
    placeholder = 'Select...',
    allowCreate = false,
    onCreateNew,
    createLabel = 'Create new...',
}: CustomSelectProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm text-left flex items-center justify-between gap-2 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            >
                <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute z-50 top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="max-h-48 overflow-y-auto py-1">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { onChange(opt); setOpen(false) }}
                                className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-primary/5 transition-colors ${value === opt ? 'text-primary font-semibold bg-primary/5' : 'text-foreground'}`}
                            >
                                {opt}
                                {value === opt && <Check className="w-4 h-4 text-primary" />}
                            </button>
                        ))}
                    </div>
                    {allowCreate && (
                        <div className="border-t border-border">
                            <button
                                type="button"
                                onClick={() => { onCreateNew?.(); setOpen(false) }}
                                className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 text-primary hover:bg-primary/5 transition-colors font-medium"
                            >
                                <Plus className="w-4 h-4" /> {createLabel}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
