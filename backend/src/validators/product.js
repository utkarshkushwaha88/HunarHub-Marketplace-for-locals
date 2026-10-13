import { z } from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().min(3).max(4000),
  category: z.string().trim().min(2),
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0).default(0),
  images: z.array(z.string().url()).max(8).optional()
});
