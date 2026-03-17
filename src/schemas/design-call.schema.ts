import { z } from "zod";

/**
 * Design Call form schema.
 * Matches the backend POST /api/v1/design-calls/ endpoint.
 */

export const designCallSchema = z.object({
  // ─── Required ──────────────────────────────────────────────
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name is too long"),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[\d\s\-()]{7,20}$/,
      "Please enter a valid phone number (e.g. +971 50 123 4567)",
    ),

  // ─── Optional / Specific to Design Call ─────────────────────
  home_size: z.string().optional().nullable(),
  
  budget_range: z.string().optional().nullable(),

  rooms_to_furnish: z.array(z.string()).default([]),

  anything_else: z.string().max(2000).optional().nullable(),
});

export type DesignCallFormValues = z.infer<typeof designCallSchema>;
