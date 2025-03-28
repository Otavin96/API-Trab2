import { dataSource } from "@/common/infrastructure/typeorm";
import { container } from "tsyringe";
import { ItemOrder } from "../typeorm/entities/itemOrders.entities";
import { ItemOrdersTypeormRepository } from "../typeorm/repositories/itemOrders-typeorm.repository";
import { CreateItemOrdersUseCase } from "@/itemOrders/application/usecases/create-itemOrder.usecase";

container.registerInstance("ItemOrdersDefaultTypeormRepository", dataSource.getRepository(ItemOrder))

container.registerSingleton("ItemOrderRepository", ItemOrdersTypeormRepository)
container.registerSingleton("CreateItemOrdersUseCase", CreateItemOrdersUseCase.UseCase)