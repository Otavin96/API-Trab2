import { OrderModel } from "@/orders/domain/models/orders.model";
import { CreateOrderProps } from "@/orders/repositories/order.repository";
import { injectable, inject } from "tsyringe";
import { OrderRepository } from "../../../repositories/order.repository";
import { In, Repository } from "typeorm";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { ItemOrdersRepository } from "@/itemOrders/repositories/itemOrders.repository";
import { ProductsRepository } from "@/products/repositories/products.repository";

@injectable()
export class OrderTypeormRepository implements OrderRepository {
  constructor(
    @inject("OrderDefaultTypeormRepository")
    private orderRepository: Repository<OrderModel>,
    @inject("ProductRepository")
    private productsRepository: ProductsRepository,
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
  
    // Buscar pedido e carregar as relações de cliente, itens do pedido e pagamento
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ["client", "itemOrders", "payment"],  // "itemOrders" carrega a relação com produtos
    });
  
    if (!order) {
      throw new NotFoundError(`Order not found using ID ${id}`);
    }
  
    // Para cada item do pedido, buscar o produto associado
    const productPromises = order.itemOrders.map(async (item) => {
      const product = await this.productsRepository.findById(item.product_id as unknown as string);  // Supondo que `product_id` está em `itemOrders`
      return product ? product.name : "Produto Desconhecido";  // Ou algum outro dado relevante do produto
    });
  
    // Esperar todas as promessas de produtos serem resolvidas
    const productNames = await Promise.all(productPromises);
  
    // Adicionar os nomes dos produtos ao pedido
    order.itemOrders = order.itemOrders.map((item, index) => ({
      ...item,
      productName: productNames[index],  // Associe o nome do produto ao item
    }));
  
    return order;
  }
}
