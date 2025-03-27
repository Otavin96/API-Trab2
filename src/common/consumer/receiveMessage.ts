import { connectRabbitMQ } from "../infrastructure/rabbitmq/config/rabbitmq";
import { NodeMailer } from "../infrastructure/http/nodemailer/nodemailer-provider";
import { env } from "../infrastructure/env";

export async function consumeMessages() {
    const { channel } = await connectRabbitMQ();
    const mailer = new NodeMailer();
    const queueName = env.QUEUE_NAME || "email_notifications";

    console.log(`Escutando a fila "${queueName}"...`);

    channel.consume(queueName, async (msg) => {
        if (msg) {
            const { to, subject, content } = JSON.parse(msg.content.toString());

            console.log(`📩 Tentando enviar e-mail para ${to}...`);
            console.log(`📨 Assunto: ${subject}`);
            console.log(`📜 Conteúdo: ${content}`);

            try {
                await mailer.sendMail({ to, subject, text: content });
                console.log("✅ E-mail enviado com sucesso!");
                channel.ack(msg);
            } catch (error) {
                console.error("❌ Erro ao enviar e-mail:", error);

                // Rejeita a mensagem sem reenviá-la para evitar loop infinito
                channel.nack(msg, false, false);
            }
        }
    });
}

// Iniciar o consumidor
consumeMessages();
