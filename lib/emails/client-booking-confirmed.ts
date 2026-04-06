/** Kinetic — Client Booking Confirmation Email
 *  Sent to the client after they submit the /book form for a paid offer.
 *  submissionType: 'booking'
 */

export interface ClientBookingConfirmedProps {
  clientName: string
  businessName: string
  offerName: string
  websiteUrl?: string
  challenge?: string
}

export function clientBookingConfirmedHtml(p: ClientBookingConfirmedProps): string {
  const firstName = p.clientName.split(" ")[0]
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Booking received — Kinetic</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F0E0C;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F0E8;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

  <!-- Logo bar -->
  <tr>
    <td style="padding:0 0 28px 0;text-align:center;">
      <span style="font-size:22px;font-weight:900;letter-spacing:-0.5px;color:#0F0E0C;">KINETIC<span style="color:#E8E0D0;">.</span></span>
    </td>
  </tr>

  <!-- Card -->
  <tr>
    <td style="background:#FFFFFF;border-radius:16px;padding:40px 40px 32px 40px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

      <!-- Checkmark -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <div style="width:56px;height:56px;background:#22C55E;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;line-height:56px;text-align:center;font-size:28px;">✓</div>
          </td>
        </tr>
      </table>

      <!-- Heading -->
      <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:800;text-align:center;color:#0F0E0C;line-height:1.25;">
        Booking received, ${escHtml(firstName)}.
      </h1>
      <p style="margin:0 0 32px 0;font-size:15px;color:#6B6560;text-align:center;line-height:1.6;">
        I've got everything I need. Here's what happens next.
      </p>

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #E8E3D8;margin:0 0 28px 0;"/>

      <!-- Booking summary -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Offer</td>
          <td style="padding:4px 0;font-size:14px;color:#0F0E0C;font-weight:700;text-align:right;">${escHtml(p.offerName)}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Business</td>
          <td style="padding:4px 0;font-size:14px;color:#0F0E0C;text-align:right;">${escHtml(p.businessName)}</td>
        </tr>
        ${p.websiteUrl ? `<tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Website</td>
          <td style="padding:4px 0;font-size:14px;color:#E8E0D0;text-align:right;">${escHtml(p.websiteUrl)}</td>
        </tr>` : ""}
      </table>

      <!-- Timeline steps -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <!-- Step 1 -->
        <tr valign="top">
          <td width="36" style="padding-top:2px;">
            <div style="width:28px;height:28px;background:#E8E0D0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:800;color:#FFFFFF;">1</div>
          </td>
          <td style="padding-bottom:20px;padding-left:8px;">
            <p style="margin:0 0 3px 0;font-size:11px;color:#9E9890;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">Right now</p>
            <p style="margin:0 0 3px 0;font-size:15px;font-weight:700;color:#0F0E0C;">I'll review your submission</p>
            <p style="margin:0;font-size:13px;color:#6B6560;line-height:1.55;">I personally review every booking within a few hours and send you a short intro message.</p>
          </td>
        </tr>
        <!-- Step 2 -->
        <tr valign="top">
          <td width="36" style="padding-top:2px;">
            <div style="width:28px;height:28px;background:#E8E0D0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:800;color:#FFFFFF;">2</div>
          </td>
          <td style="padding-bottom:20px;padding-left:8px;">
            <p style="margin:0 0 3px 0;font-size:11px;color:#9E9890;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">Within 24 hours</p>
            <p style="margin:0 0 3px 0;font-size:15px;font-weight:700;color:#0F0E0C;">Kick-off call or brief</p>
            <p style="margin:0;font-size:13px;color:#6B6560;line-height:1.55;">We'll align on goals, timeline, and first deliverables so we can hit the ground running.</p>
          </td>
        </tr>
        <!-- Step 3 -->
        <tr valign="top">
          <td width="36" style="padding-top:2px;">
            <div style="width:28px;height:28px;background:#E8E0D0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:800;color:#FFFFFF;">3</div>
          </td>
          <td style="padding-left:8px;">
            <p style="margin:0 0 3px 0;font-size:11px;color:#9E9890;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">Build phase</p>
            <p style="margin:0 0 3px 0;font-size:15px;font-weight:700;color:#0F0E0C;">Work begins</p>
            <p style="margin:0;font-size:13px;color:#6B6560;line-height:1.55;">Your growth system is built, tested, and handed over live — with full documentation.</p>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <tr>
          <td align="center">
            <a href="https://buildwithkinetic.org/work-with-us" style="display:inline-block;background:#E8E0D0;color:#FFFFFF;font-size:15px;font-weight:700;padding:14px 32px;border-radius:100px;text-decoration:none;">Explore all growth offers →</a>
          </td>
        </tr>
      </table>

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #E8E3D8;margin:0 0 20px 0;"/>

      <!-- Sign-off -->
      <p style="margin:0 0 4px 0;font-size:14px;color:#0F0E0C;">Talk soon,</p>
      <p style="margin:0;font-size:15px;font-weight:800;color:#0F0E0C;">Ayush — Kinetic</p>
      <p style="margin:4px 0 0 0;font-size:13px;color:#9E9890;">
        <a href="mailto:admin@buildwithkinetic.org" style="color:#E8E0D0;text-decoration:none;">admin@buildwithkinetic.org</a>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:20px 0 0 0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9E9890;line-height:1.6;">
        Kinetic · Kolkata, India ·
        <a href="https://buildwithkinetic.org" style="color:#9E9890;text-decoration:underline;">buildwithkinetic.org</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>`
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
