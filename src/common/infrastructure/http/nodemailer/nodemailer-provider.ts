import nodemailer from 'nodemailer'
import { env } from "../../env";
import { SendMail } from '@/common/providers/nodemailer-provider';


export class NodeMailer implements SendMail {

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: env.MAIL,
      pass: env.PASS_MAIL,
    },
  });

  async sendMail(to: string): Promise<void> {
     // send mail with defined transport object
     const info = await this.transporter.sendMail({
      from: env.MAIL, // sender address
      to,
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

}