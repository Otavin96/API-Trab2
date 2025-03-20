import { CreateClientsUsecase } from '@/clients/application/usecases/create-clients.usecase';
import { dataValidation } from '@/common/infrastructure/validation/zod/index'
import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { z } from 'zod'

export async function CreateClientController(request: Request, response: Response) {
    
    const createClientBodySchema = z.object({
        cnpj: z.string(),
        social_reason: z.string()
    })

    const { cnpj, social_reason } = dataValidation(createClientBodySchema, request.body);

    container.resolve('ClientRepository')
    const createClientUseCase: CreateClientsUsecase.UseCase = container.resolve('CreateClientUseCase')

    const client = await createClientUseCase.execute({ cnpj, social_reason })

    return response.status(201).json(client)

}