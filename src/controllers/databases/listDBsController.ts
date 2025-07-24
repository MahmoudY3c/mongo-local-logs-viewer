import { connection } from "../../db/connection";
import { asyncHandler } from "../../handlers/error";

export const listDBsController = asyncHandler(async (req, res) => {
  const dbs = await connection
    .getClient()
    .db()
    .admin()
    .listDatabases({
      filter: {
        name: { $not: { $in: ["admin", "local", "config"] } },
      },
    });

  const result = await Promise.all(
    dbs.databases.map(async (db) => ({
      ...db,
      profiler: await connection
        .getClient()
        .db(db.name)
        .command({ profile: -1 }),
    }))
  );

  res.json(result);
});
