import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";
import { OrderModel } from "@/orders/domain/models/orders.model";
import { Payment } from "@/payments/infrastructure/typeorm/entities/pagments.entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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
  @JoinColumn({name: "itemOrders_id"})
  itemOrders: ItemOrder[];

  @OneToOne(() => Payment, (payment) => payment.order, { onDelete: "CASCADE" }) // Relacionamento One-to-One com Payment
  @JoinColumn({ name: "payment_id" }) // Define a chave estrangeira no banco de dados
  payment: Payment;

  @Column("decimal")
  valueTotal: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
