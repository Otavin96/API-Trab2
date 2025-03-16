import { CategoriesModel } from "@/categories/domain/models/categories.model";
import {
  CategoriesRepository,
  CreateCategoriesProps,
} from "@/categories/repositories/categories.repository";
import { ConflictError } from "@/common/domain/erros/conflict-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class CategoriesTypeormRepository implements CategoriesRepository {
  constructor(
    @inject("CategoriesDefaultTypeormRepository")
    private categoriesRepository: Repository<CategoriesModel>
  ) {}

  async findByName(name: string): Promise<CategoriesModel> {
    const category = this.categoriesRepository.findOneBy({ name });

    if (!category) {
      throw new NotFoundError(`category not found using name ${name}`);
    }

    return category;
  }

  async conflictingName(name: string): Promise<void> {
    const category = this.categoriesRepository.findOneBy({ name });

    if (category) {
      throw new ConflictError("Name already used on another category");
    }
  }

  create(props: CreateCategoriesProps): CategoriesModel {
    return this.categoriesRepository.create(props);
  }

  async insert(model: CategoriesModel): Promise<CategoriesModel> {
    await this.conflictingName(model.name);

    return this.categoriesRepository.save(model);
  }
  async findById(id: string): Promise<CategoriesModel> {
    return this._get(id);
  }

  async update(model: CategoriesModel): Promise<CategoriesModel> {
    await this._get(model.id);

    await this.categoriesRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.categoriesRepository.delete(id);
  }

  protected async _get(id: string): Promise<CategoriesModel> {
    const category = this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundError(`Category not found using ID ${id}`);
    }

    return category;
  }
}
