import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MessageModel from '@/models/Message';
import { sendFutureMessage } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { messageId } = await request.json();

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID requis' },
        { status: 400 }
      );
    }

    await connectDB();

    const message = await MessageModel.findById(messageId);

    if (!message) {
      return NextResponse.json(
        { error: 'Message non trouvé' },
        { status: 404 }
      );
    }

    // Test mode: permettre l'envoi multiple du même message
    // if (message.status === 'sent') {
    //   return NextResponse.json(
    //     { error: 'Ce message a déjà été envoyé' },
    //     { status: 400 }
    //   );
    // }

    // Envoyer l'email immédiatement
    // Convertir les attachments au format attendu (avec path au lieu de key)
    const emailAttachments = (message.attachments || []).map(att => ({
      filename: att.filename,
      path: att.key, // R2 key utilisé comme path
    }));

    await sendFutureMessage(
      message.email,
      message.message,
      emailAttachments,
      message.createdAt || new Date()
    );

    // Marquer le message comme envoyé
    message.status = 'sent';
    await message.save();

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
