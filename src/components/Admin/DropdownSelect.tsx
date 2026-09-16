"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
} from "react";
import {
  LucideIcon,
  ChevronDown,
  Search,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

const PRIMARY = "#f86048";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownSelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange"
  > {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  options?: (SelectOption | string | number)[];
  placeholder?: string;
  value?: string | number;
  onChange?: (e: {
    target: {
      name?: string;
      value: string;
    };
  }) => void;
  name?: string;
  searchPlaceholder?: string;
  noOptionsText?: string;
}

export const DropdownSelect = React.forwardRef<
  HTMLSelectElement,
  DropdownSelectProps
>(
  (
    {
      icon: Icon,
      label,
      error,
      className = "",
      placeholder = "Select an option",
      value = "",
      onChange,
      required,
      disabled,
      options = [],
      name,
      searchPlaceholder = "Search options...",
      noOptionsText = "No matching options found",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const listboxId = useId();

    const currentValueStr =
      value !== undefined && value !== null ? String(value) : "";

    const normalizedOptions: SelectOption[] = options.map((opt) => {
      if (
        typeof opt === "object" &&
        opt !== null &&
        "label" in opt &&
        "value" in opt
      ) {
        return {
          label: String(opt.label),
          value: String(opt.value),
          disabled: opt.disabled,
        };
      }

      return {
        label: String(opt),
        value: String(opt),
      };
    });

    /* ---------------- Click outside ---------------- */
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    /* ---------------- Escape key ---------------- */
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, []);

    /* ---------------- Focus search input ---------------- */
    useEffect(() => {
      if (!isOpen) return;

      const timer = window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      return () => {
        window.clearTimeout(timer);
      };
    }, [isOpen]);

    /* ---------------- Filter ---------------- */
    const filteredOptions = normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = normalizedOptions.find(
      (opt) => opt.value === currentValueStr
    );

    /* ---------------- Select handler ---------------- */
    const handleSelect = useCallback(
      (optionValue: string | number) => {
        const stringVal = String(optionValue);
        const selected = normalizedOptions.find(
          (opt) => opt.value === stringVal
        );

        if (selected?.disabled) return;

        if (onChange) {
          onChange({
            target: {
              name,
              value: stringVal,
            },
          });
        }

        setIsOpen(false);
        setSearchTerm("");
      },
      [name, normalizedOptions, onChange]
    );

    /* ---------------- Trigger keyboard ---------------- */
    const handleTriggerKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
      if (disabled) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    /* ---------------- Search keyboard ---------------- */
    const handleSearchKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        setSearchTerm("");
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const firstEnabledOption = filteredOptions.find(
          (option) => !option.disabled
        );

        if (firstEnabledOption) {
          handleSelect(firstEnabledOption.value);
        }
      }
    };

    return (
      <div
        ref={dropdownRef}
        className="w-full flex flex-col gap-1.5! relative"
      >
        {/* Hidden Native Select for Form Compatibility */}
        <select
          ref={ref}
          name={name}
          value={currentValueStr}
          required={required}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={() => {}}
          {...props}
        >
          <option value="">{placeholder}</option>
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* ---------------- Label ---------------- */}
        {label && (
          <label className="text-xs! font-bold! text-slate-700! dark:text-slate-300! tracking-wide! uppercase! px-1!">
            {label}
            {required && (
              <span style={{ color: PRIMARY }}> *</span>
            )}
          </label>
        )}

        {/* ---------------- Dropdown Trigger ---------------- */}
        <div className="relative group w-full overflow-visible">
          {/* Left Icon */}
          {Icon && (
            <Icon
              className={`
                absolute left-4! top-1/2 -translate-y-1/2
                transition-colors pointer-events-none z-20
                ${
                  error
                    ? "text-red-400! dark:text-red-400! group-focus-within:text-red-500! dark:group-focus-within:text-red-400!"
                    : "text-slate-400! dark:text-slate-500! group-focus-within:text-[#f86048]! dark:group-focus-within:text-[#f86048]!"
                }
              `}
              size={18}
            />
          )}

          {/* Trigger Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setIsOpen((prev) => !prev);
              if (isOpen) setSearchTerm("");
            }}
            onKeyDown={handleTriggerKeyDown}
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-haspopup="listbox"
            className={`
              w-full py-3! sm:py-3.5!
              text-sm! sm:text-base!
              border-2! rounded-2xl!
              outline-none
              bg-white/70 dark:bg-slate-800/50!
              focus:bg-white dark:focus:bg-slate-800!
              transition-all shadow-sm
              flex items-center justify-between text-left pr-11!
              ${
                !currentValueStr
                  ? "text-slate-400! dark:text-slate-500!"
                  : "text-slate-900! dark:text-white! font-semibold!"
              }
              ${Icon ? "pl-11!" : "pl-4!"}
              ${
                error
                  ? "border-red-300! dark:border-red-500/50! focus:border-red-500! dark:focus:border-red-400! text-red-900! dark:text-red-300!"
                  : isOpen
                  ? "border-[#f86048]! bg-white dark:bg-slate-800! ring-4! ring-[#f86048]/10!"
                  : "border-slate-200/80 dark:border-slate-700! hover:border-slate-300! dark:hover:border-slate-600! focus:border-[#f86048]!"
              }
              ${
                disabled
                  ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800/30!"
                  : "cursor-pointer"
              }
              ${className}
            `}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </button>

          {/* Right Chevron */}
          <div className="absolute right-4! top-1/2 -translate-y-1/2 text-slate-400! dark:text-slate-500! pointer-events-none z-20">
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180 text-[#f86048]!" : ""
              }`}
            />
          </div>

          {/* ---------------- Dropdown Panel ---------------- */}
          {isOpen && !disabled && (
            <div
              id={listboxId}
              role="listbox"
              aria-label={label || placeholder}
              className="
                absolute left-0 top-full z-[9999] mt-2!
                w-full
                bg-white dark:bg-slate-900!
                rounded-2xl!
                border border-slate-200/80 dark:border-slate-700!
                shadow-2xl shadow-slate-900/10 dark:shadow-black/40!
                overflow-hidden
                animate-in fade-in-50 zoom-in-95 duration-150
              "
            >
              {/* Search Bar */}
              <div
                className="
                  p-2!
                  border-b border-slate-100 dark:border-slate-800!
                  bg-slate-50/95 dark:bg-slate-800/60!
                  backdrop-blur-sm
                "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex items-center">
                  <Search
                    className="absolute left-3.5! top-1/2 -translate-y-1/2 text-slate-400! dark:text-slate-500! pointer-events-none"
                    size={16}
                  />

                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder={searchPlaceholder}
                    autoComplete="off"
                    spellCheck={false}
                    className="
                      w-full pl-9! pr-9! py-2.5!
                      text-xs! sm:text-sm!
                      bg-white dark:bg-slate-900!
                      border border-slate-200/80 dark:border-slate-700!
                      rounded-xl!
                      outline-none
                      focus:border-[#f86048]! dark:focus:border-[#f86048]!
                      focus:ring-2! focus:ring-[#f86048]/10!
                      text-slate-800! dark:text-white!
                      placeholder:text-slate-400! dark:placeholder:text-slate-500!
                      transition-all
                    "
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearchTerm("")}
                      className="
                        absolute right-3 top-1/2 -translate-y-1/2
                        text-slate-400! dark:text-slate-500!
                        hover:text-slate-600! dark:hover:text-slate-300!
                        transition-colors
                        p-0.5! rounded-full!
                        hover:bg-slate-100! dark:hover:bg-slate-800!
                      "
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Options List */}
              <div className="max-h-60 overflow-y-auto overscroll-contain p-1.5! space-y-1! scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => {
                    const isSelected = opt.value === currentValueStr;

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={opt.disabled}
                        onClick={() => handleSelect(opt.value)}
                        className={`
                          w-full text-left
                          px-3.5! py-2.5!
                          rounded-xl!
                          text-xs! sm:text-sm!
                          transition-all
                          flex items-center justify-between
                          ${
                            opt.disabled
                              ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40!"
                              : isSelected
                              ? "bg-[#f86048]/10! text-[#f86048]! font-bold!"
                              : "text-slate-700! dark:text-slate-300! hover:bg-slate-100/80! dark:hover:bg-slate-800! hover:text-slate-900! dark:hover:text-white! font-medium!"
                          }
                        `}
                      >
                        <span className="truncate">{opt.label}</span>

                        {isSelected && (
                          <span
                            className="flex items-center justify-center w-5! h-5! rounded-full! text-white! shrink-0 ml-2! shadow-sm"
                            style={{ backgroundColor: PRIMARY }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4! py-6! text-center text-xs! sm:text-sm! text-slate-400! dark:text-slate-500! font-medium! flex flex-col items-center gap-1.5!">
                    <AlertCircle
                      size={18}
                      className="text-slate-300! dark:text-slate-600!"
                    />
                    <span>{noOptionsText}</span>
                  </div>
                )}
              </div>
            </div>
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

DropdownSelect.displayName = "DropdownSelect";