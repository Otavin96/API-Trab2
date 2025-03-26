export interface Email {
  to: string;
  subject: string;
  text: string;
}
export interface SendMail {
  sendMail(data: Email): Promise<void>;
}
