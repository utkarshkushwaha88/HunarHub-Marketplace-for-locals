import { Service } from "../models/Service.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listServices = asyncHandler(async (req, res) => {
  const { search, category, entrepreneur, city, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (entrepreneur) filter.entrepreneur = entrepreneur;
  if (search) filter.$text = { $search: search };
  if (minPrice || maxPrice) filter.price = { ...(minPrice ? { $gte: Number(minPrice) } : {}), ...(maxPrice ? { $lte: Number(maxPrice) } : {}) };
  if (city) {
    const matchingEntrepreneurs = await Entrepreneur.find({ "location.city": new RegExp(city, "i") }).distinct("_id");
    filter.entrepreneur = { $in: matchingEntrepreneurs };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Service.find(filter).populate("entrepreneur", "businessName ownerName location rating isVerified isAvailable").sort({ rating: -1, createdAt: -1 }).skip(skip).limit(Number(limit)),
    Service.countDocuments(filter)
  ]);
  res.json({ success: true, data: { items, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } } });
});

export const getService = asyncHandler(async (req, res) => {
  const item = await Service.findOne({ _id: req.params.id, isActive: true }).populate("entrepreneur");
  if (!item) throw new ApiError(404, "Service not found.");
  res.json({ success: true, data: item });
});

export const createService = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
  if (!entrepreneur) throw new ApiError(404, "Create your entrepreneur profile first.");
  const item = await Service.create({ ...req.body, entrepreneur: entrepreneur._id });
  res.status(201).json({ success: true, data: item });
});

export const updateService = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
  const item = await Service.findOne({ _id: req.params.id, entrepreneur: entrepreneur?._id });
  if (!item) throw new ApiError(404, "Service not found.");
  Object.assign(item, req.body);
  await item.save();
  res.json({ success: true, data: item });
});

export const deleteService = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
  const item = await Service.findOne({ _id: req.params.id, entrepreneur: entrepreneur?._id });
  if (!item) throw new ApiError(404, "Service not found.");
  item.isActive = false;
  await item.save();
  res.json({ success: true, message: "Service removed." });
});
