"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableEmpty,
} from "../table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyText?: string;
  selectable?: boolean;
  defaultPageSize?: number;
  manualPagination?: boolean;
  pageCount?: number;
  onPaginationChange?: (state: PaginationState) => void;
  manualSorting?: boolean;
  onSortingChange?: (state: SortingState) => void;
  manualFiltering?: boolean;
  onColumnFiltersChange?: (state: ColumnFiltersState) => void;
  toolbar?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  emptyText = "暂无数据",
  selectable = false,
  defaultPageSize = 20,
  manualPagination = false,
  pageCount,
  onPaginationChange,
  manualSorting = false,
  onSortingChange,
  manualFiltering = false,
  onColumnFiltersChange,
  toolbar,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: !manualSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: !manualFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: !manualPagination ? getPaginationRowModel() : undefined,
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount: manualPagination ? pageCount : undefined,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    onSortingChange: manualSorting
      ? s => { const v = typeof s === "function" ? s(sorting) : s; setSorting(v); onSortingChange?.(v); }
      : setSorting,
    onColumnFiltersChange: manualFiltering
      ? f => { const v = typeof f === "function" ? f(columnFilters) : f; setColumnFilters(v); onColumnFiltersChange?.(v); }
      : setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: manualPagination
      ? p => { const v = typeof p === "function" ? p(pagination) : p; setPagination(v); onPaginationChange?.(v); }
      : setPagination,
    enableRowSelection: selectable,
  });

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {toolbar?.(table)}

      <div className="rounded-[8px] border border-[var(--border)] overflow-hidden bg-[var(--surface)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id} className="border-0 bg-[var(--gray-2)] hover:bg-[var(--gray-2)]">
                {hg.headers.map(header => (
                  <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b border-[#f2f1ef]">
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-4 rounded-[4px] bg-[var(--gray-2)] animate-pulse w-3/4" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableEmpty colSpan={columns.length}>{emptyText}</TableEmpty>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="border-b border-[#f2f1ef] hover:bg-[var(--gray-2)] data-[state=selected]:bg-[var(--amber-2)] transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
