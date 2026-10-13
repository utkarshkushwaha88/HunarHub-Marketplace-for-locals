import { Entrepreneur } from "../models/Entrepreneur.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listEntrepreneurs = asyncHandler(async (req, res) => {
  const { search, category, city, verified, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (city) filter["location.city"] = new RegExp(city, "i");
  if (verified === "true") filter.isVerified = true;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Entrepreneur.find(filter).sort({ isVerified: -1, rating: -1, createdAt: -1 }).skip(skip).limit(Number(limit)).populate("user", "name email avatarUrl"),
    Entrepreneur.countDocuments(filter)
  ]);

  res.json({ success: true, data: { items, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } } });
});

export const getMyEntrepreneur = asyncHandler(async (req, res) => {
  const item = await Entrepreneur.findOne({ user: req.user._id }).populate("user", "name email phone avatarUrl");
  if (!item) throw new ApiError(404, "Entrepreneur profile not found.");
  res.json({ success: true, data: item });
});

export const getEntrepreneur = asyncHandler(async (req, res) => {
  const item = await Entrepreneur.findById(req.params.id).populate("user", "name email phone avatarUrl");
  if (!item) throw new ApiError(404, "Entrepreneur not found.");
  res.json({ success: true, data: item });
});

export const createProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== "entrepreneur") throw new ApiError(403, "Only entrepreneurs can create this profile.");
  const exists = await Entrepreneur.findOne({ user: req.user._id });
  if (exists) throw new ApiError(409, "Entrepreneur profile already exists.");
  const item = await Entrepreneur.create({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, data: item });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const item = await Entrepreneur.findOne({ user: req.user._id });
  if (!item) throw new ApiError(404, "Entrepreneur profile not found.");
  Object.assign(item, req.body);
  await item.save();
  res.json({ success: true, data: item });
});
