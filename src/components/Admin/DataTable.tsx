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

const PRIMARY = "#f86048";

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

        {renderHeader
          ? renderHeader()
          : onAdd && (
              <button
                onClick={onAdd}
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
                <Plus className="h-5 w-5" />
                {addButtonLabel}
              </button>
            )}
      </div>

      {/* ---------------- Search & Filters ---------------- */}
      {(showSearch || filters.length > 0) && (
        <div
          className="
          flex flex-col gap-3
          rounded-2xl!
          bg-white dark:bg-gray-900!
          border border-gray-200 dark:border-gray-800!
          p-2!
          shadow-sm
          sm:flex-row sm:items-center
        "
        >
          {showSearch && (
            <div className="relative flex-1 group">
              <Search
                className="
                absolute left-4! top-1/2 h-4 w-4 -translate-y-1/2
                text-gray-400! dark:text-gray-500!
                transition-colors
                group-focus-within:text-[#f86048]!
              "
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full rounded-xl!
                  border-none! bg-transparent
                  py-2.5! pl-11! pr-4!
                  text-sm!
                  text-gray-900! dark:text-white!
                  placeholder-gray-400!
                  outline-none focus:ring-0
                "
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2! px-2! border-l! border-gray-100 dark:border-gray-800!">
            {filters.map((filter) => (
              <div key={filter.key} className="relative group">
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="
                    appearance-none
                    bg-white dark:bg-gray-900!
                    border border-gray-200 dark:border-gray-700!
                    hover:border-gray-300 dark:hover:border-gray-600!
                    focus:border-[#f86048]! dark:focus:border-[#f86048]!
                    focus:ring-1! focus:ring-[#f86048]/30!
                    rounded-xl!
                    px-4! py-2!
                    pr-9!
                    text-sm!
                    font-medium!
                    text-gray-700! dark:text-gray-200!
                    transition-all duration-200
                    cursor-pointer
                    outline-none
                    min-w-[140px]!
                  "
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Modern Arrow */}
                <div
                  className="
                  pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400! dark:text-gray-500!
                  group-hover:text-gray-500! dark:group-hover:text-gray-300!
                  transition-colors
                "
                >
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

      {/* ---------------- Table ---------------- */}
      <div
        className="
        overflow-hidden rounded-2xl!
        border border-gray-200 dark:border-gray-800!
        bg-white dark:bg-gray-900!
        shadow-sm
      "
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr
                className="
                  border-b border-gray-100 dark:border-gray-800!
                  bg-[#f86048] dark:bg-gray-800/50!
                "
              >
                {showSerial && (
                  <th className="px-6! py-4! text-[12px]! font-semibold! text-white! dark:text-gray-300! uppercase! tracking-wider!">
                    #
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`
                      px-6! py-4!
                      text-[12px]! font-semibold!
                      text-white! dark:text-gray-300!
                      uppercase! tracking-wider!
                      ${column.className || ""}
                    `}
                    style={{ width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
                {shouldShowActions && (
                  <th className="px-6! py-4! text-[12px]! font-semibold! text-white! dark:text-gray-300! uppercase! tracking-wider!">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900!">
              {paginatedData.map((item, index) => (
                <tr
                  key={getRowId(item)}
                  className="group transition-colors hover:bg-gray-50/80! dark:hover:bg-gray-800/40!"
                >
                  {showSerial && (
                    <td className="px-6! py-4! text-sm! text-gray-600! dark:text-gray-300!">
                      {startIndex + index + 1}
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`
            px-6! py-4!
            text-sm!
            text-gray-600! dark:text-gray-300!
            ${column.className || ""}
          `}
                    >
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <span className="font-normal!">
                          {String(item[column.key as keyof T] ?? "")}
                        </span>
                      )}
                    </td>
                  ))}

                  {shouldShowActions && (
                    <td className="px-6! py-4!">
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

          {/* ---------------- Empty State ---------------- */}
          {filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24! text-center">
              <div className="bg-gray-50 dark:bg-gray-800! p-4! rounded-full! mb-4!">
                <FilterX className="h-8 w-8 text-gray-300! dark:text-gray-600!" />
              </div>
              <h3 className="text-base! font-semibold! text-gray-900! dark:text-white!">
                No matches found
              </h3>
              <p className="text-sm! text-gray-500! dark:text-gray-400! max-w-xs mt-1!">
                {emptyMessage}
              </p>
            </div>
          )}
        </div>

        {/* ---------------- Pagination ---------------- */}
        {filteredData.length > 0 && (
          <div
            className="
            flex flex-col items-center justify-between gap-4
            border-t border-gray-100 dark:border-gray-800!
            bg-white dark:bg-gray-900!
            px-6! py-3!
            sm:flex-row
          "
          >
            <div className="flex items-center gap-6!">
              <div className="flex items-center gap-2!">
                <span className="text-[13px]! text-gray-500! dark:text-gray-400!">
                  Rows:
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="
                    bg-transparent
                    text-[13px]! font-semibold!
                    text-gray-700! dark:text-gray-300!
                    outline-none cursor-pointer
                  "
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option
                      key={size}
                      value={size}
                      className="bg-white dark:bg-gray-900!"
                    >
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[13px]! text-gray-500! dark:text-gray-400!">
                {startIndex + 1}-
                {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
                {filteredData.length}
              </div>
            </div>

            <div className="flex items-center gap-1!">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="
                  rounded-full! p-2!
                  text-gray-500! dark:text-gray-400!
                  hover:bg-gray-100! dark:hover:bg-gray-800!
                  disabled:opacity-20
                  transition-colors
                "
                aria-label="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="
                  rounded-full! p-2!
                  text-gray-500! dark:text-gray-400!
                  hover:bg-gray-100! dark:hover:bg-gray-800!
                  disabled:opacity-20
                  transition-colors
                "
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="px-4! text-[13px]! font-medium! text-gray-700! dark:text-gray-300!">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="
                  rounded-full! p-2!
                  text-gray-500! dark:text-gray-400!
                  hover:bg-gray-100! dark:hover:bg-gray-800!
                  disabled:opacity-20
                  transition-colors
                "
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="
                  rounded-full! p-2!
                  text-gray-500! dark:text-gray-400!
                  hover:bg-gray-100! dark:hover:bg-gray-800!
                  disabled:opacity-20
                  transition-colors
                "
                aria-label="Last page"
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
