import type { Request, Response } from "express";
import { Admin } from "../models/Admin";
import { Lead } from "../models/Lead";
import { Project } from "../models/Project";
import { AuditLog } from "../models/AuditLog";
import { getOrCreateSettings } from "../models/SiteSettings";
import { recordAudit } from "../services/audit.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { QUALIFIED_LEAD_STATUSES } from "../utils/constants";
import type { CreateAdminInput } from "../validation/admin.schema";

export const listAdmins = asyncHandler(async (_req: Request, res: Response) => {
  const admins = await Admin.find().sort({ createdAt: -1 });
  res.json({ success: true, data: admins });
});

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateAdminInput;

  const existing = await Admin.findOne({ email: body.email }).select("_id");
  if (existing) throw ApiError.conflict("An administrator with that email already exists");

  const admin = await Admin.create(body);

  await recordAudit({
    req,
    action: "admin.create",
    entityType: "Admin",
    entityId: admin._id,
    metadata: { email: admin.email, role: admin.role },
  });

  res.status(201).json({ success: true, data: admin });
});

export const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as { name?: string; role?: Parameters<typeof Admin.create>[0] extends never ? never : string };
  const admin = await Admin.findById(req.params.id);
  if (!admin) throw ApiError.notFound("Administrator not found");

  // Guard against a super-admin demoting themselves and locking everyone out.
  if (
    req.admin?.id === admin._id.toString() &&
    body.role &&
    body.role !== admin.role
  ) {
    throw ApiError.badRequest("You cannot change your own role");
  }

  if (body.name !== undefined) admin.name = body.name;
  if (body.role !== undefined) admin.role = body.role as typeof admin.role;
  await admin.save();

  await recordAudit({
    req,
    action: "admin.update",
    entityType: "Admin",
    entityId: admin._id,
    metadata: { fields: Object.keys(body), role: admin.role },
  });

  res.json({ success: true, data: admin });
});

export const updateAdminStatus = asyncHandler(async (req: Request, res: Response) => {
  const { isActive } = req.body as { isActive: boolean };
  const admin = await Admin.findById(req.params.id);
  if (!admin) throw ApiError.notFound("Administrator not found");

  if (req.admin?.id === admin._id.toString() && !isActive) {
    throw ApiError.badRequest("You cannot deactivate your own account");
  }

  admin.isActive = isActive;
  await admin.save();

  await recordAudit({
    req,
    action: "admin.status-change",
    entityType: "Admin",
    entityId: admin._id,
    metadata: { email: admin.email, isActive },
  });

  res.json({ success: true, data: admin });
});

/** Everything the dashboard renders, in one round trip. */
export const getDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    newLeads,
    qualifiedLeads,
    settings,
    recentLeads,
    recentActivity,
  ] = await Promise.all([
    Project.countDocuments({ status: { $ne: "archived" } }),
    Project.countDocuments({ status: "published" }),
    Project.countDocuments({ status: "draft" }),
    Lead.countDocuments({ status: "new" }),
    Lead.countDocuments({ status: { $in: QUALIFIED_LEAD_STATUSES } }),
    getOrCreateSettings(),
    Lead.find({ status: { $ne: "archived" } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name phone projectType projectZone status createdAt"),
    AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("adminId", "name email"),
  ]);

  res.json({
    success: true,
    data: {
      counts: {
        totalProjects,
        publishedProjects,
        draftProjects,
        newLeads,
        qualifiedLeads,
        projectsExecuted: settings.statistics.projectsExecuted,
        industriesExecuted: settings.statistics.industriesExecuted,
      },
      recentLeads,
      recentActivity,
    },
  });
});
