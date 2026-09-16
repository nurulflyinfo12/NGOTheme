"use client";

import { useState, useEffect } from "react";
import { Lock, User, Loader2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

import { api, clearAuthData, setAccessToken } from "@/utility/api";
import { TextField } from "@/components/Admin/TextField";

const PRIMARY = "#f86048";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearAuthData();
  }, []);

  const showErrorAlert = (title: string, text: string) => {
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: PRIMARY,
      customClass: {
        popup:
          "rounded-3xl border border-slate-100 dark:border-slate-800! dark:bg-slate-900! shadow-2xl",
        confirmButton: "px-6 py-2.5 rounded-xl text-sm font-bold",
      },
    });
  };

  const extractAccessToken = (response: any): string | null => {
    const possibleTokens = [
      response?.User?.AccessToken,
      response?.User?.accessToken,
      response?.AccessToken,
      response?.accessToken,
      response?.data?.AccessToken,
      response?.data?.accessToken,
      response?.data?.User?.AccessToken,
      response?.data?.User?.accessToken,
    ];
    const token = possibleTokens.find(
      (value) => typeof value === "string" && value.trim().length > 0,
    );
    return token ? token.trim() : null;
  };

  const saveAuthData = (token: string, user?: any, permittedScreens?: any) => {
    if (!token || !token.trim())
      throw new Error("Cannot save an empty access token.");
    setAccessToken(token.trim());
    if (user) localStorage.setItem("user", JSON.stringify(user));
    if (permittedScreens)
      localStorage.setItem(
        "permittedScreens",
        JSON.stringify(permittedScreens),
      );

    document.cookie = `accessToken=${encodeURIComponent(
      token.trim(),
    )}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = "admin=true; path=/; max-age=86400; SameSite=Lax";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const cleanUsername = username.trim();

    if (!cleanUsername || !password.trim()) {
      showErrorAlert(
        "Missing Credentials",
        "Please enter both username and password.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/Login", {
        UserName: cleanUsername,
        Password: password,
      });

      const token = extractAccessToken(response);

      if (!token) {
        const message =
          response?.CurrentMessage ||
          response?.message ||
          response?.Message ||
          response?.data?.CurrentMessage ||
          response?.data?.message ||
          "Invalid username or password. Please try again.";
        showErrorAlert("Login Failed", message);
        return;
      }

      clearAuthData();

      const user =
        response?.User ||
        response?.user ||
        response?.data?.User ||
        response?.data?.user;
      const permittedScreens =
        response?.PermittedScreen ||
        response?.permittedScreens ||
        response?.PermittedScreens ||
        response?.data?.PermittedScreen ||
        response?.data?.PermittedScreens ||
        response?.data?.permittedScreens;

      saveAuthData(token, user, permittedScreens);

      const savedToken = localStorage.getItem("accessToken");
      if (!savedToken)
        throw new Error("The access token could not be saved in the browser.");
      if (savedToken.trim() !== token.trim())
        throw new Error(
          "The saved access token does not match the login token.",
        );

      window.location.replace("/admin/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      const apiError = typeof err?.message === "string" ? err.message : "";
      const isAuthenticationMessage =
        apiError.toLowerCase().includes("token") ||
        apiError.toLowerCase().includes("session") ||
        apiError.toLowerCase().includes("unauthorized");
      const errorMessage = isAuthenticationMessage
        ? apiError
        : "We couldn't sign you in. Please check your username and password and try again.";
      showErrorAlert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 dark:bg-[#0b1120]! flex items-center justify-center p-4! sm:p-6! selection:bg-[#f86048] selection:text-white! font-sans overflow-hidden">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900! rounded-[2rem]! shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full max-h-[800px] border border-slate-100 dark:border-slate-800!">
        {/* ---------------- LEFT SIDE — FORM ---------------- */}
        <div className="w-full lg:w-1/2 p-6! sm:p-10! lg:p-12! flex flex-col justify-center relative z-10 bg-white dark:bg-slate-900! overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6! w-full">
            <div className="w-40 h-24 rounded-xl! flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/assets/img/logo/Sagorika.webp"
                alt="Sagarika Logo"
                width={200}
                height={200}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4!">
              {/* Username */}
              <div>
                <label className="block text-sm! font-medium! text-slate-700! dark:text-slate-300! mb-1.5!">
                  Username <span style={{ color: PRIMARY }}>*</span>
                </label>
                <TextField
                  icon={User}
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full! bg-slate-50 dark:bg-slate-800/50! border-slate-200 dark:border-slate-700! text-slate-900! dark:text-white! placeholder:text-slate-400! focus:ring-[#f86048]! focus:border-[#f86048]!"
                />
              </div>

              {/* Password */}
              <div>
                <TextField
                  icon={Lock}
                  type="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full! bg-slate-50 dark:bg-slate-800/50! border-slate-200 dark:border-slate-700! text-slate-900! dark:text-white! placeholder:text-slate-400! focus:ring-[#f86048]! focus:border-[#f86048]!"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !username.trim() || !password.trim()}
                className="w-full py-3! px-4! text-white! rounded-full! font-bold! text-sm! transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2! shadow-lg shadow-[#f86048]/25 hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>SIGNING IN...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8! pt-4! border-t border-slate-100 dark:border-slate-800! flex items-center justify-between text-slate-400! dark:text-slate-500! text-[10px]! font-bold! uppercase! tracking-widest!">
              <span>Security Enforced</span>
              <span>SUSS 2026</span>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE — ILLUSTRATION ---------------- */}
        {/* ---------------- RIGHT SIDE — ILLUSTRATION + TESTIMONIAL ---------------- */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10! overflow-hidden bg-slate-900 dark:bg-slate-950!">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-950 dark:to-black!" />

          {/* Ambient glow blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 top-0 left-0 opacity-40"
              style={{ backgroundColor: PRIMARY }}
            />
            <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 bottom-0 right-0" />
            <div className="absolute w-[300px] h-[300px] bg-[#f86048]/20 rounded-full blur-[100px] top-1/2 right-0" />
          </div>

          {/* Subtle dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* ---------------- Top: Brand Strip ---------------- */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px]! font-black! uppercase! tracking-[0.2em]! text-white/40!">
              EST. 1985
            </span>
          </div>

          {/* ---------------- Middle: Testimonial ---------------- */}
          <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md mx-auto my-8!">
            {/* Quote icon */}
            <div
              className="w-12! h-12! rounded-2xl! flex items-center justify-center mb-6! shadow-lg"
              style={{
                backgroundColor: `${PRIMARY}20`,
                border: `1px solid ${PRIMARY}30`,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: PRIMARY }}
              >
                <path
                  d="M9.5 8.5c-1.5 0-2.5 1.2-2.5 2.5s1 2.5 2.5 2.5c.3 0 .6 0 .9-.1-.3 1.3-1.5 2.3-3 2.5v1.6c3-.2 5-2.5 5-5.5 0-2.1-1.3-3.5-2.9-3.5zm8 0c-1.5 0-2.5 1.2-2.5 2.5s1 2.5 2.5 2.5c.3 0 .6 0 .9-.1-.3 1.3-1.5 2.3-3 2.5v1.6c3-.2 5-2.5 5-5.5 0-2.1-1.3-3.5-2.9-3.5z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Testimonial text */}
            <p className="text-xl! sm:text-2xl! font-light! text-white/95! leading-[1.4]! tracking-tight!">
              &ldquo;Empowering coastal communities through sustainable
              development —
              <span className="font-semibold!" style={{ color: PRIMARY }}>
                {" "}
                one family at a time
              </span>
              .&rdquo;
            </p>

            {/* Divider */}
            <div
              className="w-16! h-[2px] rounded-full my-6!"
              style={{ backgroundColor: PRIMARY }}
            />

            {/* ---------------- Stats Row ---------------- */}
            <div className="grid grid-cols-3 gap-4! mt-8! pt-6! border-t border-white/10!">
              {[
                { value: "40+", label: "Years" },
                { value: "120+", label: "Villages" },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p
                    className="text-lg! sm:text-xl! font-black! leading-none!"
                    style={{ color: PRIMARY }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px]! font-bold! uppercase! tracking-widest! text-white/40! mt-1.5!">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- Bottom: Illustration ---------------- */}
          <div className="relative z-10 w-full h-[28%] mt-auto flex items-end justify-center">
            <div className="w-full h-full relative flex items-end justify-center opacity-90">
              <svg
                viewBox="0 0 400 200"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: PRIMARY }}
              >
                {/* Skyline buildings */}
                <rect
                  x="50"
                  y="80"
                  width="60"
                  height="120"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#1e293b"
                  opacity="0.8"
                />
                <rect
                  x="120"
                  y="40"
                  width="80"
                  height="160"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#0f172a"
                  opacity="0.9"
                />
                <rect
                  x="210"
                  y="60"
                  width="70"
                  height="140"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#1e293b"
                  opacity="0.8"
                />
                <rect
                  x="290"
                  y="100"
                  width="50"
                  height="100"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#0f172a"
                  opacity="0.9"
                />

                {/* Window grids */}
                <line
                  x1="130"
                  y1="60"
                  x2="130"
                  y2="190"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <line
                  x1="150"
                  y1="60"
                  x2="150"
                  y2="190"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <line
                  x1="170"
                  y1="60"
                  x2="170"
                  y2="190"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />

                <line
                  x1="220"
                  y1="80"
                  x2="220"
                  y2="190"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <line
                  x1="240"
                  y1="80"
                  x2="240"
                  y2="190"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <line
                  x1="260"
                  y1="80"
                  x2="260"
                  y2="190"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />

                {/* Accent lit windows */}
                <rect
                  x="135"
                  y="100"
                  width="6"
                  height="8"
                  fill={PRIMARY}
                  opacity="0.9"
                />
                <rect
                  x="155"
                  y="130"
                  width="6"
                  height="8"
                  fill={PRIMARY}
                  opacity="0.9"
                />
                <rect
                  x="225"
                  y="110"
                  width="6"
                  height="8"
                  fill={PRIMARY}
                  opacity="0.9"
                />
                <rect
                  x="245"
                  y="150"
                  width="6"
                  height="8"
                  fill={PRIMARY}
                  opacity="0.7"
                />

                {/* Circles (foundations) */}
                <circle
                  cx="40"
                  cy="180"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#1e293b"
                  opacity="0.8"
                />
                <circle
                  cx="360"
                  cy="180"
                  r="15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#1e293b"
                  opacity="0.8"
                />

                {/* Ground line */}
                <line
                  x1="0"
                  y1="195"
                  x2="400"
                  y2="195"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>

          {/* Corner accent */}
          <div
            className="absolute top-8 right-8 w-16! h-16! border-t-2! border-r-2! rounded-tr-2xl! opacity-30 pointer-events-none"
            style={{ borderColor: PRIMARY }}
          />
          <div
            className="absolute bottom-8 left-8 w-16! h-16! border-b-2! border-l-2! rounded-bl-2xl! opacity-30 pointer-events-none"
            style={{ borderColor: PRIMARY }}
          />
        </div>
      </div>
    </div>
  );
}
