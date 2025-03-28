import { ClientsModel } from "@/clients/domain/models/clients.model";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";
import { Client } from "../typeorm/entities/clients.entities";
import { NotFoundError } from "@/common/domain/erros/not-found-error";

export class ClientsInMemoryRepository
  extends InMemoryRepository<ClientsModel>
  implements ClientsRepository
{
  async findByEmail(email: string): Promise<ClientsModel> {
    const client = this.items.find((item) => item.email === email);

    if (!client) {
      throw new NotFoundError(`Client not found using email ${email}`);
    }

    return client;
  }
  async listAll(): Promise<ClientsModel[]> {
    return this.items;
  }
}
