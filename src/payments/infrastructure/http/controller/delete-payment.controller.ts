import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { DeletePaymentsUseCase } from "@/payments/application/usecases/delete-payments.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function deletePaymentController(
  request: Request,
  response: Response
) {
  const deletePaymentSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deletePaymentSchemaParams, request.params);

  container.resolve("PaymentRepository");

  const deletePaymentsUseCase: DeletePaymentsUseCase.UseCase =
    container.resolve("DeletePaymentsUseCase");

  await deletePaymentsUseCase.execute({ id });

  response
    .status(200)
    .json([{ message: "Pagamento deletado com sucesso!!" }, { id: id }]);
}
