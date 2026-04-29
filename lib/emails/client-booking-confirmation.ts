interface ClientBookingEmailProps {
  clientName: string
  businessName: string
  offerName: string
  offerPrice: number
  upiId: string
}

export function clientBookingEmailHtml({
  clientName,
  businessName,
  offerName,
  offerPrice,
  upiId,
}: ClientBookingEmailProps): string {
  const formattedPrice = offerPrice.toLocaleString('en-IN')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Kinetic booking is confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:32px;border-radius:8px 8px 0 0;text-align:center;">
              <div style="color:#E8E0D0;font-size:28px;font-weight:900;letter-spacing:2px;margin-bottom:8px;">KINETIC.</div>
              <div style="color:#AAAAAA;font-size:14px;">The System Behind Your Growth.</div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background:#ffffff;padding:40px 32px;">
              <h1 style="color:#111111;font-size:24px;margin:0 0 16px 0;">You're booked, ${clientName}.</h1>
              <p style="color:#555555;font-size:16px;line-height:1.6;margin:0 0 24px 0;">
                Thank you for choosing Kinetic. Here's a summary of what you've booked and how to complete your payment.
              </p>

              <!-- Booking Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F8;border-left:4px solid #E8E0D0;border-radius:8px;padding:0;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <div style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">BOOKING SUMMARY</div>
                    <div style="color:#111111;font-size:16px;margin-bottom:6px;"><strong>Business:</strong> ${businessName}</div>
                    <div style="color:#111111;font-size:16px;margin-bottom:6px;"><strong>Offer:</strong> ${offerName}</div>
                    <div style="color:#E8E0D0;font-size:22px;font-weight:bold;margin-top:12px;">Amount Due: ₹${formattedPrice}</div>
                  </td>
                </tr>
              </table>

              <!-- Payment Instructions -->
              <h2 style="color:#111111;font-size:20px;margin:0 0 12px 0;">How To Complete Payment</h2>
              <p style="color:#555555;font-size:16px;line-height:1.6;margin:0 0 16px 0;">
                Please send ₹${formattedPrice} to the following UPI ID:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:8px;margin-bottom:16px;">
                <tr>
                  <td style="padding:28px;text-align:center;">
                    <div style="color:#AAAAAA;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">UPI ID</div>
                    <div style="color:#E8E0D0;font-size:26px;font-weight:bold;letter-spacing:2px;margin-bottom:16px;">${upiId}</div>
                    <div style="color:#AAAAAA;font-size:13px;">Works with GPay, PhonePe, Paytm, BHIM, and all UPI apps</div>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF3E0;border-radius:8px;margin-bottom:32px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <div style="color:#E8E0D0;font-weight:bold;font-size:14px;margin-bottom:6px;">⚠️ IMPORTANT</div>
                    <div style="color:#555555;font-size:14px;line-height:1.5;">
                      After sending payment, please reply to this email with a screenshot of your payment confirmation. This helps us start your work immediately.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next -->
              <h2 style="color:#111111;font-size:20px;margin:0 0 20px 0;">What Happens Next</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="44" valign="top">
                    <div style="background:#E8E0D0;color:white;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-weight:bold;font-size:14px;">1</div>
                  </td>
                  <td>
                    <div style="color:#111111;font-weight:bold;font-size:15px;margin-bottom:4px;">You send payment via UPI</div>
                    <div style="color:#555555;font-size:14px;">Reply to this email with your payment screenshot</div>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="44" valign="top">
                    <div style="background:#E8E0D0;color:white;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-weight:bold;font-size:14px;">2</div>
                  </td>
                  <td>
                    <div style="color:#111111;font-weight:bold;font-size:15px;margin-bottom:4px;">Kinetic confirms within 2 hours</div>
                    <div style="color:#555555;font-size:14px;">We'll confirm receipt and send a WhatsApp message</div>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="44" valign="top">
                    <div style="background:#E8E0D0;color:white;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-weight:bold;font-size:14px;">3</div>
                  </td>
                  <td>
                    <div style="color:#111111;font-weight:bold;font-size:15px;margin-bottom:4px;">Work begins within 24 hours</div>
                    <div style="color:#555555;font-size:14px;">Your ${offerName} starts immediately after payment confirmation</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111111;padding:24px 32px;border-radius:0 0 8px 8px;text-align:center;">
              <div style="color:#AAAAAA;font-size:13px;margin-bottom:8px;">
                Questions? Reply to this email or visit <a href="https://buildwithkinetic.org" style="color:#E8E0D0;">buildwithkinetic.org</a>
              </div>
              <div style="color:#555555;font-size:12px;">© 2026 Kinetic. Kolkata, India.</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
