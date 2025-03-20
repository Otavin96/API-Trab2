import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { injectable } from "tsyringe";

export namespace CreateProductsUseCase {

    export type Input = {
        name: string;
        sku: string;
        description: string;
        price: number;
        quantity: number;
        category_id: Category;
    }

    export type Output = ProductOutput

    @injectable()
    export class UseCase {
        
    }
}