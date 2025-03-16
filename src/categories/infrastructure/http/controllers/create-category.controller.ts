import { dataValidation } from "@/common/infrastructure/validation/zod";
import { CreateCategoryUseCase } from "@/categories/application/usecases/create-products.usecase";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function createCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const createCategoryBodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = dataValidation(
      createCategoryBodySchema,
      req.body
    );

    const categoryRepository = container.resolve("CategoryRepository");

    const createCategoryUseCase: CreateCategoryUseCase.UseCase =
      container.resolve("CreateCategoryUseCase");

    const category = await createCategoryUseCase.execute({ name, description });

    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}
