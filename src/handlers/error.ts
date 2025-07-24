import express, { type NextFunction } from "express";
/* eslint-disable no-unused-vars */
import createHttpError from "http-errors";
import { NODE_ENV } from "../config";
// import { logger } from '../logger';
import type * as core from 'express-serve-static-core';

interface asyncErrorHandlerItems {
  status?: number;
  errorHandler?: string | null | undefined;
  route?: string;
  baseUrl?: string;
  path?: string;
}

// catch 404 and forward to error handler
const catchAndForwardError = function (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next(createHttpError(404));
};

const staticHTMLErrorHandler = function (
  err: Error & { status?: number },
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = NODE_ENV === "development" ? err : {};
  res.locals.status = err.status || 500;
  // render the error page
  res.status(res.locals.status).render("error");
};

const JSONErrorHandler = function (
  err: Error & { status?: number },
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  const status = err.status || 500;
  const error =
    NODE_ENV === "development"
      ? {
          ...ErrorMessages.SEND_ERR_MESSAGE(err.message),
          stack: err.stack,
          status,
        }
      : { ...ErrorMessages.SEND_ERR_MESSAGE(err.message), status };
  // render the error page
  res.status(status).json(error);
};

const asyncErrorHandler = function (
  err: Error & asyncErrorHandlerItems,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  if (err.errorHandler === "asyncHandler") {
    // handle async errors
  }

  next(err);
};

const ErrorMessages = {
  SEND_ERR_MESSAGE: (msg: string) => ({ error: { message: msg } }),
  // NOT_FOUND: (req: express.Request, field?: string) => ({
  //   error: { message: req.t("NOT_FOUND", { field }) },
  // }),
};

/**
 * 
function <
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
>(asyncFunction: (...args: Parameters<express.RequestHandler<P, ResBody, ReqBody, ReqQuery>>) => any | Promise<any>):
  express.RequestHandler<P, ResBody, ReqBody, ReqQuery>
 */

const asyncHandler = function <
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
>(
  asyncFunction: (
    ...args: Parameters<express.RequestHandler<P, ResBody, ReqBody, ReqQuery>>
  ) => any | Promise<any>
): express.RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return async function (req, res, next) {
    const route = req.originalUrl;
    const { baseUrl, path } = req;
    try {
      await asyncFunction(req, res, next);
    } catch (err: any & asyncErrorHandlerItems) {
      console.error(err);
      err.status = 400;
      err.errorHandler = "asyncHandler";
      err.route = route;
      err.baseUrl = baseUrl;
      err.path = path;
      next(err);
    }
  };
};

export {
  catchAndForwardError,
  staticHTMLErrorHandler,
  JSONErrorHandler,
  asyncErrorHandler,
  asyncHandler,
  ErrorMessages,
};
