'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, CheckCircle } from 'lucide-react'

type Setting = { id: string; key: string; value: string }

const settingLabels: Record<string, { label: string; description: string }> = {
    total_awards: { label: 'Total Awards', description: 'Number displayed in hero and achievements — includes Bronze, Silver & Gold (e.g. "20+")' },
    award_levels: { label: 'Award Levels', description: 'Text describing which levels are awarded (e.g. "Bronze, Silver & Gold")' },
    enrollment_status: { label: 'Enrollment Status', description: 'Current enrollment status text' },
    contact_phone: { label: 'Phone Number', description: 'Contact phone number shown on site' },
    contact_email: { label: 'Email', description: 'Contact email address' },
    contact_location: { label: 'Location', description: 'Physical address / location text' },
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Setting[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [values, setValues] = useState<Record<string, string>>({})

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from('site_settings').select('*')
            const s = data || []
            setSettings(s)
            const v: Record<string, string> = {}
            s.forEach((setting: Setting) => { v[setting.key] = setting.value })
            setValues(v)
            setLoading(false)
        }
        fetch()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        for (const setting of settings) {
            if (values[setting.key] !== setting.value) {
                await supabase.from('site_settings')
                    .update({ value: values[setting.key], updated_at: new Date().toISOString() })
                    .eq('id', setting.id)
            }
        }
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Site Settings</h1>
                    <p className="text-muted-foreground text-sm mt-1">Update global values used across the site</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}</>}
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border divide-y divide-border">
                {settings.map((setting) => {
                    const meta = settingLabels[setting.key]
                    return (
                        <div key={setting.id} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                    <label className="font-medium text-sm text-foreground">{meta?.label || setting.key}</label>
                                    <p className="text-xs text-muted-foreground mt-0.5">{meta?.description || `Key: ${setting.key}`}</p>
                                </div>
                                <input
                                    value={values[setting.key] || ''}
                                    onChange={e => setValues({ ...values, [setting.key]: e.target.value })}
                                    className="w-full md:w-80 bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-primary/5 rounded-xl p-4 mt-6 border border-primary/10">
                <p className="text-sm text-foreground/70">
                    <strong className="text-primary">How it works:</strong> These values are used across the entire site. For example, updating &quot;Total Awards&quot; here will automatically update the hero section, home page stats, and achievements page. All award levels (Bronze, Silver &amp; Gold) are shown.
                </p>
            </div>
        </div>
    )
}
