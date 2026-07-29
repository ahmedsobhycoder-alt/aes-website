import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import type { AdminRole } from "../utils/constants";

/**
 * Role gate. Runs after `authenticate`, which is what puts `req.admin` in place.
 *
 * This is the real access boundary — the admin UI also hides controls a role
 * cannot use, but that is cosmetic and is never trusted.
 */
export function authorize(...allowed: AdminRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.admin) return next(ApiError.unauthorized("Authentication required"));
    if (!allowed.includes(req.admin.role)) {
      return next(
        ApiError.forbidden(
          `This action requires one of: ${allowed.join(", ")}. Your role is ${req.admin.role}.`,
        ),
      );
    }
    next();
  };
}

/** Anyone signed in may read. */
export const canRead = authorize("super-admin", "editor", "viewer");

/** Editors manage content; viewers must not. */
export const canWrite = authorize("super-admin", "editor");

/** Administrator management and destructive actions are super-admin only. */
export const isSuperAdmin = authorize("super-admin");
