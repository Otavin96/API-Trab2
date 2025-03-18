import { container } from "tsyringe";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Payment } from "../typeorm/entities/pagments.entities";
import { PaymentsTypeormRepository } from "../typeorm/repositories/payments-typeorm.repository";
import { CreatePaymentUseCase } from "@/payments/application/usecases/create-payment.usecase";

container.registerSingleton("PaymentRepository", PaymentsTypeormRepository);

container.registerInstance(
  "PaymentsDefaultTypeormRepository",
  dataSource.getRepository(Payment)
);

container.registerSingleton("CreatePaymentUseCase", CreatePaymentUseCase.UseCase);

