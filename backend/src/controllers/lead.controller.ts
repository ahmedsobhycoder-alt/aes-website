import type { Request, Response } from "express";
import { Types, type FilterQuery } from "mongoose";
import { Lead, type LeadDocument } from "../models/Lead";
import { getClientIp, recordAudit } from "../services/audit.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import type { CreateLeadInput, ListLeadsQuery } from "../validation/lead.schema";

// ---------------------------------------------------------------- public

/**
 * Public enquiry submission. The response deliberately echoes nothing back
 * except an acknowledgement — no id, no status, no stored fields.
 */
export const submitLead = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateLeadInput;

  await Lead.create({
    ...body,
    status: "new",
    internalNotes: "",
    sourceIp: getClientIp(req),
  });

  res.status(201).json({
    success: true,
    message: "Thank you. Our team will be in touch shortly.",
  });
});

// ---------------------------------------------------------------- admin

export const listLeads = asyncHandler(async (req: Request, res: Response) => {
  const {
    page,
    limit,
    status,
    projectType,
    projectZone,
    search,
    dateFrom,
    dateTo,
    includeArchived,
  } = req.query as unknown as ListLeadsQuery;

  const filter: FilterQuery<LeadDocument> = {};

  if (status) filter.status = status;
  // Archived leads are hidden unless explicitly asked for or filtered to.
  else if (!includeArchived) filter.status = { $ne: "archived" };

  if (projectType) filter.projectType = projectType;
  if (projectZone) filter.projectZone = projectZone;

  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { projectType: { $regex: search, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("assignedTo", "name email"),
    Lead.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
  });
});

export const getLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id).populate("assignedTo", "name email");
  if (!lead) throw ApiError.notFound("Enquiry not found");
  res.json({ success: true, data: lead });
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as {
    status?: LeadDocument["status"];
    internalNotes?: string;
    assignedTo?: string | null;
  };

  const lead = await Lead.findById(req.params.id);
  if (!lead) throw ApiError.notFound("Enquiry not found");

  if (body.status !== undefined) lead.status = body.status;
  if (body.internalNotes !== undefined) lead.internalNotes = body.internalNotes;
  if (body.assignedTo !== undefined) {
    if (body.assignedTo === null || body.assignedTo === "") {
      lead.assignedTo = undefined;
    } else {
      if (!Types.ObjectId.isValid(body.assignedTo)) {
        throw ApiError.badRequest("Invalid assignedTo id");
      }
      lead.assignedTo = new Types.ObjectId(body.assignedTo);
    }
  }

  await lead.save();

  await recordAudit({
    req,
    action: "lead.update",
    entityType: "Lead",
    entityId: lead._id,
    metadata: { fields: Object.keys(body) },
  });

  res.json({ success: true, data: lead });
});

export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as { status: LeadDocument["status"] };
  const lead = await Lead.findById(req.params.id);
  if (!lead) throw ApiError.notFound("Enquiry not found");

  const previous = lead.status;
  lead.status = status;
  await lead.save();

  await recordAudit({
    req,
    action: "lead.status-update",
    entityType: "Lead",
    entityId: lead._id,
    metadata: { from: previous, to: status, name: lead.name },
  });

  res.json({ success: true, data: lead });
});

export const archiveLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) throw ApiError.notFound("Enquiry not found");

  lead.status = "archived";
  await lead.save();

  await recordAudit({
    req,
    action: "lead.archive",
    entityType: "Lead",
    entityId: lead._id,
    metadata: { name: lead.name },
  });

  res.json({ success: true, data: lead });
});
