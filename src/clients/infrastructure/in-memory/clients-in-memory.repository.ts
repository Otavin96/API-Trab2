import { ClientsModel } from "@/clients/domain/models/clients.model";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";

export class ClientsInMemoryRepository
  extends InMemoryRepository<ClientsModel>
  implements ClientsRepository
{
  async listAll(): Promise<ClientsModel[]> {
    return this.items;
  }
}
