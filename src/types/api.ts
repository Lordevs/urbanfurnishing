import { z } from "zod";

const parseJsonArray = (val: unknown) => {
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return val;
};

// ─── Pagination ──────────────────────────────────────────────────────────────

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  category_type: z.enum(["PRODUCT", "PACKAGE"]),
  description: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
});

export type Category = z.infer<typeof CategorySchema>;

// ─── Products ────────────────────────────────────────────────────────────────

export const ProductBadgeSchema = z.object({
  text: z.string(),
  color: z.string().optional(),
});

export const ProductImageSchema = z.object({
  id: z.string().uuid(),
  image: z.string(),
  alt_text: z.string().optional().nullable(),
  is_primary: z.boolean().optional(),
  order: z.number().optional(),
});

export const ProductListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  short_description: z.string().optional().nullable(),
  category: z.string().uuid().or(CategorySchema).optional().nullable(),
  category_name: z.string().optional().nullable(),
  actual_price: z.string(),
  discounted_price: z.string().optional().nullable(),
  effective_price: z.string().optional().nullable(),
  money_saved: z.string().optional().nullable(),
  discount_percentage: z.number().optional().nullable(),
  tag: z.string().optional().nullable(),
  is_featured: z.boolean().optional(),
  is_in_stock: z.boolean().optional(),
  thumbnail: z.string().optional().nullable(),
  badges: z.array(ProductBadgeSchema).optional().default([]),
});

export const ProductDetailSchema = ProductListItemSchema.extend({
  description: z.string().optional().nullable(),
  overview: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  specifications: z
    .preprocess(
      parseJsonArray,
      z.array(z.object({ key: z.string(), value: z.string() })),
    )
    .optional()
    .default([]),
  key_benefits: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  benefits: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  whats_included: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  images: z.array(ProductImageSchema).optional().default([]),
  stock: z.number().int().optional().nullable(),
});

export type ProductListItem = z.infer<typeof ProductListItemSchema>;
export type ProductDetail = z.infer<typeof ProductDetailSchema>;

// ─── Packages ────────────────────────────────────────────────────────────────

export const PackageListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  short_description: z.string().optional().nullable(),
  package_type: z.enum(["STUDIO", "APARTMENT", "ROOM"]).optional().nullable(),
  package_type_display: z.string().optional().nullable(),
  category: z.string().uuid().or(CategorySchema).optional().nullable(),
  category_name: z.string().optional().nullable(),
  actual_price: z.string(),
  discounted_price: z.string().optional().nullable(),
  effective_price: z.string().optional().nullable(),
  money_saved: z.string().optional().nullable(),
  discount_percentage: z.number().optional().nullable(),
  tag: z.string().optional().nullable(),
  is_featured: z.boolean().optional(),
  is_in_stock: z.boolean().optional(),
  thumbnail: z.string().optional().nullable(),
  pieces_count: z.number().int().optional().nullable(),
  badges: z.array(ProductBadgeSchema).optional().default([]),
});

export const PackageDetailSchema = PackageListItemSchema.extend({
  description: z.string().optional().nullable(),
  overview: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  features: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  features_and_benefits: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  key_benefits: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  benefits: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  whats_included: z
    .preprocess(parseJsonArray, z.array(z.string()))
    .optional()
    .default([]),
  specifications: z
    .preprocess(
      parseJsonArray,
      z.array(z.object({ key: z.string(), value: z.string() })),
    )
    .optional()
    .default([]),
  images: z.array(ProductImageSchema).optional().default([]),
});

export type PackageListItem = z.infer<typeof PackageListItemSchema>;
export type PackageDetail = z.infer<typeof PackageDetailSchema>;

// ─── Contact ─────────────────────────────────────────────────────────────────

export const ContactResponseSchema = z.object({
  message: z.string(),
  id: z.string().uuid().optional(),
});

export type ContactResponse = z.infer<typeof ContactResponseSchema>;

// ─── Orders ──────────────────────────────────────────────────────────────────

export const AddressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company: z.string().optional(),
  street_address: z.string(),
  apartment_suite: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
});

