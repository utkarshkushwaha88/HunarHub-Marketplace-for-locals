import { Router } from "express";
import { createComplaint, myComplaints } from "../controllers/complaint.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { complaintSchema } from "../validators/complaint.js";

const router = Router();
router.use(protect, authorize("customer"));
router.post("/", validate(complaintSchema), createComplaint);
router.get("/my", myComplaints);
export default router;
