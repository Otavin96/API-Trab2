import { ListAllClientsUseCase } from "@/clients/application/usecases/listAll-clients.usecase";
import { ListAllItemOrdersUseCase } from "@/itemOrders/application/usecases/listAll-itemOrders.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export async function ListAllItemOrderController(
  request: Request,
  response: Response
) {
  container.resolve("ItemOrderRepository");

  const listAllItemOrdersUseCase: ListAllItemOrdersUseCase.UseCase =
    container.resolve("ListAllItemOrdersUseCase");

  const itemOrder = await listAllItemOrdersUseCase.execute();

  response.status(200).json(itemOrder);
}
