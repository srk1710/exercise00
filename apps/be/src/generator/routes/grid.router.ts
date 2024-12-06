import { Router } from "express";
import { getGrid } from "../controllers/grid.controller";

const gridRouter = Router();

gridRouter.get("/", getGrid);

export default gridRouter;