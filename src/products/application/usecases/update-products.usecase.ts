import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";

export namespace UpdateProductsUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    quantity: number;
    category_id: Category;
  };

  export type Output = ProductOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository,
      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let product = await this.productsRepository.findById(input.id);

      if (input.name) {
        product.name = input.name;
      }

      if (input.description) {
        product.description = input.description;
      }

      if (input.price) {
        product.price = input.price;
      }

      if (input.quantity) {
        product.quantity = input.quantity;
      }

      if (input.category_id) {
        product.category_id = input.category_id;
      }

      const category = await this.categoriesRepository.findById(
        input.category_id as unknown as string
      );

      product.sku =
        product.name.slice(0, 3) + category.name.slice(0, 3) + input.sku;

      const updatedProduct = await this.productsRepository.update(product);

      return updatedProduct;
    }
  }
}
