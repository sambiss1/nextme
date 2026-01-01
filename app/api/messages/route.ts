import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import connectDB from '@/lib/mongodb';
import MessageModel from '@/models/Message';
import { sendConfirmationEmail } from '@/lib/email';
import { uploadFile } from '@/lib/r2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const sendDate = formData.get('sendDate') as string;
    const visibility = formData.get('visibility') as 'public' | 'private';
    const files = formData.getAll('files') as File[];

    if (!message.startsWith('Cher prochain moi,')) {
      return NextResponse.json(
        { error: 'Le message doit commencer par "Cher prochain moi,"' },
        { status: 400 }
      );
    }

    const attachments = [];
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.size === 0) continue;

        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: 'Les fichiers ne doivent pas dépasser 5 Mo' },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const key = await uploadFile(buffer, file.name, file.type);

        attachments.push({
          filename: file.name,
          key,
          contentType: file.type,
          size: file.size,
        });
      }
    }

    await connectDB();

    const accessToken = nanoid(32);

    const newMessage = await MessageModel.create({
      email,
      message,
      sendDate: new Date(sendDate),
      visibility,
      status: 'pending',
      attachments,
      accessToken,
    });

    await sendConfirmationEmail(email);

    return NextResponse.json({
      success: true,
      message: 'Message enregistré avec succès',
      messageId: newMessage._id,
    });
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 400 }
      );
    }

    await connectDB();

    const messages = await MessageModel.find({ accessToken: token })
      .select('sendDate status visibility createdAt')
      .sort({ sendDate: 1 });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}
