import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail, sendFutureMessage } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { type, email, message, accessToken } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    if (type === 'confirmation') {
      await sendConfirmationEmail(email); //test-token-123');
      return NextResponse.json({
        success: true,
        message: 'Email de confirmation envoyé',
      });
    }

    if (type === 'future') {
      const testMessage = message || `Cher prochain moi,

Ceci est un message de test envoyé depuis ProchainMoi.

Tu te souviens de ce moment où tu testais l'application ? 
Eh bien, ça fonctionne parfaitement !

Bonne journée à toi, futur moi.

Cordialement,
Ton moi du passé`;

      const testCreatedDate = new Date();
      testCreatedDate.setMonth(testCreatedDate.getMonth() - 6); // Simuler un message créé il y a 6 mois

      await sendFutureMessage(email, testMessage, [], testCreatedDate);
      return NextResponse.json({
        success: true,
        message: 'Email de message futur envoyé',
      });
    }

    return NextResponse.json(
      { error: 'Type invalide. Utilisez "confirmation" ou "future"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de test:', error);
    return NextResponse.json(
      {
        error: 'Erreur lors de l\'envoi de l\'email',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
