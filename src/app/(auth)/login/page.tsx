"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { api } from "@/utility/api";
import { TextField } from "@/components/Admin/TextField";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/Login", {
        UserName: username,
        Password: password,
      });

      if (response?.User?.AccessToken) {
        const token = response.User.AccessToken;

        document.cookie = `admin=true; path=/; SameSite=Lax`;
        document.cookie = `accessToken=${token}; path=/; SameSite=Lax`;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(response.User));

        if (response.PermittedScreen) {
          localStorage.setItem(
            "permittedScreens",
            JSON.stringify(response.PermittedScreen),
          );
        }

        router.push("/admin/dashboard");
      } else {
        setError(response?.CurrentMessage || "Invalid username or password.");
      }
    } catch (err: any) {
      setError(
        err.message || "Failed to connect to the server. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex overflow-x-hidden selection:bg-[#f86048] selection:text-white">
      {/* Left Banner Section - Completely Hidden on Small Devices (< lg) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-[#f86048] relative flex-col justify-between p-12 shrink-0 overflow-hidden"
      >
        {/* Decorative Radial Background Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4 top-0 left-0 bg-white/40" />
          <div className="absolute w-[400px] h-[400px] bg-black rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 bottom-0 right-0" />
        </div>

        {/* Center Branding & Logo */}
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex bg-white p-4 rounded-[2.5rem] shadow-2xl mb-8 border-4 border-white/20 backdrop-blur-md"
          >
            <Image
              src="/assets/img/logo/Sagorika.webp"
              alt="Sagarika Logo"
              width={90}
              height={90}
              className="w-20 h-20 object-contain drop-shadow-md"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-white/90 text-2xl font-light tracking-wide">
              Welcome To
            </p>
            <h2 className="text-3xl font-black text-white leading-tight uppercase tracking-tight mt-1 drop-shadow-sm">
              Sagarika Samaj <br /> Unnayan Sangstha
            </h2>

            <div className="h-1.5 w-16 bg-white/40 mx-auto mt-6 rounded-full" />

            <p className="mt-6 text-white/80 font-bold tracking-[0.25em] text-xs uppercase">
              Management Portal
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side Login Form - Fullscreen on Mobile/Tablet */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between items-center bg-slate-50 min-h-screen px-6 sm:px-12 lg:px-16 py-10 relative overflow-hidden">
        {/* Subtle Ambient Background Gradients on Right Side */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f86048]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm sm:max-w-md my-auto flex flex-col justify-center relative z-10">
          {/* Header Title */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-[#f86048] text-[10px] font-black uppercase tracking-widest mb-3 border border-orange-200/50">
              Administrative Access
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-slate-400 font-medium text-xs mt-1.5">
              Enter your credentials to manage 
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 border border-rose-200 shadow-sm"
                >
                  <ShieldCheck className="shrink-0 text-rose-500" size={18} />
                  <span className="leading-snug">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reusable Universal TextField - Username */}
            <TextField
              icon={User}
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Reusable Universal TextField - Password */}
            <TextField
              icon={Lock}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-sm sm:text-base !bg-[#f86048] !hover:bg-[#e24e37] active:scale-[0.98] text-white rounded-2xl font-black flex items-center justify-center gap-2.5 transition-all disabled:opacity-70 shadow-lg shadow-[#f86048]/25 group mt-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  SIGN IN
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Form Footer */}
        <footer className="w-full max-w-sm sm:max-w-md pt-8 flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10">
          <span>Security Enforced</span>
          <div className="h-[1px] flex-1 mx-4 bg-slate-200" />
          <span>SUSS 2026</span>
        </footer>
      </div>
    </div>
  );
}
