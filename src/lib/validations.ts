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



  // lib/validators/aboutSchema.ts

export const aboutSchema = z.object({
  vision: z.string().min(10, 'Vision must be at least 10 characters'),
  mission: z.string().min(10, 'Mission must be at least 10 characters'),
  objectives: z.string().min(10, 'Objectives must be at least 10 characters'),
});

export type AboutSchema = z.infer<typeof aboutSchema>;
