import {
  AuthProvider,
  GenerateAuthKeyProps,
  VerifyAuthKeyProps,
} from "@/common/domain/providers/auth-provider";
import { env } from "../../env";
import { InvalidCredentialsError } from "@/common/domain/erros/invalid-credentials-error";
import jwt from "jsonwebtoken";

type DecodedTokenProps = {
  sub: string;
};

export class JwtAuthProvider implements AuthProvider {
  verifyAuthKey(token: string): VerifyAuthKeyProps {
    try {
      const decodedToken = jwt.verify(token, env.MY_SECRET);
      const { sub } = decodedToken as DecodedTokenProps;
      return { client_id: sub };
    } catch {
      throw new InvalidCredentialsError("Invalid credentials");
    }
  }
  generateAuthKey(user_id: string): GenerateAuthKeyProps {
    const access_token = jwt.sign({}, env.MY_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
      subject: user_id,
    });
    return { access_token };
  }
}
