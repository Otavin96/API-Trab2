import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import { ItemOrdersModel } from "../domain/models/itemOrders.model";
import { ItemOrder } from "../infrastructure/typeorm/entities/itemOrders.entities";

export type CreateItemOrderProps = {
  quantity: number;
  valueTotal: number;
  product_id: Product;
};

export interface ItemOrdersRepository
  extends RepositoryInterface<ItemOrdersModel, CreateItemOrderProps> {
  findByIds(ids: string[]): Promise<ItemOrder[]>;
}
