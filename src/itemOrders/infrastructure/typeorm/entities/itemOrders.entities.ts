import { ItemOrdersModel } from "@/itemOrders/domain/models/itemOrders.model";
import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("item-orders")
export class ItemOrder implements ItemOrdersModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("numeric")
  quantity: number;

  @Column("numeric")
  valueTotal: number;

  @ManyToOne(() => Product, (product) => product.itemOrders)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
