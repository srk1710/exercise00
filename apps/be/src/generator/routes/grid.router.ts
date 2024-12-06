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
        this.router.get("/grid-code", this.gridController.getGridWithCode);
        this.router.get("/grid", this.gridController.getGridOnly);
    }

    getRouter(): Router {
        return this.router;
    }
}
