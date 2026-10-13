import { z } from "zod";

export const serviceRequestSchema = z.object({
  serviceId: z.string().min(1),
  message: z.string().max(1500).optional(),
  requestedDate: z.coerce.date().optional(),
  requestedTime: z.string().optional()
});
