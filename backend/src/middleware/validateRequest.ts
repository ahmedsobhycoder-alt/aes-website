import type { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ZodError, type ZodTypeAny } from "zod";
import { ApiError } from "../utils/ApiError";

interface Schemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    message: issue.message,
  }));
}

/**
 * Parses and REPLACES req.body/query/params with the validated result, so
 * controllers only ever see data that matched the schema (unknown keys stripped).
 */
export function validateRequest(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) {
        // req.query is a getter in Express 4; assign onto it rather than replacing.
        Object.defineProperty(req, "query", {
          value: schemas.query.parse(req.query),
          writable: true,
          configurable: true,
        });
      }
      if (schemas.body) req.body = schemas.body.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(ApiError.badRequest("Validation failed", formatZodError(error)));
      }
      next(error);
    }
  };
}

/** Rejects malformed ids before they reach Mongoose and throw a CastError. */
export function validateObjectId(paramName = "id") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    if (!value || !isValidObjectId(value)) {
      return next(ApiError.badRequest(`Invalid ${paramName}`));
    }
    next();
  };
}
