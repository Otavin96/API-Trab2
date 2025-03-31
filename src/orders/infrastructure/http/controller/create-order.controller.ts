import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { CreateOrdersUseCase } from "@/orders/application/usecases/create-ordes.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function CreateOrderController(
  request: Request,
  response: Response
) {
  const createOrderBodySchema = z.object({
    client: z.string(),
    itemOrders: z.string().array(),
    payment: z.string(),
  });

  const { client, itemOrders, payment } = dataValidation(
    createOrderBodySchema,
    request.body
  );

  container.resolve("OrderRepository");

  const createOrdersUseCase: CreateOrdersUseCase.UseCase = container.resolve(
    "CreateOrdersUseCase"
  );

  const order = await createOrdersUseCase.execute({
    client,
    itemOrders,
    payment,
  });

  response.status(201).json(order);
}
