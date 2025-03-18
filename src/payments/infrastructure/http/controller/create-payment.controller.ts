import {Request, Response } from 'express'
import { CreatePaymentUseCase } from "@/payments/application/usecases/create-payment.usecase";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from '@/common/infrastructure/validation/zod/index';

export async function CreatePaymentController(request: Request, response: Response) {
    const createPaymentUseCase = container.resolve<CreatePaymentUseCase.UseCase>("CreatePaymentUseCase");

    const createPaymentBodySchema = z.object({
        description: z.string(),
        type: z.enum(['boleto', 'cartão']),
        day: z.number()
    });

    // const { description, type, day } = dataValidation(createPaymentBodySchema, request.body);

    const { description, type, day } = request.body

    const payment = await createPaymentUseCase.execute({ description, type, day });

    return response.status(201).json(payment);
}
