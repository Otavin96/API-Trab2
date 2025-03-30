import { ClientsModel } from "@/clients/domain/models/clients.model";
import { Order } from "@/orders/infrastructure/typeorm/entities/order.entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clients")
export class Client implements ClientsModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  cnpj: string;

  @Column("text")
  social_reason: string;

  @Column("text")
  email: string;

  @Column("text")
  phone: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
