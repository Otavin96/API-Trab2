import { OrderModel } from "@/orders/domain/models/orders.model";

export interface CreatePDF {
  generatePDF(title: string, order: OrderModel): Promise<Buffer>;
}
