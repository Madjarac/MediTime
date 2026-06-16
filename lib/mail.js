import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendMail({ to, subject, html }) {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
    console.warn("[mail] Email nije konfigurisan — preskačem slanje.");
    return;
  }

  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"MediTime" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export function buildConfirmedEmail({ patientName, doctorName, specialty, date, time }) {
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("sr-RS", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return /* html */`
<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pregled potvrđen</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8,#0891b2);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Medi<span style="color:#67e8f9;">Time</span></p>
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;">Platforma za zakazivanje pregleda</p>
            </td>
          </tr>

          <!-- Status badge -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <div style="display:inline-block;background:#dcfce7;border:1.5px solid #bbf7d0;border-radius:50px;padding:8px 20px;">
                <span style="font-size:13px;font-weight:700;color:#16a34a;">✓ Pregled potvrđen</span>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#1e293b;">Poštovani/a ${patientName},</p>
              <p style="margin:12px 0 0;font-size:15px;color:#64748b;line-height:1.6;">
                Vaš pregled je uspešno potvrđen. U nastavku možete pronaći detalje vašeg zakazanog pregleda.
              </p>
            </td>
          </tr>

          <!-- Appointment details -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Lekar</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">${doctorName}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#64748b;">${specialty}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Datum</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;text-transform:capitalize;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Vreme</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">${time}h</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info note -->
          <tr>
            <td style="padding:20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:#1d4ed8;line-height:1.6;">
                      <strong>Napomena:</strong> Molimo Vas da budete prisutni najmanje 10 minuta pre zakazanog termina. U slučaju sprečenosti, kontaktirajte nas na vreme.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;border-top:1px solid #f1f5f9;margin-top:24px;">
              <p style="margin:0 0 4px;font-size:13px;color:#94a3b8;">Bulevar Kralja Aleksandra 42, Beograd</p>
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                <a href="mailto:info@meditime.rs" style="color:#3b82f6;text-decoration:none;">info@meditime.rs</a>
                &nbsp;·&nbsp;+381 11 000 000
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#cbd5e1;">© ${new Date().getFullYear()} MediTime. Sva prava zadržana.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildRejectedEmail({ patientName, doctorName, specialty, date, time }) {
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("sr-RS", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return /* html */`
<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zahtev odbijen</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8,#0891b2);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Medi<span style="color:#67e8f9;">Time</span></p>
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;">Platforma za zakazivanje pregleda</p>
            </td>
          </tr>

          <!-- Status badge -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <div style="display:inline-block;background:#fef2f2;border:1.5px solid #fecaca;border-radius:50px;padding:8px 20px;">
                <span style="font-size:13px;font-weight:700;color:#dc2626;">✕ Zahtev odbijen</span>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#1e293b;">Poštovani/a ${patientName},</p>
              <p style="margin:12px 0 0;font-size:15px;color:#64748b;line-height:1.6;">
                Nažalost, vaš zahtev za pregled nije mogao biti prihvaćen. Detalji odbijenog zahteva su prikazani u nastavku.
              </p>
            </td>
          </tr>

          <!-- Appointment details -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Lekar</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">${doctorName}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#64748b;">${specialty}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Datum</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;text-transform:capitalize;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Vreme</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">${time}h</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 40px 0;text-align:center;">
              <p style="margin:0 0 16px;font-size:14px;color:#64748b;">Možete pokušati da zakažete novi termin kod drugog lekara ili u neko drugo vreme.</p>
              <a href="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/appointments"
                style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;">
                Zakaži novi termin
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;border-top:1px solid #f1f5f9;margin-top:24px;">
              <p style="margin:0 0 4px;font-size:13px;color:#94a3b8;">Bulevar Kralja Aleksandra 42, Beograd</p>
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                <a href="mailto:info@meditime.rs" style="color:#3b82f6;text-decoration:none;">info@meditime.rs</a>
                &nbsp;·&nbsp;+381 11 000 000
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#cbd5e1;">© ${new Date().getFullYear()} MediTime. Sva prava zadržana.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
