import { UpdateOrdersUseCase } from "@/orders/application/usecases/update-orders.usecase";
import { Response, Request } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";

export async function UpdateOrderController(
  request: Request,
  response: Response
) {
  const updateOrderSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(updateOrderSchemaParams, request.params);

  const updateOrderBodySchema = z.object({
    client: z.string().optional(),
    itemOrders: z
      .array(
        z.object({
          id: z.string(),
        })
      )
      .optional(),
  });

  const { client, itemOrders, removeItemOrders } = dataValidation(
    updateOrderBodySchema,
    request.body
  );

  container.resolve("OrderRepository");

  const updateOrdersUseCase: UpdateOrdersUseCase.UseCase = container.resolve(
    "UpdateOrdersUseCase"
  );

  const order = await updateOrdersUseCase.execute({
    id,
    client,
    itemOrders,
  });

  response.status(200).json({ order });
}
