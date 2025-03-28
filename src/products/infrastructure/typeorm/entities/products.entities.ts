import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";
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

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  sku: string;

  @Column("text")
  description: string;

  @Column("numeric")
  price: number;

  @Column("numeric")
  quantity: number;

  @ManyToOne(() => Category, {
    nullable: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  category_id: Category;

  @OneToMany(() => ItemOrder, (itemOrder) => itemOrder.product_id)
  itemOrders: ItemOrder[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
