"use client";

import { ArrowLeft, X } from "lucide-react";
import { ReactNode } from "react";

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
    <div className="space-y-6 font-sans">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-0.5">
          <h1 className="text-2xl! font-medium tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              {description}
            </p>
          )}
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-full! border border-gray-200 bg-[#e86958]! px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-gray-200/20 transition-all"
          >
            <ArrowLeft className="h-4 w-4 stroke-[3px]" /> {backButtonLabel}
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <form onSubmit={onSubmit} className="p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            {children}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-6 dark:border-gray-800">
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center justify-center gap-2 rounded-full! border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm shadow-gray-200/20 transition-all hover:bg-gray-50! hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4 stroke-[3px]" />
                {clearButtonLabel}
              </button>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full! bg-[#e86958]! px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90! hover:translate-y-[-1px] active:translate-y-[0px]"
            >
              {submitIcon} {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
