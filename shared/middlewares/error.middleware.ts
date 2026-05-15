import type { NextFunction, Request, Response } from "express";
import { ENV } from "../config/config";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorMessage = err?.message;
  const method = req?.method;
  const stackTrace =
    ENV.NODE_ENV === "Development" ? err?.stack : "An Error Occured";
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    errorMessage,
    method,
    stackTrace,
    statusCode,
  });

  next();
};
