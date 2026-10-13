import mongoose from "mongoose";

const entrepreneurSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
  businessName: { type: String, required: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  category: { type: String, required: true, index: true },
  skills: [{ type: String, trim: true }],
  bio: { type: String, maxlength: 1200 },
  location: {
    city: { type: String, required: true, index: true },
    state: String,
    address: String,
    pincode: String
  },
  phone: String,
  avatarUrl: String,
  coverUrl: String,
  gallery: [String],
  isVerified: { type: Boolean, default: false, index: true },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 }
}, { timestamps: true });

entrepreneurSchema.index({ businessName: "text", ownerName: "text", skills: "text", "location.city": "text" });

export const Entrepreneur = mongoose.model("Entrepreneur", entrepreneurSchema);
