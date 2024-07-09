import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: "Date is required" }),
    startTime: z.string({ required_error: "startTime is required" }),
    endTime: z.string().optional(),
    user: z.string().optional(),
    carId: z.string(),
    totalCost: z.number().optional().default(0),
  }),
});

export const bookingValidations = {
  bookingValidationSchema,
};
