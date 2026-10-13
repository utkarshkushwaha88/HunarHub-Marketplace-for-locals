import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

export function getRazorpay() {
  if (!env.razorpayKeyId || !env.razorpayKeySecret) {
    throw new ApiError(503, "Razorpay is not configured.");
  }
  return new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret });
}

export async function createRazorpayOrder(amount, receipt) {
  const razorpay = getRazorpay();
  return razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt
  });
}

export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", env.razorpayKeySecret).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
