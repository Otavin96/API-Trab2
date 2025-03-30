import { ListAllOrdersUseCase } from "@/orders/application/usecases/listAll-orders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export async function ListAllOrderController(
  request: Request,
  response: Response
) {
  container.resolve("OrderRepository");

  const listAllOrdersUseCase: ListAllOrdersUseCase.UseCase = container.resolve(
    "ListAllOrdersUseCase"
  );

  const order = await listAllOrdersUseCase.execute();

  response.status(200).json(order);
}
