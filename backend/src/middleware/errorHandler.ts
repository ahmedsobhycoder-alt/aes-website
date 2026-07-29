import type { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { isProduction } from "../config/env";
import { ApiError } from "../utils/ApiError";

interface MongoDuplicateKeyError {
  code: number;
  keyValue?: Record<string, unknown>;
}

function isDuplicateKeyError(error: unknown): error is MongoDuplicateKeyError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === 11000
  );
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

/**
 * Single exit point for every error. Responses carry a message and optional
 * field-level details; stack traces are development-only.
 */
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let statusCode = 500;
  let message = "Something went wrong";
  let details: unknown;

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  } else if (error instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(error.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (error instanceof MongooseError.CastError) {
    statusCode = 400;
    message = `Invalid value for ${error.path}`;
  } else if (isDuplicateKeyError(error)) {
    statusCode = 409;
    const field = Object.keys(error.keyValue ?? {})[0] ?? "field";
    message = `A record with that ${field} already exists`;
  } else if (error instanceof Error && !isProduction) {
    message = error.message;
  }

  if (statusCode >= 500) {
    console.error("[error]", error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(!isProduction && error instanceof Error ? { stack: error.stack } : {}),
  });
}
