import { ConflictError } from "@/common/domain/erros/conflict-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { ProductsModel } from "@/products/domain/models/products.model";
import {
  CreateProductsProps,
  ProductsRepository,
} from "@/products/repositories/products.repository";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class ProductsTypeormRepository implements ProductsRepository {
  constructor(
    @inject("ProductsDefaultTypeormRepository")
    private productsRepository: Repository<ProductsModel>
  ) {}

  async listAll(): Promise<ProductsModel[]> {
    return this.productsRepository.find({ relations: ["category_id"] });
  }

  async findByName(name: string): Promise<ProductsModel> {
    const product = await this.productsRepository.findOneBy({ name });

    if (!product) {
      throw new NotFoundError(`Product not found using name ${name}`);
    }

    return product;
  }

  async conflictingName(name: string): Promise<void> {
    const product = await this.productsRepository.findOneBy({ name });

    if (product) {
      throw new ConflictError(`Name already used on another product`);
    }
  }

  create(props: CreateProductsProps): ProductsModel {
    return this.productsRepository.create(props);
  }

  async insert(model: ProductsModel): Promise<ProductsModel> {
    await this.conflictingName(model.name);

    return this.productsRepository.save(model);
  }
  async findById(id: string): Promise<ProductsModel> {
    return this._get(id);
  }

  async update(model: ProductsModel): Promise<ProductsModel> {
    await this._get(model.id);

    await this.productsRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.productsRepository.delete(id);
  }

  protected async _get(id: string): Promise<ProductsModel> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["category_id"],
    });

    if (!product) {
      throw new NotFoundError(`Product not found using ID ${id}`);
    }

    return product;
  }
}
