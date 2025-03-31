import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";
import { Payment } from "@/payments/infrastructure/typeorm/entities/pagments.entities";

export interface OrderModel {
  id: string;
  client: Client;
  itemOrders: ItemOrder[];
  payment: Payment;
  valueTotal: number;
  created_at: Date;
  updated_at: Date;
}
