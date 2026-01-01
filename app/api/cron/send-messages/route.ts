import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MessageModel from '@/models/Message';
import { sendFutureMessage, sendErrorNotification } from '@/lib/email';
import { getFileUrl } from '@/lib/r2';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const messagesToSend = await MessageModel.find({
      status: 'pending',
      sendDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    let sentCount = 0;
    let failedCount = 0;
    const errors: Array<{ messageId: string; error: string }> = [];

    for (const message of messagesToSend) {
      try {
        const attachments = [];

        if (message.attachments && message.attachments.length > 0) {
          for (const attachment of message.attachments) {
            const url = await getFileUrl(attachment.key);
            attachments.push({
              filename: attachment.filename,
              path: url,
            });
          }
        }

        await sendFutureMessage(
          message.email,
          message.message,
          attachments,
          message.createdAt || new Date()
        );

        message.status = 'sent';
        await message.save();

        sentCount++;
      } catch (error) {
        failedCount++;
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Erreur lors de l'envoi du message ${message._id}:`, error);
        errors.push({
          messageId: String(message._id),
          error: errorMessage,
        });
      }
    }

    // Notifier si plus de 50% des messages ont échoué ou si au moins 1 message a échoué
    if (failedCount > 0 && (failedCount > sentCount || messagesToSend.length === 1)) {
      await sendErrorNotification({
        errorMessage: `${failedCount} message(s) n'ont pas pu être envoyés sur ${messagesToSend.length} total`,
        errorStack: errors.map(e => `Message ${e.messageId}: ${e.error}`).join('\n'),
        context: 'Cron job - Échecs d\'envoi de messages',
        timestamp: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount,
      totalFound: messagesToSend.length,
    });
  } catch (error) {
    console.error('Erreur lors du cron job:', error);

    // Notification par email en cas d'erreur critique
    await sendErrorNotification({
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      context: 'Cron job - Envoi des messages programmés',
      timestamp: new Date(),
    });

    return NextResponse.json(
      { error: 'Erreur lors du cron job' },
      { status: 500 }
    );
  }
}
