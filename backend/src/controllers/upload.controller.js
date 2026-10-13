import { uploadImage } from "../services/cloudinary.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files?.length) throw new ApiError(400, "No images uploaded.");
  const results = await Promise.all(req.files.map(file => uploadImage(file.buffer)));
  res.status(201).json({ success: true, data: results.map(x => ({ url: x.secure_url, publicId: x.public_id, width: x.width, height: x.height })) });
});
