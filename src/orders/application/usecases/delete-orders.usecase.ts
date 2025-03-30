import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { OrderRepository } from "@/orders/repositories/order.repository";

export namespace DeleteOrdersUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

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

      return this.orderRepository.delete(input.id);
    }
  }
}
