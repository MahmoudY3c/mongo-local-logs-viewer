import { Router } from "express";
import { databasesRouter } from "./databases";
import { profilerRouter } from "./profiler";

export const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome In API" });
});

apiRouter.use("/databases", databasesRouter);
apiRouter.use("/profiler", profilerRouter);
