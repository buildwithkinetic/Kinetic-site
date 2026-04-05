import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Kinetic <onboarding@resend.dev>', // change to your domain once verified
      to: [email],
      subject: "We've received your message — Kinetic",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Message Received</title>
          </head>
          <body style="margin:0;padding:0;background:#080A0F;font-family:'Inter',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#080A0F;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding:0 0 32px 0;">
                        <p style="margin:0;font-family:monospace;font-size:11px;color:#F97316;letter-spacing:0.2em;text-transform:uppercase;">
                          KINETIC::SYSTEM
                        </p>
                        <h1 style="margin:8px 0 0 0;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                          KINETIC<span style="color:#F97316;">.</span>
                        </h1>
                      </td>
                    </tr>

                    <!-- Main Card -->
                    <tr>
                      <td style="background:#111318;border:1px solid rgba(249,115,22,0.15);border-radius:16px;padding:40px;">
                        
                        <p style="margin:0 0 8px 0;font-family:monospace;font-size:11px;color:#F97316;letter-spacing:0.15em;text-transform:uppercase;">
                          STATUS::RECEIVED
                        </p>
                        <h2 style="margin:0 0 16px 0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">
                          Message Received, ${name}.
                        </h2>
                        <p style="margin:0 0 32px 0;font-size:16px;color:rgba(255,255,255,0.5);line-height:1.6;">
                          Thanks for reaching out. We've received your enquiry and will be in touch within <strong style="color:#ffffff;">24 hours</strong> with next steps.
                        </p>

                        <!-- Divider -->
                        <div style="height:1px;background:rgba(249,115,22,0.1);margin:0 0 32px 0;"></div>

                        <!-- What happens next -->
                        <p style="margin:0 0 16px 0;font-family:monospace;font-size:11px;color:#64748B;letter-spacing:0.1em;text-transform:uppercase;">
                          NEXT::STEPS
                        </p>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                              <span style="font-family:monospace;font-size:11px;color:#F97316;">01</span>
                              <span style="font-size:14px;color:rgba(255,255,255,0.7);margin-left:12px;">We review your enquiry</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                              <span style="font-family:monospace;font-size:11px;color:#F97316;">02</span>
                              <span style="font-size:14px;color:rgba(255,255,255,0.7);margin-left:12px;">We prepare a system blueprint for you</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:12px 0;">
                              <span style="font-family:monospace;font-size:11px;color:#F97316;">03</span>
                              <span style="font-size:14px;color:rgba(255,255,255,0.7);margin-left:12px;">We reach out to schedule a discovery call</span>
                            </td>
                          </tr>
                        </table>

                        <div style="height:1px;background:rgba(249,115,22,0.1);margin:32px 0;"></div>

                        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.3);line-height:1.6;">
                          If you have any immediate questions, reply to this email or reach us at 
                          <a href="mailto:hello@kinetic.systems" style="color:#F97316;text-decoration:none;">hello@kinetic.systems</a>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:32px 0 0 0;text-align:center;">
                        <p style="margin:0;font-family:monospace;font-size:11px;color:#1E293B;letter-spacing:0.1em;">
                          © 2026 KINETIC // DIGITAL GROWTH INFRASTRUCTURE
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
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