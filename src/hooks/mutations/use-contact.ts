import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import type { ContactFormValues } from "@/schemas/contact.schema";
import type { ContactResponse } from "@/types/api";

export function useContact() {
  return useMutation<ContactResponse, Error, ContactFormValues>({
    mutationFn: (data) =>
      apiClient.post<ContactResponse>(API_ROUTES.CONTACT, data),

    onSuccess: () => {
      toast.success(
        "Inquiry submitted! We'll be in touch within 24 hours.",
      );
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });
}
