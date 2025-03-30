import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { OrderOutput } from "../dtos/orders-output.dto";
import { OrderRepository } from "@/orders/repositories/order.repository";

export namespace GetOrdersUseCase {
  export type Input = {
    id: string;
  };

  export type Output = OrderOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("OrderRepository")
      private orderRepository: OrderRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.orderRepository.findById(input.id);
    }
  }
}
