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

export async function sendConfirmationEmail(email: string, accessToken: string) {
  const accessUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/tableau-de-bord?token=${accessToken}`;

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
                  <td style="background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); padding: 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      ProchainMoi
                    </h1>
                  </td>
                </tr>
                
                <!-- Icône de succès -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(242, 201, 76, 0.3);">
                      <span style="font-size: 40px;">✅</span>
                    </div>
                  </td>
                </tr>
                
                <!-- Contenu principal -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="color: #2c3e50; font-size: 28px; font-weight: 700; margin: 0 0 20px; text-align: center;">
                      Message enregistré avec succès !
                    </h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
                      Bonjour,
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
                      Votre message pour votre <strong style="color: #f2c94c;">futur vous</strong> a bien été enregistré dans notre système. 🎉
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.8; margin: 0 0 30px;">
                      Vous pouvez consulter le statut de tous vos messages en accédant à votre tableau de bord personnel :
                    </p>
                  </td>
                </tr>
                
                <!-- Bouton CTA -->
                <tr>
                  <td style="padding: 0 40px 40px; text-align: center;">
                    <a href="${accessUrl}" style="display: inline-block; background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-size: 18px; font-weight: 700; box-shadow: 0 6px 20px rgba(86, 204, 242, 0.4); transition: all 0.3s;">
                      📊 Accéder à mon tableau de bord
                    </a>
                  </td>
                </tr>
                
                <!-- Info importante -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <div style="background: linear-gradient(135deg, #fff9e6 0%, #e6f7ff 100%); border-left: 4px solid #f2c94c; padding: 20px; border-radius: 12px;">
                      <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">
                        <strong style="color: #f2c94c;">💡 Important :</strong> Conservez ce lien précieusement ! Il vous permettra d'accéder à vos messages à tout moment, sans avoir besoin de créer un compte.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px; color: #6c757d; font-size: 14px;">
                      Cordialement,<br>
                      <strong style="background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">L'équipe ProchainMoi</strong>
                    </p>
                    <p style="margin: 15px 0 0; color: #adb5bd; font-size: 12px;">
                      Envoyez un message à votre futur vous
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
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #fef9e7 0%, #ffffff 50%, #e8f8fc 100%); font-family: 'Quicksand', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef9e7 0%, #ffffff 50%, #e8f8fc 100%); padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
                <!-- Header avec logo -->
                <tr>
                  <td style="background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); padding: 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      ProchainMoi
                    </h1>
                  </td>
                </tr>
                
                <!-- Icône -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(242, 201, 76, 0.3);">
                      <span style="font-size: 40px;">💌</span>
                    </div>
                  </td>
                </tr>
                
                <!-- Titre -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="color: #2c3e50; font-size: 28px; font-weight: 700; margin: 0 0 20px; text-align: center;">
                      Un message de votre passé
                    </h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.8; margin: 0 0 30px; text-align: center;">
                      Vous aviez écrit ce message pour votre <strong style="color: #56ccf2;">futur vous</strong>. Le moment est venu de le découvrir ! ⏰
                    </p>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <div style="background: linear-gradient(135deg, #fff9e6 0%, #e6f7ff 100%); border-left: 4px solid #f2c94c; padding: 30px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                      <div style="color: #2c3e50; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-style: italic;">
${message.replace(/\n/g, '<br>')}
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Info pièces jointes -->
                ${attachments.length > 0 ? `
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; text-align: center;">
                      <p style="margin: 0; color: #555; font-size: 14px;">
                        📎 <strong>${attachments.length}</strong> pièce(s) jointe(s) incluse(s) dans cet email
                      </p>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Footer -->
                <tr>
                  <td style="background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px; color: #6c757d; font-size: 14px;">
                      Ce message a été envoyé via<br>
                      <strong style="background: linear-gradient(135deg, #f2c94c 0%, #56ccf2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">ProchainMoi</strong>
                    </p>
                    <p style="margin: 15px 0 0; color: #adb5bd; font-size: 12px;">
                      Envoyez un message à votre futur vous sur prochainmoi.com
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
