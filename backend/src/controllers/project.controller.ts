import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { Project, type ProjectDocument } from "../models/Project";
import { recordAudit } from "../services/audit.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { slugify } from "../utils/slug";
import type {
  CreateProjectInput,
  ListProjectsQuery,
  UpdateProjectInput,
} from "../validation/project.schema";

/** Ensures slug uniqueness by suffixing -2, -3, … when needed. */
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || "project";
  let candidate = root;
  let n = 2;

  for (;;) {
    const clash = await Project.findOne({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select("_id");
    if (!clash) return candidate;
    candidate = `${root}-${n++}`;
  }
}

/** Strips admin-only bookkeeping from anything returned to the public site. */
function toPublicProject(p: ProjectDocument) {
  return {
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    category: p.category,
    location: p.location ?? "",
    year: p.year ?? "",
    shortDescription: p.shortDescription ?? "",
    description: p.description ?? "",
    coverImage: p.coverImage ?? "",
    coverImageAlt: p.coverImageAlt ?? p.title,
    gallery: [...p.gallery]
      .sort((a, b) => a.order - b.order)
      .map((g) => ({ url: g.url, alt: g.alt })),
    featured: p.featured,
    publishedAt: p.publishedAt ?? null,
  };
}

// ---------------------------------------------------------------- admin

export const listProjects = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, status, search, featured } =
    req.query as unknown as ListProjectsQuery;

  const filter: FilterQuery<ProjectDocument> = {};
  if (status) filter.status = status;
  if (typeof featured === "boolean") filter.featured = featured;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("createdBy updatedBy", "name email"),
    Project.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
  });
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id).populate(
    "createdBy updatedBy",
    "name email",
  );
  if (!project) throw ApiError.notFound("Project not found");
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateProjectInput;
  const slug = await uniqueSlug(body.slug ?? body.title);

  const project = await Project.create({
    ...body,
    slug,
    createdBy: req.admin?.id,
    updatedBy: req.admin?.id,
    publishedAt: body.status === "published" ? new Date() : undefined,
  });

  await recordAudit({
    req,
    action: "project.create",
    entityType: "Project",
    entityId: project._id,
    metadata: { title: project.title, slug: project.slug },
  });

  res.status(201).json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateProjectInput;
  const project = await Project.findById(req.params.id);
  if (!project) throw ApiError.notFound("Project not found");

  if (body.slug && body.slug !== project.slug) {
    project.slug = await uniqueSlug(body.slug, project._id.toString());
  } else if (body.title && !body.slug && !project.slug) {
    project.slug = await uniqueSlug(body.title, project._id.toString());
  }

  const assignable = [
    "title",
    "category",
    "location",
    "year",
    "shortDescription",
    "description",
    "coverImage",
    "coverImageAlt",
    "gallery",
    "featured",
    "status",
  ] as const;

  for (const key of assignable) {
    if (body[key] !== undefined) {
      // Narrow assignment through a typed record view to avoid `any`.
      (project as unknown as Record<string, unknown>)[key] = body[key];
    }
  }

  // First transition into `published` stamps the date; later edits keep it.
  if (body.status === "published" && !project.publishedAt) {
    project.publishedAt = new Date();
  }

  project.updatedBy = req.admin ? (req.admin.id as unknown as typeof project.updatedBy) : undefined;
  await project.save();

  await recordAudit({
    req,
    action: "project.update",
    entityType: "Project",
    entityId: project._id,
    metadata: { title: project.title, fields: Object.keys(body) },
  });

  res.json({ success: true, data: project });
});

export const setPublishState = asyncHandler(async (req: Request, res: Response) => {
  const { published } = req.body as { published: boolean };
  const project = await Project.findById(req.params.id);
  if (!project) throw ApiError.notFound("Project not found");

  project.status = published ? "published" : "draft";
  if (published && !project.publishedAt) project.publishedAt = new Date();
  project.updatedBy = req.admin ? (req.admin.id as unknown as typeof project.updatedBy) : undefined;
  await project.save();

  await recordAudit({
    req,
    action: published ? "project.publish" : "project.unpublish",
    entityType: "Project",
    entityId: project._id,
    metadata: { title: project.title },
  });

  res.json({ success: true, data: project });
});

export const archiveProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw ApiError.notFound("Project not found");

  project.status = "archived";
  project.updatedBy = req.admin ? (req.admin.id as unknown as typeof project.updatedBy) : undefined;
  await project.save();

  await recordAudit({
    req,
    action: "project.archive",
    entityType: "Project",
    entityId: project._id,
    metadata: { title: project.title },
  });

  res.json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw ApiError.notFound("Project not found");

  await recordAudit({
    req,
    action: "project.delete",
    entityType: "Project",
    entityId: project._id,
    metadata: { title: project.title, slug: project.slug },
  });

  res.json({ success: true, message: "Project deleted" });
});

// ---------------------------------------------------------------- public

export const listPublicProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find({ status: "published" }).sort({
    featured: -1,
    publishedAt: -1,
    createdAt: -1,
  });
  res.json({ success: true, data: projects.map(toPublicProject) });
});

export const getPublicProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    status: "published",
  });
  if (!project) throw ApiError.notFound("Project not found");
  res.json({ success: true, data: toPublicProject(project) });
});
