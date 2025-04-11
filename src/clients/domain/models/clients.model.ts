import { Order } from "@/orders/infrastructure/typeorm/entities/order.entities";

export enum StatusPermission {
  ADMIN = "admin",
  CLIENT = "client",
} 

export interface ClientsModel {
  id: string;
  cnpj: string;
  social_reason: string;
  email: string;
  password: string;
  phone: string;
  roles?: StatusPermission;
  orders: Order[];
  created_at: Date;
  updated_at: Date;
}
