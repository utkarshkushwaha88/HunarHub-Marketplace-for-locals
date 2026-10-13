import { Router } from "express";
import { listEntrepreneurs, getEntrepreneur, getMyEntrepreneur, createProfile, updateProfile } from "../controllers/entrepreneur.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();
router.get("/", listEntrepreneurs);
router.get("/me", protect, authorize("entrepreneur"), getMyEntrepreneur);
router.get("/:id", getEntrepreneur);
router.post("/", protect, authorize("entrepreneur"), createProfile);
router.patch("/me", protect, authorize("entrepreneur"), updateProfile);
export default router;
