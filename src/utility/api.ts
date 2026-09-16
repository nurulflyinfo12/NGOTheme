// lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sagarika.org.bd/api";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "eae1bf9f-d4fb-408a-ab7c-865f411f90d0";

interface RequestOptions extends RequestInit {
  accessToken?: string;
  isFormData?: boolean;
}

/**
 * Get the access token from localStorage.
 *
 * Supports both:
 * - accessToken
 * - AccessTokennpm
 *
 * This helps if older login code stored the token
 * using a different capitalization.
 */
function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("AccessToken");

  if (!token || !token.trim()) {
    return null;
  }

  return token.trim();
}

/**
 * Store access token consistently.
 */
export function setAccessToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!token || !token.trim()) {
    console.warn("Attempted to save an empty access token.");
    return;
  }

  const cleanToken = token.trim();

  // Use one canonical key.
  localStorage.setItem("accessToken", cleanToken);

  // Remove the old variant if it exists.
  localStorage.removeItem("AccessToken");
}

/**
 * Clear authentication data.
 */
export function clearAuthData(): void {
  if (typeof window === "undefined") {
    return;
  }

  // Clear localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("permittedScreens");

  // Clear cookies
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

  document.cookie =
    "AccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

  document.cookie =
    "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

/**
 * Logout user.
 */
export function logout(): void {
  clearAuthData();

  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/login")
  ) {
    window.location.replace("/login");
  }
}

/**
 * Check whether an error response indicates
 * an authentication/token problem.
 */
function isAuthenticationError(message: string): boolean {
  if (!message) {
    return false;
  }

  const lowerMessage = message.toLowerCase();

  return (
    lowerMessage.includes("token expired") ||
    lowerMessage.includes("token has expired") ||
    lowerMessage.includes("invalid token") ||
    lowerMessage.includes("invalid access token") ||
    lowerMessage.includes("access token expired") ||
    lowerMessage.includes("access token is invalid") ||
    lowerMessage.includes("authentication failed") ||
    lowerMessage.includes("authentication required") ||
    lowerMessage.includes("session expired") ||
    lowerMessage.includes("session has expired") ||
    lowerMessage.includes("unauthenticated")
  );
}

/**
 * Build API URL safely.
 */
function buildUrl(endpoint: string): string {
  if (!endpoint) {
    return BASE_URL;
  }

  // Absolute URL
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }

  let cleanEndpoint = endpoint.trim();

  // Avoid /api/api/...
  if (BASE_URL.endsWith("/api") && cleanEndpoint.startsWith("/api/")) {
    cleanEndpoint = cleanEndpoint.replace(/^\/api/, "");
  }

  // Remove duplicate slash
  if (BASE_URL.endsWith("/") && cleanEndpoint.startsWith("/")) {
    return `${BASE_URL}${cleanEndpoint.substring(1)}`;
  }

  if (!BASE_URL.endsWith("/") && !cleanEndpoint.startsWith("/")) {
    return `${BASE_URL}/${cleanEndpoint}`;
  }

  return `${BASE_URL}${cleanEndpoint}`;
}

