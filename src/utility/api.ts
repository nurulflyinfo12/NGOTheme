const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:44302/api";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "eae1bf9f-d4fb-408a-ab7c-865f411f90d0";

interface RequestOptions extends RequestInit {
  accessToken?: string;
  isFormData?: boolean;
}

export function clearAuthData(): void {
  if (typeof window === "undefined") return;

  // Clear localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("permittedScreens");

  // Clear cookies
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  document.cookie =
    "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

export function logout(): void {
  clearAuthData();
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/login")
  ) {
    window.location.href = "/login";
  }
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("accessToken");
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    accessToken: providedToken,
    headers,
    isFormData,
    ...restOptions
  } = options;

  const currentToken = getAccessToken();
  const token = currentToken || providedToken || null;

  const defaultHeaders: Record<string, string> = {
    accept: "*/*",
    "X-API-Key": API_KEY,
  };

  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  if (token && token.trim() !== "") {
    defaultHeaders["AccessToken"] = token;
  }

  let cleanEndpoint = endpoint;

  if (BASE_URL.endsWith("/api") && cleanEndpoint.startsWith("/api/")) {
    cleanEndpoint = cleanEndpoint.replace(/^\/api/, "");
  }

  const url = cleanEndpoint.startsWith("http")
    ? cleanEndpoint
    : `${BASE_URL}${cleanEndpoint.startsWith("/") ? "" : "/"}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    });

    if (response.status === 401 || response.status === 403) {
      logout();
      throw new Error("Your session has expired. Please log in again.");
    }

    if (!response.ok) {
      const errorText = await response.text();

      const lowerError = errorText.toLowerCase();
      if (
        lowerError.includes("token expired") ||
        lowerError.includes("invalid token") ||
        lowerError.includes("unauthorized")
      ) {
        logout();
        throw new Error("Your session has expired. Please log in again.");
      }

      throw new Error(
        errorText || `API Request failed with status ${response.status}`,
      );
    }

    if (response.status === 204) {
      return [] as unknown as T;
    }

    const data = await response.json();

    // FIXED: Only trigger logout if the message explicitly mentions token/authentication issues
    const message = (data?.CurrentMessage || data?.message || "").toLowerCase();
    if (
      message.includes("token expired") ||
      message.includes("invalid token") ||
      message.includes("unauthorized") ||
      message.includes("session expired")
    ) {
      logout();
      throw new Error("Your session has expired. Please log in again.");
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}

export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "GET",
    }),

  post: <T = any>(endpoint: string, body: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  upload: <T = any>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions,
  ) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      isFormData: true,
    }),

  put: <T = any>(endpoint: string, body: any, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "DELETE",
    }),

  getFileUrl: (filePath: string) => {
    if (!filePath) return "";

    if (filePath.startsWith("http") || filePath.startsWith("blob:")) {
      return filePath;
    }

    const cleanPath = filePath.startsWith("/")
      ? filePath.substring(1)
      : filePath;

    return `${BASE_URL}/FileServer/GetFile?fileName=${encodeURIComponent(
      cleanPath,
    )}`;
  },
};