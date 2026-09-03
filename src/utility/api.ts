// utility/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:44302/api";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "eae1bf9f-d4fb-408a-ab7c-865f411f90d0";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

interface RequestOptions extends RequestInit {
  accessToken?: string;
  isFormData?: boolean;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { accessToken, headers, isFormData, ...restOptions } = options;

  // Resolve token from param -> localStorage -> cookie
  const token =
    accessToken ||
    (typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || localStorage.getItem("AccessToken")
      : null) ||
    getCookie("accessToken");

  const defaultHeaders: Record<string, string> = {
    accept: "*/*",
    "X-API-Key": API_KEY,
  };

  // Only set application/json if NOT uploading FormData
  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  // Attach AccessToken if non-empty
  if (token && token.trim() !== "") {
    defaultHeaders["AccessToken"] = token;
  }

  // Prevent duplicate /api/api prefix
  let cleanEndpoint = endpoint;
  if (BASE_URL.endsWith("/api") && cleanEndpoint.startsWith("/api/")) {
    cleanEndpoint = cleanEndpoint.replace(/^\/api/, "");
  }

  const url = cleanEndpoint.startsWith("http")
    ? cleanEndpoint
    : `${BASE_URL}${cleanEndpoint.startsWith("/") ? "" : "/"}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return [] as unknown as T;
  }

  return response.json();
}

/**
 * Universal API helper methods
 */
export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),

  upload: <T = any>(endpoint: string, formData: FormData, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      isFormData: true,
    }),

  put: <T = any>(endpoint: string, body: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),

  // Helper function to resolve server file URLs
  getFileUrl: (filePath: string) => {
    if (!filePath) return "";
    if (filePath.startsWith("http") || filePath.startsWith("blob:")) return filePath;

    const cleanPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
    return `${BASE_URL}/FileServer/GetFile?fileName=${encodeURIComponent(cleanPath)}`;
  },
};