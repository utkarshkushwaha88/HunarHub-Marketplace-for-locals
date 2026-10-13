import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "Entrepreneur", required: true, index: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  message: { type: String, maxlength: 1500 },
  requestedDate: Date,
  requestedTime: String,
  bookingStart: Date,
  bookingEnd: Date,
  agreedPrice: { type: Number, min: 0 },
  status: { type: String, enum: ["pending", "accepted", "rejected", "in_progress", "completed", "cancelled"], default: "pending", index: true },
  entrepreneurNote: String
}, { timestamps: true });

export const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
