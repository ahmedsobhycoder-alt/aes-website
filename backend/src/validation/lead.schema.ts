import { z } from "zod";
import {
  LEAD_DESIGN_PHILOSOPHIES,
  LEAD_PROJECT_SCALES,
  LEAD_PROJECT_TYPES,
  LEAD_PROJECT_ZONES,
  LEAD_STATUSES,
  LEAD_TIMELINES,
} from "../utils/constants";

/**
 * Public submission. Administrative fields (status, internalNotes, assignedTo)
 * are intentionally absent — a visitor must not be able to seed them.
 */
export const createLeadSchema = z.object({
  projectType: z.enum(LEAD_PROJECT_TYPES),
  projectScale: z.enum(LEAD_PROJECT_SCALES),
  designPhilosophy: z.enum(LEAD_DESIGN_PHILOSOPHIES),
  timeline: z.enum(LEAD_TIMELINES),
  name: z.string().min(2, "Name is required").max(160).trim(),
  title: z.string().max(160).trim().optional(),
  projectZone: z.enum(LEAD_PROJECT_ZONES),
  phone: z
    .string()
    .min(6, "A valid phone number is required")
    .max(40)
    .regex(/^[\d\s()+-]+$/, "Phone may contain digits, spaces and + ( ) -")
    .trim(),
});

export const updateLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  internalNotes: z.string().max(20_000).optional(),
  assignedTo: z.string().nullable().optional(),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES),
});

export const listLeadsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(LEAD_STATUSES).optional(),
  projectType: z.enum(LEAD_PROJECT_TYPES).optional(),
  projectZone: z.enum(LEAD_PROJECT_ZONES).optional(),
  search: z.string().max(200).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  includeArchived: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type ListLeadsQuery = z.infer<typeof listLeadsQuerySchema>;
