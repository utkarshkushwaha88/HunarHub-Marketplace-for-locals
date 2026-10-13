import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "Entrepreneur", required: true, index: true },
  title: { type: String, required: true, trim: true },
  slug: { type: String, trim: true, index: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  images: [{ type: String }],
  isActive: { type: Boolean, default: true, index: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ title: "text", description: "text", category: "text" });

export const Product = mongoose.model("Product", productSchema);
