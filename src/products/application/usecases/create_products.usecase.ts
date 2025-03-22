import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";

export namespace CreateProductsUseCase {
  export type Input = {
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
      if (
        !input.name ||
        !input.description ||
        input.price <= 0 ||
        input.quantity <= 0 ||
        !input.category_id
      ) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      await this.productsRepository.conflictingName(input.name);

      const category = await this.categoriesRepository.findById(
        input.category_id as unknown as string
      );

      input.sku =
        input.name.slice(0, 3) + category.name.slice(0, 3) + input.sku;

      const product = this.productsRepository.create(input);

      const createdProduct: ProductOutput =
        await this.productsRepository.insert(product);

      return createdProduct;
    }
  }
}
