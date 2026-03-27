import { useInfiniteQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  PortfolioProjectListItemSchema,
  PaginatedResponseSchema,
  type PortfolioProjectListItem,
  type PaginatedResponse,
} from "@/types/api";

export function usePortfolioProjects(page_size = 10) {
  return useInfiniteQuery<PaginatedResponse<PortfolioProjectListItem>>({
    queryKey: ["portfolio-projects", page_size],
    queryFn: async ({ pageParam = 1 }) => {
      const url = new URL(API_ROUTES.PROJECTS);
      url.searchParams.set("page", String(pageParam));
      url.searchParams.set("page_size", String(page_size));

      const raw = await apiClient.get<unknown>(url.toString());
      return PaginatedResponseSchema(PortfolioProjectListItemSchema).parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get("page"));
    },
    initialPageParam: 1,
  });
}
