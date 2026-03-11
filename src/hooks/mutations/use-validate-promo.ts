import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  PromoValidateResponseSchema,
  type PromoValidateResponse,
} from "@/types/api";

export function useValidatePromo() {
  return useMutation<PromoValidateResponse, Error, { code: string; subtotal: number }>({
    mutationFn: async ({ code, subtotal }) => {
      const raw = await apiClient.post<unknown>(API_ROUTES.PROMO_VALIDATE, { code, subtotal });
      return PromoValidateResponseSchema.parse(raw);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to validate promo code.");
    },
  });
}
