import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "Entrepreneur", required: true, index: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 1000 }
}, { timestamps: true });

reviewSchema.index({ customer: 1, product: 1, service: 1 });

export const Review = mongoose.model("Review", reviewSchema);
