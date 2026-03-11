import { z } from "zod";

/**
 * Contact / Book Consultation form schema.
 * Matches the backend POST /api/v1/contact/ endpoint exactly.
 *
 * Required: first_name, last_name, email, phone_number
 * Optional: all other fields
 */

export const contactSchema = z.object({
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

  // ─── Optional ──────────────────────────────────────────────
  package_interest: z
    .enum(["STUDIO", "APARTMENT", "ROOM", "SINGLE_PRODUCT", "NOT_SURE"])
    .optional(),

  project_timeline: z
    .enum(["ASAP", "1_MONTH", "3_MONTHS", "6_MONTHS", "FLEXIBLE"])
    .optional(),

  property_type: z.string().max(200).optional(),

  project_description: z.string().max(2000).optional(),

  preferred_contact: z.enum(["EMAIL", "PHONE", "WHATSAPP"]).optional(),

  marketing_consent: z.boolean().default(false),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
