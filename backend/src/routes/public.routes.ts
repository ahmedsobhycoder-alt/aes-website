import { Router } from "express";
import {
  getPublicProject,
  listPublicProjects,
} from "../controllers/project.controller";
import { submitLead } from "../controllers/lead.controller";
import { getPublicSettings } from "../controllers/settings.controller";
import { publicSubmitLimiter } from "../middleware/rateLimiter";
import { validateRequest } from "../middleware/validateRequest";
import { createLeadSchema } from "../validation/lead.schema";

const router = Router();

/**
 * Unauthenticated surface. Every handler here returns a hand-built projection —
 * no Mongoose document is serialised directly, so administrative fields such as
 * internalNotes, status, assignedTo and sourceIp can never leak.
 */
router.get("/projects", listPublicProjects);
router.get("/projects/:slug", getPublicProject);
router.get("/settings", getPublicSettings);

router.post(
  "/leads",
  publicSubmitLimiter,
  validateRequest({ body: createLeadSchema }),
  submitLead,
);

export default router;
