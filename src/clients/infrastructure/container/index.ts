import { container } from "tsyringe";
import { ClientsInMemoryRepository } from "../in-memory/clients-in-memory.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Client } from "../typeorm/entities/clients.entities";

container.registerSingleton("ClientRepository", ClientsInMemoryRepository);

container.registerInstance(
  "ClientsDefaultTypeormRepository",
  dataSource.getRepository(Client)
);
