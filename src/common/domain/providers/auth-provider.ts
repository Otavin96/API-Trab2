export type GenerateAuthKeyProps = {
  access_token: string;
};

export type VerifyAuthKeyProps = {
  client_id: string;
};

export interface AuthProvider {
  generateAuthKey(client_id: string): GenerateAuthKeyProps;
  verifyAuthKey(token: string): VerifyAuthKeyProps;
}
