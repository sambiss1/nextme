import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MessageModel from '@/models/Message';
import { sendFutureMessage } from '@/lib/email';
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

        await sendFutureMessage(message.email, message.message, attachments);

        message.status = 'sent';
        await message.save();

        sentCount++;
      } catch (error) {
        console.error(`Erreur lors de l'envoi du message ${message._id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalFound: messagesToSend.length,
    });
  } catch (error) {
    console.error('Erreur lors du cron job:', error);
    return NextResponse.json(
      { error: 'Erreur lors du cron job' },
      { status: 500 }
    );
  }
}
