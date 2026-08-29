import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || 'billyrono76@gmail.com'
const DOMAIN_VERIFIED = FROM_EMAIL !== 'onboarding@resend.dev'

function getResend() {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return null
    return new Resend(apiKey)
}

function applicantHtml(name: string) {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0ebe0;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#4a5e2f;padding:40px 32px;text-align:center;">
      <p style="color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:3px;margin:0 0 12px;text-transform:uppercase;">President's Award</p>
      <h1 style="color:#fff;font-size:26px;margin:0;font-weight:700;">Application Received 🎉</h1>
      <p style="color:rgba(255,255,255,0.7);margin:10px 0 0;font-size:14px;">Kirinyaga University Chapter</p>
    </div>
    <div style="padding:40px 32px;">
      <p style="color:#334155;font-size:15px;line-height:1.6;">Hi <strong style="color:#1e293b;">${name}</strong>,</p>
      <p style="color:#475569;font-size:15px;line-height:1.6;">
        We've received your application for the <strong>President's Award – Kirinyaga University</strong> chapter.
        Our team will be in touch with you soon!
      </p>
      <div style="background:#f8f5ee;border-left:4px solid #4a5e2f;border-radius:0 12px 12px 0;padding:20px 24px;margin:28px 0;">
        <p style="color:#4a5e2f;font-weight:700;font-size:14px;margin:0 0 12px;">What happens next?</p>
        <ul style="color:#475569;font-size:14px;margin:0;padding-left:18px;line-height:1.8;">
          <li>Your application is being reviewed by our team</li>
          <li>We'll contact you within <strong>2–5 working days</strong></li>
          <li>Watch your <strong>WhatsApp</strong> and <strong>email</strong> for updates</li>
        </ul>
      </div>
      <p style="color:#94a3b8;font-size:13px;line-height:1.6;">
        Have questions? Reach out via Instagram <strong>@presidentsawardkyu</strong>.
      </p>
    </div>
    <div style="background:#f8f5f0;padding:20px 32px;text-align:center;border-top:1px solid #e8e4da;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">© ${new Date().getFullYear()} President's Award — Kirinyaga University Chapter</p>
    </div>
  </div>
</body>
</html>`
}

function adminHtml(data: { name: string; email: string; phone: string; faculty: string; year: string; interests?: string; message?: string }) {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0ebe0;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:#1e293b;padding:28px 32px;">
      <p style="color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:3px;margin:0 0 6px;text-transform:uppercase;">Admin Alert</p>
      <h1 style="color:#fff;font-size:20px;margin:0;font-weight:700;">New Application Submitted</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#94a3b8;font-size:13px;width:120px;">Full Name</td>
          <td style="padding:10px 0;color:#1e293b;font-weight:600;font-size:14px;">${data.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Email</td>
          <td style="padding:10px 0;color:#1e293b;font-size:14px;">${data.email}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Phone</td>
          <td style="padding:10px 0;color:#1e293b;font-size:14px;">${data.phone}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Faculty</td>
          <td style="padding:10px 0;color:#1e293b;font-size:14px;">${data.faculty}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Year</td>
          <td style="padding:10px 0;color:#1e293b;font-size:14px;">${data.year}</td>
        </tr>
        ${data.interests ? `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;color:#94a3b8;font-size:13px;">Interests</td><td style="padding:10px 0;color:#1e293b;font-size:14px;">${data.interests}</td></tr>` : ''}
        ${data.message ? `<tr><td style="padding:10px 0;color:#94a3b8;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#475569;font-size:14px;font-style:italic;">${data.message}</td></tr>` : ''}
      </table>
      <a href="https://presidents-award.vercel.app/admin/applications"
         style="display:inline-block;margin-top:24px;background:#4a5e2f;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">
        View in Admin Panel →
      </a>
    </div>
  </div>
</body>
</html>`
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { type, name, email, phone, faculty, year, interests, message } = body
        const resend = getResend()

        if (!resend) {
            console.warn('RESEND_API_KEY is not configured; skipping email dispatch.')
            return NextResponse.json({ success: true, note: 'Resend API key not configured' })
        }

        if (type === 'application') {
            const tasks: Promise<unknown>[] = [
                // Admin notification always sends
                resend.emails.send({
                    from: `President's Award <${FROM_EMAIL}>`,
                    to: ADMIN_EMAIL,
                    subject: `New Application: ${name} — ${faculty}, Year ${year}`,
                    html: adminHtml({ name, email, phone, faculty, year, interests, message }),
                }),
            ]

            // Applicant confirmation only works once domain is verified
            if (DOMAIN_VERIFIED && email) {
                tasks.push(
                    resend.emails.send({
                        from: `President's Award <${FROM_EMAIL}>`,
                        to: email,
                        subject: "Application Received — President's Award Kirinyaga University",
                        html: applicantHtml(name),
                    })
                )
            }

            const results = await Promise.allSettled(tasks)
            results.forEach((r, i) => {
                if (r.status === 'rejected') console.error(`Email task ${i} failed:`, r.reason)
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Email route error:', error)
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
}
