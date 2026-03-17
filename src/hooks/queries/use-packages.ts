import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  PackageListItemSchema,
  PaginatedResponseSchema,
  type PackageListItem,
  type PaginatedResponse,
  PackageFilters,
} from "@/types/api";

function buildUrl(base: string, filters: PackageFilters): string {
  const params = new URLSearchParams();
  if (filters.category__slug)
    params.set("category__slug", filters.category__slug);
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

export function usePackages(filters: PackageFilters = {}) {
  return useQuery<PaginatedResponse<PackageListItem>>({
    queryKey: ["packages", filters],
    queryFn: async () => {
      const url = buildUrl(API_ROUTES.PACKAGES, filters);
      const raw = await apiClient.get<unknown>(url);
      return PaginatedResponseSchema(PackageListItemSchema).parse(raw);
    },
  });
}
