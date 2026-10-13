import { User } from "../models/User.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { Order } from "../models/Order.js";
import { ServiceRequest } from "../models/ServiceRequest.js";
import { Product } from "../models/Product.js";
import { Service } from "../models/Service.js";
import { Category } from "../models/Category.js";
import { Review } from "../models/Review.js";
import { Complaint } from "../models/Complaint.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { safeNotify } from "../utils/notifications.js";

export const dashboard = asyncHandler(async (_req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [users, entrepreneurs, products, services, orders, requests] = await Promise.all([
    User.countDocuments(),
    Entrepreneur.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Service.countDocuments({ isActive: true }),
    Order.countDocuments(),
    ServiceRequest.countDocuments()
  ]);

  const [revenue, activeUsers, salesUnits, averageReview] = await Promise.all([
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]),
    User.countDocuments({ lastActiveAt: { $gte: thirtyDaysAgo } }),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $unwind: "$items" },
      { $group: { _id: null, units: { $sum: "$items.quantity" }, productRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } }
    ]),
    Review.aggregate([
      { $group: { _id: null, average: { $avg: "$rating" }, count: { $sum: 1 } } }
    ])
  ]);

  const [pendingEntrepreneurs, pendingRequests, pendingOrders, complaints, reviews, completedRequests, allRequests, monthlyOrders, topCategories] = await Promise.all([
    Entrepreneur.countDocuments({ isVerified: false }),
    ServiceRequest.countDocuments({ status: "pending" }),
    Order.countDocuments({ status: "pending" }),
    Complaint.countDocuments({ status: { $in: ["open", "investigating"] } }),
    Review.countDocuments(),
    ServiceRequest.countDocuments({ status: "completed" }),
    ServiceRequest.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, sales: { $sum: "$total" }, orders: { $sum: 1 } } },
      { $sort: { _id: -1 } }, { $limit: 6 }, { $sort: { _id: 1 } }
    ]),
    Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", products: { $sum: 1 } } },
      { $sort: { products: -1 } }, { $limit: 8 }
    ])
  ]);

  const serviceRequestConversion = allRequests ? Number(((completedRequests / allRequests) * 100).toFixed(1)) : 0;
  res.json({ success: true, data: {
    users, activeUsers, entrepreneurs, products, services, orders, serviceRequests: requests,
    revenue: revenue[0]?.total || 0,
    productSalesVolume: salesUnits[0]?.units || 0,
    productSalesRevenue: salesUnits[0]?.productRevenue || 0,
    averageEntrepreneurEarnings: entrepreneurs ? Number(((salesUnits[0]?.productRevenue || 0) / entrepreneurs).toFixed(2)) : 0,
    averageCustomerRating: Number((averageReview[0]?.average || 0).toFixed(1)),
    pendingEntrepreneurs, pendingRequests, pendingOrders, complaints, reviews,
    serviceRequestConversion, monthlyOrders, topCategories
  } });
});
export const listEntrepreneurs = asyncHandler(async (_req, res) => {
  const items = await Entrepreneur.find().populate("user", "name email phone").sort({ isVerified: 1, createdAt: -1 }).limit(100);
  res.json({ success: true, data: items });
});

export const listOrders = asyncHandler(async (_req, res) => {
  const items = await Order.find().populate("customer", "name email").sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, data: items });
});

export const listRequests = asyncHandler(async (_req, res) => {
  const items = await ServiceRequest.find().populate("customer entrepreneur service").sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, data: items });
});

export const verifyEntrepreneur = asyncHandler(async (req, res) => {
  const item = await Entrepreneur.findById(req.params.id);
  if (!item) throw new ApiError(404, "Entrepreneur not found.");
  item.isVerified = Boolean(req.body.isVerified);
  await item.save();
  await User.findByIdAndUpdate(item.user, { isVerified: item.isVerified });
  await safeNotify(item.user, { type: "verification", title: item.isVerified ? "Entrepreneur profile verified" : "Verification status changed", message: item.isVerified ? "Your HunarHub entrepreneur profile is now verified." : "Your entrepreneur verification status was changed by an admin.", link: "/dashboard" });
  res.json({ success: true, data: item });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const allowed = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(req.body.status)) throw new ApiError(400, "Invalid order status.");
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) throw new ApiError(404, "Order not found.");
  await safeNotify(order.customer, { type: "order_status", title: "Order status updated", message: `Your order is now ${order.status}.`, link: "/dashboard" });
  res.json({ success: true, data: order });
});

export const updateRequestStatus = asyncHandler(async (req, res) => {
  const allowed = ["pending", "accepted", "rejected", "in_progress", "completed", "cancelled"];
  if (!allowed.includes(req.body.status)) throw new ApiError(400, "Invalid request status.");
  const item = await ServiceRequest.findByIdAndUpdate(req.params.id, { status: req.body.status, entrepreneurNote: req.body.entrepreneurNote }, { new: true });
  if (!item) throw new ApiError(404, "Service request not found.");
  await safeNotify(item.customer, { type: "service_status", title: "Service request updated", message: `Your service request is now ${item.status.replaceAll("_", " ")}.`, link: "/dashboard" });
  res.json({ success: true, data: item });
});

export const listCategories = asyncHandler(async (_req, res) => {
  const items = await Category.find().sort({ name: 1 });
  res.json({ success: true, data: items });
});

export const createCategory = asyncHandler(async (req, res) => {
  const name = String(req.body.name || "").trim();
  if (!name) throw new ApiError(400, "Category name is required.");
  const slug = String(req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  const item = await Category.create({ name, slug, description: req.body.description || "", icon: req.body.icon || "", isActive: req.body.isActive !== false });
  res.status(201).json({ success: true, data: item });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const item = await Category.findById(req.params.id);
  if (!item) throw new ApiError(404, "Category not found.");
  if (req.body.name !== undefined) item.name = String(req.body.name).trim();
  if (req.body.slug !== undefined) item.slug = String(req.body.slug).trim();
  if (req.body.description !== undefined) item.description = req.body.description;
  if (req.body.icon !== undefined) item.icon = req.body.icon;
  if (req.body.isActive !== undefined) item.isActive = Boolean(req.body.isActive);
  await item.save();
  res.json({ success: true, data: item });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const item = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!item) throw new ApiError(404, "Category not found.");
  res.json({ success: true, data: item });
});
