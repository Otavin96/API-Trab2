import { inject, injectable } from "tsyringe";
import { OrderOutput } from "../dtos/orders-output.dto";
import { OrderRepository } from "@/orders/repositories/order.repository";

export namespace ListAllOrdersUseCase {
  export type Output = OrderOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("OrderRepository")
      private orderRepository: OrderRepository
    ) {}

    async execute(): Promise<Output[]> {
      return this.orderRepository.listAll();
    }
  }
}
