import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { PaymentsModel, TypePayment } from "../domain/models/payments.model";

export type CreatePaymentsProps = {
  description: string;
  type: TypePayment;
  day: number;
};

export interface PaymentsRepository
  extends RepositoryInterface<PaymentsModel, CreatePaymentsProps> {}
