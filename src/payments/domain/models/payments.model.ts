export enum TypePayment {
  BOLETO = "boleto",
  CARTAO = "cartão",
}

export interface PaymentsModel {
  id: string;
  description: string;
  type: TypePayment;
  day: number;
  created_at: Date;
  updated_at: Date;
}
