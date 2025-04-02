  import nodemailer from "nodemailer";
  import { env } from "../../env";
  import { Email, SendMail } from "@/common/providers/nodemailer-provider";

  export class NodeMailer implements SendMail {
    
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: env.MAIL,
        pass: env.PASS_MAIL,
      },
    });
    
    async sendMailOrder(data: Email): Promise<void> {
      // send mail with defined transport object
      if (!data.attachmentBuffer) {
        throw new Error("O buffer do anexo está indefinido.");
      }

      console.log(`Anexo sendo enviado: ${data.attachmentBuffer.length} bytes`);

      console.log("attachmentBuffer no sendMessage:", data.attachmentBuffer);

      console.log(`Tamanho do buffer do anexo: ${data.attachmentBuffer.length}`);

      const info = await this.transporter.sendMail({
        from: env.MAIL, // sender address
        to: data.to,
        subject: data.subject,
        text: data.text,
        attachments: [
          {
            filename: data.attachmentName || "pedido.pdf",
            content: Buffer.from(data.attachmentBuffer),
            contentType: data.attachmentType || "application/pdf",
          },
        ],
      });

      console.log(info);

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }


    async sendMailProduct(data: Email): Promise<void> {
      const info = await this.transporter.sendMail({
        from: env.MAIL, // sender address
        to: data.to,
        subject: data.subject,
        text: data.text,
      });
    }

  }
