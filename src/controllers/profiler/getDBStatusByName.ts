import { checkSchema } from "express-validator";
import { connection } from "../../db/connection";
import { asyncHandler } from "../../handlers/error";

export const getDBStatusByNameValidationSchema = checkSchema(
  {
    dbName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
  },
  ["params"]
);

export const getDBStatusByName = asyncHandler(async (req, res) => {
  const dbName = req.params.dbName;
  const status = await connection
    .getClient()
    .db(dbName)
    .command({ profile: -1 });
  res.json({ db: dbName, ...status });
});
