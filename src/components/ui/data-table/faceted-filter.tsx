/**
 * @component DataTableFacetedFilter
 * @description 多值筛选下拉 — 支持勾选多个值过滤表格列，显示当前该值的数量。
 *
 * @when-to-use
 *   ✅ 表格工具栏中对枚举字段（状态、类型、门店）进行多值过滤
 *   ✅ 在 DataTableToolbar 的 filters 插槽中使用
 *
 * @props
 *   column   Column<TData, TValue>      TanStack Table 列实例（用于读写过滤值）
 *   title    string                     筛选器标签（如"状态"、"类型"）
 *   options  FacetedFilterOption[]      选项列表（value/label/icon?/count?）
 *
 * @example
 * ```tsx
 * import { DataTableFacetedFilter } from "@/components/ui/data-table/faceted-filter"
 *
 * // 在 DataTableToolbar 的 filters 插槽中
 * <DataTableToolbar
 *   table={table}
 *   filters={
 *     <>
 *       <DataTableFacetedFilter
 *         column={table.getColumn("status")}
 *         title="状态"
 *         options={[
 *           { value: "pending",   label: "待审批", icon: Clock },
 *           { value: "approved",  label: "已通过", icon: Check },
 *           { value: "rejected",  label: "已拒绝", icon: X },
 *         ]}
 *       />
 *     </>
 *   }
 * />
 * ```
 */
"use client";

import * as React from "react";
import { type Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "../command";

export interface FacetedFilterOption {
  value: string;
  label: string;
  icon?: React.ElementType;
  count?: number;
}

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  options: FacetedFilterOption[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-1.5 h-8 px-3 rounded-[9999px] text-[12px] font-medium",
            "border transition-colors",
            selectedValues.size > 0
              ? "border-[#1F1D1C] text-[var(--gray-12)]"
              : "border-[var(--border)] text-[var(--gray-11)] hover:border-[var(--gray-7)] hover:text-[var(--gray-12)]",
          )}
        >
          <PlusCircle size={13} />
          {title}
          {selectedValues.size > 0 && (
            <>
              <span className="mx-0.5 h-3.5 w-px bg-[var(--border)]" />
              {selectedValues.size > 2 ? (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-[9999px] bg-[var(--gray-3)] text-[10px] font-bold">
                  {selectedValues.size}
                </span>
              ) : (
                Array.from(selectedValues).map(v => {
                  const opt = options.find(o => o.value === v);
                  return opt ? (
                    <span key={v} className="px-1.5 py-0.5 rounded-[9999px] bg-[var(--gray-3)] text-[10px] font-medium">
                      {opt.label}
                    </span>
                  ) : null;
                })
              )}
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>无匹配项</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value);
                const Icon = option.icon;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "bg-[#1F1D1C] border-[#1F1D1C]" : "border-[var(--border)]",
                    )}>
                      {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                    </div>
                    {Icon && <Icon size={14} className="text-[var(--gray-9)]" />}
                    <span className="text-[13px]">{option.label}</span>
                    {option.count != null && (
                      <span className="ml-auto text-[11px] text-[var(--gray-9)] tabular-nums">{option.count}</span>
                    )}
                    {facets?.get(option.value) != null && (
                      <span className="ml-auto text-[11px] text-[var(--gray-9)] tabular-nums">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-[12px] text-[var(--gray-10)]"
                  >
                    清除筛选
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
