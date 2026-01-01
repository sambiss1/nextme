import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail(email: string) {
  // Dashboard feature disabled - no access token needed

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: '✨ Votre message futur a été enregistré - ProchainMoi',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #fef9e7 0%, #ffffff 50%, #e8f8fc 100%); font-family: 'Quicksand', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef9e7 0%, #ffffff 50%, #e8f8fc 100%); padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
                <!-- Header avec logo -->
                <tr>
                  <td style="padding: 20px; text-align: center; background: #ffffff;">
                    <img src="${process.env.NEXT_PUBLIC_BASE_URL}/logo.png" alt="ProchainMoi" style="max-width: 160px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                
                <!-- Icône de succès -->
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <div style="width: 60px; height: 60px; background: #f2c94c; border-radius: 50%; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center;">
                      <span style="font-size: 30px;">✅</span>
                    </div>
                  </td>
                </tr>
                
                <!-- Contenu principal -->
                <tr>
                  <td style="padding: 15px 20px;">
                    <h2 style="color: #2c3e50; font-size: 22px; font-weight: 700; margin: 0 0 15px; text-align: center;">
                      Message enregistré avec succès !
                    </h2>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
                      Bonjour,
                    </p>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
                      Votre message pour votre <strong style="color: #f2c94c;">futur vous</strong> a bien été enregistré dans notre système. 🎉
                    </p>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 15px;">
                      Vous recevrez votre message à la date prévue directement par email.
                    </p>
                  </td>
                </tr>
                
                <!-- Info importante -->
                <tr>
                  <td style="padding: 0 20px 20px;">
                    <div style="background: #fff9e6; border-left: 3px solid #f2c94c; padding: 12px 15px; border-radius: 8px;">
                      <p style="margin: 0; color: #555; font-size: 13px; line-height: 1.5;">
                        <strong style="color: #f2c94c;">💡 Astuce :</strong> Vous pouvez créer autant de messages futurs que vous le souhaitez sur ProchainMoi.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: #f8f9fa; padding: 15px 20px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 8px; color: #6c757d; font-size: 13px;">
                      Cordialement,<br>
                      <strong style="color: #f2c94c;">L'équipe ProchainMoi</strong>
                    </p>
                    <p style="margin: 0; color: #adb5bd; font-size: 11px;">
                      &copy; 2026 ProchainMoi
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
  };

  await transporter.sendMail(mailOptions);
}

export async function sendFutureMessage(
  email: string,
  message: string,
  attachments: Array<{ filename: string; path: string }>
) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: '⏰ Un message de votre passé vous attend - ProchainMoi',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background: #f8f9fa; font-family: 'Quicksand', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; padding: 10px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                <!-- Logo -->
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <img src="${process.env.NEXT_PUBLIC_BASE_URL}/logo.png" alt="ProchainMoi" style="max-width: 160px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                
                <!-- Titre -->
                <tr>
                  <td style="padding: 15px 20px;">
                    <h2 style="color: #2c3e50; font-size: 22px; font-weight: 700; margin: 0 0 12px; text-align: center;">
                      Un message de votre passé
                    </h2>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 15px; text-align: center;">
                      Vous aviez écrit ce message pour votre <strong style="color: #56ccf2;">futur vous</strong>. Le moment est venu de le découvrir ! ⏰
                    </p>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 20px 20px;">
                    <div style="background: #fff9e6; border-left: 3px solid #f2c94c; padding: 15px; border-radius: 8px;">
                      <div style="color: #2c3e50; font-size: 15px; line-height: 1.6; white-space: pre-wrap; font-style: italic;">
${message.replace(/\n/g, '<br>')}
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Info pièces jointes -->
                ${attachments.length > 0 ? `
                <tr>
                  <td style="padding: 0 20px 20px;">
                    <div style="background: #f8f9fa; padding: 12px 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; color: #555; font-size: 13px;">
                        📎 <strong>${attachments.length}</strong> pièce(s) jointe(s) incluse(s)
                      </p>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Footer -->
                <tr>
                  <td style="background: #f8f9fa; padding: 15px 20px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 8px; color: #6c757d; font-size: 13px;">
                      Ce message a été envoyé via<br>
                      <strong style="color: #f2c94c;">ProchainMoi</strong>
                    </p>
                    <p style="margin: 0; color: #adb5bd; font-size: 11px;">
                      &copy; 2026 ProchainMoi
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
    attachments,
  };

  await transporter.sendMail(mailOptions);
}
