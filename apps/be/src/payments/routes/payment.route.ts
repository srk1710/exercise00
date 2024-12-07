import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

export class PaymentRouter {
    private router: Router;
    private paymentController: PaymentController;

    constructor() {
        this.router = Router();
        this.paymentController = new PaymentController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/payments", (req, res) => this.paymentController.getAll(req, res));
        this.router.post("/payments", (req, res) => this.paymentController.create(req, res));
    }

    getRouter(): Router {
        return this.router;
    }
}
