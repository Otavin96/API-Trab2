import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { PaymentsModel } from "@/payments/domain/models/payments.model";
import {
  CreatePaymentsProps,
  PaymentsRepository,
} from "@/payments/repositories/payments.repository";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class PaymentsTypeormRepository implements PaymentsRepository {
  constructor(
    @inject("PaymentsDefaultTypeormRepository")
    private paymentsRepository: Repository<PaymentsModel>
  ) {}

  async listAll(): Promise<PaymentsModel[]> {
    return this.paymentsRepository.find();
  }

  create(props: CreatePaymentsProps): PaymentsModel {
    return this.paymentsRepository.create(props);
  }

  async insert(model: PaymentsModel): Promise<PaymentsModel> {
    return this.paymentsRepository.save(model);
  }
  async findById(id: string): Promise<PaymentsModel> {
    return this._get(id);
  }

  async update(model: PaymentsModel): Promise<PaymentsModel> {
    await this._get(model.id);

    await this.paymentsRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.paymentsRepository.delete(id);
  }

  protected async _get(id: string): Promise<PaymentsModel> {
    const payment = this.paymentsRepository.findOneBy({ id });

    if (!payment) {
      throw new NotFoundError(`Payment not found using ID ${id}`);
    }

    return payment;
  }
}
