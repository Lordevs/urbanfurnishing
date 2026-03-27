import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  PortfolioProjectDetailSchema,
  type PortfolioProjectDetail,
} from "@/types/api";

export function usePortfolioProjectDetail(slug: string | null) {
  return useQuery<PortfolioProjectDetail>({
    queryKey: ["portfolio-project-detail", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      const url = API_ROUTES.PROJECT_DETAIL(slug);
      const raw = await apiClient.get<unknown>(url);
      try {
        const data = PortfolioProjectDetailSchema.parse(raw);
        // Sort images by order field ascending
        data.images.sort((a, b) => a.order - b.order);
        return data;
      } catch (e) {
        console.error("Zod parse error in usePortfolioProjectDetail:", e);
        throw e;
      }
    },
    enabled: !!slug,
  });
}
