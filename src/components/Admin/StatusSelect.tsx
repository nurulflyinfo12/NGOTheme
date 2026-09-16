"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Circle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY = "#f86048";

interface StatusSelectProps {
  label?: string;
  value: "Active" | "Inactive";
  onChange: (value: "Active" | "Inactive") => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const STATUS_OPTIONS: ("Active" | "Inactive")[] = ["Active", "Inactive"];

export default function StatusSelect({
  label = "Status",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusConfig = (status: "Active" | "Inactive") => {
    return status === "Active"
      ? {
          text: "text-emerald-600! dark:text-emerald-400!",
          dot: "bg-emerald-500",
          bg: "bg-emerald-50 dark:bg-emerald-500/10!",
        }
      : {
          text: "text-rose-600! dark:text-rose-400!",
          dot: "bg-rose-500",
          bg: "bg-rose-50 dark:bg-rose-500/10!",
        };
  };

  const current = getStatusConfig(value);

  return (
    <div className="relative w-full space-y-1.5!" ref={containerRef}>
      {/* ---------------- Label ---------------- */}
      <label className="flex items-center gap-1! px-1! text-[11px]! font-black! uppercase! tracking-widest! text-slate-400! dark:text-slate-500!">
        {label}{" "}
        {required && <span style={{ color: PRIMARY }}>*</span>}
      </label>

      {/* ---------------- Trigger Button ---------------- */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          group relative flex w-full items-center justify-between
          rounded-xl! border px-4! py-2!
          text-sm!
          transition-all duration-200
          ${
            isOpen
              ? "border-[#f86048]! ring-4! ring-[#f86048]/5! bg-white dark:bg-slate-800!"
              : "border-slate-200 dark:border-slate-700! bg-white dark:bg-slate-800! hover:border-slate-300! dark:hover:border-slate-600!"
          }
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40!"
              : "cursor-pointer shadow-sm"
          }
          ${
            error
              ? "border-rose-500! dark:border-rose-500/50! ring-4! ring-rose-500/10!"
              : ""
          }
        `}
      >
        <div className="flex items-center gap-3!">
          {/* Status Indicator Pill */}
          <div
            className={`flex items-center gap-2! rounded-lg! px-2.5! py-1! ${current.bg}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${current.dot}`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${current.dot}`}
              />
            </span>
            <span
              className={`text-[11px]! font-black! uppercase! tracking-tight! ${current.text}`}
            >
              {value}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`
            transition-transform duration-300
            ${
              isOpen
                ? "rotate-180 text-[#f86048]!"
                : "text-slate-400! dark:text-slate-500!"
            }
          `}
        />
      </button>

      {/* ---------------- Dropdown Panel ---------------- */}
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="
              absolute z-50 mt-1! w-full
              overflow-hidden
              rounded-xl!
              border border-slate-100 dark:border-slate-800!
              bg-white dark:bg-slate-900!
              p-1.5!
              shadow-xl shadow-slate-900/10 dark:shadow-black/40!
              ring-1! ring-black/5 dark:ring-white/5!
            "
          >
            {STATUS_OPTIONS.map((option) => {
              const opt = getStatusConfig(option);
              const isSelected = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`
                    flex w-full items-center justify-between
                    rounded-lg! px-3! py-2.5!
                    transition-colors
                    ${
                      isSelected
                        ? "bg-slate-50 dark:bg-slate-800/60!"
                        : "hover:bg-slate-50/80! dark:hover:bg-slate-800/40!"
                    }
                  `}
                >
                  <div className="flex items-center gap-3!">
                    <Circle
                      size={8}
                      fill="currentColor"
                      className={opt.text}
                    />
                    <span
                      className={`
                        text-sm! font-bold!
                        ${
                          isSelected
                            ? "text-slate-900! dark:text-white!"
                            : "text-slate-500! dark:text-slate-400!"
                        }
                      `}
                    >
                      {option}
                    </span>
                  </div>

                  {isSelected && (
                    <Check
                      size={16}
                      className="text-[#f86048]!"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Validation Error ---------------- */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-1! px-1! pt-1! text-[11px]! font-bold! text-rose-500! dark:text-rose-400! uppercase! tracking-tight!"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}