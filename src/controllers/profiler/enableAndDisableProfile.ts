import { checkSchema } from "express-validator";
import { connection } from "../../db/connection";
import { asyncHandler, ErrorMessages } from "../../handlers/error";
import type { Document } from "mongoose";

export const enableAndDisableProfileValidationSchema = checkSchema(
  {
    dbName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    action: {
      isString: true,
      isIn: {
        options: [["enable", "disable"]],
      },
    },
  },
  ["query"]
);

export const enableAndDisableProfile = asyncHandler(async (req, res) => {
  const dbName = req.query.dbName as string;
  const action = req.query.action as "enable" | "disable";
  const db = connection.getClient().db(dbName);

  switch (action) {
    case "enable":
      await db.command({ profile: 2 }); // log all
      break;
    case "disable":
      await db.command({ profile: 0 }); // off
      break;
    default:
      return res
        .status(400)
        .json(ErrorMessages.SEND_ERR_MESSAGE("Invalid action"));
  }

  const result = await db.command({ profile: -1 }); // -1 returns current status

  res.json({ db: dbName, action, result, enabled: result.was === 2 });
});
