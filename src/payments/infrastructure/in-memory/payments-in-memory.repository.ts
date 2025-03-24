import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";
import { PaymentsModel } from "@/payments/domain/models/payments.model";
import { PaymentsRepository } from "@/payments/repositories/payments.repository";

export class PaymentsInMemoryRepository
  extends InMemoryRepository<PaymentsModel>
  implements PaymentsRepository
{
  async listAll(): Promise<PaymentsModel[]> {
    return this.items;
  }
}
