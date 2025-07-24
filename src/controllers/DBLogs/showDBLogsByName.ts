import { checkSchema } from "express-validator";
import { connection } from "../../db/connection";
import { asyncHandler } from "../../handlers/error";

export const showDBLogsByNameValidationSchema = checkSchema(
  {
    dbName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    skip: {
      isNumeric: true,
    },
  },
  ["query"]
);

export const showDBLogsByName = asyncHandler(async (req, res) => {
  const dbName = req.query.dbName as string;
  const skip = parseInt(req.query.skip as string) || 0;
  const limit = 20;

  let db = connection.getClient().db(dbName);
  let profile = db.collection("system.profile");

  const logs = await profile
    .find({ op: { $in: ["insert", "update", "remove"] } })
    .sort({ ts: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  res.json(logs);
});
