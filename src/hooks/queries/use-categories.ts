import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import { 
  CategorySchema, 
  PaginatedResponseSchema, 
  type Category,
  PackageCategoryExtendedSchema,
  type PackageCategoryExtended
} from "@/types/api";

const CategoryPaginatedSchema = PaginatedResponseSchema(CategorySchema);
const PackageCategoryExtendedPaginatedSchema = PaginatedResponseSchema(PackageCategoryExtendedSchema);

export function useProductCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories", "products"],
    queryFn: async () => {
      const raw = await apiClient.get<unknown>(
        API_ROUTES.PRODUCT_CATEGORIES + "?page_size=100",
      );
      const parsed = CategoryPaginatedSchema.parse(raw);
      return parsed.results;
    },
    staleTime: 10 * 60 * 1000, // categories rarely change — 10 min TTL
  });
}

export function usePackageCategories() {
  return useQuery<PackageCategoryExtended[]>({
    queryKey: ["categories", "packages"],
    queryFn: async () => {
      const raw = await apiClient.get<unknown>(
        API_ROUTES.PACKAGE_CATEGORIES + "?page_size=100",
      );
      const parsed = PackageCategoryExtendedPaginatedSchema.parse(raw);
      return parsed.results;
    },
    staleTime: 10 * 60 * 1000,
  });
}
