import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import { PackageDetailSchema, type PackageDetail } from "@/types/api";

export function usePackageDetail(slug: string | null | undefined) {
  return useQuery<PackageDetail>({
    queryKey: ["packages", "detail", slug],
    queryFn: async () => {
      const raw = await apiClient.get<unknown>(API_ROUTES.PACKAGE_DETAIL(slug!));
      return PackageDetailSchema.parse(raw);
    },
    enabled: Boolean(slug),
  });
}
