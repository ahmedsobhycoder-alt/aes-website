import type { Request, Response } from "express";
import { Admin } from "../models/Admin";
import { recordAudit } from "../services/audit.service";
import {
  REFRESH_COOKIE,
  clearAuthCookies,
  setAuthCookies,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../services/token.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import type { ChangePasswordInput, LoginInput } from "../validation/auth.schema";

/** Identical message for every failure mode, so it cannot be used to enumerate accounts. */
const LOGIN_FAILED = "Invalid email or password";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) throw ApiError.unauthorized(LOGIN_FAILED);

  const matches = await admin.comparePassword(password);
  if (!matches) throw ApiError.unauthorized(LOGIN_FAILED);

  // Checked after the password so a deactivated account cannot be probed.
  if (!admin.isActive) throw ApiError.forbidden("This account has been deactivated");

  admin.lastLoginAt = new Date();
  await admin.save();

  setAuthCookies(
    res,
    signAccessToken(admin._id.toString(), admin.role),
    signRefreshToken(admin._id.toString()),
  );

  await recordAudit({
    req,
    adminId: admin._id,
    action: "auth.login",
    entityType: "Admin",
    entityId: admin._id,
    metadata: { email: admin.email },
  });

  res.json({
    success: true,
    data: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookies(res);
  res.json({ success: true, message: "Signed out" });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE] as string | undefined;
  if (!token) throw ApiError.unauthorized("Session expired");

  let adminId: string;
  try {
    adminId = verifyRefreshToken(token).sub;
  } catch {
    clearAuthCookies(res);
    throw ApiError.unauthorized("Session expired");
  }

  const admin = await Admin.findById(adminId);
  if (!admin || !admin.isActive) {
    clearAuthCookies(res);
    throw ApiError.unauthorized("Session expired");
  }

  // Rotate both tokens on every refresh so a captured refresh token has a short life.
  setAuthCookies(
    res,
    signAccessToken(admin._id.toString(), admin.role),
    signRefreshToken(admin._id.toString()),
  );

  res.json({
    success: true,
    data: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.admin) throw ApiError.unauthorized();
  res.json({ success: true, data: req.admin });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  if (!req.admin) throw ApiError.unauthorized();
  const { currentPassword, newPassword } = req.body as ChangePasswordInput;

  const admin = await Admin.findById(req.admin.id).select("+password");
  if (!admin) throw ApiError.notFound("Account not found");

  const matches = await admin.comparePassword(currentPassword);
  if (!matches) throw ApiError.badRequest("Current password is incorrect");

  admin.password = newPassword; // pre-save hook re-hashes
  await admin.save();

  // Force re-authentication everywhere by dropping the cookies.
  clearAuthCookies(res);

  res.json({ success: true, message: "Password updated. Please sign in again." });
});
