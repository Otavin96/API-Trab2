import { container } from "tsyringe";
import { ClientsInMemoryRepository } from "../in-memory/clients-in-memory.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Client } from "../typeorm/entities/clients.entities";
import { CreateClientsUsecase } from "@/clients/application/usecases/create-clients.usecase";
import { ClientsTypeormRepository } from "../typeorm/repositories/clients-typeorm.repository";

container.registerSingleton("ClientRepository", ClientsTypeormRepository);

container.registerSingleton('CreateClientUseCase', CreateClientsUsecase.UseCase)

container.registerInstance(
  "ClientsDefaultTypeormRepository",
  dataSource.getRepository(Client)
);
