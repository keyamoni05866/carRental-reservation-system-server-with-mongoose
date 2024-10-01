import z from "zod";

const createCarValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is Required" }),
    description: z.string({ required_error: "Description is Required" }),
    image: z.string({ required_error: "image is Required" }),
    color: z.string({ required_error: "Color is Required" }),
    model: z.string({ required_error: "Model is Required" }),
    year: z.string({ required_error: "Year is Required" }),
    isElectric: z.enum(["Yes", "No"]),
    status: z
      .enum(["available", "unavailable"])
      .default("available")
      .optional(),
    features: z.string({ required_error: "Feature is Required" }).array(),
    AdditionalFeatures: z
      .string({ required_error: "Additional Feature is Required" })
      .array(),
    carType: z.enum(["SUV", "Sedan", "Hatchback", "Convertible", "Coupe"]),
    pricePerHour: z.number({ required_error: "PricePerHour is Required" }),
    isFeatured: z.boolean().default(false),
  }),
});
const updateCarValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    color: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    isElectric: z.enum(["Yes", "No"]).optional(),
    status: z
      .enum(["available", "unavailable"])
      .default("available")
      .optional(),
    features: z.string().array().optional(),
    AdditionalFeatures: z.string().array().optional(),
    carType: z
      .enum(["SUV", "Sedan", "Hatchback", "Convertible", "Coupe"])
      .optional(),
    pricePerHour: z.number().optional(),
    isFeatured: z.boolean().default(false).optional(),
  }),
});

export const carValidations = {
  createCarValidation,
  updateCarValidation,
};
