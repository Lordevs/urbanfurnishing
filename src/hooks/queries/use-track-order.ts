import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import { OrderDetailSchema, type OrderDetail } from "@/types/api";

export function useTrackOrder(orderNumber: string | null | undefined) {
  return useQuery<OrderDetail>({
    queryKey: ["orders", "track", orderNumber],
    queryFn: async () => {
      const raw = await apiClient.get<unknown>(API_ROUTES.ORDER_DETAIL(orderNumber!));
      return OrderDetailSchema.parse(raw);
    },
    enabled: Boolean(orderNumber),
  });
}
