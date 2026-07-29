import { Router } from "express";
import {
  createAdmin,
  getDashboard,
  listAdmins,
  updateAdmin,
  updateAdminStatus,
} from "../controllers/admin.controller";
import { authenticate } from "../middleware/authenticate";
import { canRead, isSuperAdmin } from "../middleware/authorize";
import { validateObjectId, validateRequest } from "../middleware/validateRequest";
import {
  createAdminSchema,
  updateAdminSchema,
  updateAdminStatusSchema,
} from "../validation/admin.schema";

const router = Router();

router.use(authenticate);

// Dashboard aggregates are readable by every signed-in role.
router.get("/dashboard", canRead, getDashboard);

// Administrator management is super-admin only.
router.get("/users", isSuperAdmin, listAdmins);
router.post("/users", isSuperAdmin, validateRequest({ body: createAdminSchema }), createAdmin);
router.patch(
  "/users/:id",
  isSuperAdmin,
  validateObjectId(),
  validateRequest({ body: updateAdminSchema }),
  updateAdmin,
);
router.patch(
  "/users/:id/status",
  isSuperAdmin,
  validateObjectId(),
  validateRequest({ body: updateAdminStatusSchema }),
  updateAdminStatus,
);

export default router;
