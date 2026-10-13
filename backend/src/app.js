import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import entrepreneurRoutes from "./routes/entrepreneur.routes.js";
import productRoutes from "./routes/product.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import orderRoutes from "./routes/order.routes.js";
import requestRoutes from "./routes/request.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());

// Allow the deployed Vercel frontend and any additional origins configured in
// CLIENT_URL (comma-separated). Keep localhost available for development.
const allowedOrigins = [
  "http://localhost:5173",
  "https://hunarhub-marketplace-for-locals-fro.vercel.app",
  ...env.clientUrl.split(",").map((origin) => origin.trim()).filter(Boolean),
];

app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header are typically server-to-server/CLI calls.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

// Keep normal browsing/dashboard requests from exhausting the API quota.
// Development needs a higher limit because React StrictMode and hot reload can
// repeat requests. Production remains protected against excessive traffic.
const apiRequestLimit = env.nodeEnv === "production" ? 1000 : 5000;
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: apiRequestLimit,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please wait a few minutes and try again."
  }
}));

app.get("/", (_req, res) => res.json({
  success: true,
  message: "HunarHub API is running.",
  health: "/api/health",
}));

app.get("/favicon.ico", (_req, res) => res.status(204).end());

app.get("/api/health", (_req, res) => res.json({
  success: true,
  message: "HunarHub API is healthy.",
  timestamp: new Date().toISOString(),
}));

app.use("/api/auth", authRoutes);
app.use("/api/entrepreneurs", entrepreneurRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/service-requests", requestRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
