import { Order } from "@/orders/infrastructure/typeorm/entities/order.entities";
import { TypePayment } from "@/payments/domain/models/payments.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  description: string;

  @Column({ type: "enum", enum: TypePayment })
  type: TypePayment;

  @Column("numeric")
  day: number;

  @ManyToOne(() => Order, (order) => order.payment, { onDelete: "CASCADE" }) // Relacionamento Many-to-One com Order
  @JoinColumn({ name: "order_id" }) // Define a chave estrangeira no banco de dados
  order: Order;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
