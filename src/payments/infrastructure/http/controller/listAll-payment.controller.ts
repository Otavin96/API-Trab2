import { ListAllPaymentsUseCase } from "@/payments/application/usecases/listAll-payments.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export async function listAllPaymentController(
  request: Request,
  response: Response
) {
  container.resolve("PaymentRepository");

  const listAllPaymentsUseCase: ListAllPaymentsUseCase.UseCase =
    container.resolve("ListAllPaymentsUseCase");

  const payment = await listAllPaymentsUseCase.execute();

  response.status(200).json(payment);
}
