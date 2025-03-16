import { container } from "tsyringe";
import { PaymentsInMemoryRepository } from "../in-memory/payments-in-memory.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Payment } from "../typeorm/entities/pagments.entitites";

container.registerSingleton("PaymentRepository", PaymentsInMemoryRepository);

container.registerInstance(
  "PaymentsDefaultTypeormRepository",
  dataSource.getRepository(Payment)
);
