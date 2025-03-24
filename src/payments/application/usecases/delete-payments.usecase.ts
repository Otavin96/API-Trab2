import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { PaymentsRepository } from "@/payments/repositories/payments.repository";
import { inject, injectable } from "tsyringe";

export namespace DeletePaymentsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("PaymentRepository")
      private paymentRepository: PaymentsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.paymentRepository.delete(input.id);
    }
  }
}
