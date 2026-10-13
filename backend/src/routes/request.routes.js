import { Router } from "express";
import { createRequest, myRequests, entrepreneurRequests, updateRequestStatus } from "../controllers/request.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { serviceRequestSchema } from "../validators/request.js";

const router = Router();
router.post("/", protect, authorize("customer"), validate(serviceRequestSchema), createRequest);
router.get("/my", protect, authorize("customer"), myRequests);
router.get("/entrepreneur", protect, authorize("entrepreneur"), entrepreneurRequests);
router.patch("/:id/status", protect, authorize("entrepreneur"), updateRequestStatus);
export default router;
