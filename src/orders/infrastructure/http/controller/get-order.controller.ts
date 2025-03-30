import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetOrdersUseCase } from "@/orders/application/usecases/get-orders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GetOrderController(request: Request, response: Response) {
  const getOrderSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(getOrderSchemaParams, request.params);

  container.resolve("ItemOrderRepository");

  const getOrdersUseCase: GetOrdersUseCase.UseCase =
    container.resolve("GetOrdersUseCase");

  const order = await getOrdersUseCase.execute({ id });

  response.status(200).json(order);
}
