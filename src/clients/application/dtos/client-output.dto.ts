import { StatusPermission } from "@/clients/domain/models/clients.model";

export type ClientOutput = {
  id: string;
  cnpj: string;
  social_reason: string;
  email: string;
  password: string;
  phone: string;
  roles?: StatusPermission
  created_at: Date;
  updated_at: Date;
};
