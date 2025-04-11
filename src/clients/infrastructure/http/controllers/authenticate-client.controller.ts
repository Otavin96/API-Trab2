import { AuthenticationUseCase } from "@/clients/application/usecases/authentication.usecase";
import { AuthProvider } from "@/common/domain/providers/auth-provider";
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

  const authProviderJwt: AuthProvider = container.resolve("AuthProviderJwt");

  const access_token = authProviderJwt.generateAuthKey(client.id, client.roles);

<<<<<<< HEAD
  response.status(200).json({ client, access_token });
=======
  response.status(200).json({client, access_token});
>>>>>>> 2a614cd8b6049e00be8aab9fc690577f68b3394b
}
