import { ItemOrdersModel } from "@/itemOrders/domain/models/itemOrders.model";
import { Order } from "@/orders/infrastructure/typeorm/entities/order.entities";
import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Product, (product) => product.itemOrders, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @ManyToOne(() => Order, (order) => order.itemOrders, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