export const OrderItemSchema = z.object({
  item_type: z.enum(["PRODUCT", "PACKAGE"]),
  id: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export const OrderPayloadSchema = z.object({
  items: z.array(OrderItemSchema),
  customer_email: z.string().email(),
  customer_phone: z.string(),
  shipping_address: AddressSchema,
  billing_address: AddressSchema,
  promo_code: z.string().optional(),
  payment_method: z.enum(["CARD", "CASH_ON_DELIVERY"]),
  notes: z.string().optional(),
});

export const OrderResponseSchema = z.object({
  order_number: z.string(),
  total_amount: z.string(),
  status: z.string(),
  message: z.string(),
  client_secret: z.string().optional().nullable(),
});

export type OrderPayload = z.infer<typeof OrderPayloadSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;

// ─── Order Tracking ──────────────────────────────────────────────────────────

export const OrderStatusEnum = z.enum([
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
]);

export type OrderStatus = z.infer<typeof OrderStatusEnum>;

export const OrderDetailItemSchema = z.object({
  id: z.string().uuid(),
  item_type: z.enum(["PRODUCT", "PACKAGE"]),
  item_name: z.string(),
  unit_price: z.string(),
  unit_discounted_price: z.string(),
  quantity: z.number().int(),
  line_total: z.string(),
  image: z.string().optional().nullable(),
});

export const OrderDetailSchema = z.object({
  order_number: z.string(),
  status: OrderStatusEnum,
  payment_method: z.enum(["CARD", "CASH_ON_DELIVERY"]).optional().nullable(),
  payment_status: z.string().optional().nullable(),
  total_amount: z.string(),
  created_at: z.string(),
  updated_at: z.string().optional().nullable(),
  // Keeping other fields as optional for potential future re-inclusion
  subtotal: z.string().optional().nullable(),
  discount_amount: z.string().optional().nullable(),
  shipping_amount: z.string().optional().nullable(),
  tax_amount: z.string().optional().nullable(),
  customer_email: z.string().optional().nullable(),
  customer_phone: z.string().optional().nullable(),
  shipping_first_name: z.string().optional().nullable(),
  shipping_last_name: z.string().optional().nullable(),
  shipping_street_address: z.string().optional().nullable(),
  shipping_apartment_suite: z.string().optional().nullable(),
  shipping_city: z.string().optional().nullable(),
  shipping_state: z.string().optional().nullable(),
  shipping_postal_code: z.string().optional().nullable(),
  shipping_country: z.string().optional().nullable(),
  items: z.array(OrderDetailItemSchema).optional().default([]),
  payment: z
    .object({
      method: z.enum(["CARD", "CASH_ON_DELIVERY"]),
      status: z.string(),
      amount: z.string(),
      currency: z.string(),
      paid_at: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  notes: z.string().optional().nullable(),
});

export type OrderDetail = z.infer<typeof OrderDetailSchema>;
export type OrderDetailItem = z.infer<typeof OrderDetailItemSchema>;

// ─── Promo Codes ─────────────────────────────────────────────────────────────

export const PromoValidateResponseSchema = z.object({
  valid: z.boolean(),
  code: z.string(),
  discount_type: z.string().optional().nullable(),
  discount_amount: z.union([z.string(), z.number()]).optional().nullable(),
  message: z.string(),
});

export type PromoValidateResponse = z.infer<typeof PromoValidateResponseSchema>;

// ─── Payment Confirm ─────────────────────────────────────────────────────────

export const PaymentConfirmResponseSchema = z.object({
  message: z.string(),
  status: z.string().optional(),
});

export type PaymentConfirmResponse = z.infer<
  typeof PaymentConfirmResponseSchema
>;

// ─── Query Filters ───────────────────────────────────────────────────────────

export type ProductFilters = {
  category__slug?: string;
  tag?: "BEST_SELLER" | "VALUE_PACK" | "PREMIUM" | "NEW";
  is_featured?: boolean;
  search?: string;
  ordering?: "actual_price" | "-actual_price" | "created_at" | "-created_at";
  page?: number;
  page_size?: number;
};

export type PackageFilters = {
  package_type?: "STUDIO" | "APARTMENT" | "ROOM";
  category__slug?: string;
  tag?: "BEST_SELLER" | "VALUE_PACK" | "PREMIUM" | "NEW";
  is_featured?: boolean;
  search?: string;
  ordering?: "actual_price" | "-actual_price" | "created_at" | "-created_at";
  page?: number;
  page_size?: number;
};
