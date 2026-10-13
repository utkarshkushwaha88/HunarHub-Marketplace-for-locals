import { User } from "../models/User.js";
import { loginUser, registerUser, issueTokens, sanitizeUser } from "../services/auth.service.js";
import { verifyRefreshToken, hashToken } from "../utils/tokens.js";
import { refreshCookieOptions, clearRefreshCookie } from "../utils/cookies.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);
  res.status(201).json({ success: true, data: { accessToken: result.accessToken, user: result.user } });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body.email, req.body.password);
  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);
  res.json({ success: true, data: { accessToken: result.accessToken, user: result.user } });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new ApiError(401, "Refresh token missing.");

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    clearRefreshCookie(res);
    throw new ApiError(401, "Invalid or expired refresh token.");
  }

  const user = await User.findById(payload.sub).select("+refreshTokenHash");
  if (!user || !user.isActive || user.refreshTokenHash !== hashToken(token)) {
    clearRefreshCookie(res);
    throw new ApiError(401, "Refresh token has been revoked.");
  }

  const result = await issueTokens(user);
  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);
  res.json({ success: true, data: { accessToken: result.accessToken, user: result.user } });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await User.findByIdAndUpdate(payload.sub, { $unset: { refreshTokenHash: 1, refreshTokenIssuedAt: 1 } });
    } catch {}
  }
  clearRefreshCookie(res);
  res.json({ success: true, message: "Logged out successfully." });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: sanitizeUser(req.user) });
});
