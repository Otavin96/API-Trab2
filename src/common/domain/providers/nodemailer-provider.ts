export interface Email {
  to: string;
  subject: string;
  text: string;
  attachmentBuffer?: Buffer;
  attachmentName?: string;
  attachmentType?: any;
}
export interface SendMail {
  sendMailOrder(data: Email): Promise<void>;
  sendMailProduct(data: Email): Promise<void>
}
