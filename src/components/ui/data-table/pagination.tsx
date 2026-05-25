import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showRowSelection?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
  showRowSelection = false,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex items-center justify-between px-1 py-3 gap-4">
      {showRowSelection && (
        <span className="text-[12px] text-[var(--gray-10)] shrink-0">
          {selectedCount > 0
            ? `已选 ${selectedCount} / ${totalRows} 行`
            : `共 ${totalRows} 行`}
        </span>
      )}
      {!showRowSelection && (
        <span className="text-[12px] text-[var(--gray-10)] shrink-0">
          共 <span className="font-medium text-[var(--gray-12)]">{totalRows}</span> 条，
          当前 {startRow}–{endRow}
        </span>
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="第一页"
        >
          <ChevronsLeft size={15} />
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="上一页"
        >
          <ChevronLeft size={15} />
        </button>

        <span className="flex items-center gap-1 px-2">
          <span className="text-[13px] font-medium text-[var(--gray-12)] tabular-nums">{pageIndex + 1}</span>
          <span className="text-[12px] text-[var(--gray-9)]">/</span>
          <span className="text-[12px] text-[var(--gray-9)] tabular-nums">{pageCount || 1}</span>
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="下一页"
        >
          <ChevronRight size={15} />
        </button>
        <button
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="最后一页"
        >
          <ChevronsRight size={15} />
        </button>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[12px] text-[var(--gray-10)]">每页</span>
        <select
          value={pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          className="h-8 px-2 rounded-[6px] border border-[var(--border)] text-[13px] bg-[var(--surface)] text-[var(--gray-12)] focus:outline-none focus:ring-2 focus:ring-[#eceae7]"
        >
          {pageSizeOptions.map(s => (
            <option key={s} value={s}>{s} 条</option>
          ))}
        </select>
      </div>
    </div>
  );
}
