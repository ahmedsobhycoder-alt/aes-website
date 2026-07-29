import jwt, { type SignOptions } from "jsonwebtoken";
import type { CookieOptions, Response } from "express";
import { env, isProduction } from "../config/env";
import type { AdminRole } from "../utils/constants";

export interface AccessTokenPayload {
  sub: string;
  role: AdminRole;
  type: "access";
}

export interface RefreshTokenPayload {
  sub: string;
  type: "refresh";
}

export const ACCESS_COOKIE = "aes_access";
export const REFRESH_COOKIE = "aes_refresh";

/**
 * `sameSite: "lax"` works because the admin SPA and the API are same-site in the
 * intended setup. Cross-site would require "none" + HTTPS; that is a deployment
 * decision, not a default worth shipping.
 */
function cookieOptions(maxAgeMs: number): CookieOptions {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeMs,
  };
}

function parseDurationMs(value: string, fallbackMs: number): number {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return fallbackMs;
  const amount = Number(match[1]);
  const unit = match[2];
  const factor =
    unit === "s" ? 1_000 : unit === "m" ? 60_000 : unit === "h" ? 3_600_000 : 86_400_000;
  return amount * factor;
}

export function signAccessToken(adminId: string, role: AdminRole): string {
  const payload: AccessTokenPayload = { sub: adminId, role, type: "access" };
  const options = { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN } as SignOptions;
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
}

export function signRefreshToken(adminId: string): string {
  const payload: RefreshTokenPayload = { sub: adminId, type: "refresh" };
  const options = { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN } as SignOptions;
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
  if (decoded.type !== "access") throw new Error("Wrong token type");
  return decoded;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  if (decoded.type !== "refresh") throw new Error("Wrong token type");
  return decoded;
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie(
    ACCESS_COOKIE,
    accessToken,
    cookieOptions(parseDurationMs(env.ACCESS_TOKEN_EXPIRES_IN, 15 * 60_000)),
  );
  res.cookie(
    REFRESH_COOKIE,
    refreshToken,
    cookieOptions(parseDurationMs(env.REFRESH_TOKEN_EXPIRES_IN, 7 * 86_400_000)),
  );
}

export function clearAuthCookies(res: Response) {
  const base: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  };
  res.clearCookie(ACCESS_COOKIE, base);
  res.clearCookie(REFRESH_COOKIE, base);
}
