import { inject, injectable } from "tsyringe";
import { ItemOrderOutput } from "../dtos/itemOrder-output.dto";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";

export namespace ListAllItemOrdersUseCase {
  export type Output = ItemOrderOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ItemOrderRepository")
      private itemOrderRepository: ItemOrdersRepository
    ) {}

    async execute(): Promise<Output[]> {
      return this.itemOrderRepository.listAll();
    }
  }
}
