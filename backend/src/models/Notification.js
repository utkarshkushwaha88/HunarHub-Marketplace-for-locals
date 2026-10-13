import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["service_request", "service_status", "order", "order_status", "verification", "complaint", "system"], default: "system", index: true },
  title: { type: String, required: true, trim: true, maxlength: 140 },
  message: { type: String, required: true, trim: true, maxlength: 500 },
  link: { type: String, default: "/dashboard" },
  readAt: { type: Date, default: null, index: true }
}, { timestamps: true });

notificationSchema.index({ recipient: 1, createdAt: -1 });

export const Notification = mongoose.model("Notification", notificationSchema);
