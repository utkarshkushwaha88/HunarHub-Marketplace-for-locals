import { Notification } from "../models/Notification.js";

export async function safeNotify(recipient, payload) {
  try {
    if (!recipient) return null;
    return await Notification.create({ recipient, ...payload });
  } catch (error) {
    console.error("Notification creation failed:", error.message);
    return null;
  }
}
