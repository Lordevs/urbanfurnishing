import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import {
  PaymentConfirmResponseSchema,
  type PaymentConfirmResponse,
} from "@/types/api";

interface ConfirmPaymentInput {
  orderNumber: string;
  payment_method: "CARD" | "UPI";
}

export function useConfirmPayment() {
  return useMutation<PaymentConfirmResponse, Error, ConfirmPaymentInput>({
    mutationFn: async ({ orderNumber, payment_method }) => {
      const raw = await apiClient.post<unknown>(
        API_ROUTES.PAYMENT_CONFIRM(orderNumber),
        { payment_method },
      );
      return PaymentConfirmResponseSchema.parse(raw);
    },
    onError: (error) => {
      toast.error(error.message || "Payment confirmation failed. Please try again.");
    },
  });
}