/**
 * Main API fetch function.
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    accessToken: providedToken,
    headers,
    isFormData = false,
    ...restOptions
  } = options;

  /**
   * Priority:
   *
   * 1. Explicitly provided token
   * 2. localStorage accessToken
   * 3. localStorage AccessToken
   */
  const token = providedToken?.trim() || getAccessToken();

  const defaultHeaders: Record<string, string> = {
    Accept: "*/*",
    "X-API-Key": API_KEY,
  };

  /**
   * Don't manually set Content-Type for FormData.
   *
   * Browser needs to automatically add:
   * multipart/form-data; boundary=...
   */
  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  /**
   * Add authentication header if token exists.
   *
   * Your backend appears to use:
   * AccessToken: <token>
   */
  if (token) {
    defaultHeaders["AccessToken"] = token;
  }

  const url = buildUrl(endpoint);

  // Useful during production debugging.
  if (process.env.NODE_ENV === "development") {
    console.log("API Request:", {
      method: restOptions.method || "GET",
      url,
      hasAccessToken: Boolean(token),
    });
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...(headers || {}),
      },
    });

    /**
     * 401 = authentication failure.
     *
     * Don't automatically logout on every 403 because
     * 403 can also mean the user is authenticated but
     * doesn't have permission for that resource.
     */
    if (response.status === 401) {
      clearAuthData();

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.replace("/login");
      }

      throw new Error(
        "Your session has expired or is invalid. Please log in again.",
      );
    }

    /**
     * Handle 403 separately.
     */
    if (response.status === 403) {
      const errorText = await response.text();

      let errorMessage = "You are not authorized to access this resource.";

      if (errorText) {
        try {
          const errorData = JSON.parse(errorText);

          errorMessage =
            errorData?.CurrentMessage ||
            errorData?.message ||
            errorData?.Message ||
            errorText;
        } catch {
          errorMessage = errorText;
        }
      }

      /**
       * Only logout if backend explicitly says
       * the token/authentication is invalid.
       */
      if (isAuthenticationError(errorMessage)) {
        clearAuthData();

        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.replace("/login");
        }

        throw new Error(
          "Your session has expired or is invalid. Please log in again.",
        );
      }

      throw new Error(errorMessage);
    }

    /**
     * Handle other HTTP errors.
     */
    if (!response.ok) {
      const errorText = await response.text();

      let errorMessage =
        errorText || `API request failed with status ${response.status}`;

      /**
       * Try to parse JSON error response.
       */
      if (errorText) {
        try {
          const errorData = JSON.parse(errorText);

          errorMessage =
            errorData?.CurrentMessage ||
            errorData?.message ||
            errorData?.Message ||
            errorText;
        } catch {
          // Keep original text
        }
      }

      /**
       * Check if backend returned an authentication error
       * despite using another HTTP status.
       */
      if (isAuthenticationError(errorMessage)) {
        clearAuthData();

        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.replace("/login");
        }

        throw new Error(
          "Your session has expired or is invalid. Please log in again.",
        );
      }

      throw new Error(errorMessage);
    }

    /**
     * 204 No Content
     */
    if (response.status === 204) {
      return [] as unknown as T;
    }

    /**
     * Read response as text first.
     *
     * This prevents response.json() from crashing
     * when the backend returns an empty response.
     */
    const responseText = await response.text();

    if (!responseText) {
      return [] as unknown as T;
    }

    let data: any;

    try {
      data = JSON.parse(responseText);
    } catch {
      /**
       * Backend returned plain text instead of JSON.
       */
      return responseText as unknown as T;
    }

    /**
     * Some APIs return HTTP 200 but put the authentication
     * error inside the JSON response.
     */
    const message = (
      data?.CurrentMessage ||
      data?.message ||
      data?.Message ||
      data?.error ||
      ""
    ).toString();

    if (isAuthenticationError(message)) {
      clearAuthData();

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.replace("/login");
      }

      throw new Error(
        "Your session has expired or is invalid. Please log in again.",
      );
    }

    return data as T;
  } catch (error: any) {
    /**
     * Don't hide the original error.
     */
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(error?.message || "An unexpected API error occurred.");
  }
}

/**
 * API helper methods.
 */
export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "GET",
    }),

  post: <T = any>(
    endpoint: string,
    body: any,
    options?: RequestOptions,
  ): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T = any>(
    endpoint: string,
    body: any,
    options?: RequestOptions,
  ): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T = any>(
    endpoint: string,
    body: any,
    options?: RequestOptions,
  ): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "DELETE",
    }),

  /**
   * Upload FormData.
   */
  upload: <T = any>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions,
  ): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      isFormData: true,
    }),

  /**
   * PUT FormData.
   */
  uploadPut: <T = any>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions,
  ): Promise<T> =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: formData,
      isFormData: true,
    }),

  /**
   * Get file URL.
   */
  getFileUrl: (filePath: string): string => {
    if (!filePath) {
      return "";
    }

    /**
     * Already an absolute URL.
     */
    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://") ||
      filePath.startsWith("blob:")
    ) {
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

/**
 * Optional debugging helper.
 *
 * You can run:
 *
 * checkAuthToken();
 *
 * from the browser console.
 */
export function checkAuthToken(): void {
  if (typeof window === "undefined") {
    console.log("Running on server. localStorage is unavailable.");
    return;
  }

  const token = getAccessToken();

  console.log("Authentication debug:", {
    hasAccessToken: Boolean(token),
    tokenLength: token?.length || 0,
    hasApiKey: Boolean(API_KEY),
    baseUrl: BASE_URL,
  });
}
