import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { ClientsModel } from "../domain/models/clients.model";

export type CreateClientsProps = {
  cnpj: string;
  social_reason: string;
  email: string;
  phone: string;
};

export interface ClientsRepository
  extends RepositoryInterface<ClientsModel, CreateClientsProps> {
  findByEmail(email: string): Promise<ClientsModel>;
  findEmailsByProductId(productId: string): Promise<string[]>;
}
