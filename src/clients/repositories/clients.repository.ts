import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { ClientsModel, StatusPermission } from "../domain/models/clients.model";

export type CreateClientsProps = {
  cnpj: string;
  social_reason: string;
  email: string;
  password: string;
  phone: string;
  roles?: StatusPermission;
};

export interface ClientsRepository
  extends RepositoryInterface<ClientsModel, CreateClientsProps> {
  findByEmail(email: string): Promise<ClientsModel>;
  findEmailsByProductId(productId: string): Promise<string[]>;
  authentication(email: string, password: string): Promise<void>;
}
