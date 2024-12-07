import { Payment, PaymentType } from "../model/payment.model";


export class PaymentRepository {
    async findAll(): Promise<PaymentType[]> {
        return Payment.find().exec();
    }

    async create(data: PaymentType): Promise<PaymentType> {
        const payment = new Payment(data);
        return payment.save() as Promise<PaymentType>;
    }
}
