import { Complaint } from "../models/Complaint.js";
import { Order } from "../models/Order.js";
import { ServiceRequest } from "../models/ServiceRequest.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { safeNotify } from "../utils/notifications.js";

export const createComplaint = asyncHandler(async (req, res) => {
  const { orderId, serviceRequestId, subject, description } = req.body;
  let entrepreneur = null;

  if (orderId) {
    const order = await Order.findOne({ _id: orderId, customer: req.user._id });
    if (!order) throw new ApiError(404, "Order not found.");
    entrepreneur = order.items?.[0]?.entrepreneur || null;
  }

  if (serviceRequestId) {
    const request = await ServiceRequest.findOne({ _id: serviceRequestId, customer: req.user._id });
    if (!request) throw new ApiError(404, "Service request not found.");
    entrepreneur = request.entrepreneur;
  }

  const complaint = await Complaint.create({
    customer: req.user._id,
    order: orderId || undefined,
    serviceRequest: serviceRequestId || undefined,
    entrepreneur: entrepreneur || undefined,
    subject,
    description
  });

  res.status(201).json({ success: true, data: await complaint.populate(["order", "serviceRequest", "entrepreneur"]) });
});

export const myComplaints = asyncHandler(async (req, res) => {
  const items = await Complaint.find({ customer: req.user._id })
    .populate("order", "total status createdAt")
    .populate("serviceRequest", "status requestedDate requestedTime")
    .populate("entrepreneur", "businessName")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: items });
});

export const adminComplaints = asyncHandler(async (_req, res) => {
  const items = await Complaint.find()
    .populate("customer", "name email phone")
    .populate("entrepreneur", "businessName ownerName")
    .populate("order", "total status createdAt")
    .populate("serviceRequest", "status requestedDate requestedTime")
    .sort({ createdAt: -1 })
    .limit(200);
  res.json({ success: true, data: items });
});

export const updateComplaint = asyncHandler(async (req, res) => {
  const allowed = ["open", "investigating", "resolved", "rejected"];
  if (!allowed.includes(req.body.status)) throw new ApiError(400, "Invalid complaint status.");
  const item = await Complaint.findById(req.params.id);
  if (!item) throw new ApiError(404, "Complaint not found.");
  item.status = req.body.status;
  item.adminResponse = String(req.body.adminResponse || "").trim();
  if (item.status === "resolved" || item.status === "rejected") item.resolvedAt = new Date();
  else item.resolvedAt = undefined;
  await item.save();
  await safeNotify(item.customer, { type: "complaint", title: "Complaint updated", message: `Your complaint is now ${item.status}.`, link: "/dashboard" });
  res.json({ success: true, data: await item.populate(["customer", "entrepreneur", "order", "serviceRequest"]) });
});
