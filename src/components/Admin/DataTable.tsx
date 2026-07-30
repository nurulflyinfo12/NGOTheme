"use client";

import { ReactNode, useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  FilterX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ActionsCell } from "./TableCells";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
  width?: string;
}

export interface Filter {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  filters?: Filter[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  addButtonLabel?: string;
  showSearch?: boolean;
  showActions?: boolean;
  renderHeader?: () => ReactNode;
  getRowId: (item: T) => string | number;
  emptyMessage?: string;
  initialPageSize?: number;
  showSerial?: boolean;
}

export default function DataTable<T>({
  title,
  description,
  data,
  columns,
  searchKeys = [],
  filters = [],
  onAdd,
  onEdit,
  onDelete,
  onView,
  addButtonLabel = "Add New",
  showSearch = true,
  showActions = true,
  renderHeader,
  getRowId,
  emptyMessage = "No records found matching your criteria.",
  initialPageSize = 10,
  showSerial = true,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, pageSize]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (!searchQuery.trim()) return true;
      const lowerQuery = searchQuery.toLowerCase();
      const targetKeys =
        searchKeys.length > 0
          ? searchKeys
          : (Object.keys(item as object) as (keyof T)[]);
      return targetKeys.some((key) => {
        const value = item[key];
        return (
          value !== null &&
          value !== undefined &&
          String(value).toLowerCase().includes(lowerQuery)
        );
      });
    });
  }, [data, searchQuery, searchKeys]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const shouldShowActions =
    showActions &&
    (typeof onView === "function" ||
      typeof onEdit === "function" ||
      typeof onDelete === "function");

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-0.5">
          <h1 className="text-4xl! font-medium tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              {description}
            </p>
          )}
        </div>

        {renderHeader
          ? renderHeader()
          : onAdd && (
              <button
                onClick={onAdd}
                className="inline-flex items-center justify-center gap-2 rounded-full! bg-[#e86958]! px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#e86958]/20 transition-all hover:bg-[#e86958]/90! hover:shadow-lg active:scale-95"
              >
                <Plus className="h-5 w-5" />
                {addButtonLabel}
              </button>
            )}
      </div>

      {(showSearch || filters.length > 0) && (
        <div className="flex flex-col gap-3 rounded-2xl bg-white border border-gray-200 p-2 shadow-sm dark:bg-gray-900 dark:border-gray-800 sm:flex-row sm:items-center">
          {showSearch && (
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-none bg-transparent py-2.5 pl-11 pr-4 text-sm text-black placeholder-gray-400 outline-none focus:ring-0 dark:text-white"
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 px-2 border-l border-gray-100 dark:border-gray-800">
            {filters.map((filter) => (
              <div key={filter.key} className="relative group">
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="appearance-none
                   bg-white dark:bg-gray-900
                   border border-gray-200 dark:border-gray-700
                   hover:border-gray-300 dark:hover:border-gray-600
                   focus:border-blue-500 dark:focus:border-blue-500
                   focus:ring-1 focus:ring-blue-500/30
                   rounded-xl
                   px-4 py-2
                   pr-9
                   text-sm
                   font-medium
                   text-gray-700 dark:text-gray-200
                   transition-all duration-200
                   cursor-pointer
                   outline-none
                   min-w-[140px]"
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Modern Arrow */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl! border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-[#e86958] dark:bg-gray-800/50 dark:border-gray-800">
                {showSerial && (
                  <th className="px-6 py-4 text-[12px] font-semibold text-white uppercase tracking-wider">
                    #
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-6 py-4 text-[12px] font-semibold text-white uppercase tracking-wider dark:text-gray-400 ${column.className || ""}`}
                    style={{ width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
                {shouldShowActions && (
                  <th className="px-6 py-4 text-[12px] font-semibold text-white uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedData.map((item, index) => (
                <tr
                  key={getRowId(item)}
                  className="group transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
                >
                  {showSerial && (
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {startIndex + index + 1}
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 text-sm text-gray-600 dark:text-gray-300 ${column.className || ""}`}
                    >
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <span className="font-normal">
                          {String(item[column.key as keyof T] ?? "")}
                        </span>
                      )}
                    </td>
                  ))}

                  {shouldShowActions && (
                    <td className="px-6 py-4">
                      <ActionsCell
                        {...(onView ? { onView: () => onView(item) } : {})}
                        {...(onEdit ? { onEdit: () => onEdit(item) } : {})}
                        {...(onDelete
                          ? { onDelete: () => onDelete(item) }
                          : {})}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="bg-gray-50 p-4 rounded-full dark:bg-gray-800 mb-4">
                <FilterX className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                No matches found
              </h3>
              <p className="text-sm text-gray-500 max-w-xs mt-1">
                {emptyMessage}
              </p>
            </div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-900 sm:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500 dark:text-gray-400">
                  Rows:
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-transparent text-[13px] font-semibold text-gray-700 outline-none cursor-pointer dark:text-gray-300"
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[13px] text-gray-500 dark:text-gray-400">
                {startIndex + 1}-
                {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
                {filteredData.length}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-20 transition-colors"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-20 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="px-4 text-[13px] font-medium text-gray-700 dark:text-gray-300">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-20 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-20 transition-colors"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
