import { Router } from "express";
import { listDBsController } from "../../controllers/databases/listDBsController";

export const databasesRouter = Router();

databasesRouter.get("/", listDBsController);
