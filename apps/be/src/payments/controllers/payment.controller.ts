import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import { broadcastNewPayment } from "../../websockets/events";


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

            if (!name || typeof name !== "string" || name.trim() === "") {
                res.status(400).json({ message: "Invalid or missing 'name' field" });
                return;
            }

            if (!amount || typeof amount !== "number" || amount <= 0) {
                res.status(400).json({ message: "Invalid or missing 'amount' field. It should be a positive number." });
                return;
            }

            if (!code || typeof code !== "number" || amount <= 0) {
                res.status(400).json({ message: "Invalid or missing 'code' field. It should be a positive number." });
                return;
            }

            if (!Array.isArray(grid) || grid.length === 0 || !grid.every(row => Array.isArray(row))) {
                res.status(400).json({ message: "Invalid or missing 'grid' field. It should be a non-empty 2D array." });
                return;
            }

            const payment = await this.paymentService.createPayment({ name, amount, code, grid });

            broadcastNewPayment(payment);
            res.status(201).json(payment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to create payment", error });
        }
    }

}
