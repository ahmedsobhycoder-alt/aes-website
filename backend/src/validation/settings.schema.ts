import { z } from "zod";

export const statisticsSchema = z.object({
  projectsExecuted: z.number().int().min(0).max(100_000),
  industriesExecuted: z.number().int().min(0).max(10_000),
  yearsOfExperience: z.number().int().min(0).max(200),
  awards: z.number().int().min(0).max(10_000),
  countries: z.number().int().min(0).max(500),
});

export const updateSettingsSchema = z.object({
  statistics: statisticsSchema.partial().optional(),
  contact: z
    .object({
      email: z.string().email().or(z.literal("")).optional(),
      phone: z.string().max(60).optional(),
      whatsapp: z.string().max(60).optional(),
    })
    .optional(),
  socialLinks: z
    .object({
      instagram: z.string().url().or(z.literal("")).optional(),
      linkedin: z.string().url().or(z.literal("")).optional(),
      facebook: z.string().url().or(z.literal("")).optional(),
    })
    .optional(),
});

export const updateStatisticsSchema = statisticsSchema.partial();

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
