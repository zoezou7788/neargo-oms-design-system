/**
 * @component Calendar
 * @description 日历面板 — 独立的日期选择面板，通常作为 DatePicker / DateRangePicker 的内嵌视图。
 *
 * @when-to-use
 *   ✅ 作为 DatePicker 或 DateRangePicker 的底层视图组件（通常不直接使用）
 *   ✅ 需要将日历面板内嵌在页面中（不弹出 Popover），如日程视图
 *   ❌ 表单中的日期输入 → 用 DatePicker（含触发按钮 + Popover 容器）
 *   ❌ 日期区间筛选 → 用 DateRangePicker
 *
 * @note
 *   基于 react-day-picker，样式完全通过 classNames prop 注入 NearGo token，
 *   不依赖 react-day-picker/style.css，需确保 globals.css 在应用根节点加载。
 *
 * @props
 *   完整继承 DayPickerProps（react-day-picker v9）
 *   mode              "single" | "range" | "multiple"  日期选择模式
 *   selected          Date | DateRange | Date[]         当前选中值（受控）
 *   onSelect          回调                               选中变更
 *   showOutsideDays   boolean                           显示当月以外的日期（默认 true）
 *   numberOfMonths    number                            同时显示月历数（range 模式默认 2）
 *
 * @example 内嵌单选日历
 * ```tsx
 * import { Calendar } from "@/components/ui/calendar"
 *
 * <Calendar
 *   mode="single"
 *   selected={selectedDate}
 *   onSelect={setSelectedDate}
 * />
 * ```
 *
 * @example 内嵌区间日历
 * ```tsx
 * <Calendar
 *   mode="range"
 *   selected={range}
 *   onSelect={setRange}
 *   numberOfMonths={2}
 * />
 * ```
 */
"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
// Note: react-day-picker/style.css intentionally NOT imported here.
// All styles are provided via the classNames prop below using NearGo design tokens.
// If you see unstyled gaps, check that globals.css is loaded in your app root.

export type CalendarProps = DayPickerProps & { className?: string };

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 select-none", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex items-center justify-between h-8 px-1",
        caption_label: "text-[13px] font-semibold text-[var(--gray-12)]",
        nav: "flex items-center gap-1",
        button_previous: cn(
          "flex items-center justify-center w-7 h-7 rounded-[6px]",
          "text-[var(--gray-10)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
          "transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
        ),
        button_next: cn(
          "flex items-center justify-center w-7 h-7 rounded-[6px]",
          "text-[var(--gray-10)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
          "transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-[11px] font-medium text-[var(--gray-9)] text-center pb-1",
        week: "flex w-full mt-1",
        day: cn(
          "relative p-0 text-center text-[13px] focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-[var(--amber-2)]",
          "[&:has([aria-selected].day-range-end)]:rounded-r-[6px]",
          "[&:has([aria-selected].day-range-start)]:rounded-l-[6px]",
          "[&:has([aria-selected].day-outside)]:bg-[var(--amber-1)]",
        ),
        day_button: cn(
          "flex items-center justify-center w-9 h-9 rounded-[6px] font-normal",
          "text-[var(--gray-12)] hover:bg-[var(--gray-2)] transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[#eceae7]",
          "aria-selected:bg-[#1F1D1C] aria-selected:text-white aria-selected:hover:bg-[#1F1D1C]",
        ),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected: "text-white",
        today: "text-[var(--amber-9)] font-bold",
        outside: "text-[var(--gray-8)] opacity-50",
        disabled: "text-[var(--gray-7)] opacity-40 cursor-not-allowed",
        range_middle: "aria-selected:bg-[var(--amber-2)] aria-selected:text-[var(--gray-12)]",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft size={14} /> : <ChevronRight size={14} />,
      }}
      {...props}
    />
  );
}
