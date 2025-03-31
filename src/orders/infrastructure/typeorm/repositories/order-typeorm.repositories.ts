import { OrderModel } from "@/orders/domain/models/orders.model";
import { CreateOrderProps } from "@/orders/repositories/order.repository";
import { injectable, inject } from "tsyringe";
import { OrderRepository } from "../../../repositories/order.repository";
import { In, Repository } from "typeorm";
import { NotFoundError } from "@/common/domain/erros/not-found-error";

@injectable()
export class OrderTypeormRepository implements OrderRepository {
  constructor(
    @inject("OrderDefaultTypeormRepository")
    private orderRepository: Repository<OrderModel>
  ) {}

  create(props: CreateOrderProps): OrderModel {
    return this.orderRepository.create(props);
  }
  async insert(model: OrderModel): Promise<OrderModel> {
    return this.orderRepository.save(model);
  }

  async findById(id: string): Promise<OrderModel> {
    return this._get(id);
  }

  async listAll(): Promise<OrderModel[]> {
    return this.orderRepository.find({
      relations: ["client", "itemOrders", "payment"],
    });
  }

  async update(model: OrderModel): Promise<OrderModel> {
    await this._get(model.id);

    await this.orderRepository.save(model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.orderRepository.delete(id);
  }

  protected async _get(id: string): Promise<OrderModel> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ["client", "itemOrders", "payment"],
    });

    if (!order) {
      throw new NotFoundError(`Order not found using ID ${id}`);
    }

    return order;
  }
}
