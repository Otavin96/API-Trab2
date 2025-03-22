import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { CreateProductsUseCase } from "@/products/application/usecases/create_products.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function createProductController(
  request: Request,
  response: Response
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive(),
  });

  const { name, description, price, quantity, category_id } = dataValidation(
    createProductBodySchema,
    request.body
  );

  const sku = Math.floor(Math.random() * 1000) as unknown as string;

  container.resolve("ProductRepository");

  const createProductsUseCase: CreateProductsUseCase.UseCase =
    container.resolve("CreateProductsUseCase");

  const product = await createProductsUseCase.execute({
    name,
    description,
    sku,
    price,
    quantity,
    category_id,
  });

  response.status(201).json(product);
}
