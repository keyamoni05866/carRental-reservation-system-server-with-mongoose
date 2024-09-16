import { z } from "zod";

const userValidations = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is Required" }),
    email: z.string().email("Invalid email address"),
    role: z.enum(["user", "admin"]),
    password: z.string({ required_error: "Password is required" }),

    termsConditionAccepted: z.boolean({
      required_error: "Terms Accepted Required",
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export default userValidations;
