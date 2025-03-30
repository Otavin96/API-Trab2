import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetItemOrdersUseCase } from "@/itemOrders/application/usecases/get-itemOrders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GeItemOrderController(
  request: Request,
  response: Response
) {
  const getItemOrderSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(getItemOrderSchemaParams, request.params);

  container.resolve("ItemOrderRepository");

  const getItemOrdersUseCase: GetItemOrdersUseCase.UseCase = container.resolve(
    "GetItemOrdersUseCase"
  );

  const itemOrder = await getItemOrdersUseCase.execute({ id });

  response.status(200).json(itemOrder);
}
