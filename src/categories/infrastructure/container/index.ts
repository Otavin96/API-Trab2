import { container } from "tsyringe";
import { CategoriesTypeormRepository } from "../typeorm/repositories/categories-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Category } from "../typeorm/entities/category.entities";
import { CreateCategoryUseCase } from "@/categories/application/usecases/create-products.usecase";

container.registerSingleton("CategoryRepository", CategoriesTypeormRepository);

container.registerInstance(
  "CategoriesDefaultTypeormRepository",
  dataSource.getRepository(Category)
);

container.registerSingleton(
  "CreateCategoryUseCase",
  CreateCategoryUseCase.UseCase
);
