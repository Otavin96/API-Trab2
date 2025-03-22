import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { GetCategoriesUseCase } from "@/categories/application/usecases/get-products.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";

export async function getCategoryController(
  request: Request,
  response: Response
) {
  const getCategoryParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(getCategoryParamsSchema, request.params);

  container.resolve("CategoryRepository");

  const getCategoriesUseCase: GetCategoriesUseCase.UseCase =
    container.resolve("GetCategoryUseCase");

  const category = await getCategoriesUseCase.execute({ id });

  response.status(200).json(category);
}
