import { Router } from "express";
import {
  archiveProject,
  createProject,
  deleteProject,
  getProject,
  listProjects,
  setPublishState,
  updateProject,
} from "../controllers/project.controller";
import { authenticate } from "../middleware/authenticate";
import { canRead, canWrite, isSuperAdmin } from "../middleware/authorize";
import { validateObjectId, validateRequest } from "../middleware/validateRequest";
import {
  createProjectSchema,
  listProjectsQuerySchema,
  publishProjectSchema,
  updateProjectSchema,
} from "../validation/project.schema";

const router = Router();

router.use(authenticate);

router.get("/", canRead, validateRequest({ query: listProjectsQuerySchema }), listProjects);
router.get("/:id", canRead, validateObjectId(), getProject);

router.post("/", canWrite, validateRequest({ body: createProjectSchema }), createProject);
router.patch(
  "/:id",
  canWrite,
  validateObjectId(),
  validateRequest({ body: updateProjectSchema }),
  updateProject,
);
router.patch(
  "/:id/publish",
  canWrite,
  validateObjectId(),
  validateRequest({ body: publishProjectSchema }),
  setPublishState,
);
router.patch("/:id/archive", canWrite, validateObjectId(), archiveProject);

// Hard delete is irreversible, so it is restricted beyond ordinary editing.
router.delete("/:id", isSuperAdmin, validateObjectId(), deleteProject);

export default router;
