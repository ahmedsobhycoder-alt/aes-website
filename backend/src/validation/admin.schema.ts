import { z } from "zod";
import { ADMIN_ROLES } from "../utils/constants";

export const createAdminSchema = z.object({
  name: z.string().min(2, "Name is required").max(120).trim(),
  email: z.string().email("A valid email is required").toLowerCase().trim(),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(128)
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/\d/, "Must contain a number"),
  role: z.enum(ADMIN_ROLES),
});

export const updateAdminSchema = z.object({
  name: z.string().min(2).max(120).trim().optional(),
  role: z.enum(ADMIN_ROLES).optional(),
});

export const updateAdminStatusSchema = z.object({
  isActive: z.boolean(),
});

export const listAuditQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(30),
  action: z.string().max(60).optional(),
  adminId: z.string().max(40).optional(),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;
