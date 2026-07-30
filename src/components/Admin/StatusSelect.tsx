"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Circle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      ? { text: "text-emerald-600", dot: "bg-emerald-500", bg: "bg-emerald-50" }
      : { text: "text-rose-600", dot: "bg-rose-500", bg: "bg-rose-50" };
  };

  const current = getStatusConfig(value);

  return (
    <div className="relative w-full space-y-1.5" ref={containerRef}>
      <label className="flex items-center gap-1 px-1 text-[11px] font-black uppercase tracking-widest text-slate-400">
        {label} {required && <span className="text-[#e86958]">*</span>}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          group relative flex w-full items-center justify-between rounded-xl! border px-4 py-2 text-sm transition-all duration-200
          ${isOpen ? "border-[#e86958] ring-4 ring-[#e86958]/5 bg-white" : "border-slate-200 bg-white hover:border-slate-300"}
          ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "cursor-pointer shadow-sm"}
          ${error ? "border-rose-500 ring-4 ring-rose-500/10" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          {/* Status Indicator Pill */}
          <div
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1 ${current.bg}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${current.dot}`}
              ></span>
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${current.dot}`}
              ></span>
            </span>
            <span
              className={`text-[11px] font-black uppercase tracking-tight ${current.text}`}
            >
              {value}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#e86958]" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5"
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
                    flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors
                    ${isSelected ? "bg-slate-50" : "hover:bg-slate-50/80"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Circle size={8} fill="currentColor" className={opt.text} />
                    <span
                      className={`text-sm font-bold ${isSelected ? "text-slate-900" : "text-slate-500"}`}
                    >
                      {option}
                    </span>
                  </div>
                  {isSelected && (
                    <Check
                      size={16}
                      className="text-[#e86958]"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

   
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-1 px-1 pt-1 text-[11px] font-bold text-rose-500 uppercase tracking-tight"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
