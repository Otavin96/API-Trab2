import { connectRabbitMQ } from "../../infrastructure/rabbitmq/config/rabbitmq";
import { env } from "../../infrastructure/env";
import { NodeMailer } from "../providers/nodemailer/nodemailer-provider";

export async function consumeMessages() {
  try {
    const { connection, channel } = await connectRabbitMQ();
    const mailer = new NodeMailer();
    const queueName = env.QUEUE_NAME || "email_notifications";

    await channel.prefetch(1); // Garante processamento de uma mensagem por vez
    console.log(`📩 Escutando a fila "${queueName}"...`);

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const {
            to,
            subject,
            content,
            attachmentBuffer,
            attachmentName,
            attachmentType,
          } = JSON.parse(msg.content.toString());

          if (!to || !subject || !content) {
            console.warn("⚠️ Mensagem inválida recebida e ignorada.");
            channel.nack(msg, false, false); // Rejeita a mensagem sem reencaminhar
            return;
          }

          console.log(`📩 Tentando enviar e-mail para ${to}...`);
          console.log(`📨 Assunto: ${subject}`);

          if (attachmentBuffer) {
            console.log(
              `📎 Enviando e-mail com anexo (${attachmentName || "Sem nome"})...`
            );
            await mailer.sendMailOrder({
              to,
              subject,
              text: content,
              attachmentBuffer,
              attachmentName,
              attachmentType,
            });
          } else {
            console.log(`📧 Enviando e-mail sem anexo...`);
            await mailer.sendMailProduct({ to, subject, text: content });
          }

          console.log("✅ E-mail enviado com sucesso!");
          channel.ack(msg);
        } catch (error) {
          console.error("❌ Erro ao processar mensagem:", error);
          channel.nack(msg, false, false); // Rejeita a mensagem para evitar reprocessamento infinito
        }
      }
    });

    process.on("SIGINT", async () => {
      console.log("🔌 Fechando conexão com o RabbitMQ...");
      await channel.close();
      await connection.close();
      console.log("✅ Conexão com RabbitMQ fechada.");
      process.exit(0);
    });
  } catch (error) {
    console.error("🚨 Erro ao conectar ao RabbitMQ:", error);
    process.exit(1);
  }
}

// Iniciar o consumidor
consumeMessages();
