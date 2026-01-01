export interface Message {
  _id?: string;
  email: string;
  message: string;
  sendDate: Date;
  visibility: 'public' | 'private';
  status: 'pending' | 'sent';
  attachments?: Attachment[];
  accessToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Attachment {
  filename: string;
  key: string;
  contentType: string;
  size: number;
}
