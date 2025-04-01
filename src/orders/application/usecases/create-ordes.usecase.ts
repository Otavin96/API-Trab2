import { inject, injectable } from "tsyringe";
import { OrderOutput } from "../dtos/orders-output.dto";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { OrderRepository } from "../../repositories/order.repository";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { Payment } from "@/payments/infrastructure/typeorm/entities/pagments.entities";
import { PDF } from "@/common/infrastructure/http/pdf/create-pdf-provider";
import { sendMessage } from "@/common/producer/sendMessage";
import fs from "fs";

export namespace CreateOrdersUseCase {
  export type Input = {
    client: string;
    itemOrders: string[];
    payment: Payment;
  };

  export type Output = OrderOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("OrderRepository")
      private orderRepository: OrderRepository,

      @inject("ClientRepository")
      private clientRepository: ClientsRepository,

      @inject("ItemOrderRepository")
      private itemOrdersRepository: ItemOrdersRepository,

      @inject("PDFCreate")
      private pdfCreate: PDF
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.client ||
        !Array.isArray(input.itemOrders) ||
        input.itemOrders.length === 0 ||
        !input.payment
      ) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      // Buscar cliente no banco
      const client = await this.clientRepository.findById(input.client);
      if (!client) {
        throw new BadRequestError("Client not found");
      }

      // Buscar itens do pedido no banco
      const itemOrders = await this.itemOrdersRepository.findByIds(
        input.itemOrders
      );

      if (itemOrders.length !== input.itemOrders.length) {
        throw new BadRequestError("One or more item orders not found");
      }

      // Calcular valor total do pedido
      const valueTotal = itemOrders.reduce(
        (sum, item) => sum + (Number(item.valueTotal) || 0),
        0
      );

      const payment = input.payment;

      // Criar a ordem de pedido
      const order = this.orderRepository.create({
        client,
        itemOrders,
        valueTotal,
        payment,
      });

      // Salvar no banco
      const createdOrder = await this.orderRepository.insert(order);

      // Salve o PDF gerado para verificar se está correto
      const pdfBuffer2 = await this.pdfCreate.generatePDF("Teste", order, itemOrders);
      fs.writeFileSync("pedido.pdf", pdfBuffer2); // Salva como arquivo para verificar a integridade

      const pdfBuffer = await this.pdfCreate.generatePDF("Teste", order, itemOrders);
      console.log(`Tamanho do buffer do PDF: ${pdfBuffer.length}`); // Verifique o tamanho do buffer

      // Verifique se o buffer está vazio
      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error("Erro: O PDF gerado está vazio.");
      }

      await sendMessage("email_notifications", {
        to: order.client.email,
        subject: "Pedido Concluído!",
        content: `Seu pedido foi efetuado com sucesso, Numero do pedido: ${order.id}`,
        attachmentBuffer: pdfBuffer // Convertendo o buffer para base64
      });

      return createdOrder;
    }
  }
}
