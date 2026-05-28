/**
 * @component MultiSelect
 * @description 多选选择器 — 带搜索的多选下拉，以标签形式展示已选项。
 *
 * @when-to-use
 *   ✅ 筛选多个门店
 *   ✅ 为审批单指派多个审批人
 *   ✅ 商品多分类标签
 *   ❌ 单选 → 用 Select 或 Combobox
 *   ❌ 选项 ≤ 5 个 → 用 CheckboxGroup 更直观
 *
 * @props
 *   options       MultiSelectOption[]  选项列表
 *   value         string[]             已选值数组（受控）
 *   onChange      (v: string[]) => void 变更回调
 *   maxDisplay    number               标签最多显示个数，超出折叠（默认 3）
 *   placeholder   string               未选中时占位（默认"请选择"）
 *   disabled      boolean
 *
 * @example
 * ```tsx
 * import { MultiSelect } from "@/components/ui/multi-select"
 *
 * <MultiSelect
 *   options={[
 *     { value: "store-001", label: "朝阳旗舰店" },
 *     { value: "store-002", label: "海淀科技店" },
 *   ]}
 *   value={selectedStores}
 *   onChange={setSelectedStores}
 *   placeholder="选择门店（可多选）"
 *   maxDisplay={2}
 * />
 * ```
 */
"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./command";

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  maxDisplay?: number;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "请选择",
  searchPlaceholder = "搜索...",
  emptyText = "无匹配项",
  disabled = false,
  maxDisplay = 3,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange?.(value.filter(v => v !== optValue));
    } else {
      onChange?.([...value, optValue]);
    }
  };

  const removeItem = (e: React.MouseEvent, optValue: string) => {
    e.stopPropagation();
    onChange?.(value.filter(v => v !== optValue));
  };

  const selectedLabels = value
    .map(v => options.find(o => o.value === v)?.label)
    .filter(Boolean) as string[];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-multiselectable="true"
          disabled={disabled}
          className={cn(
            "flex items-center gap-1.5 flex-wrap min-h-9 w-full px-2.5 py-1.5 rounded-[8px] text-[13px] text-left",
            "border border-[var(--border)] bg-[var(--surface)]",
            "hover:border-[var(--gray-7)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
        >
          {value.length === 0 ? (
            <span className="text-[var(--gray-9)] flex-1">{placeholder}</span>
          ) : (
            <>
              {selectedLabels.slice(0, maxDisplay).map(label => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[9999px] bg-[var(--gray-3)] text-[var(--gray-12)] text-[12px] font-medium"
                >
                  {label}
                  <span
                    role="button"
                    onClick={e => removeItem(e, options.find(o => o.label === label)!.value)}
                    className="text-[var(--gray-9)] hover:text-[var(--gray-12)] transition-colors"
                  >
                    <X size={10} />
                  </span>
                </span>
              ))}
              {selectedLabels.length > maxDisplay && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-[9999px] bg-[var(--gray-3)] text-[var(--gray-11)] text-[12px]">
                  +{selectedLabels.length - maxDisplay}
                </span>
              )}
              <span className="flex-1" />
            </>
          )}
          <ChevronDown
            size={14}
            className={cn("text-[var(--gray-9)] shrink-0 ml-auto transition-transform", open && "rotate-180")}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  onSelect={() => toggle(option.value)}
                  className="flex items-center gap-2"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors",
                    value.includes(option.value)
                      ? "bg-[#1F1D1C] border-[#1F1D1C]"
                      : "border-[var(--border)]",
                  )}>
                    {value.includes(option.value) && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px]">{option.label}</span>
                    {option.description && (
                      <span className="text-[11px] text-[var(--gray-9)]">{option.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {value.length > 0 && (
            <div className="border-t border-[var(--border)] p-2 flex justify-between items-center">
              <span className="text-[12px] text-[var(--gray-10)]">已选 {value.length} 项</span>
              <button
                onClick={() => onChange?.([])}
                className="text-[12px] text-[var(--gray-10)] hover:text-[var(--gray-12)] transition-colors"
              >
                清除全部
              </button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
