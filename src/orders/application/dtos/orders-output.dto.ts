import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entities";
import { ItemOrder } from "@/itemOrders/infrastructure/typeorm/entities/itemOrders.entities";

export type OrderOutput = {
  id: string;
  client: Client;
  itemOrders: ItemOrder[];
  valueTotal: number;
  created_at: Date;
  updated_at: Date;
};
