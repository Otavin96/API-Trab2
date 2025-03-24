import { inject, injectable } from "tsyringe";
import { PaymentOutput } from "../dtos/payment-output.dto";
import { PaymentsRepository } from "@/payments/repositories/payments.repository";

export namespace ListAllPaymentsUseCase {
  export type Output = PaymentOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("PaymentRepository")
      private paymentRepository: PaymentsRepository
    ) {}

    async execute(): Promise<Output[]> {
      return this.paymentRepository.listAll();
    }
  }
}
