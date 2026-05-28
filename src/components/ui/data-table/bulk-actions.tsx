/**
 * @component DataTableBulkActions
 * @description DataTable 批量操作栏 — 多选行后在 Toolbar 区浮出的操作按钮组。
 *
 * @when-to-use
 *   ✅ 表格开启 selectable=true 后，需要批量通过/拒绝/导出/删除时
 *   通常由 DataTableToolbar 内部条件渲染，不需要手动控制显示
 *
 * @props
 *   table    Table<TData>         TanStack Table 实例
 *   actions  BulkAction[]         操作按钮配置
 *            每项：{ label, icon?, variant?, onClick(selectedRows), loading? }
 *
 * @example
 * ```tsx
 * import { DataTableBulkActions } from "@/components/ui/data-table/bulk-actions"
 * import { Check, X } from "lucide-react"
 *
 * <DataTableBulkActions
 *   table={table}
 *   actions={[
 *     { label: "批量通过", icon: Check, variant: "default",      onClick: (rows) => batchApprove(rows) },
 *     { label: "批量拒绝", icon: X,     variant: "danger",       onClick: (rows) => batchReject(rows), loading: isProcessing },
 *   ]}
 * />
 * ```
 */
import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BulkAction {
  label: string;
  icon?: React.ElementType;
  variant?: "default" | "danger";
  onClick: (selectedRows: unknown[]) => void;
  loading?: boolean;
}

export interface DataTableBulkActionsProps<TData> {
  table: Table<TData>;
  actions: BulkAction[];
  className?: string;
}

export function DataTableBulkActions<TData>({
  table,
  actions,
  className,
}: DataTableBulkActionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const count = selectedRows.length;

  if (count === 0) return null;

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-[8px]",
      "bg-[#1F1D1C] text-white",
      "animate-in slide-in-from-bottom-2 duration-150",
      className,
    )}>
      <button
        onClick={() => table.resetRowSelection()}
        className="flex items-center justify-center w-5 h-5 rounded-[4px] hover:bg-white/10 transition-colors"
        aria-label="取消选择"
      >
        <X size={13} />
      </button>
      <span className="text-[13px] font-medium">已选 {count} 项</span>
      <span className="w-px h-4 bg-white/20" />

      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button
            key={i}
            onClick={() => action.onClick(selectedRows.map(r => r.original))}
            disabled={action.loading}
            className={cn(
              "inline-flex items-center gap-1.5 h-7 px-3 rounded-[6px] text-[12px] font-medium",
              "transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
              action.variant === "danger"
                ? "bg-white/10 text-[var(--red-3)] hover:bg-[var(--red-solid)] hover:text-white"
                : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            {Icon && <Icon size={13} />}
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
