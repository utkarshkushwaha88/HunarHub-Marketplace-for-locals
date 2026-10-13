import { verifyAccessToken } from "../utils/tokens.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required.");
  }

  const token = header.slice(7);
  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, "Invalid or expired access token.");
  }

  const user = await User.findById(payload.sub).select("-passwordHash -refreshTokenHash");
  if (!user || !user.isActive) throw new ApiError(401, "User account is unavailable.");

  req.user = user;
  // Track recent activity for the Active Users KPI without blocking the request.
  User.updateOne({ _id: user._id }, { $set: { lastActiveAt: new Date() } }).catch(() => {});
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action."));
  }
  next();
};
