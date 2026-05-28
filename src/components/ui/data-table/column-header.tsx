/**
 * @component DataTableColumnHeader
 * @description 可排序列标题 — 带升序/降序/取消排序的列头按钮，含隐藏列选项。
 *
 * @when-to-use
 *   ✅ 在 ColumnDef 的 header 中使用，替代普通字符串，让该列支持排序
 *   ❌ 不需要排序的列 → 直接 header: "列名" 即可
 *
 * @props
 *   column   Column<TData, TValue>   TanStack Table 列实例
 *   title    string                  列显示标题
 *
 * @example
 * ```tsx
 * import { DataTableColumnHeader } from "@/components/ui/data-table/column-header"
 *
 * const columns: ColumnDef<Order>[] = [
 *   {
 *     accessorKey: "amount",
 *     enableSorting: true,
 *     header: ({ column }) => <DataTableColumnHeader column={column} title="申请金额" />,
 *   },
 * ]
 * ```
 */
import * as React from "react";
import { type Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ChevronsUpDown, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../dropdown-menu";

export interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <span className={cn("text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--gray-9)]", className)}>
        {title}
      </span>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 -ml-1 px-1 h-7 rounded-[4px]",
            "text-[12px] font-semibold uppercase tracking-[0.04em]",
            "text-[var(--gray-9)] hover:text-[var(--gray-12)] hover:bg-[var(--gray-3)]",
            "focus:outline-none transition-colors",
            column.getIsSorted() && "text-[var(--gray-12)]",
            className,
          )}
        >
          {title}
          {column.getIsSorted() === "asc" ? (
            <ArrowUp size={12} className="text-[var(--gray-12)]" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown size={12} className="text-[var(--gray-12)]" />
          ) : (
            <ChevronsUpDown size={12} className="text-[var(--gray-7)]" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp size={12} className="mr-2" />升序
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDown size={12} className="mr-2" />降序
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOff size={12} className="mr-2" />隐藏列
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
