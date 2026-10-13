import { Notification } from "../models/Notification.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listNotifications = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
  const items = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(limit);
  const unreadCount = await Notification.countDocuments({ recipient: req.user._id, readAt: null });
  res.json({ success: true, data: { items, unreadCount } });
});

export const markRead = asyncHandler(async (req, res) => {
  const item = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { readAt: new Date() },
    { new: true }
  );
  if (!item) throw new ApiError(404, "Notification not found.");
  res.json({ success: true, data: item });
});

export const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ recipient: req.user._id, readAt: null }, { readAt: new Date() });
  res.json({ success: true, message: "All notifications marked as read." });
});
