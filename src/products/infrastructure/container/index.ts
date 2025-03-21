import { container } from "tsyringe";
import { ProductsTypeormRepository } from "../typeorm/repositories/products-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Product } from "../typeorm/entities/products.entities";
import { CreateProductsUseCase } from "@/products/application/usecases/create_products.usecase";

container.registerSingleton("ProductRepository", ProductsTypeormRepository);

container.registerInstance(
  "ProductsDefaultTypeormRepository",
  dataSource.getRepository(Product)
);

container.registerSingleton(
  "CreateProductsUseCase",
  CreateProductsUseCase.UseCase
);
