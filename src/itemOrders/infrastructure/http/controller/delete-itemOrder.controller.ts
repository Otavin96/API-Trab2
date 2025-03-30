import { DeleteItemOrdersUseCase } from "@/itemOrders/application/usecases/delete-itemOrders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";

export async function DeleteItemOrderController(
  request: Request,
  response: Response
) {
  const deleteItemOrderSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deleteItemOrderSchemaParams, request.params);

  container.resolve("ItemOrderRepository");

  const deleteItemOrdersUseCase: DeleteItemOrdersUseCase.UseCase =
    container.resolve("DeleteItemOrdersUseCase");

  await deleteItemOrdersUseCase.execute({ id });

  response.status(200).json(`Item Order deletado com sucesso: ${id}`);
}
