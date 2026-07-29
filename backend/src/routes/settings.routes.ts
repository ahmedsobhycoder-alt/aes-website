import { Router } from "express";
import {
  getSettings,
  updateSettings,
  updateStatistics,
} from "../controllers/settings.controller";
import { authenticate } from "../middleware/authenticate";
import { canRead, canWrite } from "../middleware/authorize";
import { validateRequest } from "../middleware/validateRequest";
import {
  updateSettingsSchema,
  updateStatisticsSchema,
} from "../validation/settings.schema";

const router = Router();

router.use(authenticate);

router.get("/", canRead, getSettings);
router.patch("/", canWrite, validateRequest({ body: updateSettingsSchema }), updateSettings);
router.patch(
  "/statistics",
  canWrite,
  validateRequest({ body: updateStatisticsSchema }),
  updateStatistics,
);

export default router;
