import { Request, Response } from "express";
import { GridService } from "../services/grid.service";

export class GridController {
    private gridService: GridService;

    constructor() {
        this.gridService = new GridService();
    }

    getGridWithCode = (req: Request, res: Response): void => {
        const grid = this.gridService.generateGrid();
        const code = this.gridService.computeCode(grid);
        res.json({ grid, code });
    };

    getGridOnly = (req: Request, res: Response): void => {
        const grid = this.gridService.generateGrid();
        res.json({ grid });
    };
}
