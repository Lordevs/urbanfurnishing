/**
 * Thin fetch wrapper for the Urban Furnishing backend API.
 * – Prepends the base URL (via API_ROUTES)
 * – Sets Content-Type: application/json by default
 * – Throws ApiError on non-2xx responses so TanStack Query's error
 *   state is populated automatically
 * – Works in both Server Components and Client Components
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.json();
      // Django REST Framework returns errors under 'detail' or field names
      message = data?.detail ?? data?.message ?? JSON.stringify(data);
    } catch {
      // body was not JSON — keep statusText
    }
    throw new ApiError(res.status, res.statusText, message);
  }

  // 204 No Content — return empty object
  if (res.status === 204) return {} as T;

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(url: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(url, { method: "GET", ...options }),

  post: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, { method: "POST", body, ...options }),

  patch: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, { method: "PATCH", body, ...options }),

  put: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, { method: "PUT", body, ...options }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { method: "DELETE", ...options }),
};
