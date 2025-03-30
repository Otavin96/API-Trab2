import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { CreateItemOrdersUseCase } from "@/itemOrders/application/usecases/create-itemOrder.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function CreateItemOrderController(
  request: Request,
  response: Response
) {
  const createItemOrderSchemaBody = z.object({
    quantity: z.number(),
    product_id: z.string(),
  });

  const { quantity, product_id } = dataValidation(
    createItemOrderSchemaBody,
    request.body
  );

  container.resolve("ItemOrderRepository");

  const createItemOrderUseCase: CreateItemOrdersUseCase.UseCase =
    container.resolve("CreateItemOrdersUseCase");

  const itemOrder = await createItemOrderUseCase.execute({
    quantity,
    product_id,
  });

  response.status(201).json(itemOrder);
}
