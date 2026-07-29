import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { generalLimiter } from "./middleware/rateLimiter";
import adminRoutes from "./routes/admin.routes";
import auditRoutes from "./routes/audit.routes";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import projectRoutes from "./routes/project.routes";
import publicRoutes from "./routes/public.routes";
import settingsRoutes from "./routes/settings.routes";
import uploadRoutes from "./routes/upload.routes";
import { UPLOAD_ROOT } from "./services/upload.service";

export function createApp() {
  const app = express();

  // Correct client IPs behind a reverse proxy — rate limiting and audit logs need them.
  app.set("trust proxy", 1);

  app.use(
    helmet({
      // Uploaded images are rendered by the admin on a different origin.
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );

  /**
   * Single configured origin plus credentials, so the browser will send the
   * HttpOnly auth cookies. A wildcard origin is incompatible with credentials.
   */
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    }),
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());
  app.use(generalLimiter);

  app.use("/uploads", express.static(UPLOAD_ROOT, { maxAge: "7d" }));

  app.get("/api/health", (_req, res) => {
    res.json({ success: true, status: "ok", uptime: process.uptime() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/public", publicRoutes);
  app.use("/api/admin/projects", projectRoutes);
  app.use("/api/admin/leads", leadRoutes);
  app.use("/api/admin/settings", settingsRoutes);
  app.use("/api/admin/audit-logs", auditRoutes);
  app.use("/api/admin/uploads", uploadRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
