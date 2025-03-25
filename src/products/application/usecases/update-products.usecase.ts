import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { NodeMailer } from '@/common/infrastructure/http/nodemailer/nodemailer-provider';

export namespace UpdateProductsUseCase {
  export type Input = {
    id: string;
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
    quantity?: number;
    category_id?: string;
  };

  export type Output = ProductOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository,

      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository,

      @inject("NodeMailer")
      private nodeMailer: NodeMailer
    ) {}

    async execute(input: Input): Promise<Output> {
      let product = await this.productsRepository.findById(input.id);
      if (!product) {
        throw new Error("Produto não encontrado");
      }

      let priceChanged = false;

      if (input.name) {
        product.name = input.name;
      }

      if (input.description) {
        product.description = input.description;
      }

      if (input.price && input.price !== product.price) {
        priceChanged = true;
        product.price = input.price;
      }

      if (input.quantity) {
        product.quantity = input.quantity;
      }

      if (input.category_id) {
        const category = await this.categoriesRepository.findById(input.category_id);

        product.sku = `${product.name.slice(0, 3)}${category.name.slice(0, 3)}${input.sku}`;
      }

      const updatedProduct = await this.productsRepository.update(product);

      if (priceChanged) {
        this.nodeMailer.sendMail("otaviolazzarotto@icloud.com").catch(err => {
          console.error("Erro ao enviar e-mail:", err);
        });
      }

      return updatedProduct;
    }
  }
}
