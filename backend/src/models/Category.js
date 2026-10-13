import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: String,
  icon: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
