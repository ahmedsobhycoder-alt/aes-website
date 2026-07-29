import { Router, type Request, type Response } from "express";
import { authenticate } from "../middleware/authenticate";
import { canWrite } from "../middleware/authorize";
import { imageUpload, toPublicUrl } from "../services/upload.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(authenticate, canWrite);

router.post(
  "/image",
  imageUpload.single("file"),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) throw ApiError.badRequest("No file received");
    res.status(201).json({ success: true, data: { url: toPublicUrl(req.file.filename) } });
  }),
);

router.post(
  "/images",
  imageUpload.array("files", 12),
  asyncHandler(async (req: Request, res: Response) => {
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    if (files.length === 0) throw ApiError.badRequest("No files received");
    res.status(201).json({
      success: true,
      data: files.map((f) => ({ url: toPublicUrl(f.filename) })),
    });
  }),
);

export default router;
