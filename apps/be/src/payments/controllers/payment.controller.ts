import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";


export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const payments = await this.paymentService.getAllPayments();
            res.status(200).json(payments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve payments", error });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, amount, code, grid } = req.body;

            if (!name || !amount || !code || !grid) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }

            const payment = await this.paymentService.createPayment({ name, amount, code, grid });
            res.status(201).json(payment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to create payment", error });
        }
    }
}
