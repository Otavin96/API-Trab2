import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace CreateClientsUsecase {

    export type Input = {
        cnpj: string;
        social_reason: string;
    }

    export type Output = ClientOutput

    @injectable()
    export class UseCase {
        constructor(
            @inject("ClientRepository")
            private clientsRepository: ClientsRepository
        ){}

        async execute(input: Input): Promise<Output> {
            if(!input.cnpj || !input.social_reason) {
                throw new BadRequestError('Input data not provided or invalid')
            }

            const client = this.clientsRepository.create(input)

            const createdClient: ClientOutput = await this.clientsRepository.insert(client)

            return createdClient
        }
    }

}