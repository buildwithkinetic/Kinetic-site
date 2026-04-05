/** Kinetic — Client Quick Win Audit Confirmation Email
 *  Sent to the client after they complete the quiz and submit their details.
 *  submissionType: 'audit'
 */

export interface ClientAuditConfirmedProps {
  clientName: string   // could be businessName for audit
  email: string
  score: number
  grade: string
  offerTag?: string
}

// Score-to-grade colour mapping (green ≥ 80, amber 50-79, red < 50)
function gradeColor(score: number): string {
  if (score >= 80) return "#22C55E"
  if (score >= 50) return "#F59E0B"
  return "#EF4444"
}

function gradeLabel(grade: string): string {
  const map: Record<string, string> = {
    A: "Excellent",
    B: "Good",
    C: "Average",
    D: "Needs work",
    F: "Critical issues",
  }
  return map[grade] || grade
}

export function clientAuditConfirmedHtml(p: ClientAuditConfirmedProps): string {
  const color = gradeColor(p.score)
  const label = gradeLabel(p.grade)
  const firstName = p.clientName.split(" ")[0]
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Your Digital Health Score — Kinetic</title>
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

      <!-- Score badge -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <div style="display:inline-block;background:${color}18;border:3px solid ${color};border-radius:50%;width:72px;height:72px;line-height:72px;text-align:center;">
              <span style="font-size:26px;font-weight:900;color:${color};">${p.score}</span>
            </div>
          </td>
        </tr>
      </table>

      <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:800;text-align:center;color:#0F0E0C;line-height:1.25;">
        Your score: ${p.score}/110 — Grade ${p.grade}
      </h1>
      <p style="margin:0 0 6px 0;font-size:16px;color:${color};text-align:center;font-weight:700;">${label}</p>
      <p style="margin:0 0 32px 0;font-size:15px;color:#6B6560;text-align:center;line-height:1.6;">
        Hi ${escHtml(firstName)} — your full report is being prepared. Here's what's next.
      </p>

      <hr style="border:none;border-top:1px solid #E8E3D8;margin:0 0 28px 0;"/>

      <!-- What happens next -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <!-- Step 1 -->
        <tr valign="top">
          <td width="36" style="padding-top:2px;">
            <div style="width:28px;height:28px;background:#E8E0D0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:800;color:#FFFFFF;">1</div>
          </td>
          <td style="padding-bottom:20px;padding-left:8px;">
            <p style="margin:0 0 3px 0;font-size:11px;color:#9E9890;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">Within 48 hours</p>
            <p style="margin:0 0 3px 0;font-size:15px;font-weight:700;color:#0F0E0C;">Full audit report delivered</p>
            <p style="margin:0;font-size:13px;color:#6B6560;line-height:1.55;">I'll analyse your answers and send a detailed breakdown of your top 3 growth blockers with specific fixes.</p>
          </td>
        </tr>
        <!-- Step 2 -->
        <tr valign="top">
          <td width="36" style="padding-top:2px;">
            <div style="width:28px;height:28px;background:#E8E0D0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:800;color:#FFFFFF;">2</div>
          </td>
          <td style="padding-left:8px;">
            <p style="margin:0 0 3px 0;font-size:11px;color:#9E9890;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">Optional next step</p>
            <p style="margin:0 0 3px 0;font-size:15px;font-weight:700;color:#0F0E0C;">Get it fixed — not just diagnosed</p>
            <p style="margin:0;font-size:13px;color:#6B6560;line-height:1.55;">Upgrade to the full Quick Win Audit (₹8,000) and I'll implement the 3 biggest fixes for you — guaranteed.</p>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
        <tr>
          <td align="center">
            <a href="https://buildwithkinetic.org/work-with-us/quick-win-audit" style="display:inline-block;background:#E8E0D0;color:#FFFFFF;font-size:15px;font-weight:700;padding:14px 32px;border-radius:100px;text-decoration:none;">See the Quick Win Audit →</a>
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
