import { Router } from "express";
import { listAuditLogs } from "../controllers/audit.controller";
import { authenticate } from "../middleware/authenticate";
import { isSuperAdmin } from "../middleware/authorize";
import { validateRequest } from "../middleware/validateRequest";
import { listAuditQuerySchema } from "../validation/admin.schema";

const router = Router();

// The audit trail records who did what; only super-admins may read it.
router.use(authenticate, isSuperAdmin);

router.get("/", validateRequest({ query: listAuditQuerySchema }), listAuditLogs);

export default router;
