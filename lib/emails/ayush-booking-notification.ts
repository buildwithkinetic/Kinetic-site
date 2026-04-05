interface AyushNotificationEmailProps {
  clientName: string
  businessName: string
  clientEmail: string
  clientPhone: string
  city: string
  offerName: string
  offerPrice: number
  websiteUrl: string
  challenge: string
}

export function ayushNotificationEmailHtml({
  clientName,
  businessName,
  clientEmail,
  clientPhone,
  city,
  offerName,
  offerPrice,
  websiteUrl,
  challenge,
}: AyushNotificationEmailProps): string {
  const formattedPrice = offerPrice.toLocaleString('en-IN')
  const waLink = `https://wa.me/91${clientPhone.replace(/\D/g, '')}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Kinetic Booking</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:32px;border-radius:8px 8px 0 0;">
              <div style="color:#E8E0D0;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">🔔 NEW BOOKING RECEIVED</div>
              <div style="color:#ffffff;font-size:22px;font-weight:bold;margin-bottom:8px;">${clientName} booked the ${offerName}</div>
              <div style="color:#E8E0D0;font-size:28px;font-weight:900;">₹${formattedPrice} pending payment</div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background:#ffffff;padding:32px;">

              <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">CLIENT DETAILS</div>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:5px 0;color:#111;font-size:15px;"><strong>Name:</strong> ${clientName}</td></tr>
                <tr><td style="padding:5px 0;color:#111;font-size:15px;"><strong>Business:</strong> ${businessName}</td></tr>
                <tr><td style="padding:5px 0;color:#111;font-size:15px;"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color:#E8E0D0;">${clientEmail}</a></td></tr>
                <tr><td style="padding:5px 0;color:#111;font-size:15px;"><strong>Phone:</strong> <a href="${waLink}" style="color:#E8E0D0;">${clientPhone} (Open in WhatsApp)</a></td></tr>
                <tr><td style="padding:5px 0;color:#111;font-size:15px;"><strong>City:</strong> ${city}</td></tr>
                ${websiteUrl ? `<tr><td style="padding:5px 0;color:#111;font-size:15px;"><strong>Website:</strong> <a href="${websiteUrl}" style="color:#E8E0D0;">${websiteUrl}</a></td></tr>` : ''}
              </table>

              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

              <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">THEIR CHALLENGE</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#F8F8F8;border-left:4px solid #E8E0D0;border-radius:8px;padding:16px 20px;">
                    <div style="color:#333;font-size:15px;line-height:1.6;">"${challenge}"</div>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

              <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">NEXT ACTIONS</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:6px 0;color:#111;font-size:15px;">✅ Wait for payment screenshot from client</td></tr>
                <tr><td style="padding:6px 0;color:#111;font-size:15px;">✅ Confirm receipt via WhatsApp to <a href="${waLink}" style="color:#E8E0D0;">${clientPhone}</a></td></tr>
                <tr><td style="padding:6px 0;color:#111;font-size:15px;">✅ Begin work within 24 hours of confirmation</td></tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111111;padding:20px 32px;border-radius:0 0 8px 8px;text-align:center;">
              <div style="color:#555;font-size:12px;">Kinetic — buildwithkinetic.org — 2026</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
