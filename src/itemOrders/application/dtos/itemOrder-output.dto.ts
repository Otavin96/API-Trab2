import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";

export type ItemOrderOutput = {
    id: string;
    quantity: number;
    valueTotal: number;
    product_id: Product;
    created_at: Date;
    updated_at: Date;
}