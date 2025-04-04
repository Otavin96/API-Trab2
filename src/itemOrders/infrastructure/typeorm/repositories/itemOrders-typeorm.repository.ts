import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { ItemOrdersModel } from "@/itemOrders/domain/models/itemOrders.model";
import {
  CreateItemOrderProps,
  ItemOrdersRepository,
} from "@/itemOrders/repositories/itemOrders.repository";
import { inject, injectable } from "tsyringe";
import { In, Repository } from "typeorm";
import { ItemOrder } from "../entities/itemOrders.entities";

@injectable()
export class ItemOrdersTypeormRepository implements ItemOrdersRepository {
  constructor(
    @inject("ItemOrdersDefaultTypeormRepository")
    private itemOrdersRepository: Repository<ItemOrdersModel>
  ) {}

  async findByIds(ids: string[]): Promise<ItemOrder[]> {
    return this.itemOrdersRepository.find({ where: { id: In(ids) }, relations: ["product_id"]});
  }

  create(props: CreateItemOrderProps): ItemOrdersModel {
    return this.itemOrdersRepository.create(props);
  }
  async insert(model: ItemOrdersModel): Promise<ItemOrdersModel> {
    return this.itemOrdersRepository.save(model);
  }
  async findById(id: string): Promise<ItemOrdersModel> {
    return this._get(id);
  }
  async listAll(): Promise<ItemOrdersModel[]> {
    return this.itemOrdersRepository.find({ relations: ["product_id"] });
  }
  async update(model: ItemOrdersModel): Promise<ItemOrdersModel> {
    await this._get(model.id);

    await this.itemOrdersRepository.update({ id: model.id }, model);

    return model;
  }
  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.itemOrdersRepository.delete(id);
  }

  protected async _get(id: string): Promise<ItemOrdersModel> {
    const itemOrder = await this.itemOrdersRepository.findOne({
      where: { id },
      relations: ["product_id"],
    });

    if (!itemOrder) {
      throw new NotFoundError(`Item Order not found using ID ${id}`);
    }

    return itemOrder;
  }
}
