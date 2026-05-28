/**
 * @component Combobox
 * @description 带搜索的单选下拉 — 适合选项较多（>10 条）、需要模糊搜索的场景。
 *
 * @when-to-use
 *   ✅ 门店选择（86+ 门店，需搜索）
 *   ✅ 用户/审批人选择
 *   ✅ 商品类目选择
 *   ❌ 选项 ≤ 10 条 → 用 Select（原生下拉，性能更好）
 *   ❌ 需要多选 → 用 MultiSelect
 *
 * @props
 *   options           ComboboxOption[]   选项列表 { value, label, description?, disabled? }
 *   value             string             当前选中值（受控）
 *   onChange          (v) => void        选中回调
 *   placeholder       string             未选中时的占位文字（默认"请选择"）
 *   searchPlaceholder string             搜索框占位（默认"搜索..."）
 *   emptyText         string             无匹配时的提示（默认"无匹配项"）
 *   clearable         boolean            是否可清除（默认 true）
 *   disabled          boolean            禁用
 *
 * @example
 * ```tsx
 * import { Combobox } from "@/components/ui/combobox"
 *
 * const storeOptions = [
 *   { value: "store-001", label: "朝阳旗舰店", description: "北京 · 旗舰" },
 *   { value: "store-002", label: "海淀科技店", description: "北京 · 旗舰" },
 * ]
 *
 * <Combobox
 *   options={storeOptions}
 *   value={selectedStore}
 *   onChange={setSelectedStore}
 *   placeholder="选择所属门店"
 *   searchPlaceholder="搜索门店名称…"
 * />
 * ```
 */
"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import {
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
} from "./command";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "请选择",
  searchPlaceholder = "搜索...",
  emptyText = "无匹配项",
  disabled = false,
  clearable = true,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex items-center gap-2 h-9 w-full px-3 rounded-[8px] text-[13px] text-left",
            "border border-[var(--border)] bg-[var(--surface)]",
            "hover:border-[var(--gray-7)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
        >
          <span className={cn("flex-1 truncate", !selected && "text-[var(--gray-9)]")}>
            {selected?.label ?? placeholder}
          </span>
          {clearable && selected ? (
            <span
              role="button"
              onClick={e => { e.stopPropagation(); onChange?.(undefined); }}
              className="text-[var(--gray-8)] hover:text-[var(--gray-12)] transition-colors shrink-0"
            >
              <X size={13} />
            </span>
          ) : (
            <ChevronDown
              size={14}
              className={cn("text-[var(--gray-9)] shrink-0 transition-transform", open && "rotate-180")}
            />
          )}
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
                  onSelect={() => {
                    onChange?.(option.value === value ? undefined : option.value);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Check
                    size={14}
                    className={cn(
                      "shrink-0 transition-opacity",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
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
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Group variant — options in labeled groups
export interface ComboboxGroupOption {
  group: string;
  options: ComboboxOption[];
}

export interface GroupedComboboxProps extends Omit<ComboboxProps, "options"> {
  groups: ComboboxGroupOption[];
}

export function GroupedCombobox({ groups, ...props }: GroupedComboboxProps) {
  const allOptions = groups.flatMap(g => g.options);
  const [open, setOpen] = React.useState(false);
  const selected = allOptions.find(o => o.value === props.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          disabled={props.disabled}
          className={cn(
            "flex items-center gap-2 h-9 w-full px-3 rounded-[8px] text-[13px] text-left",
            "border border-[var(--border)] bg-[var(--surface)]",
            "hover:border-[var(--gray-7)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            props.className,
          )}
        >
          <span className={cn("flex-1 truncate", !selected && "text-[var(--gray-9)]")}>
            {selected?.label ?? props.placeholder ?? "请选择"}
          </span>
          <ChevronDown size={14} className={cn("text-[var(--gray-9)] shrink-0 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={props.searchPlaceholder ?? "搜索..."} />
          <CommandList>
            <CommandEmpty>{props.emptyText ?? "无匹配项"}</CommandEmpty>
            {groups.map(g => (
              <CommandGroup key={g.group} heading={g.group}>
                {g.options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => {
                      props.onChange?.(option.value === props.value ? undefined : option.value);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Check size={14} className={cn("shrink-0", props.value === option.value ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
