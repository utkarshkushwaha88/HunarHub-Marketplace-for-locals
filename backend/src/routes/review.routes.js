import { Router } from "express";
import { createReview, listReviews } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.get("/", listReviews);
router.post("/", protect, createReview);
export default router;
