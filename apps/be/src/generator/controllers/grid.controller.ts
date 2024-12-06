import { Request, Response } from "express";
import { generateGrid } from "../services/grid.service";

export const getGrid = (req: Request, res: Response): void => {
    const grid = generateGrid();
    res.json({ grid });
};