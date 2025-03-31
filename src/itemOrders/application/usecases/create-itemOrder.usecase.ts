import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import { ItemOrderOutput } from "../dtos/itemOrder-output.dto";
import { inject, injectable } from "tsyringe";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { ProductsRepository } from "@/products/repositories/products.repository";

export namespace CreateItemOrdersUseCase {
  export type Input = {
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
      console.log(input.product_id);
      if (input.quantity <= 0 || !input.product_id) {
        throw new BadRequestError("Input data not provider or invalid");
      }

      const product = await this.productsRepository.findById(
        String(input.product_id)
      );

      if (!product) {
        throw new BadRequestError("Product not found");
      }

      const sumValueProduct = input.quantity * product.price;

      const data = {
        valueTotal: sumValueProduct,
        ...input,
      };

      const itemOrder = this.itemOrderRepository.create(data);

      const createdItemOrder: ItemOrderOutput =
        await this.itemOrderRepository.insert(itemOrder);

      return createdItemOrder;
    }
  }
}
