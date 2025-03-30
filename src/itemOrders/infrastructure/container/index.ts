import { dataSource } from "@/common/infrastructure/typeorm";
import { container } from "tsyringe";
import { ItemOrder } from "../typeorm/entities/itemOrders.entities";
import { ItemOrdersTypeormRepository } from "../typeorm/repositories/itemOrders-typeorm.repository";
import { CreateItemOrdersUseCase } from "@/itemOrders/application/usecases/create-itemOrder.usecase";
import { ListAllItemOrdersUseCase } from "@/itemOrders/application/usecases/listAll-itemOrders.usecase";
import { UpdateItemOrdersUseCase } from "@/itemOrders/application/usecases/update-itemOrders.usecase";
import { GetItemOrdersUseCase } from "@/itemOrders/application/usecases/get-itemOrders.usecase";
import { DeleteItemOrdersUseCase } from "@/itemOrders/application/usecases/delete-itemOrders.usecase";

container.registerInstance(
  "ItemOrdersDefaultTypeormRepository",
  dataSource.getRepository(ItemOrder)
);

container.registerSingleton("ItemOrderRepository", ItemOrdersTypeormRepository);
container.registerSingleton(
  "CreateItemOrdersUseCase",
  CreateItemOrdersUseCase.UseCase
);

container.registerSingleton(
  "ListAllItemOrdersUseCase",
  ListAllItemOrdersUseCase.UseCase
);

container.registerSingleton(
  "GetItemOrdersUseCase",
  GetItemOrdersUseCase.UseCase
);

container.registerSingleton(
  "UpdateItemOrdersUseCase",
  UpdateItemOrdersUseCase.UseCase
);

container.registerSingleton(
  "DeleteItemOrdersUseCase",
  DeleteItemOrdersUseCase.UseCase
);
