import { inject, injectable } from "tsyringe";
import { OrderOutput } from "../dtos/orders-output.dto";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { OrderRepository } from "../../repositories/order.repository";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { ClientsRepository } from "@/clients/repositories/clients.repository";

export namespace CreateOrdersUseCase {
  export type Input = {
    client: string;
    itemOrders: string[];
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
      private itemOrdersRepository: ItemOrdersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.client ||
        !Array.isArray(input.itemOrders) ||
        input.itemOrders.length === 0
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

      // Criar a ordem de pedido
      const order = this.orderRepository.create({
        client,
        itemOrders,
        valueTotal,
      });

      // Salvar no banco
      const createdOrder = await this.orderRepository.insert(order);

      return createdOrder;
    }
  }
}
