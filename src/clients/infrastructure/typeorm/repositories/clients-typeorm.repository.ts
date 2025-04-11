import { ClientsModel } from "@/clients/domain/models/clients.model";
import {
  ClientsRepository,
  CreateClientsProps,
} from "@/clients/repositories/clients.repository";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class ClientsTypeormRepository implements ClientsRepository {
  constructor(
    @inject("ClientsDefaultTypeormRepository")
    private clientsRepository: Repository<ClientsModel>
  ) {}

  authentication(email: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findEmailsByProductId(productId: string): Promise<string[]> {
    const emails = await this.clientsRepository
      .createQueryBuilder("client")
      .select("client.email")
      .distinct(true)
      .innerJoin("client.orders", "order")
      .innerJoin("order.itemOrders", "itemOrder")
      .where("itemOrder.product_id = :productId", { productId })
      .getRawMany();

    emails.map((item) => {
      console.log("E-mails: " + item.client_email);
    });

    return emails.map((e) => e.client_email);
  }

  async findByEmail(email: string): Promise<ClientsModel> {
    const client = await this.clientsRepository.findOneBy({ email });

    if (!client) {
      throw new NotFoundError(`Client not found using email: ${email}`);
    }

    return client;
  }

  async listAll(): Promise<ClientsModel[]> {
    return this.clientsRepository.find();
  }

  create(props: CreateClientsProps): ClientsModel {
    return this.clientsRepository.create(props);
  }

  async insert(model: ClientsModel): Promise<ClientsModel> {
    return this.clientsRepository.save(model);
  }
  async findById(id: string): Promise<ClientsModel> {
    return this._get(id);
  }

  async update(model: ClientsModel): Promise<ClientsModel> {
    await this._get(model.id);

    await this.clientsRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.clientsRepository.delete(id);
  }

  protected async _get(id: string): Promise<ClientsModel> {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundError(`Client not found using ID ${id}`);
    }

    return client;
  }
}
