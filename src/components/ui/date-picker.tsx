/**
 * @component DatePicker
 * @description 日期选择器 — 弹出日历面板选择单个日期。
 *
 * @when-to-use
 *   ✅ 表单中的单日期字段（生效日期、截止日期）
 *   ❌ 需要选择日期区间 → 用 DateRangePicker
 *   ❌ FilterBar 中的快速日期筛选 → 用 DateRangePicker
 *
 * @props
 *   value       Date | undefined       当前选中日期（受控）
 *   onChange    (d?: Date) => void      变更回调
 *   placeholder string                 占位文字（默认"选择日期"）
 *   formatStr   string                 显示格式（默认"yyyy-MM-dd"）
 *   clearable   boolean                是否可清除（默认 true）
 *   disabled    boolean
 *
 * @example
 * ```tsx
 * import { DatePicker } from "@/components/ui/date-picker"
 *
 * <DatePicker
 *   value={effectiveDate}
 *   onChange={setEffectiveDate}
 *   placeholder="选择生效日期"
 * />
 * ```
 */
"use client";

import * as React from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Calendar } from "./calendar";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  formatStr?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "选择日期",
  disabled = false,
  className,
  clearable = true,
  formatStr = "yyyy-MM-dd",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex items-center gap-2 h-9 w-full px-3 rounded-[8px] text-[13px]",
            "border border-[var(--border)] bg-[var(--surface)]",
            "hover:border-[var(--gray-7)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            !value && "text-[var(--gray-9)]",
            value && "text-[var(--gray-12)]",
            className,
          )}
          aria-label={value ? format(value, formatStr) : placeholder}
        >
          <CalendarIcon size={14} className="text-[var(--gray-9)] shrink-0" />
          <span className="flex-1 text-left">
            {value ? format(value, formatStr, { locale: zhCN }) : placeholder}
          </span>
          {clearable && value && (
            <span
              role="button"
              onClick={e => { e.stopPropagation(); onChange?.(undefined); setOpen(false); }}
              className="text-[var(--gray-8)] hover:text-[var(--gray-12)] transition-colors"
            >
              <X size={13} />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={date => { onChange?.(date); setOpen(false); }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
