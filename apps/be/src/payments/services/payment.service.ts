import { PaymentType } from "../model/payment.model";
import { PaymentRepository } from "../repositories/payment.repository";


export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async getAllPayments(): Promise<PaymentType[]> {
        return this.paymentRepository.findAll();
    }

    async createPayment(paymentData: PaymentType): Promise<PaymentType> {
        return this.paymentRepository.create(paymentData);
    }
}
