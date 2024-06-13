import { z } from "zod";

const userValidations = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is Required" }),
    email: z.string().email("Invalid email address"),
    role: z.enum(["user", "admin"]),
    password: z.string({ required_error: "Password is required" }),
    phone: z.string(),
    address: z.string(),
  }),
});

export default userValidations;
