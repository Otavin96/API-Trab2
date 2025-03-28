import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import { ItemOrdersModel } from "../domain/models/itemOrders.model";

export type CreateItemOrderProps = {
  quantity: number;
  valueTotal: number;
  product_id: Product;
};

export interface ItemOrdersRepository
  extends RepositoryInterface<ItemOrdersModel, CreateItemOrderProps> {}
