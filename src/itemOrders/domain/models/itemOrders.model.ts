import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";

export interface ItemOrdersModel {
  id: string;
  quantity: number;
  valueTotal: number;
  product_id: Product;
  created_at: Date;
  updated_at: Date;
}
