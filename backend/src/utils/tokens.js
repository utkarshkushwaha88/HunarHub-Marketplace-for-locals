import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, type: "access" },
    env.jwtAccessSecret,
    { expiresIn: env.accessExpiresIn }
  );
}

export function signRefreshToken(user, tokenId) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, type: "refresh", jti: tokenId },
    env.jwtRefreshSecret,
    { expiresIn: env.refreshExpiresIn }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtAccessSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwtRefreshSecret);
}

export function newTokenId() {
  return crypto.randomUUID();
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
