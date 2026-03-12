import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  OrderResponseSchema,
  type OrderPayload,
  type OrderResponse,
} from "@/types/api";

export function useCreateOrder() {
  return useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: async (payload) => {
      const raw = await apiClient.post<unknown>(API_ROUTES.ORDERS, payload);
      return OrderResponseSchema.parse(raw);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to place order. Please try again.");
    },
  });
}
