import { Router } from "express";
import { GridController } from "../controllers/grid.controller";

export class GridRouter {
    private router: Router;
    private gridController: GridController;

    constructor() {
        this.router = Router();
        this.gridController = new GridController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/grid", this.gridController.getGrid);
    }

    getRouter(): Router {
        return this.router;
    }
}
