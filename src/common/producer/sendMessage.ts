import { connectRabbitMQ } from "../infrastructure/rabbitmq/config/rabbitmq";

let rabbitConnection: any = null;
let rabbitChannel: any = null;

export async function sendMessage(queueName: string, data: any) {
  try {
    if (!rabbitConnection || !rabbitChannel) {
      const { connection, channel } = await connectRabbitMQ();
      rabbitConnection = connection;
      rabbitChannel = channel;
    }

    const message = JSON.stringify(data);
    rabbitChannel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

    console.log(`📩 Mensagem adicionada na fila "${queueName}":`, data);
  } catch (error) {
    console.error("❌ Erro ao enviar mensagem para a fila:", error);
  }
}

export async function closeRabbitMQConnection() {
  if (rabbitChannel) {
    await rabbitChannel.close();
  }
  if (rabbitConnection) {
    await rabbitConnection.close();
    console.log("🔌 Conexão com RabbitMQ fechada.");
  }
}
