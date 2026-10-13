import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  phone: { type: String, trim: true },
  role: { type: String, enum: ["customer", "entrepreneur", "admin"], default: "customer", index: true },
  avatarUrl: String,
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  refreshTokenHash: { type: String, select: false },
  refreshTokenIssuedAt: Date,
  lastLoginAt: Date,
  lastActiveAt: Date
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
