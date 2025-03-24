import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { UpdateProductsUseCase } from "@/products/application/usecases/update-products.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function updateProductController(
  request: Request,
  response: Response
) {
  const updateProductSchemaParam = z.object({
    id: z.string(),
  });

  const updateCategorySchemaBody = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive(),
  });

  const { id } = dataValidation(updateProductSchemaParam, request.params);

  const { name, description, price, quantity, category_id } = dataValidation(
    updateCategorySchemaBody,
    request.body
  );

  const sku = Math.floor(Math.random() * 1000) as unknown as string;

  container.resolve("ProductRepository");

  const updateProductsUseCase: UpdateProductsUseCase.UseCase =
    container.resolve("UpdateProductsUseCase");

  const product = await updateProductsUseCase.execute({
    id,
    name,
    sku,
    description,
    price,
    quantity,
    category_id,
  });

  response.status(200).json(product);
}
