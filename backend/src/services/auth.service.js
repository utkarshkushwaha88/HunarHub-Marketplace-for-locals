import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { newTokenId, signAccessToken, signRefreshToken, hashToken } from "../utils/tokens.js";
import { ApiError } from "../utils/apiError.js";

export async function registerUser(data) {
  const exists = await User.findOne({ email: data.email.toLowerCase() });
  if (exists) throw new ApiError(409, "Email is already registered.");

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({
    name: data.name,
    email: data.email,
    passwordHash,
    role: data.role,
    phone: data.phone
  });

  return issueTokens(user);
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash +refreshTokenHash");
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, "Invalid email or password.");
  }
  if (!user.isActive) throw new ApiError(403, "Your account is disabled.");
  return issueTokens(user);
}

export async function issueTokens(user) {
  const tokenId = newTokenId();
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user, tokenId);
  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenIssuedAt = new Date();
  user.lastLoginAt = new Date();
  user.lastActiveAt = new Date();
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken, user: sanitizeUser(user) };
}

export function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatarUrl: user.avatarUrl,
    isVerified: user.isVerified
  };
}
