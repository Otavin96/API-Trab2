import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";
import { ItemOrdersModel } from "@/itemOrders/domain/models/itemOrders.model";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";

export class ItemOrdersInMemory
  extends InMemoryRepository<ItemOrdersModel>
  implements ItemOrdersRepository {}
