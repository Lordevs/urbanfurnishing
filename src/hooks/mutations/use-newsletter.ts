import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import type { NewsletterPayload, NewsletterResponse } from "@/types/api";

export function useNewsletterSubscribe() {
  return useMutation<NewsletterResponse, Error, NewsletterPayload>({
    mutationFn: (data) =>
      apiClient.post<NewsletterResponse>(API_ROUTES.NEWSLETTER_SUBSCRIBE, data),

    onSuccess: (data) => {
      toast.success(data.message || "Thank you for subscribing to our newsletter!");
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again later.");
    },
  });
}
