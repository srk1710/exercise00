import { Request, Response } from "express";
import { GridService } from "../services/grid.service";

export class GridController {
    private gridService: GridService;

    constructor() {
        this.gridService = new GridService();
    }

    getGrid = (req: Request, res: Response): void => {
        const grid = this.gridService.generateGrid();

        const withCode = req.query.withCode === 'true';

        if (withCode) {
            const code = this.gridService.computeCode(grid);
            res.json({ grid, code });
        } else {
            res.json({ grid });
        }
    };
}
