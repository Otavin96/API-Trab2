import { Order } from "@/orders/infrastructure/typeorm/entities/order.entities";

export interface ClientsModel {
  id: string;
  cnpj: string;
  social_reason: string;
  email: string;
  phone: string;
  orders: Order[];
  created_at: Date;
  updated_at: Date;
}
