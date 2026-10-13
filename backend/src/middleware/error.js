import { ApiError } from "../utils/apiError.js";

export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: "Validation failed.", details: err.errors });
  }

  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "A record with this value already exists." });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: status === 500 ? "Internal server error." : err.message,
    ...(err.details ? { details: err.details } : {})
  });
}
