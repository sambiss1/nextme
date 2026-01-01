import mongoose, { Schema, Model } from 'mongoose';
import { Message } from '@/types/message';

const AttachmentSchema = new Schema({
  filename: { type: String, required: true },
  key: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
});

const MessageSchema = new Schema<Message>(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
    sendDate: { type: Date, required: true },
    visibility: { type: String, enum: ['public', 'private'], required: true },
    status: { type: String, enum: ['pending', 'sent'], default: 'pending' },
    attachments: [AttachmentSchema],
    accessToken: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ email: 1 });
MessageSchema.index({ accessToken: 1 });
MessageSchema.index({ sendDate: 1, status: 1 });

const MessageModel: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>('Message', MessageSchema);

export default MessageModel;
