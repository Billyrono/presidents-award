'use client'

import { useRef, useState } from 'react'
import {
    Bold, Italic, Strikethrough, Heading2, Heading3,
    Quote, List, ListOrdered, Link2, Minus, Eye, EyeOff
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

type Props = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    rows?: number
}

const TOOLS = [
    { icon: Bold, label: 'Bold', prefix: '**', suffix: '**', placeholder: 'bold text' },
    { icon: Italic, label: 'Italic', prefix: '*', suffix: '*', placeholder: 'italic text' },
    { icon: Strikethrough, label: 'Strikethrough', prefix: '~~', suffix: '~~', placeholder: 'strikethrough' },
    { type: 'divider' as const },
    { icon: Heading2, label: 'Heading 2', prefix: '\n## ', suffix: '', placeholder: 'Heading', block: true },
    { icon: Heading3, label: 'Heading 3', prefix: '\n### ', suffix: '', placeholder: 'Subheading', block: true },
    { type: 'divider' as const },
    { icon: Quote, label: 'Blockquote', prefix: '\n> ', suffix: '', placeholder: 'quote', block: true },
    { icon: List, label: 'Bullet List', prefix: '\n- ', suffix: '', placeholder: 'List item', block: true },
    { icon: ListOrdered, label: 'Numbered List', prefix: '\n1. ', suffix: '', placeholder: 'List item', block: true },
    { type: 'divider' as const },
    { icon: Link2, label: 'Link', prefix: '[', suffix: '](https://)', placeholder: 'link text' },
    { icon: Minus, label: 'Horizontal Rule', prefix: '\n\n---\n\n', suffix: '', placeholder: '' },
]

export function MarkdownEditor({ value, onChange, placeholder = 'Write your content...', rows = 8 }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showPreview, setShowPreview] = useState(false)

    const insertFormatting = (prefix: string, suffix: string, placeholderText: string) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selectedText = value.substring(start, end)
        const replacement = selectedText || placeholderText

        const newValue = value.substring(0, start) + prefix + replacement + suffix + value.substring(end)
        onChange(newValue)

        // Set cursor position after insert
        requestAnimationFrame(() => {
            textarea.focus()
            const cursorPos = start + prefix.length + replacement.length
            textarea.setSelectionRange(
                selectedText ? cursorPos + suffix.length : start + prefix.length,
                selectedText ? cursorPos + suffix.length : cursorPos
            )
        })
    }

    return (
        <div className="rounded-lg border border-border overflow-hidden bg-muted/10">
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border bg-muted/30 flex-wrap">
                {TOOLS.map((tool, i) => {
                    if ('type' in tool && tool.type === 'divider') {
                        return <div key={i} className="w-px h-5 bg-border mx-1" />
                    }
                    const Tool = tool as { icon: React.ComponentType<{ className?: string }>; label: string; prefix: string; suffix: string; placeholder: string }
                    const Icon = Tool.icon
                    return (
                        <button
                            key={i}
                            type="button"
                            title={Tool.label}
                            onClick={() => insertFormatting(Tool.prefix, Tool.suffix, Tool.placeholder)}
                            className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    )
                })}
                <div className="flex-1" />
                <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className={`p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${showPreview ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                >
                    {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showPreview ? 'Edit' : 'Preview'}
                </button>
            </div>

            {/* Editor / Preview */}
            {showPreview ? (
                <div className="px-4 py-3 min-h-[200px] prose prose-sm max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground prose-a:text-primary">
                    {value ? (
                        <ReactMarkdown>{value}</ReactMarkdown>
                    ) : (
                        <p className="text-muted-foreground italic">Nothing to preview yet...</p>
                    )}
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={rows}
                    className="w-full px-4 py-3 text-sm bg-transparent focus:outline-none resize-y min-h-[200px] font-mono"
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}
