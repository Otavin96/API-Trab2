import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetPaymentsUseCase } from "@/payments/application/usecases/get-payments.usecase";

export async function getPaymentController(
  request: Request,
  response: Response
) {
  const getPaymentParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(getPaymentParamsSchema, request.params);

  container.resolve("PaymentRepository");

  const getPaymentsUseCase: GetPaymentsUseCase.UseCase =
    container.resolve("GetPaymentsUseCase");

  const payment = await getPaymentsUseCase.execute({ id });

  response.status(200).json(payment);
}
