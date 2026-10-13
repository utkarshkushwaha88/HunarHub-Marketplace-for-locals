import { z } from "zod";

export const complaintSchema = z.object({
  orderId: z.string().optional(),
  serviceRequestId: z.string().optional(),
  subject: z.string().trim().min(3).max(160),
  description: z.string().trim().min(10).max(2000)
}).refine(data => data.orderId || data.serviceRequestId, {
  message: "A complaint must be linked to an order or service request.",
  path: ["orderId"]
});
