import { AuthenticationUseCase } from "@/clients/application/usecases/authentication.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function AuthenticateClientController(
  request: Request,
  response: Response
) {
  const authenticateClientSchemaBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = dataValidation(
    authenticateClientSchemaBody,
    request.body
  );

  const authenticationUseCase: AuthenticationUseCase.UseCase =
    container.resolve("AuthenticationUseCase");

  const client = await authenticationUseCase.execute({ email, password });

  //   const authProviderJwt: AuthProviderJwt = container.resolve("AuthProviderJwt");

  //   const access_token = authProviderJwt.generateAuthKey(user.id, user.roles);

  response.status(200).json([
    {
      message: `Cliente logado com sucesso! Seja bem vindo ${client.social_reason}`,
    },
  ]);
}
