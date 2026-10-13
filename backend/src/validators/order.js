import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.coerce.number().int().min(1).max(50)
  })).min(1),
  shippingAddress: z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    addressLine1: z.string().min(3),
    addressLine2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4)
  })
});
