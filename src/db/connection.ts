import mongoose from "mongoose";
import { mongoURI } from "../config";

mongoose.set("strictQuery", true);
mongoose.connect(mongoURI);

console.log("====================================");
console.log(mongoURI);
console.log("====================================");

export const connection = mongoose.connection;

connection.on("error", (e) => {
  console.error(e);
});

connection.once("open", () => {
  console.log("connected to db");
});

// close all connections when restart
// Disconnect on exit or interruption
process.on("exit", async () => {
  console.log("exit fired ...");
});

process.on("SIGINT", async () => {
  console.log("SIGINT fired ...");
  await mongoose.disconnect().then(() => console.log("disconnected"));
  process.exit(0);
});


