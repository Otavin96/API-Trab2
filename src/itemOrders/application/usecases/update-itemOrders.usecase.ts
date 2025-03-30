import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { inject, injectable } from "tsyringe";
import { ItemOrderOutput } from "../dtos/itemOrder-output.dto";
import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace UpdateItemOrdersUseCase {
  export type Input = {
    id: string;
    quantity: number;
    product_id: Product;
  };

  export type Output = ItemOrderOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ItemOrderRepository")
      private itemOrderRepository: ItemOrdersRepository,
      @inject("ProductRepository")
      private productsRepository: ProductsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let itemOrder = await this.itemOrderRepository.findById(input.id);

      const product = await this.productsRepository.findById(
        input.product_id as unknown as string
      );

      if (!product) {
        throw new BadRequestError("Product not found");
      }

      if (input.quantity) {
        itemOrder.quantity = input.quantity;
        itemOrder.valueTotal = input.quantity * product.price;
      }

      if (input.product_id) {
        if (input.quantity) {
          itemOrder.valueTotal = input.quantity * product.price;
          console.log("Estou aqui: " + itemOrder.valueTotal);
        } else {
          itemOrder.valueTotal = itemOrder.quantity * product.price;
        }

        itemOrder.product_id = input.product_id;
      }

      const updatedItemOrder = await this.itemOrderRepository.update(itemOrder);

      return updatedItemOrder;
    }
  }
}
