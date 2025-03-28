import { UpdateClientsUseCase } from "@/clients/application/usecases/update-clients.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function updateClientController(
  request: Request,
  response: Response
) {
  const updateCategorySchemaParam = z.object({
    id: z.string(),
  });

  const updateCategorySchemaBody = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  });

  const { id } = dataValidation(updateCategorySchemaParam, request.params);

  const { cnpj, social_reason, email, phone } = dataValidation(
    updateCategorySchemaBody,
    request.body
  );

  container.resolve("CategoryRepository");

  const updateClientsUseCase: UpdateClientsUseCase.UseCase = container.resolve(
    "UpdateClientsUseCase"
  );

  const client = await updateClientsUseCase.execute({
    id,
    cnpj,
    social_reason,
    email,
    phone,
  });

  response.status(200).json(client);
}
