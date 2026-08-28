'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAdminRole } from '@/lib/admin-role-context'
import { UserCog, ShieldX, Trash2, RefreshCw, Send, CheckCircle, AlertCircle, X } from 'lucide-react'

type AdminRole = 'chair' | 'vice_chair' | 'pr' | 'admin'

type UserRoleRow = {
    id: string
    user_id: string
    role: AdminRole
    full_name: string | null
    email: string | null
    phone: string | null
    created_at: string
}

const ROLE_OPTIONS: { value: Exclude<AdminRole, 'admin'>; label: string; description: string }[] = [
    { value: 'chair', label: 'Chair', description: 'Full access to all sections' },
    { value: 'vice_chair', label: 'Vice Chair', description: 'Access to most sections' },
    { value: 'pr', label: 'PR', description: 'News, Events & Gallery only' },
]

const ROLE_BADGE: Record<AdminRole, string> = {
    chair: 'bg-primary/15 text-primary',
    vice_chair: 'bg-blue-100 text-blue-700',
    pr: 'bg-purple-100 text-purple-700',
    admin: 'bg-slate-100 text-slate-600',
}

const ROLE_LABEL: Record<AdminRole, string> = {
    chair: 'Chair',
    vice_chair: 'Vice Chair',
    pr: 'PR',
    admin: 'Admin',
}

export default function AdminUsersPage() {
    const role = useAdminRole()
    const [users, setUsers] = useState<UserRoleRow[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    // Form state
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [newRole, setNewRole] = useState<Exclude<AdminRole, 'admin'>>('vice_chair')
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState('')
    const [formError, setFormError] = useState('')

    const fetchUsers = async () => {
        const { data } = await supabase
            .from('user_roles')
            .select('*')
            .order('created_at', { ascending: false })
        setUsers(data || [])
        setLoading(false)
    }

    useEffect(() => { fetchUsers() }, [])

    // Chair / admin only
    if (role !== 'chair' && role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <ShieldX className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">Access Restricted</h2>
                <p className="text-muted-foreground text-sm">Only the Chair or Admin can manage users.</p>
            </div>
        )
    }

    const getToken = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        return session?.access_token || ''
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setFormError('')
        setSuccess('')

        const token = await getToken()
        const res = await fetch('/api/admin/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ firstName, surname, email, phone, role: newRole }),
        })
        const data = await res.json()

        setSubmitting(false)

        if (!res.ok) {
            setFormError(data.error || 'Something went wrong')
            return
        }

        setSuccess(`Invite sent to ${data.email}! They'll receive an email to set their password.`)
        setFirstName(''); setSurname(''); setEmail(''); setPhone('')
        fetchUsers()
    }

    const updateRole = async (id: string, userId: string, newRoleValue: AdminRole) => {
        setUpdatingId(id)
        await supabase.from('user_roles').update({ role: newRoleValue }).eq('id', id)
        setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRoleValue } : u))
        setUpdatingId(null)
    }

    const handleDelete = async (userId: string, name: string) => {
        if (!confirm(`Remove ${name || 'this user'}'s admin access entirely? This cannot be undone.`)) return
        setDeletingId(userId)
        const token = await getToken()
        await fetch('/api/admin/create-user', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ userId }),
        })
        setDeletingId(null)
        fetchUsers()
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Admin Users</h1>
                    <p className="text-muted-foreground text-sm mt-1">{users.length} member{users.length !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={fetchUsers} className="p-2 hover:bg-muted rounded-lg" title="Refresh">
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            {/* Add New User Form */}
            <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display font-bold text-foreground text-lg mb-1">Add New Admin User</h2>
                <p className="text-sm text-muted-foreground mb-5">
                    They&apos;ll receive an email invite to set their password. Their name and role will appear in the admin sidebar when they log in.
                </p>

                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">First Name*</label>
                            <input
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                                placeholder="e.g. Jane"
                                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Surname</label>
                            <input
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                                placeholder="e.g. Doe"
                                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Email Address*</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="jane@example.com"
                                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                            <input
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="+254 712 345 678"
                                className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Role*</label>
                        <div className="grid grid-cols-3 gap-3">
                            {ROLE_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setNewRole(opt.value)}
                                    className={`text-left p-3 rounded-xl border-2 transition-all ${newRole === opt.value
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/30'
                                        }`}
                                >
                                    <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {formError && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 border border-red-100">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {formError}
                            <button onClick={() => setFormError('')} className="ml-auto"><X className="w-4 h-4" /></button>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3 border border-green-100">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            {success}
                            <button onClick={() => setSuccess('')} className="ml-auto"><X className="w-4 h-4" /></button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Sending invite...' : 'Create & Send Invite'}
                    </button>
                </form>
            </div>

            {/* Existing Users Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                    <h2 className="font-display font-bold text-foreground">Current Members</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Phone</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground/70">Role</th>
                                <th className="text-right px-4 py-3 font-medium text-foreground/70">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs">
                                                {(u.full_name || u.email || '?').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground text-sm">{u.full_name || '—'}</p>
                                                <p className="text-xs text-muted-foreground">{u.email || u.user_id.substring(0, 16) + '…'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.phone || '—'}</td>
                                    <td className="px-4 py-3">
                                        {u.role === 'admin' ? (
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_BADGE[u.role]}`}>
                                                {ROLE_LABEL[u.role]}
                                            </span>
                                        ) : (
                                            <select
                                                value={u.role}
                                                disabled={updatingId === u.id}
                                                onChange={e => updateRole(u.id, u.user_id, e.target.value as AdminRole)}
                                                className="bg-muted/30 border border-border rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                                            >
                                                {ROLE_OPTIONS.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {u.role !== 'admin' && (
                                            <button
                                                onClick={() => handleDelete(u.user_id, u.full_name || u.email || '')}
                                                disabled={deletingId === u.user_id}
                                                className="p-2 hover:bg-red-50 rounded-lg text-red-500 disabled:opacity-40"
                                                title="Remove admin access"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <UserCog className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p>No admin users yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
