import { ServiceRequest } from "../models/ServiceRequest.js";
import { Service } from "../models/Service.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createRequest = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ _id: req.body.serviceId, isActive: true });
  if (!service) throw new ApiError(404, "Service not found.");
  const entrepreneur = await Entrepreneur.findById(service.entrepreneur);
  if (!entrepreneur) throw new ApiError(404, "Entrepreneur not found.");
  if (!entrepreneur.isAvailable) throw new ApiError(409, "This entrepreneur is currently unavailable for new requests.");

  let bookingStart;
  let bookingEnd;
  if (req.body.requestedDate || req.body.requestedTime) {
    if (!req.body.requestedDate || !req.body.requestedTime) {
      throw new ApiError(400, "Please provide both a preferred date and time for a scheduled booking.");
    }
    const date = new Date(req.body.requestedDate);
    if (Number.isNaN(date.getTime())) throw new ApiError(400, "Invalid requested date.");
    const match = String(req.body.requestedTime).match(/^(\d{2}):(\d{2})$/);
    if (!match) throw new ApiError(400, "Invalid requested time.");
    date.setHours(Number(match[1]), Number(match[2]), 0, 0);
    bookingStart = date;
    bookingEnd = new Date(date.getTime() + (Number(service.durationMinutes) || 60) * 60000);

    const conflict = await ServiceRequest.findOne({
      entrepreneur: entrepreneur._id,
      status: { $in: ["pending", "accepted", "in_progress"] },
      bookingStart: { $lt: bookingEnd },
      bookingEnd: { $gt: bookingStart }
    });
    if (conflict) throw new ApiError(409, "That time is already booked. Please choose another date or time.");
  }

  const request = await ServiceRequest.create({
    customer: req.user._id,
    entrepreneur: service.entrepreneur,
    service: service._id,
    message: req.body.message,
    requestedDate: req.body.requestedDate,
    requestedTime: req.body.requestedTime,
    bookingStart,
    bookingEnd,
    agreedPrice: service.price
  });

  const { safeNotify } = await import("../utils/notifications.js");
  await safeNotify(entrepreneur.user, {
    type: "service_request",
    title: "New service request",
    message: `${req.user.name} requested ${service.title}.`,
    link: "/dashboard"
  });
  res.status(201).json({ success: true, data: await request.populate(["service", "entrepreneur"]) });
});

export const myRequests = asyncHandler(async (req, res) => {
  const requests = await ServiceRequest.find({ customer: req.user._id }).populate("service entrepreneur").sort({ createdAt: -1 });
  res.json({ success: true, data: requests });
});

export const entrepreneurRequests = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
  if (!entrepreneur) throw new ApiError(404, "Entrepreneur profile not found.");
  const requests = await ServiceRequest.find({ entrepreneur: entrepreneur._id }).populate("service customer").sort({ createdAt: -1 });
  res.json({ success: true, data: requests });
});

export const updateRequestStatus = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
  const request = await ServiceRequest.findOne({ _id: req.params.id, entrepreneur: entrepreneur?._id });
  if (!request) throw new ApiError(404, "Service request not found.");
  const allowed = ["accepted", "rejected", "in_progress", "completed", "cancelled"];
  if (!allowed.includes(req.body.status)) throw new ApiError(400, "Invalid status.");
  request.status = req.body.status;
  request.entrepreneurNote = req.body.entrepreneurNote;
  await request.save();
  const { safeNotify } = await import("../utils/notifications.js");
  await safeNotify(request.customer, {
    type: "service_status",
    title: "Service request updated",
    message: `Your request for ${request.status.replaceAll("_", " ")} is now ${request.status.replaceAll("_", " ")}.`,
    link: "/dashboard"
  });
  res.json({ success: true, data: request });
});
