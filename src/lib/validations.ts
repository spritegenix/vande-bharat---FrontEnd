import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email format").refine((email) => email.includes("@"), {
        message: "Email must contain @ symbol",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
  });   