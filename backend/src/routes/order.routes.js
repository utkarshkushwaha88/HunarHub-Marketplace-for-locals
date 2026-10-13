import { Router } from "express";
import { createOrder, verifyPayment, myOrders, getOrder, entrepreneurOrders } from "../controllers/order.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();
router.use(protect);
router.post("/", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/my", myOrders);
router.get("/entrepreneur", authorize("entrepreneur"), entrepreneurOrders);
router.get("/:id", getOrder);
export default router;
