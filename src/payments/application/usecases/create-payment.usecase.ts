import { TypePayment } from "@/payments/domain/models/payments.model";
import { PaymentOutput } from "../dtos/payment-output.dto";
import { inject, injectable } from "tsyringe";
import { PaymentsRepository } from "@/payments/repositories/payments.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace CreatePaymentUseCase {
    
    export type Input = {
        description: string
        type: TypePayment
        day: number
    }

    export type Output = PaymentOutput

    @injectable()
    export class UseCase {
        constructor(
            @inject("PaymentRepository") 
            private paymentRepository: PaymentsRepository){}

        async execute(input: Input): Promise<Output> {
            if(!input.description || !input.type || input.day < 0) {
                throw new BadRequestError('Input data not provided or invalid')
            }

            const payment = this.paymentRepository.create(input)

            const createdPayment: PaymentOutput = await this.paymentRepository.insert(payment)

            return createdPayment
        }
    }
} 