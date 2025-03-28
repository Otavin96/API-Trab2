import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";
import { ClientsRepository } from "@/clients/repositories/clients.repository";

export namespace UpdateClientsUseCase {
  export type Input = {
    id: string;
    cnpj: string;
    social_reason: string;
    email: string;
    phone: string;
  };

  export type Output = ClientOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let client = await this.clientsRepository.findById(input.id);

      if (input.cnpj) {
        client.cnpj = input.cnpj;
      }

      if (input.social_reason) {
        client.social_reason = input.social_reason;
      }

      if (input.email) {
        client.email = input.email;
      }

      if (input.phone) {
        client.phone = input.phone;
      }

      const updatedClient = await this.clientsRepository.update(client);

      return updatedClient;
    }
  }
}
