import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { UpdateItemOrdersUseCase } from "@/itemOrders/application/usecases/update-itemOrders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function UpdateItemOrderController(
  request: Request,
  response: Response
) {
  const updateItemOrderSchemaParam = z.object({
    id: z.string(),
  });

  const updateItemOrderSchemaBody = z.object({
    quantity: z.number().optional(),
    product_id: z.string().optional(),
  });

  const { id } = dataValidation(updateItemOrderSchemaParam, request.params);

  const { quantity, product_id } = dataValidation(
    updateItemOrderSchemaBody,
    request.body
  );

  container.resolve("CategoryRepository");

  const updateItemOrdersUseCase: UpdateItemOrdersUseCase.UseCase =
    container.resolve("UpdateItemOrdersUseCase");

  const itemOrder = await updateItemOrdersUseCase.execute({
    id,
    quantity,
    product_id,
  });

  response.status(200).json(itemOrder);
}
