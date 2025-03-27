import { connectRabbitMQ } from "../infrastructure/rabbitmq/config/rabbitmq";

export async function sendMessage(queueName: string, data: any) {
    const {connection, channel} = await connectRabbitMQ();

    const message = JSON.stringify(data)

    channel.sendToQueue(queueName, Buffer.from(message), {
        persistent: true
    })

    console.log(`📤 Mensagem adicionada na fila "${queueName}":`, data)

    setTimeout(() => {
        connection.close()
    }, 500)
}