import { z } from "zod";
import { PROJECT_STATUSES } from "../utils/constants";

const galleryItemSchema = z.object({
  url: z.string().min(1, "Image url is required"),
  alt: z.string().max(300).default(""),
  order: z.number().int().min(0).default(0),
});

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).trim(),
  slug: z
    .string()
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may contain lowercase letters, numbers and hyphens")
    .optional(),
  category: z.string().min(1, "Category is required").max(120).trim(),
  location: z.string().max(200).trim().optional(),
  year: z.string().max(20).trim().optional(),
  shortDescription: z.string().max(500).trim().optional(),
  description: z.string().max(20_000).trim().optional(),
  coverImage: z.string().max(2000).optional(),
  coverImageAlt: z.string().max(300).optional(),
  gallery: z.array(galleryItemSchema).max(60).optional(),
  featured: z.boolean().optional(),
  status: z.enum(PROJECT_STATUSES).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const listProjectsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(PROJECT_STATUSES).optional(),
  search: z.string().max(200).optional(),
  featured: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export const publishProjectSchema = z.object({
  published: z.boolean(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>;
