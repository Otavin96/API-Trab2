import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { sendMessage } from "@/common/producer/sendMessage";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
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

      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let product = await this.productsRepository.findById(input.id);
      if (!product) {
        throw new NotFoundError("Product not found");
      }

      let priceChanged = false;

      if (input.name) {
        product.name = input.name;
      }

      if (input.description) {
        product.description = input.description;
      }

      if (input.price) {
        if (input.price < product.price) {
          priceChanged = true;
        }
        product.price = input.price;
      }

      if (input.quantity) {
        product.quantity = input.quantity;
      }

      if (input.category_id) {
        const category = await this.categoriesRepository.findById(
          input.category_id
        );

        product.sku = `${product.name.slice(0, 3)}${category.name.slice(0, 3)}${input.sku}`;
      }

      const updatedProduct = await this.productsRepository.update(product);

      if (priceChanged) {
        const emails = await this.clientsRepository.findEmailsByProductId(
          input.id
        );

        if (emails.length > 0) {
          for (const email of emails) {
            await sendMessage("email_notifications", {
              to: email,
              subject: "Preço atualizado!",
              content: `O produto ${product.name} agora custa R$ ${product.price}`,
            });
          }
          console.log("E-mails enfileirados no RabbitMQ");
        } else {
          console.log(
            "Nenhum cliente comprou este produto, então nenhum e-mail foi enviado."
          );
        }
      }

      return updatedProduct;
    }
  }
}
