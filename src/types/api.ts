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

export const CategoryPackageItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  thumbnail: z.string().url().optional().nullable(),
});

export type CategoryPackageItem = z.infer<typeof CategoryPackageItemSchema>;

export const PackageCategoryExtendedSchema = CategorySchema.extend({
  packages: z.array(CategoryPackageItemSchema).optional().default([]),
});

export type PackageCategoryExtended = z.infer<typeof PackageCategoryExtendedSchema>;

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
    .preprocess(
      parseJsonArray,
      z.array(z.object({ id: z.number().optional(), key: z.string(), value: z.string() })),
    )
    .optional()
    .default([]),
  images: z.array(ProductImageSchema).optional().default([]),
  stock: z.number().int().optional().nullable(),
});

export type ProductListItem = z.infer<typeof ProductListItemSchema>;
export type ProductDetail = z.infer<typeof ProductDetailSchema>;

// ─── Packages ────────────────────────────────────────────────────────────────

export const PackagePropertiesInfoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
});

export const PackageImageSchema = z.object({
  id: z.string().uuid(),
  image: z.string(),
  alt_text: z.string().optional().nullable(),
  order: z.number(),
});

export type PackageImage = z.infer<typeof PackageImageSchema>;

export const PackageListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  tag: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  short_description: z.string().optional().nullable(),
  is_featured: z.boolean().optional(),
  starting_price: z.number().nullable(),
  actual_price: z.string().optional().nullable(),
  discounted_price: z.string().optional().nullable(),
  effective_price: z.string().optional().nullable(),
  money_saved: z.string().optional().nullable(),
  discount_percentage: z.number().optional().nullable(),
  category_name: z.string().optional().nullable(),
  package_type: z.string().optional().nullable(),
  package_type_display: z.string().optional().nullable(),
  is_in_stock: z.boolean().optional(),
  property_count: z.number().optional(),
  properties_info: z.array(PackagePropertiesInfoSchema).optional().default([]),
  thumbnail: z.string().optional().nullable(),
  images: z.array(PackageImageSchema).optional().default([]),
});

export const PackageItemSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  product_name: z.string(),
  product_slug: z.string(),
  product_thumbnail: z.string().nullable(),
  quantity: z.number(),
  display_order: z.number(),
});

export const PackagePropertySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.string(),
  features: z.preprocess(parseJsonArray, z.array(z.string())),
  additional_info: z.preprocess(
    parseJsonArray,
    z.array(z.object({ key: z.string(), value: z.string() })),
  ),
  display_order: z.number(),
  items: z.array(PackageItemSchema).optional().default([]),
});

export type PackageProperty = z.infer<typeof PackagePropertySchema>;
export type PackageItem = z.infer<typeof PackageItemSchema>;

export const PackageAddOnSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  price: z.string(),
  display_order: z.number(),
});

export type PackageAddOn = z.infer<typeof PackageAddOnSchema>;

export const PackageDetailSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  tag: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  is_featured: z.boolean().optional(),
  starting_price: z.number().nullable(),
  images: z.array(PackageImageSchema).optional().default([]),
  properties: z.array(PackagePropertySchema).optional().default([]),
  add_ons: z.array(PackageAddOnSchema).optional().default([]),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
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
  property_id: z.string().uuid().optional(),
  addon_ids: z.array(z.string().uuid()).optional(),
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
  category__slug?: string;
  tag?: string;
  is_featured?: boolean;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
};

// ─── Newsletter ──────────────────────────────────────────────────────────────

export const NewsletterPayloadSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const NewsletterResponseSchema = z.object({
  message: z.string(),
});

export type NewsletterPayload = z.infer<typeof NewsletterPayloadSchema>;
export type NewsletterResponse = z.infer<typeof NewsletterResponseSchema>;
// ─── Portfolio/Projects ──────────────────────────────────────────────────────
export const PortfolioProjectListItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  thumbnail: z.string().url(),
});

export type PortfolioProjectListItem = z.infer<typeof PortfolioProjectListItemSchema>;

export const PortfolioProjectImageSchema = z.object({
  id: z.string().uuid(),
  image: z.string().url(),
  alt_text: z.string().optional().nullable(),
  order: z.number().int(),
});

export const PortfolioProjectDetailSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  images: z.array(PortfolioProjectImageSchema),
});

export type PortfolioProjectDetail = z.infer<typeof PortfolioProjectDetailSchema>;
