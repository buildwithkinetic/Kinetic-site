/** Kinetic — Ayush New Submission Notification Email
 *  Sent to Ayush for every form submission (booking, discovery, audit).
 *  Always sent regardless of submissionType.
 */

export interface AyushNewSubmissionProps {
  submissionType: "booking" | "discovery" | "audit"
  clientName: string
  businessName: string
  clientEmail: string
  clientPhone?: string
  city?: string
  offerName?: string
  websiteUrl?: string
  challenge?: string
  // discovery-specific
  buildTypes?: string
  integrations?: string
  budget?: string
  timeline?: string
  description?: string
  // audit-specific
  score?: number
  grade?: string
  offerTag?: string
}

const TYPE_LABEL: Record<string, string> = {
  booking: "🔔 New booking",
  discovery: "📞 Discovery call request",
  audit: "📊 Audit quiz submission",
}

const TYPE_COLOR: Record<string, string> = {
  booking: "#22C55E",
  discovery: "#E8E0D0",
  audit: "#3B82F6",
}

export function ayushNewSubmissionHtml(p: AyushNewSubmissionProps): string {
  const label = TYPE_LABEL[p.submissionType] || "New submission"
  const color = TYPE_COLOR[p.submissionType] || "#E8E0D0"

  const rows: Array<[string, string]> = [
    ["Name", p.clientName],
    ["Email", p.clientEmail],
    ...(p.clientPhone ? [["Phone", p.clientPhone] as [string, string]] : []),
    ...(p.businessName ? [["Business", p.businessName] as [string, string]] : []),
    ...(p.city ? [["Location", p.city] as [string, string]] : []),
    ...(p.offerName ? [["Offer", p.offerName] as [string, string]] : []),
    ...(p.websiteUrl ? [["Website", p.websiteUrl] as [string, string]] : []),
  ]

  const extraRows: Array<[string, string]> = [
    ...(p.buildTypes ? [["Build types", p.buildTypes] as [string, string]] : []),
    ...(p.integrations ? [["Integrations", p.integrations] as [string, string]] : []),
    ...(p.budget ? [["Budget", p.budget] as [string, string]] : []),
    ...(p.timeline ? [["Timeline", p.timeline] as [string, string]] : []),
    ...(p.score !== undefined ? [["Score", `${p.score}/110 — Grade ${p.grade}`] as [string, string]] : []),
    ...(p.offerTag ? [["Recommended offer", p.offerTag] as [string, string]] : []),
  ]

  const allRows = [...rows, ...extraRows]

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${escHtml(label)} — Kinetic</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#FFFFFF;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#111111;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

  <!-- Logo bar -->
  <tr>
    <td style="padding:0 0 28px 0;text-align:center;">
      <span style="font-size:22px;font-weight:900;letter-spacing:-0.5px;color:#FFFFFF;">KINETIC<span style="color:#E8E0D0;">.</span></span>
    </td>
  </tr>

  <!-- Card -->
  <tr>
    <td style="background:#1A1A1A;border-radius:16px;padding:32px 36px;border:1px solid rgba(255,255,255,0.08);">

      <!-- Badge -->
      <div style="display:inline-block;background:${color}22;border:1px solid ${color}55;border-radius:100px;padding:6px 16px;margin-bottom:20px;">
        <span style="font-size:13px;font-weight:700;color:${color};">${escHtml(label)}</span>
      </div>

      <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:800;color:#FFFFFF;">${escHtml(p.clientName)}</h2>
      <p style="margin:0 0 28px 0;font-size:14px;color:rgba(255,255,255,0.4);">${escHtml(p.businessName)}${p.city ? ` · ${escHtml(p.city)}` : ""}</p>

      <!-- Details table -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
        ${allRows.map(([k, v]) => `
        <tr>
          <td style="padding:8px 0;font-size:12px;color:rgba(255,255,255,0.35);font-weight:600;text-transform:uppercase;letter-spacing:0.07em;width:38%;border-bottom:1px solid rgba(255,255,255,0.06);">${escHtml(k)}</td>
          <td style="padding:8px 0;font-size:14px;color:#FFFFFF;border-bottom:1px solid rgba(255,255,255,0.06);">${escHtml(String(v))}</td>
        </tr>`).join("")}
      </table>

      ${(p.challenge || p.description) ? `
      <!-- Notes / challenge -->
      <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;">${p.description ? "Description" : "Challenge / goal"}</p>
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;">${escHtml(p.description || p.challenge || "")}</p>
      </div>` : ""}

      <!-- Reply CTA -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <a href="mailto:${escHtml(p.clientEmail)}?subject=Re: Your Kinetic ${p.submissionType === "discovery" ? "discovery call request" : p.submissionType === "audit" ? "audit" : "booking"}"
               style="display:inline-block;background:#E8E0D0;color:#FFFFFF;font-size:14px;font-weight:700;padding:12px 28px;border-radius:100px;text-decoration:none;">
              Reply to ${escHtml(p.clientName.split(" ")[0])} →
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <tr>
    <td style="padding:20px 0 0 0;text-align:center;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);">Kinetic internal notification — do not forward</p>
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
