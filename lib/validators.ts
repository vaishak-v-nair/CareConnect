import { z } from "zod";

export const supportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.number().min(1, "Age must be valid."),
  location: z.string().min(2, "Location is required."),
  contact: z.string().min(5, "Contact number is too short."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  selfUrgency: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

export const volunteerSchema = z.object({
  name: z.string().min(2),
  skills: z.string().min(2),
  availability: z.string().min(2),
  location: z.string().min(2),
  contact: z.string().min(5),
});
