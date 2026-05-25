import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Select } from "./select";

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
  showTotal?: boolean;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className,
  showTotal = true,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Build page range with ellipsis
  const pages = React.useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const range: (number | "...")[] = [];
    range.push(1);
    if (page > 4) range.push("...");
    for (let i = Math.max(2, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
      range.push(i);
    }
    if (page < totalPages - 3) range.push("...");
    range.push(totalPages);
    return range;
  }, [page, totalPages]);

  const startItem = Math.min((page - 1) * pageSize + 1, total);
  const endItem = Math.min(page * pageSize, total);

  return (
    <div className={cn("flex items-center justify-between gap-4 px-1 py-3", className)}>
      {showTotal && (
        <span className="text-[12px] text-[var(--gray-10)] shrink-0">
          共 <span className="font-medium text-[var(--gray-12)]">{total}</span> 条，
          当前 {startItem}–{endItem}
        </span>
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="上一页"
        >
          <ChevronLeft size={15} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="flex items-center justify-center w-8 h-8 text-[var(--gray-9)]">
              <MoreHorizontal size={15} />
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-[6px] text-[13px] font-medium transition-colors",
                page === p
                  ? "bg-[#1F1D1C] text-white"
                  : "text-[var(--gray-11)] hover:bg-[var(--gray-2)]",
              )}
              aria-current={page === p ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="下一页"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {onPageSizeChange && (
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[12px] text-[var(--gray-10)]">每页</span>
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            className="h-8 px-2 rounded-[6px] border border-[var(--border)] text-[13px] bg-[var(--surface)] text-[var(--gray-12)] focus:outline-none focus:ring-2 focus:ring-[#eceae7]"
          >
            {pageSizeOptions.map(s => (
              <option key={s} value={s}>{s} 条</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// Minimal inline page nav (for dialogs, small panels)
export interface PageNavProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}
export function PageNav({ page, totalPages, onPageChange, className }: PageNavProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center justify-center w-7 h-7 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} />
      </button>
      <span className="text-[12px] text-[var(--gray-10)] tabular-nums">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center justify-center w-7 h-7 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
