import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "Entrepreneur" },
  subject: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  status: { type: String, enum: ["open", "investigating", "resolved", "rejected"], default: "open", index: true },
  adminResponse: { type: String, trim: true, maxlength: 2000 },
  resolvedAt: Date
}, { timestamps: true });

complaintSchema.index({ customer: 1, createdAt: -1 });
complaintSchema.index({ status: 1, createdAt: -1 });

export const Complaint = mongoose.model("Complaint", complaintSchema);
