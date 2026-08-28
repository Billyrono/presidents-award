import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side admin client — uses service role key, never sent to browser
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
)

async function getCallerRole(token: string): Promise<string | null> {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) return null
    const { data } = await supabaseAdmin
        .from('user_roles').select('role').eq('user_id', user.id).single()
    return data?.role || 'chair'
}

// POST — create and invite a new admin user
export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const callerRole = await getCallerRole(authHeader.replace('Bearer ', ''))
        if (callerRole !== 'chair' && callerRole !== 'admin') {
            return NextResponse.json({ error: 'Only Chair or Admin can create users' }, { status: 403 })
        }

        const { firstName, surname, email, phone, role } = await request.json()

        if (!firstName?.trim() || !email?.trim() || !role) {
            return NextResponse.json({ error: 'First name, email and role are required' }, { status: 400 })
        }

        const fullName = `${firstName.trim()} ${(surname || '').trim()}`.trim()
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        // Invite user — Supabase sends them an email to set their password
        const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
            email.trim(),
            {
                data: { full_name: fullName, phone: phone || '' },
                redirectTo: `${siteUrl}/admin`,
            }
        )

        if (inviteError) {
            return NextResponse.json({ error: inviteError.message }, { status: 400 })
        }

        // Save role + profile info into user_roles
        await supabaseAdmin.from('user_roles').upsert({
            user_id: inviteData.user.id,
            role,
            full_name: fullName,
            email: email.trim(),
            phone: phone?.trim() || null,
        }, { onConflict: 'user_id' })

        return NextResponse.json({ success: true, fullName, email })
    } catch (err) {
        console.error('Create user error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE — remove an admin user's access
export async function DELETE(request: Request) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const callerRole = await getCallerRole(authHeader.replace('Bearer ', ''))
        if (callerRole !== 'chair' && callerRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { userId } = await request.json()
        if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

        // Remove role (revokes access)
        await supabaseAdmin.from('user_roles').delete().eq('user_id', userId)
        // Also delete the auth user entirely
        await supabaseAdmin.auth.admin.deleteUser(userId)

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Delete user error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
