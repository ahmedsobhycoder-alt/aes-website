import { Router } from "express";
import {
  changePassword,
  login,
  logout,
  me,
  refresh,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";
import { loginLimiter } from "../middleware/rateLimiter";
import { validateRequest } from "../middleware/validateRequest";
import { changePasswordSchema, loginSchema } from "../validation/auth.schema";

const router = Router();

router.post("/login", loginLimiter, validateRequest({ body: loginSchema }), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", authenticate, me);
router.patch(
  "/change-password",
  authenticate,
  validateRequest({ body: changePasswordSchema }),
  changePassword,
);

export default router;
