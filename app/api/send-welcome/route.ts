import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, source } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Customise subject + body based on where the form came from
    const isAudit = source === 'free-website-audit'
    const isCall  = source === 'book-call'

    const subject = isAudit
      ? `Got it, ${name} — your audit is in the queue`
      : isCall
      ? `Got it, ${name} — I'll reach out within 24 hours`
      : `Got it, ${name} — I'll be in touch within 24 hours`

    const heroLine = isAudit
      ? `Your free website audit is in the queue.`
      : isCall
      ? `Your strategy call request is confirmed.`
      : `Your message has been received.`

    const bodyLine = isAudit
      ? `I'll personally review your site — SEO gaps, conversion issues, speed, and your single highest-impact fix — and send everything to <strong style="color:#ffffff">${email}</strong> within 24 hours.`
      : isCall
      ? `I'll review your details and reach out to <strong style="color:#ffffff">${email}</strong> within 24 hours to confirm a time. If you'd prefer to pick a slot right now, you can do that below.`
      : `I'll review your message and get back to you at <strong style="color:#ffffff">${email}</strong> within 24 hours.`

    const ctaHtml = isCall
      ? `<a href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"
            style="display:inline-block;background:#3B82F6;color:#ffffff;font-size:14px;font-weight:600;
                   padding:13px 24px;border-radius:10px;text-decoration:none;margin-top:8px;">
           Pick a time on Cal.com →
         </a>`
      : ''

    const steps = isAudit
      ? [
          { n: '01', text: "Instant confirmation — you're already here ✓" },
          { n: '02', text: 'I audit your site personally — SEO, speed, conversion, positioning' },
          { n: '03', text: 'Your audit lands in your inbox within 24 hours' },
        ]
      : isCall
      ? [
          { n: '01', text: 'I review your goals and business context' },
          { n: '02', text: 'I reach out to confirm a 30-minute call time' },
          { n: '03', text: 'We map out exactly what your growth system needs' },
        ]
      : [
          { n: '01', text: 'I review your message personally' },
          { n: '02', text: 'I reach out within 24 hours with next steps' },
          { n: '03', text: 'We figure out the fastest path to your goal' },
        ]

    const stepsHtml = steps.map(s => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="font-size:11px;font-weight:700;color:#3B82F6;font-family:monospace;">${s.n}</span>
          <span style="font-size:14px;color:rgba(255,255,255,0.65);margin-left:14px;">${s.text}</span>
        </td>
      </tr>
    `).join('')

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Inter',system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding:0 0 36px 0;">
              <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:2px;">KINETIC</p>
              <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.25);letter-spacing:0.5px;">The System Behind Your Growth</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;">

              <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#3B82F6;letter-spacing:2px;text-transform:uppercase;">Confirmed</p>
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-0.5px;">
                ${heroLine}
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:rgba(255,255,255,0.45);line-height:1.7;">
                ${bodyLine}
              </p>

              ${ctaHtml}

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.07);margin:32px 0;"></div>

              <!-- What happens next -->
              <p style="margin:0 0 16px;font-size:11px;font-weight:600;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase;">What happens next</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${stepsHtml}
              </table>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.07);margin:32px 0;"></div>

              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.25);line-height:1.7;">
                Questions before then? Just reply to this email — it goes straight to me.<br/>
                — Ayush Gupta, Founder @ Kinetic
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.15);">
                <a href="https://buildwithkinetic.org" style="color:rgba(255,255,255,0.2);text-decoration:none;">buildwithkinetic.org</a>
                &nbsp;·&nbsp;
                <a href="mailto:admin@buildwithkinetic.org" style="color:rgba(255,255,255,0.2);text-decoration:none;">admin@buildwithkinetic.org</a>
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.1);">Kolkata, India · © 2026 Kinetic</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    const { error } = await resend.emails.send({
      from: 'Ayush @ Kinetic <bookings@buildwithkinetic.org>',
      to: [email],
      replyTo: 'admin@buildwithkinetic.org',
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
