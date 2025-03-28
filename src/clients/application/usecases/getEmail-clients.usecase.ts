import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace GetEmailClientsUseCase {
  export type Input = {
    email: string;
  };

  export type Output = ClientOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.email) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.clientsRepository.findByEmail(input.email);
    }
  }
}
