import { TypePayment } from "@/payments/domain/models/payments.model";

export type PaymentOutput = {
  id: string;
  description: string;
  type: TypePayment;
  day: number;
  created_at: Date;
  updated_at: Date;
};
