import { Request, Response } from "express";
import { GridService } from "../services/grid.service";

export class GridController {
    private gridService: GridService;

    constructor() {
        this.gridService = new GridService();
    }

    getGrid = (req: Request, res: Response): void => {
        const biasChar = req.query.biasChar ? (req.query.biasChar as string).toLowerCase() : undefined;
        const withCode = req.query.withCode === 'true';

        const grid = this.gridService.generateGrid(biasChar);

        if (withCode) {
            const code = this.gridService.computeCode(grid);
            res.json({ grid, code });
        } else {
            res.json({ grid });
        }
    };
}
