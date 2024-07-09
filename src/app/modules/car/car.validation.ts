import z from "zod";

const createCarValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is Required" }),
    description: z.string({ required_error: "Description is Required" }),
    color: z.string({ required_error: "Color is Required" }),
    isElectric: z.boolean(),
    status: z
      .enum(["available", "unavailable"])
      .default("available")
      .optional(),
    features: z.string({ required_error: "Feature is Required" }).array(),
    pricePerHour: z.number({ required_error: "PricePerHour is Required" }),
    isDeleted: z.boolean().optional().default(true),
  }),
});
const updateCarValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z.string().array().optional(),
    pricePerHour: z.number().optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const carValidations = {
  createCarValidation,
  updateCarValidation,
};
