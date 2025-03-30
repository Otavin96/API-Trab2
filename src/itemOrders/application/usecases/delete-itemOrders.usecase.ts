import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { inject, injectable } from "tsyringe";

export namespace DeleteItemOrdersUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ItemOrderRepository")
      private itemOrderRepository: ItemOrdersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.itemOrderRepository.delete(input.id);
    }
  }
}
