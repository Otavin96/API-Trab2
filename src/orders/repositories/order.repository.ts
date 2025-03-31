import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { OrderModel } from "../domain/models/orders.model";
import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";
import { Payment } from "@/payments/infrastructure/typeorm/entities/pagments.entities";

export type CreateOrderProps = {
  client: Client;
  itemOrders: ItemOrder[];
  valueTotal: number;
  payment: Payment;
};

export interface OrderRepository
  extends RepositoryInterface<OrderModel, CreateOrderProps> {}
