import { z } from "zod";

const timeSchema = z.string().refine(
  (time) => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
    return regex.test(time);
  },
  { message: "Invalid time format expected HH.MM  in 24 hour format" }
);

export const BookingFormSchema = z.object({
  nidOrPassport: z.string(),
  drivingLicense: z.string(),
  cardNumber: z.string(),
  cardExpirationdate: z.string(),
  cvv: z.string(),
  startTime: timeSchema,
});

const bookingValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    carId: z.string(),
    endTime: timeSchema.optional(),
    totalCost: z.number().optional(),
    isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
    isReturned: z.boolean().default(false).optional(),
    payment: BookingFormSchema,
  }),
});

export const bookingValidations = {
  bookingValidationSchema,
};
