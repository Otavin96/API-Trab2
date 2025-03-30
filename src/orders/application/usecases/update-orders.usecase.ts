import { inject, injectable } from "tsyringe";
import { OrderOutput } from "../dtos/orders-output.dto";
import { OrderRepository } from "@/orders/repositories/order.repository";
import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";

export namespace UpdateOrdersUseCase {
  export type Input = {
    id: string;
    client?: Client; // O cliente pode ser opcional
    itemOrders: ItemOrder[]; // Os novos itens para o pedido
  };

  export type Output = OrderOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("OrderRepository")
      private orderRepository: OrderRepository,

      @inject("ItemOrderRepository")
      private itemOrdersRepository: ItemOrdersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      // Verificar se o pedido existe
      let order = await this.orderRepository.findById(input.id);

      if (!order) {
        throw new NotFoundError("Order not found");
      }

      // Se o cliente for passado, atualize o cliente
      if (input.client) {
        order.client = input.client;
      }

      // Se houver itens de pedido a serem atualizados
      if (input.itemOrders.length > 0) {
        // Logando os IDs dos itens de pedido
        console.log(
          "IDs dos itens de pedido:",
          input.itemOrders.map((item) => item.id)
        );

        // Buscar os itens de pedido pelo ID
        const itemOrders = await this.itemOrdersRepository.findByIds(
          input.itemOrders.map((item) => item.id) // Garantir que passamos os IDs
        );

        // Verificar se algum item não foi encontrado
        if (itemOrders.length !== input.itemOrders.length) {
          const notFoundIds = input.itemOrders
            .filter(
              (item) =>
                !itemOrders.some((foundItem) => foundItem.id === item.id)
            )
            .map((item) => item.id);
          throw new BadRequestError(
            `The following item orders were not found: ${notFoundIds.join(", ")}`
          );
        }

        // Atualizar a lista de itens do pedido, substituindo os antigos
        order.itemOrders = itemOrders;

        // Calcular o valor total do pedido com os novos itens
        order.valueTotal = itemOrders.reduce(
          (sum, item) => sum + (Number(item.valueTotal) || 0),
          0
        );
      }

      // Atualizar a ordem no banco de dados
      const updatedOrder: OrderOutput =
        await this.orderRepository.update(order);

      return updatedOrder;
    }
  }
}
