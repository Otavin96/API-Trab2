import { container } from "tsyringe";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Payment } from "../typeorm/entities/pagments.entities";
import { PaymentsTypeormRepository } from "../typeorm/repositories/payments-typeorm.repository";
import { CreatePaymentUseCase } from "@/payments/application/usecases/create-payment.usecase";
import { GetPaymentsUseCase } from "@/payments/application/usecases/get-payments.usecase";
import { ListAllPaymentsUseCase } from "@/payments/application/usecases/listAll-payments.usecase";

import { DeletePaymentsUseCase } from "@/payments/application/usecases/delete-payments.usecase";
import { UpdatePaymentsUseCase } from "@/payments/application/usecases/update-payments.usecase";

container.registerSingleton("PaymentRepository", PaymentsTypeormRepository);

container.registerInstance(
  "PaymentsDefaultTypeormRepository",
  dataSource.getRepository(Payment)
);

container.registerSingleton(
  "CreatePaymentUseCase",
  CreatePaymentUseCase.UseCase
);
container.registerSingleton("GetPaymentsUseCase", GetPaymentsUseCase.UseCase);

container.registerSingleton(
  "ListAllPaymentsUseCase",
  ListAllPaymentsUseCase.UseCase
);

container.registerSingleton(
  "UpdatePaymentsUseCase",
  UpdatePaymentsUseCase.UseCase
);
container.registerSingleton(
  "DeletePaymentsUseCase",
  DeletePaymentsUseCase.UseCase
);
