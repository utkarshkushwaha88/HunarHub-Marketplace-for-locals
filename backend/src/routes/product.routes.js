import { Router } from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { productSchema } from "../validators/product.js";

const router = Router();
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", protect, authorize("entrepreneur"), validate(productSchema), createProduct);
router.patch("/:id", protect, authorize("entrepreneur"), validate(productSchema.partial()), updateProduct);
router.delete("/:id", protect, authorize("entrepreneur"), deleteProduct);
export default router;
