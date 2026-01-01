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
                      &copy; ${new Date().getFullYear()} ProchainMoi
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

function getTimeDifference(createdAt: Date, sendDate: Date): string {
  const diffMs = sendDate.getTime() - createdAt.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} mois`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths > 0) {
      return `${diffYears} an${diffYears > 1 ? 's' : ''} et ${remainingMonths} mois`;
    }
    return `${diffYears} an${diffYears > 1 ? 's' : ''}`;
  }
}

export async function sendFutureMessage(
  email: string,
  message: string,
  attachments: Array<{ filename: string; path: string }>,
  createdAt: Date
) {
  const sendDate = new Date();
  const currentYear = sendDate.getFullYear();
  const timeDiff = getTimeDifference(createdAt, sendDate);
  const createdDateFormatted = createdAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
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
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Tangerine:wght@400;700&display=swap" rel="stylesheet">
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
                
                <!-- Contenu principal -->
                <tr>
                  <td style="padding: 20px 30px;">
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 10px;">
                      Il y a <strong style="color: #f2c94c;">${timeDiff}</strong>, le <strong>${createdDateFormatted}</strong>, vous avez pris un moment pour vous parler.
                    </p>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 10px;">
                      Vous avez appuyé sur pause, regardé vers l'avenir, et laissé une version de vous-même écrire ces lignes.
                    </p>
                    <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 10px; font-weight: 600;">
                      Aujourd'hui, ce futur est arrivé.
                    </p>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 10px;">
                      Ce message, c'est un souvenir, une promesse, une pensée que vous aviez choisi de préserver.<br>
                      Une trace de ce que vous ressentiez, de ce que vous espériez, ou de ce que vous vouliez devenir.
                    </p>
                    <p style="color: #2c3e50; font-size: 15px; line-height: 1.6; margin: 0 0 20px; font-weight: 600;">
                      Voici ce que vous vous étiez dit :
                    </p>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 30px 20px;">
                    <div style="background: #f8f9fa; border-left: 4px solid #f2c94c; padding: 20px; border-radius: 8px;">
                      <div style="color: #2c3e50; font-size: 24px; line-height: 1.6; white-space: pre-wrap; font-family: 'Tangerine', cursive; font-weight: 700;">
${message.replace(/\n/g, '<br>')}
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Conclusion -->
                <tr>
                  <td style="padding: 20px 30px;">
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 10px;">
                      Prenez le temps de le lire.<br>
                      Prenez le temps de sentir ce que cela réveille.
                    </p>
                    <p style="color: #2c3e50; font-size: 15px; line-height: 1.6; margin: 0; font-style: italic;">
                      Ce n'est pas juste un email.<br>
                      C'est une rencontre entre celui que vous étiez et celui que vous êtes devenu.
                    </p>
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
                      &copy; ${currentYear} ProchainMoi
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
