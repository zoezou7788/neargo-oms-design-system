/**
 * @component DataTableToolbar
 * @description DataTable 工具栏 — 搜索框 + 筛选器 + 列显示控制 + 自定义操作按钮。
 *
 * @when-to-use
 *   ✅ DataTable 的 toolbar prop 插槽中使用（几乎所有列表页都需要）
 *
 * @props
 *   table             Table<TData>    TanStack Table 实例
 *   searchColumn      string          启用搜索的列 key（如 "storeName"）
 *   searchPlaceholder string          搜索框占位（默认"搜索..."）
 *   filters           ReactNode       筛选器插槽（放置 DataTableFacetedFilter）
 *   actions           ReactNode       右侧操作区（新建按钮、导出按钮等）
 *
 * @example
 * ```tsx
 * import { DataTableToolbar } from "@/components/ui/data-table/toolbar"
 *
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   toolbar={(table) => (
 *     <DataTableToolbar
 *       table={table}
 *       searchColumn="storeName"
 *       searchPlaceholder="搜索门店名称…"
 *       filters={
 *         <DataTableFacetedFilter
 *           column={table.getColumn("status")}
 *           title="状态"
 *           options={statusOptions}
 *         />
 *       }
 *       actions={
 *         <Button variant="primary" size="sm" icon={<Plus size={13} />}>新建订单</Button>
 *       }
 *     />
 *   )}
 * />
 * ```
 */
"use client";

import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { X, Search, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder = "搜索...",
  filters,
  actions,
  className,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchValue = searchColumn
    ? (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
    : "";

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-2 flex-1 flex-wrap">
        {searchColumn && (
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--gray-9)] pointer-events-none" />
            <input
              value={searchValue}
              onChange={e => table.getColumn(searchColumn)?.setFilterValue(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                "h-8 pl-8 pr-3 w-[200px] rounded-[8px] text-[13px]",
                "border border-[var(--border)] bg-[var(--surface)] text-[var(--gray-12)]",
                "placeholder:text-[var(--gray-9)]",
                "focus:outline-none focus:ring-2 focus:ring-[#eceae7] focus:w-[280px]",
                "transition-[width] duration-150",
              )}
            />
          </div>
        )}

        {filters}

        {isFiltered && (
          <button
            onClick={() => table.resetColumnFilters()}
            className="inline-flex items-center gap-1 h-8 px-3 rounded-[9999px] text-[12px] text-[var(--gray-10)] hover:text-[var(--gray-12)] border border-[var(--border)] hover:border-[var(--gray-7)] transition-colors"
          >
            重置
            <X size={11} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {actions}

        {/* Column visibility toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-[12px] font-medium text-[var(--gray-11)] border border-[var(--border)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors">
              <Settings2 size={13} />
              列显示
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>切换列显示</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(col => typeof col.accessorFn !== "undefined" && col.getCanHide())
              .map(col => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={v => col.toggleVisibility(!!v)}
                >
                  {typeof col.columnDef.header === "string" ? col.columnDef.header : col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
