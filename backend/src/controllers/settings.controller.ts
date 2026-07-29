import type { Request, Response } from "express";
import { Types } from "mongoose";
import { getOrCreateSettings } from "../models/SiteSettings";
import { recordAudit } from "../services/audit.service";
import { asyncHandler } from "../utils/asyncHandler";
import type { UpdateSettingsInput } from "../validation/settings.schema";

/**
 * Public settings. Only what the website actually renders — statistics, contact
 * details and social links. No ids, no timestamps, no updatedBy.
 */
export const getPublicSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await getOrCreateSettings();
  res.json({
    success: true,
    data: {
      statistics: settings.statistics,
      contact: settings.contact,
      socialLinks: settings.socialLinks,
    },
  });
});

export const getSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await getOrCreateSettings();
  res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateSettingsInput;
  const settings = await getOrCreateSettings();

  if (body.statistics) {
    settings.statistics = { ...settings.statistics, ...body.statistics };
  }
  if (body.contact) {
    settings.contact = { ...settings.contact, ...body.contact };
  }
  if (body.socialLinks) {
    settings.socialLinks = { ...settings.socialLinks, ...body.socialLinks };
  }
  if (req.admin) settings.updatedBy = new Types.ObjectId(req.admin.id);

  await settings.save();

  await recordAudit({
    req,
    action: "settings.update",
    entityType: "SiteSettings",
    entityId: settings._id,
    metadata: { sections: Object.keys(body) },
  });

  res.json({ success: true, data: settings });
});

export const updateStatistics = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as Partial<Record<keyof typeof settingsKeys, number>>;
  const settings = await getOrCreateSettings();

  settings.statistics = { ...settings.statistics, ...body };
  if (req.admin) settings.updatedBy = new Types.ObjectId(req.admin.id);
  await settings.save();

  await recordAudit({
    req,
    action: "settings.statistics-update",
    entityType: "SiteSettings",
    entityId: settings._id,
    metadata: { statistics: settings.statistics },
  });

  res.json({ success: true, data: settings.statistics });
});

/** Key surface for the partial-update type above. */
const settingsKeys = {
  projectsExecuted: 0,
  industriesExecuted: 0,
  yearsOfExperience: 0,
  awards: 0,
  countries: 0,
};
