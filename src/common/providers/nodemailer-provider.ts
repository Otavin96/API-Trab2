export interface Email {
  to: string;
  subject: string;
  text: string;
  attachmentBuffer?: Buffer;
}
export interface SendMail {
  sendMail(data: Email): Promise<void>;
}
