import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";
import { OrderModel } from "@/orders/domain/models/orders.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order implements OrderModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: "CASCADE",
  })
  client: Client;

  @OneToMany(() => ItemOrder, (itemOrder) => itemOrder.order, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  itemOrders: ItemOrder[];

  @Column("decimal")
  valueTotal: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
