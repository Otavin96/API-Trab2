import { inject, injectable } from "tsyringe";
import { ItemOrderOutput } from "../dtos/itemOrder-output.dto";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace GetItemOrdersUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ItemOrderOutput;

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

      return this.itemOrderRepository.findById(input.id);
    }
  }
}
