import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { indexRouter } from "./routes";
import { catchAndForwardError, JSONErrorHandler } from "./handlers/error";
import cors from "cors";
import { NODE_ENV } from "./config";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: NODE_ENV === "development",
    credentials: NODE_ENV === "development",
    preflightContinue: NODE_ENV === "development",
    // methods: ['GET', 'OPTIONS','HEAD','PUT','PATCH','POST','DELETE']
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(catchAndForwardError);

// error handler
app.use(JSONErrorHandler);

export default app;
