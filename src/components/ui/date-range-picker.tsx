/**
 * @component DateRangePicker
 * @description 日期区间选择器 — 弹出双月历面板选择开始和结束日期。
 *
 * @when-to-use
 *   ✅ FilterBar 中的"创建时间范围"筛选
 *   ✅ 报表页的统计周期选择
 *   ❌ 只需单个日期 → 用 DatePicker
 *
 * @props
 *   value          DateRange | undefined    { from?: Date, to?: Date }（受控）
 *   onChange       (r?: DateRange) => void  变更回调
 *   placeholder    string                   占位（默认"选择日期区间"）
 *   numberOfMonths number                   同时显示月历数（默认 2）
 *   formatStr      string                   日期格式（默认"yyyy-MM-dd"）
 *   disabled       boolean
 *
 * @example
 * ```tsx
 * import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker"
 *
 * const [range, setRange] = React.useState<DateRange>()
 *
 * <DateRangePicker
 *   value={range}
 *   onChange={setRange}
 *   placeholder="创建时间范围"
 * />
 * ```
 */
"use client";

import * as React from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, ArrowRight, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Calendar } from "./calendar";

export type { DateRange };

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  numberOfMonths?: number;
  formatStr?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "选择日期区间",
  disabled = false,
  className,
  numberOfMonths = 2,
  formatStr = "yyyy-MM-dd",
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const displayText = React.useMemo(() => {
    if (!value?.from) return null;
    const from = format(value.from, formatStr, { locale: zhCN });
    const to = value.to ? format(value.to, formatStr, { locale: zhCN }) : "…";
    return `${from} → ${to}`;
  }, [value, formatStr]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex items-center gap-2 h-9 min-w-[240px] px-3 rounded-[8px] text-[13px]",
            "border border-[var(--border)] bg-[var(--surface)]",
            "hover:border-[var(--gray-7)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            !displayText && "text-[var(--gray-9)]",
            displayText && "text-[var(--gray-12)]",
            className,
          )}
        >
          <CalendarIcon size={14} className="text-[var(--gray-9)] shrink-0" />
          <span className="flex-1 text-left font-mono text-[12px]">
            {displayText ?? placeholder}
          </span>
          {value?.from && (
            <span
              role="button"
              onClick={e => { e.stopPropagation(); onChange?.(undefined); }}
              className="text-[var(--gray-8)] hover:text-[var(--gray-12)] transition-colors"
            >
              <X size={13} />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={numberOfMonths}
          initialFocus
        />
        {value?.from && value?.to && (
          <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)]">
            <span className="text-[12px] text-[var(--gray-10)] font-mono">
              {format(value.from, formatStr)} → {format(value.to, formatStr)}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[12px] font-medium text-[var(--gray-12)] hover:text-[var(--gray-10)] transition-colors"
            >
              确认
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

// Preset date range shortcuts (useful for report filters)
export const DATE_RANGE_PRESETS = {
  today: { label: "今天", getDates: () => { const d = new Date(); return { from: d, to: d }; } },
  yesterday: { label: "昨天", getDates: () => { const d = new Date(); d.setDate(d.getDate() - 1); return { from: d, to: d }; } },
  last7: { label: "近7天", getDates: () => { const to = new Date(); const from = new Date(); from.setDate(from.getDate() - 6); return { from, to }; } },
  last30: { label: "近30天", getDates: () => { const to = new Date(); const from = new Date(); from.setDate(from.getDate() - 29); return { from, to }; } },
  thisMonth: { label: "本月", getDates: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now }; } },
  lastMonth: { label: "上月", getDates: () => { const now = new Date(); const from = new Date(now.getFullYear(), now.getMonth() - 1, 1); const to = new Date(now.getFullYear(), now.getMonth(), 0); return { from, to }; } },
} as const;

export interface DateRangePickerWithPresetsProps extends DateRangePickerProps {
  showPresets?: boolean;
}

export function DateRangePickerWithPresets({ showPresets = true, value, onChange, ...props }: DateRangePickerWithPresetsProps) {
  const [open, setOpen] = React.useState(false);

  if (!showPresets) return <DateRangePicker value={value} onChange={onChange} {...props} />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 h-9 min-w-[240px] px-3 rounded-[8px] text-[13px]",
            "border border-[var(--border)] bg-[var(--surface)]",
            "hover:border-[var(--gray-7)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
            !value?.from && "text-[var(--gray-9)]",
            value?.from && "text-[var(--gray-12)]",
            props.className,
          )}
        >
          <CalendarIcon size={14} className="text-[var(--gray-9)] shrink-0" />
          <span className="flex-1 text-left font-mono text-[12px]">
            {value?.from
              ? `${format(value.from, "yyyy-MM-dd")} → ${value.to ? format(value.to, "yyyy-MM-dd") : "…"}`
              : props.placeholder ?? "选择日期区间"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <div className="flex flex-col gap-0.5 p-2 border-r border-[var(--border)] w-[100px]">
            {Object.entries(DATE_RANGE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => { onChange?.(preset.getDates()); setOpen(false); }}
                className="text-left text-[12px] px-2 py-1.5 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
