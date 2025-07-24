import { Router } from "express";
import { apiRouter } from "./api";
import { DBLogsRouter } from "./DBLogs";

export const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

indexRouter.use("/api", apiRouter);
indexRouter.use("/logs", DBLogsRouter);
