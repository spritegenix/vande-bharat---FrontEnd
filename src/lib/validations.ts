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



export const aboutItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  rules: z.array(z.string().min(1, "Rule cannot be empty")),
  category: z.string().min(1),
  location: z.string().min(1),
});


export type AboutItem = z.infer<typeof aboutItemSchema>; 

