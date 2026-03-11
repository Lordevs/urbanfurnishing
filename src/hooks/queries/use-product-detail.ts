import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import { ProductDetailSchema, type ProductDetail } from "@/types/api";

export function useProductDetail(slug: string | null | undefined) {
  return useQuery<ProductDetail>({
    queryKey: ["products", "detail", slug],
    queryFn: async () => {
      const raw = await apiClient.get<unknown>(API_ROUTES.PRODUCT_DETAIL(slug!));
      return ProductDetailSchema.parse(raw);
    },
    enabled: Boolean(slug),
  });
}
