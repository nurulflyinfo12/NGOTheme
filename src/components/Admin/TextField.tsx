"use client";

import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

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
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {/* Optional Field Label */}
        {label && (
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            {label} {required && <span className="text-[#f86048]">*</span>}
          </label>
        )}

        <div className="relative group w-full">
          {/* Left Icon (Dynamic Component) */}
          {Icon && (
            <Icon
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                error
                  ? "text-red-400 group-focus-within:text-red-500"
                  : "text-slate-400 group-focus-within:text-[#f86048]"
              }`}
              size={18}
            />
          )}

          {/* Core Input Field */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full py-3 sm:py-3.5 text-sm sm:text-base border-2 rounded-2xl text-black placeholder-slate-400 outline-none bg-white/70 focus:bg-white transition-all shadow-sm ${
              Icon ? "pl-11" : "pl-4"
            } ${isPassword ? "pr-12" : "pr-4"} ${
              error
                ? "border-red-300 focus:border-red-500 text-red-900"
                : "border-slate-200/80 focus:border-[#f86048]"
            } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100" : ""} ${className}`}
            {...props}
          />

          {/* Right Action Icon (Password Visibility Toggle) */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {/* Validation Error Message */}
        {error && (
          <span className="text-xs font-medium text-red-500 px-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
