import type { NextFunction, Request, Response } from "express";
import { Admin } from "../models/Admin";
import { ACCESS_COOKIE, verifyAccessToken } from "../services/token.service";
import { ApiError } from "../utils/ApiError";
import type { AdminRole } from "../utils/constants";

export interface AuthenticatedAdmin {
  id: string;
  role: AdminRole;
  name: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}

/**
 * Verifies the HttpOnly access cookie and re-reads the admin from the database.
 *
 * The DB round-trip is deliberate: a token stays valid until it expires, so a
 * deactivated or demoted account would otherwise keep its access for up to the
 * full access-token lifetime.
 */
export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[ACCESS_COOKIE] as string | undefined;
    if (!token) throw ApiError.unauthorized("Authentication required");

    const payload = verifyAccessToken(token);
    const admin = await Admin.findById(payload.sub);

    if (!admin) throw ApiError.unauthorized("Authentication required");
    if (!admin.isActive) throw ApiError.forbidden("This account has been deactivated");

    req.admin = {
      id: admin._id.toString(),
      role: admin.role,
      name: admin.name,
      email: admin.email,
    };
    next();
  } catch (error) {
    if (error instanceof ApiError) return next(error);
    next(ApiError.unauthorized("Invalid or expired session"));
  }
}
