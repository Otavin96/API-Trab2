import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { UpdatePaymentsUseCase } from "@/payments/application/usecases/update-payments.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function updatePaymentController(
  request: Request,
  response: Response
) {
  const updatePaymentSchemaParam = z.object({
    id: z.string(),
  });

  const updatePaymentSchemaBody = z.object({
    description: z.string().optional(),
    type: z.enum(["boleto", "cartão"]).optional(),
    day: z.number().optional(),
  });

  const { id } = dataValidation(updatePaymentSchemaParam, request.params);

  const { description, type, day } = dataValidation(
    updatePaymentSchemaBody,
    request.body
  );

  container.resolve("PaymentRepository");

  const updatePaymentsUseCase: UpdatePaymentsUseCase.UseCase =
    container.resolve("UpdatePaymentsUseCase");

  const payment = await updatePaymentsUseCase.execute({
    id,
    description,
    type,
    day,
  });

  response.status(200).json(payment);
}
