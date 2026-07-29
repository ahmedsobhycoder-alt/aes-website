import type { Request, Response } from "express";
import { Types, type FilterQuery } from "mongoose";
import { AuditLog, type AuditLogDocument } from "../models/AuditLog";
import { asyncHandler } from "../utils/asyncHandler";

export const listAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, action, adminId } = req.query as unknown as {
    page: number;
    limit: number;
    action?: string;
    adminId?: string;
  };

  const filter: FilterQuery<AuditLogDocument> = {};
  if (action) filter.action = action;
  if (adminId && Types.ObjectId.isValid(adminId)) {
    filter.adminId = new Types.ObjectId(adminId);
  }

  const [items, total] = await Promise.all([
    AuditLog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("adminId", "name email role"),
    AuditLog.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
  });
});
