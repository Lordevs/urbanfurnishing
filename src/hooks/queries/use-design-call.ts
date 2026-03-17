import { useMutation } from "@tanstack/react-query";

import { API_ROUTES } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import { type DesignCallFormValues } from "@/schemas/design-call.schema";

export function useDesignCall() {
  return useMutation({
    mutationFn: async (data: DesignCallFormValues) => {
      return apiClient.post<{ message: string; id?: string }>(
        API_ROUTES.DESIGN_CALLS,
        data,
      );
    },
  });
}
