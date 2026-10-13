import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "Entrepreneur", required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  durationMinutes: { type: Number, min: 15 },
  images: [String],
  isActive: { type: Boolean, default: true, index: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

serviceSchema.index({ title: "text", description: "text", category: "text" });

export const Service = mongoose.model("Service", serviceSchema);
