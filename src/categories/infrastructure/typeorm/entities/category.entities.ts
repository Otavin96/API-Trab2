import { Product } from "@/products/infrastructure/typeorm/entities/products.entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @ManyToOne(() => Product, (product) => product.categories, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  product: Product;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
