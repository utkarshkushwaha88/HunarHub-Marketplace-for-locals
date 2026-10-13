import { Router } from "express";
import { listServices, getService, createService, updateService, deleteService } from "../controllers/service.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { serviceSchema } from "../validators/service.js";

const router = Router();
router.get("/", listServices);
router.get("/:id", getService);
router.post("/", protect, authorize("entrepreneur"), validate(serviceSchema), createService);
router.patch("/:id", protect, authorize("entrepreneur"), validate(serviceSchema.partial()), updateService);
router.delete("/:id", protect, authorize("entrepreneur"), deleteService);
export default router;
