import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().min(3).max(4000),
  category: z.string().trim().min(2),
  price: z.coerce.number().min(0),
  durationMinutes: z.coerce.number().int().min(15).optional(),
  images: z.array(z.string().url()).max(8).optional()
});
