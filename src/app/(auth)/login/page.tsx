"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@test.com" && password === "123456") {
        document.cookie = "admin=true; path=/; SameSite=Lax";
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Access denied.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className=" flex flex-col lg:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 bg-[#f86048] relative flex flex-col justify-center items-center "
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4 top-0 left-0 bg-white/30" />
            <div className="absolute w-[250px] sm:w-[300px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[400px] bg-black rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 bottom-0 right-0" />
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 sm:mb-8 inline-flex bg-white p-2 rounded-[2rem] shadow-2xl"
            >
              <Image
                src="/assets/img/logo/Sagorika.webp"
                alt="Logo"
                width={80}
                height={80}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-light">
                Welcome To
              </p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                Sagarika Samaj <br /> Unnayan Sangstha
              </h2>

              <div className="h-1 w-10 sm:w-12 bg-white/40 mx-auto mt-4 sm:mt-6 rounded-full" />

              <p className="mt-4 sm:mt-6 text-white/70 font-medium tracking-widest text-[10px] sm:text-xs uppercase">
                Management Portal
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 flex flex-col items-center bg-slate-50 relative overflow-y-auto lg:overflow-hidden">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 flex flex-col min-h-screen"
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8 sm:mb-10">
                <p className="text-slate-400 text-center font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                  Enter Administrative Credentials
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-100"
                    >
                      <ShieldCheck size={16} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#f86048]"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-slate-100 rounded-2xl text-black focus:border-[#f86048] outline-none bg-white"
                  />
                </div>

                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#f86048]"
                    size={18}
                  />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-slate-100 rounded-2xl text-black focus:border-[#f86048] outline-none bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 sm:py-4 text-sm sm:text-base hover:bg-[#f86048] text-black rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 group mt-2"
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

              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                <p className="text-[10px] font-black text-[#f86048] uppercase tracking-widest mb-1">
                  Development Access
                </p>
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <code className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-orange-100">
                    admin@test.com
                  </code>
                  <code className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-orange-100">
                    123456
                  </code>
                </div>
              </div>
            </div>

            <footer className="mt-auto pt-6 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 opacity-30 grayscale text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest">
                Security Verified
              </span>
              <div className="hidden sm:block h-[1px] flex-1 mx-4 bg-slate-400" />
              <span className="text-[10px] font-black">2026</span>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
