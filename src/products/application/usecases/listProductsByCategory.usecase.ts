import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace ListProductByCategoryUseCase {

    export type Input = {
        category_id: string;
    }

    export type Output = ProductOutput


    @injectable()
    export class UseCase {
        constructor(
            @inject("ProductRepository")
            private productsRepository: ProductsRepository
        ){}

        async execute(input: Input): Promise<Output[]> {

            if(!input.category_id) {
                throw new BadRequestError("Input invalid or not provided")
            }

            return this.productsRepository.listProductByCategory(input.category_id)

        }
    }

}
