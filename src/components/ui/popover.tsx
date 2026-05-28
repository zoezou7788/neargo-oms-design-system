/**
 * @component Popover
 * @description 浮层面板 — 点击触发器后出现的非模态浮动内容，可包含交互元素。
 *
 * @when-to-use（Popover vs Tooltip）
 *   ✅ Popover：内容含交互元素（按钮、输入框、链接）
 *   ✅ Popover：内容超过 2 行文字
 *   ✅ Popover：DatePicker / Combobox 的下拉容器（内部实现）
 *   ❌ Tooltip：纯文字说明，无交互，hover 触发 → 用 Tooltip
 *
 * @composition（Radix UI Popover 原语）
 *   Popover              — 根组件（控制 open 状态）
 *   ├── PopoverTrigger   — 触发元素（asChild 传入任意元素）
 *   ├── PopoverContent   — 浮层内容（side/align 控制位置）
 *   └── PopoverClose     — 关闭按钮
 *
 * @props（PopoverContent）
 *   side      "top"|"right"|"bottom"|"left"   弹出方向（默认 "bottom"）
 *   align     "start"|"center"|"end"           对齐方式（默认 "center"）
 *   sideOffset number                          与触发元素的间距（默认 6）
 *   showClose boolean                          是否显示右上角关闭按钮（默认 false）
 *
 * @example 自定义内容浮层
 * ```tsx
 * import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
 *
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline" size="sm">筛选列</Button>
 *   </PopoverTrigger>
 *   <PopoverContent align="end" className="w-48">
 *     <ColumnVisibilityList table={table} />
 *   </PopoverContent>
 * </Popover>
 * ```
 */
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
const Popover = PopoverPrimitive.Root;

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
const PopoverTrigger = PopoverPrimitive.Trigger;

// ---------------------------------------------------------------------------
// Anchor
// ---------------------------------------------------------------------------
const PopoverAnchor = PopoverPrimitive.Anchor;

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------
const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-r3 p-1",
      "text-[var(--text-low)] hover:text-[var(--text-hi)]",
      "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-8)]",
      className
    )}
    {...props}
  >
    <X size={14} strokeWidth={2} />
    <span className="sr-only">关闭</span>
  </PopoverPrimitive.Close>
));
PopoverClose.displayName = PopoverPrimitive.Close.displayName;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "start", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        // Layout
        "relative z-50 min-w-[200px] p-4",
        // Surface
        "rounded-r4 border border-[var(--border)] bg-[var(--surface)]",
        // Shadow
        "shadow-sh4",
        // Animation — open
        "animate-in fade-in-0 zoom-in-95",
        // Animation — close
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        // Slide from opposite side
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose };
