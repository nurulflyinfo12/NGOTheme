"use client";

import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

const PRIMARY = "#f86048";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      icon: Icon,
      label,
      error,
      type = "text",
      className = "",
      placeholder,
      value,
      onChange,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5!">
        {/* ---------------- Label ---------------- */}
        {label && (
          <label className="text-xs! font-bold! text-slate-700! dark:text-slate-300! tracking-wide! uppercase! px-1!">
            {label}{" "}
            {required && <span style={{ color: PRIMARY }}>*</span>}
          </label>
        )}

        <div className="relative group w-full">
          {/* ---------------- Left Icon ---------------- */}
          {Icon && (
            <Icon
              className={`
                absolute left-4! top-1/2 -translate-y-1/2
                transition-colors
                ${
                  error
                    ? "text-red-400! dark:text-red-400! group-focus-within:text-red-500! dark:group-focus-within:text-red-400!"
                    : "text-slate-400! dark:text-slate-500! group-focus-within:text-[#f86048]! dark:group-focus-within:text-[#f86048]!"
                }
              `}
              size={18}
            />
          )}

          {/* ---------------- Input ---------------- */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={`
              w-full py-3! sm:py-3.5!
              text-sm! sm:text-base!
              border-2! rounded-2xl!
              text-slate-900! dark:text-white!
              placeholder:text-slate-400! dark:placeholder:text-slate-500!
              outline-none
              bg-white/70 dark:bg-slate-800/50!
              focus:bg-white dark:focus:bg-slate-800!
              transition-all shadow-sm
              ${Icon ? "pl-11!" : "pl-4!"}
              ${isPassword ? "pr-12!" : "pr-4!"}
              ${
                error
                  ? "border-red-300! dark:border-red-500/50! focus:border-red-500! dark:focus:border-red-400! text-red-900! dark:text-red-300!"
                  : "border-slate-200/80 dark:border-slate-700! focus:border-[#f86048]! dark:focus:border-[#f86048]!"
              }
              ${
                disabled
                  ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800/30!"
                  : ""
              }
              ${className}
            `}
            {...props}
          />

          {/* ---------------- Password Toggle ---------------- */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="
                absolute right-4! top-1/2 -translate-y-1/2
                text-slate-400! dark:text-slate-500!
                hover:text-slate-600! dark:hover:text-slate-300!
                transition-colors
                p-1! rounded-lg!
                hover:bg-slate-100/50! dark:hover:bg-slate-700/50!
              "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {/* ---------------- Validation Error ---------------- */}
        {error && (
          <span className="text-xs! font-medium! text-red-500! dark:text-red-400! px-1! animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";