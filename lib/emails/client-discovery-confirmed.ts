/** Kinetic — Client Discovery Call Confirmation Email
 *  Sent to the client after they submit the custom-build discovery form.
 *  submissionType: 'discovery'
 */

export interface ClientDiscoveryConfirmedProps {
  clientName: string
  businessName: string
  buildTypes?: string
  budget?: string
  timeline?: string
}

export function clientDiscoveryConfirmedHtml(p: ClientDiscoveryConfirmedProps): string {
  const firstName = p.clientName.split(" ")[0]
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Discovery call request received — Kinetic</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F0E0C;">

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

      <!-- Icon -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <div style="width:56px;height:56px;background:#E8E0D0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;line-height:56px;text-align:center;font-size:26px;">📞</div>
          </td>
        </tr>
      </table>

      <!-- Heading -->
      <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:800;text-align:center;color:#0F0E0C;line-height:1.25;">
        Request received, ${escHtml(firstName)}.
      </h1>
      <p style="margin:0 0 32px 0;font-size:15px;color:#6B6560;text-align:center;line-height:1.6;">
        I'll reach out within 24 hours to schedule your free 30-minute discovery call.
      </p>

      <hr style="border:none;border-top:1px solid #E8E3D8;margin:0 0 28px 0;"/>

      <!-- Summary -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Business</td>
          <td style="padding:4px 0;font-size:14px;color:#0F0E0C;font-weight:700;text-align:right;">${escHtml(p.businessName)}</td>
        </tr>
        ${p.buildTypes ? `<tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Build type</td>
          <td style="padding:4px 0;font-size:14px;color:#0F0E0C;text-align:right;">${escHtml(p.buildTypes)}</td>
        </tr>` : ""}
        ${p.budget ? `<tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Budget range</td>
          <td style="padding:4px 0;font-size:14px;color:#0F0E0C;text-align:right;">${escHtml(p.budget)}</td>
        </tr>` : ""}
        ${p.timeline ? `<tr>
          <td style="padding:4px 0;font-size:13px;color:#9E9890;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Timeline</td>
          <td style="padding:4px 0;font-size:14px;color:#0F0E0C;text-align:right;">${escHtml(p.timeline)}</td>
        </tr>` : ""}
      </table>

      <!-- What to expect -->
      <div style="background:#F5F0E8;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px 0;font-size:13px;font-weight:700;color:#0F0E0C;text-transform:uppercase;letter-spacing:0.06em;">What happens on the call</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr valign="top">
            <td width="20" style="font-size:13px;color:#E8E0D0;font-weight:700;padding-top:2px;">→</td>
            <td style="font-size:13px;color:#6B6560;line-height:1.55;padding-bottom:6px;">We map out exactly what your business needs — no generic advice</td>
          </tr>
          <tr valign="top">
            <td width="20" style="font-size:13px;color:#E8E0D0;font-weight:700;padding-top:2px;">→</td>
            <td style="font-size:13px;color:#6B6560;line-height:1.55;padding-bottom:6px;">I'll outline a custom scope and timeline specific to your goals</td>
          </tr>
          <tr valign="top">
            <td width="20" style="font-size:13px;color:#E8E0D0;font-weight:700;padding-top:2px;">→</td>
            <td style="font-size:13px;color:#6B6560;line-height:1.55;">You'll leave with a clear picture of what gets built and what it costs — zero obligation</td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <tr>
          <td align="center">
            <a href="https://buildwithkinetic.org/book-call" style="display:inline-block;background:#E8E0D0;color:#FFFFFF;font-size:15px;font-weight:700;padding:14px 32px;border-radius:100px;text-decoration:none;">View Custom Build offer →</a>
          </td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #E8E3D8;margin:0 0 20px 0;"/>

      <p style="margin:0 0 4px 0;font-size:14px;color:#0F0E0C;">Talk soon,</p>
      <p style="margin:0;font-size:15px;font-weight:800;color:#0F0E0C;">Ayush — Kinetic</p>
      <p style="margin:4px 0 0 0;font-size:13px;color:#9E9890;">
        <a href="mailto:hello@buildwithkinetic.org" style="color:#E8E0D0;text-decoration:none;">hello@buildwithkinetic.org</a>
      </p>

    </td>
  </tr>

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
