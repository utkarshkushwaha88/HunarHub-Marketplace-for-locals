import { Review } from "../models/Review.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

async function refreshRating(Model, entrepreneurId) {
  const reviews = await Review.find({ entrepreneur: entrepreneurId });
  const rating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  await Model.findOneAndUpdate({ _id: entrepreneurId }, { rating: Number(rating.toFixed(1)), reviewCount: reviews.length });
}

export const createReview = asyncHandler(async (req, res) => {
  const { entrepreneurId, productId, serviceId, orderId, rating, comment } = req.body;
  if (!entrepreneurId) throw new ApiError(400, "entrepreneurId is required.");
  if (!productId && !serviceId) throw new ApiError(400, "Review must target a product or service.");

  const review = await Review.create({
    customer: req.user._id, entrepreneur: entrepreneurId, product: productId, service: serviceId, order: orderId, rating, comment
  });

  if (productId) {
    const count = await Review.countDocuments({ product: productId });
    const avg = await Review.aggregate([{ $match: { product: review.product } }, { $group: { _id: null, rating: { $avg: "$rating" } } }]);
    await Product.findByIdAndUpdate(productId, { rating: Number((avg[0]?.rating || 0).toFixed(1)), reviewCount: count });
  }
  if (serviceId) {
    const count = await Review.countDocuments({ service: serviceId });
    const avg = await Review.aggregate([{ $match: { service: review.service } }, { $group: { _id: null, rating: { $avg: "$rating" } } }]);
    await Service.findByIdAndUpdate(serviceId, { rating: Number((avg[0]?.rating || 0).toFixed(1)), reviewCount: count });
  }
  await refreshRating(Entrepreneur, entrepreneurId);
  res.status(201).json({ success: true, data: review });
});

export const listReviews = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.productId) filter.product = req.query.productId;
  if (req.query.serviceId) filter.service = req.query.serviceId;
  if (req.query.entrepreneurId) filter.entrepreneur = req.query.entrepreneurId;
  const reviews = await Review.find(filter).populate("customer", "name avatarUrl").sort({ createdAt: -1 });
  res.json({ success: true, data: reviews });
});
