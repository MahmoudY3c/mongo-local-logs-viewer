import { Router } from "express";
import {
  showDBLogsByName,
  showDBLogsByNameValidationSchema,
} from "../controllers/DBLogs/showDBLogsByName";
import sendExpressValidatorErrors from "../middleware/sendExpressValidatorErrors";

export const DBLogsRouter = Router();

DBLogsRouter.get(
  "/",
  showDBLogsByNameValidationSchema,
  sendExpressValidatorErrors,
  showDBLogsByName
);
