import { Router } from "express";
import { uploadImages } from "../controllers/upload.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
router.post("/images", protect, authorize("entrepreneur", "admin"), upload.array("images", 6), uploadImages);
export default router;
