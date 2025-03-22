import { container } from "tsyringe";
import { CategoriesTypeormRepository } from "../typeorm/repositories/categories-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Category } from "../typeorm/entities/category.entities";
import { CreateCategoryUseCase } from "@/categories/application/usecases/create-categories.usecase";
import { GetCategoriesUseCase } from "@/categories/application/usecases/get-products.usecase";

container.registerSingleton("CategoryRepository", CategoriesTypeormRepository);

container.registerSingleton(
  "CreateCategoryUseCase",
  CreateCategoryUseCase.UseCase
);

container.registerSingleton("GetCategoryUseCase", GetCategoriesUseCase.UseCase);

container.registerInstance(
  "CategoriesDefaultTypeormRepository",
  dataSource.getRepository(Category)
);
