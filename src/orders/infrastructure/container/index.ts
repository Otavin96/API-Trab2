import { container } from "tsyringe";
import { Order } from "../typeorm/entities/order.entities";
import { dataSource } from "@/common/infrastructure/typeorm";
import { OrderTypeormRepository } from "../typeorm/repositories/order-typeorm.repositories";
import { CreateOrdersUseCase } from "@/orders/application/usecases/create-ordes.usecase";
import { ListAllOrdersUseCase } from "@/orders/application/usecases/listAll-orders.usecase";
import { UpdateOrdersUseCase } from "@/orders/application/usecases/update-orders.usecase";
import { GetOrdersUseCase } from "@/orders/application/usecases/get-orders.usecase";
import { DeleteOrdersUseCase } from "@/orders/application/usecases/delete-orders.usecase";

container.registerInstance(
  "OrderDefaultTypeormRepository",
  dataSource.getRepository(Order)
);

container.registerSingleton("OrderRepository", OrderTypeormRepository);

container.registerSingleton("CreateOrdersUseCase", CreateOrdersUseCase.UseCase);

container.registerSingleton(
  "ListAllOrdersUseCase",
  ListAllOrdersUseCase.UseCase
);

container.registerSingleton("GetOrdersUseCase", GetOrdersUseCase.UseCase);

container.registerSingleton("UpdateOrdersUseCase", UpdateOrdersUseCase.UseCase);

container.registerSingleton("DeleteOrdersUseCase", DeleteOrdersUseCase.UseCase);
