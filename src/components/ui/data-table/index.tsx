/**
 * @component DataTable
 * @description OMS 数据表格 — 集成 TanStack Table v8，支持排序、多选、分页、骨架屏、空状态。
 *
 * @when-to-use
 *   ✅ 所有列表页的数据展示（订单列表、门店列表、审批列表）
 *   ✅ 需要排序、多选批量操作、前端/服务端分页
 *   ❌ 简单静态只读表格（< 5 列、无交互）→ 用 Table 原语
 *
 * @props
 *   columns              ColumnDef[]         列定义（TanStack Table 格式）
 *   data                 TData[]             数据数组
 *   loading              boolean             加载态（显示骨架屏）
 *   emptyText            string              空状态文字（默认"暂无数据"）
 *   selectable           boolean             开启行多选（默认 false）
 *   defaultPageSize      number              初始每页条数（默认 20）
 *   manualPagination     boolean             服务端分页模式（默认 false）
 *   pageCount            number              服务端分页时的总页数
 *   onPaginationChange   (state) => void     分页变更回调（服务端模式）
 *   manualSorting        boolean             服务端排序模式（默认 false）
 *   onSortingChange      (state) => void     排序变更回调（服务端模式）
 *   toolbar              (table) => ReactNode 工具栏插槽（搜索、操作按钮）
 *
 * @example 前端分页（小数据量）
 * ```tsx
 * import { DataTable } from "@/components/ui/data-table"
 * import { type ColumnDef } from "@tanstack/react-table"
 *
 * const columns: ColumnDef<Order>[] = [
 *   { accessorKey: "id",     header: "订单号",  cell: ({ row }) => <span className="font-mono">{row.original.id}</span> },
 *   { accessorKey: "store",  header: "门店" },
 *   { accessorKey: "amount", header: "金额",    enableSorting: true },
 *   { accessorKey: "status", header: "状态",    cell: ({ row }) => <StatusIndicator status={row.original.status} /> },
 * ]
 *
 * <DataTable
 *   columns={columns}
 *   data={orders}
 *   loading={isLoading}
 *   selectable
 *   toolbar={(table) => (
 *     <DataTableToolbar table={table} searchColumn="store" actions={<NewOrderButton />} />
 *   )}
 * />
 * ```
 *
 * @example 服务端分页（大数据量，推荐）
 * ```tsx
 * <DataTable
 *   columns={columns}
 *   data={pageData}
 *   loading={isFetching}
 *   manualPagination
 *   pageCount={totalPages}
 *   onPaginationChange={({ pageIndex, pageSize }) => {
 *     setPage(pageIndex + 1)
 *     setPageSize(pageSize)
 *   }}
 *   manualSorting
 *   onSortingChange={setSortState}
 * />
 * ```
 */
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
