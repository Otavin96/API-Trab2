import { Category } from "@/categorys/infrastructure/typeorm/entities/category.entities";
import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { ProductsModel } from "../domain/models/products.model";

export type CreateProductsProps = {
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: Category;
};

export interface ProductsRepository
  extends RepositoryInterface<ProductsModel, CreateProductsProps> {
  findByName(name: string): Promise<ProductsModel>;
  conflictingName(name: string): Promise<void>;
}
