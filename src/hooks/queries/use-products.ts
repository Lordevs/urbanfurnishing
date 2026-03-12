import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  ProductListItemSchema,
  PaginatedResponseSchema,
  type ProductListItem,
  type PaginatedResponse,
  type ProductFilters,
} from "@/types/api";

function buildUrl(base: string, filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.category__slug) params.set("category__slug", filters.category__slug);
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.is_featured !== undefined)
    params.set("is_featured", String(filters.is_featured));
  if (filters.search) params.set("search", filters.search);
  if (filters.ordering) params.set("ordering", filters.ordering);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.page_size) params.set("page_size", String(filters.page_size));
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery<PaginatedResponse<ProductListItem>>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const url = buildUrl(API_ROUTES.PRODUCTS, filters);
      const raw = await apiClient.get<unknown>(url);
      try {
        return PaginatedResponseSchema(ProductListItemSchema).parse(raw);
      } catch (e) {
        console.error("Zod parse error in useProducts:", e);
        throw e;
      }
    },
  });
}
