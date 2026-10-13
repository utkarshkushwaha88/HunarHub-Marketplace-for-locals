import { Product } from "../models/Product.js";
import { Entrepreneur } from "../models/Entrepreneur.js";
import { Order } from "../models/Order.js";
import { ApiError } from "../utils/apiError.js";
import { createOrderSchema } from "../validators/order.js";
import { createRazorpayOrder, verifyRazorpaySignature } from "../services/payment.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { safeNotify } from "../utils/notifications.js";

export const createOrder = asyncHandler(async (req, res) => {
  const data = createOrderSchema.parse(req.body);
  const ids = data.items.map(x => x.productId);
  const products = await Product.find({ _id: { $in: ids }, isActive: true });
  if (products.length !== ids.length) throw new ApiError(400, "One or more products are unavailable.");

  const items = data.items.map(input => {
    const p = products.find(x => x._id.toString() === input.productId);
    if (p.stock < input.quantity) throw new ApiError(400, `${p.title} does not have enough stock.`);
    return { product: p._id, entrepreneur: p.entrepreneur, title: p.title, price: p.price, quantity: input.quantity, image: p.images?.[0] };
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 999 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const order = await Order.create({ customer: req.user._id, items, subtotal, deliveryFee, total, shippingAddress: data.shippingAddress });
  const paymentOrder = await createRazorpayOrder(total, order._id.toString());
  order.razorpayOrderId = paymentOrder.id;
  await order.save();

  res.status(201).json({
    success: true,
    data: {
      order,
      payment: { id: paymentOrder.id, amount: paymentOrder.amount, currency: paymentOrder.currency, keyId: process.env.RAZORPAY_KEY_ID }
    }
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const order = await Order.findOne({ _id: orderId, customer: req.user._id });
  if (!order) throw new ApiError(404, "Order not found.");
  if (order.razorpayOrderId !== razorpayOrderId) throw new ApiError(400, "Payment order mismatch.");

  const valid = verifyRazorpaySignature({ orderId: razorpayOrderId, paymentId: razorpayPaymentId, signature: razorpaySignature });
  if (!valid) throw new ApiError(400, "Invalid payment signature.");

  order.paymentStatus = "paid";
  order.razorpayPaymentId = razorpayPaymentId;
  order.status = "confirmed";
  await order.save();

  const entrepreneurIds = [...new Set(order.items.map(item => item.entrepreneur?.toString()).filter(Boolean))];
  const entrepreneurs = await Entrepreneur.find({ _id: { $in: entrepreneurIds } }).select("user");
  await Promise.all(entrepreneurs.map(item => safeNotify(item.user, { type: "order", title: "New paid order", message: `A new order #${order._id.toString().slice(-8).toUpperCase()} has been paid.`, link: "/dashboard" })));

  await Product.bulkWrite(order.items.map(item => ({
    updateOne: { filter: { _id: item.product }, update: { $inc: { stock: -item.quantity } } }
  })));

  res.json({ success: true, message: "Payment verified.", data: order });
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

export const entrepreneurOrders = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
  if (!entrepreneur) throw new ApiError(404, "Entrepreneur profile not found.");
  const orders = await Order.find({ "items.entrepreneur": entrepreneur._id }).populate("customer", "name email phone").sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, customer: req.user._id }).populate("items.product");
  if (!order) throw new ApiError(404, "Order not found.");
  res.json({ success: true, data: order });
});
