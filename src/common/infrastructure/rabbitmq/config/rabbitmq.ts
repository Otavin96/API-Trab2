import { env } from "../../env";
import amqplib from "amqplib";

const RABBITMQ_URL = env.RABBITMQ_URL;
const QUEUE_NAME = env.QUEUE_NAME;

export async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`✅ Conectado ao RabbitMQ - Fila: ${QUEUE_NAME}`);
    return { connection, channel };
  } catch (error) {
    console.error("❌ Erro ao conectar no RabbitMQ:", error);
    process.exit(1);
  }
}
