const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export { API_BASE };

export const API_ROUTES = {
  // ─── Contact ────────────────────────────────────────────────
  CONTACT: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/contact/`,

  // ─── Categories ─────────────────────────────────────────────
  CATEGORIES: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/categories/`,
  PRODUCT_CATEGORIES: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/product-categories/`,
  PACKAGE_CATEGORIES: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/package-categories/`,
  CATEGORY_DETAIL: (slug: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/categories/${slug}/`,

  // ─── Products ───────────────────────────────────────────────
  PRODUCTS: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/products/`,
  PRODUCT_DETAIL: (slug: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/products/${slug}/`,

  // ─── Packages ───────────────────────────────────────────────
  PACKAGES: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/packages/`,
  PACKAGE_DETAIL: (slug: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/packages/${slug}/`,

  // ─── Orders ─────────────────────────────────────────────────
  ORDERS: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/orders/`,
  ORDER_DETAIL: (orderNumber: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/orders/${orderNumber}/`,

  // ─── Promo Codes ────────────────────────────────────────────
  PROMO_VALIDATE: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/promo-codes/validate/`,

  // ─── Payments ───────────────────────────────────────────────
  PAYMENT_CONFIRM: (orderNumber: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/payments/${orderNumber}/confirm/`,

  // ─── Newsletter ─────────────────────────────────────────────
  NEWSLETTER_SUBSCRIBE: `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/v1/newsletter/subscribe/`,
} as const;
