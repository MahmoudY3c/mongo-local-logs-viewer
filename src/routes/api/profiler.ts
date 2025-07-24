import { Router } from "express";
import {
  getDBStatusByName,
  getDBStatusByNameValidationSchema,
} from "../../controllers/profiler/getDBStatusByName";
import sendExpressValidatorErrors from "../../middleware/sendExpressValidatorErrors";
import {
  enableAndDisableProfile,
  enableAndDisableProfileValidationSchema,
} from "../../controllers/profiler/enableAndDisableProfile";

export const profilerRouter = Router();

profilerRouter.get(
  "/",
  enableAndDisableProfileValidationSchema,
  sendExpressValidatorErrors,
  enableAndDisableProfile
);

profilerRouter.get(
  "/status/:dbName",
  getDBStatusByNameValidationSchema,
  sendExpressValidatorErrors,
  getDBStatusByName
);
