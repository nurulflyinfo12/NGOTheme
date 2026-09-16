"use client";

import { ArrowLeft, X } from "lucide-react";
import { ReactNode } from "react";

const PRIMARY = "#f86048";

interface FormCardProps {
  title: string;
  description?: string;
  onBack?: () => void;
  backButtonLabel?: string;
  onClear?: () => void;
  clearButtonLabel?: string;
  submitLabel: string;
  submitIcon?: ReactNode;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormCard({
  title,
  description,
  onBack,
  backButtonLabel = "Back to List",
  onClear,
  clearButtonLabel = "Clear",
  submitLabel,
  submitIcon,
  children,
  onSubmit,
}: FormCardProps) {
  return (
    <div className="space-y-6! font-sans">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col gap-4! md:flex-row md:items-center md:justify-between px-1!">
        <div className="space-y-0.5!">
          <h1 className="text-2xl! sm:text-3xl! font-black! tracking-tight! text-gray-900! dark:text-white!">
            {title}
          </h1>
          {description && (
            <p className="text-sm! text-gray-500! dark:text-gray-400! font-normal!">
              {description}
            </p>
          )}
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="
              inline-flex items-center justify-center gap-2
              rounded-full! px-6! py-2.5!
              text-sm! font-semibold! text-white!
              shadow-md shadow-[#f86048]/20!
              transition-all
              hover:opacity-90! hover:shadow-lg
              active:scale-95
            "
            style={{ backgroundColor: PRIMARY }}
          >
            <ArrowLeft className="h-4 w-4 stroke-[3px]" />
            {backButtonLabel}
          </button>
        )}
      </div>

      {/* ---------------- Card ---------------- */}
      <div className="
        overflow-hidden rounded-2xl!
        border border-gray-200 dark:border-gray-800!
        bg-white dark:bg-gray-900!
        shadow-sm
      ">
        <form onSubmit={onSubmit} className="p-6! sm:p-10! space-y-6!">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6! gap-y-6!">
            {children}
          </div>

          {/* ---------------- Actions ---------------- */}
          <div className="
            mt-6! flex items-center justify-end gap-3!
            border-t border-gray-100 dark:border-gray-800!
            pt-6!
          ">
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full! px-6! py-2.5!
                  text-sm! font-semibold!
                  border border-gray-200 dark:border-gray-700!
                  bg-white dark:bg-gray-900!
                  text-gray-700! dark:text-gray-300!
                  shadow-sm
                  transition-all
                  hover:bg-gray-50! dark:hover:bg-gray-800!
                  hover:text-gray-900! dark:hover:text-white!
                "
              >
                <X className="h-4 w-4 stroke-[3px]" />
                {clearButtonLabel}
              </button>
            )}

            <button
              type="submit"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full! px-6! py-2.5!
                text-sm! font-semibold! text-white!
                shadow-md shadow-[#f86048]/20!
                transition-all
                hover:opacity-90! hover:-translate-y-px!
                active:translate-y-0!
              "
              style={{ backgroundColor: PRIMARY }}
            >
              {submitIcon} {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}