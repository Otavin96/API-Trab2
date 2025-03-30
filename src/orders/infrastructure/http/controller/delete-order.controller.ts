import { DeleteItemOrdersUseCase } from "@/itemOrders/application/usecases/delete-itemOrders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { DeleteOrdersUseCase } from "@/orders/application/usecases/delete-orders.usecase";

export async function DeleteOrderController(
  request: Request,
  response: Response
) {
  const deleteOrderSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deleteOrderSchemaParams, request.params);

  container.resolve("OrderRepository");

  const deleteOrdersUseCase: DeleteOrdersUseCase.UseCase = container.resolve(
    "DeleteOrdersUseCase"
  );

  await deleteOrdersUseCase.execute({ id });

  response.status(200).json(`Order deletada com sucesso: ${id}`);
}
