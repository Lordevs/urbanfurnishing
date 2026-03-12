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
  gateway_payment_id: string;
  gateway_order_id?: string;
}

export function useConfirmPayment() {
  return useMutation<PaymentConfirmResponse, Error, ConfirmPaymentInput>({
    mutationFn: async ({ orderNumber, gateway_payment_id, gateway_order_id }) => {
      const raw = await apiClient.post<unknown>(
        API_ROUTES.PAYMENT_CONFIRM(orderNumber),
        { 
          gateway_payment_id,
          gateway_order_id
        },
      );
      return PaymentConfirmResponseSchema.parse(raw);
    },
    onError: (error) => {
      toast.error(error.message || "Payment confirmation failed. Please try again.");
    },
  });
}
