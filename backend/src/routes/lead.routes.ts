import { Router } from "express";
import {
  archiveLead,
  getLead,
  listLeads,
  updateLead,
  updateLeadStatus,
} from "../controllers/lead.controller";
import { authenticate } from "../middleware/authenticate";
import { canRead, canWrite } from "../middleware/authorize";
import { validateObjectId, validateRequest } from "../middleware/validateRequest";
import {
  listLeadsQuerySchema,
  updateLeadSchema,
  updateLeadStatusSchema,
} from "../validation/lead.schema";

const router = Router();

router.use(authenticate);

router.get("/", canRead, validateRequest({ query: listLeadsQuerySchema }), listLeads);
router.get("/:id", canRead, validateObjectId(), getLead);

router.patch(
  "/:id",
  canWrite,
  validateObjectId(),
  validateRequest({ body: updateLeadSchema }),
  updateLead,
);
router.patch(
  "/:id/status",
  canWrite,
  validateObjectId(),
  validateRequest({ body: updateLeadStatusSchema }),
  updateLeadStatus,
);
router.patch("/:id/archive", canWrite, validateObjectId(), archiveLead);

export default router;
