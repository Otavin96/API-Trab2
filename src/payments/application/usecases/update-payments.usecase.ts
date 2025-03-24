import { inject, injectable } from "tsyringe";
import { PaymentOutput } from "../dtos/payment-output.dto";
import { PaymentsRepository } from "@/payments/repositories/payments.repository";
import { TypePayment } from "@/payments/domain/models/payments.model";

export namespace UpdatePaymentsUseCase {
  export type Input = {
    id: string;
    description: string;
    type: TypePayment;
    day: number;
  };

  export type Output = PaymentOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("PaymentRepository")
      private paymentRepository: PaymentsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let payment = await this.paymentRepository.findById(input.id);

      if (input.description) {
        payment.description = input.description;
      }

      if (input.type) {
        payment.type = input.type;
      }

      if (input.day) {
        payment.day = input.day;
      }

      const updatedPayment = await this.paymentRepository.update(payment);

      return updatedPayment;
    }
  }
}
