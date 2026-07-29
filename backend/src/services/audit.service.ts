import type { Request } from "express";
import { Types } from "mongoose";
import { AuditLog } from "../models/AuditLog";
import type { AuditAction, AuditEntityType } from "../utils/constants";

/** Best-effort client IP; respects the proxy hop when `trust proxy` is enabled. */
export function getClientIp(req: Request): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim();
  }
  return req.ip ?? req.socket.remoteAddress ?? undefined;
}

interface RecordAuditInput {
  req: Request;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: Types.ObjectId | string;
  metadata?: Record<string, unknown>;
  /** Explicit actor, for events like login where req.admin is not yet populated. */
  adminId?: Types.ObjectId | string;
}

/**
 * Writes an audit entry. Deliberately never throws: an audit failure must not
 * roll back or 500 the business action the admin actually performed.
 */
export async function recordAudit({
  req,
  action,
  entityType,
  entityId,
  metadata = {},
  adminId,
}: RecordAuditInput): Promise<void> {
  try {
    const actor = adminId ?? req.admin?.id;
    if (!actor) return;

    await AuditLog.create({
      adminId: new Types.ObjectId(actor.toString()),
      action,
      entityType,
      entityId: entityId ? new Types.ObjectId(entityId.toString()) : undefined,
      metadata,
      ipAddress: getClientIp(req),
    });
  } catch (error) {
    console.error("[audit] failed to record", action, error);
  }
}
