import { Order } from "@/orders/infrastructure/typeorm/entities/order.entities";

export enum TypePayment {
  BOLETO = "boleto",
  CARTAO = "cartão",
}

export interface PaymentsModel {
  id: string;
  description: string;
  type: TypePayment;
  day: number;
  order: Order;
  created_at: Date;
  updated_at: Date;
}
