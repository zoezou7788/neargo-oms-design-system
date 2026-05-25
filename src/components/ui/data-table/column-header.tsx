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
