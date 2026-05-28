/**
 * @component Tooltip
 * @description 工具提示 — 鼠标悬停时展示辅助说明文字，不影响页面布局。
 *
 * @when-to-use
 *   ✅ 图标按钮（无文字标签时）的功能说明
 *   ✅ 表格单元格文字溢出截断时展示完整内容
 *   ✅ 表单字段的帮助提示（？图标 + Tooltip）
 *   ❌ 内容较长（>2 行）→ 用 Popover
 *   ❌ 需要用户交互（点击、复制）→ 用 Popover
 *
 * @props（Radix UI Tooltip 原语）
 *   TooltipProvider    — 全局 Provider（放在 App 根节点，设置 delayDuration）
 *   Tooltip            — 根组件
 *   TooltipTrigger     — 触发元素（asChild 传入任意元素）
 *   TooltipContent     — 提示内容（side: "top"|"right"|"bottom"|"left"）
 *
 * @design-rules
 *   - 触发延迟：hover 300ms（TooltipProvider delayDuration={300}）
 *   - 内容限制：≤ 2 行纯文字，不放交互元素
 *   - 背景：gray-12（#1F1D1C），白色文字，12px
 *
 * @example
 * ```tsx
 * import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
 * import { Info } from "lucide-react"
 *
 * // 图标按钮提示
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="ghost" size="sm" icon={<Info size={14} />} />
 *   </TooltipTrigger>
 *   <TooltipContent side="top">该字段为必填，格式：手机号或邮箱</TooltipContent>
 * </Tooltip>
 *
 * // 截断文字提示
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <span className="truncate max-w-[120px] block">{longText}</span>
 *   </TooltipTrigger>
 *   <TooltipContent>{longText}</TooltipContent>
 * </Tooltip>
 * ```
 */
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
const TooltipProvider = ({ children, ...props }: TooltipPrimitive.TooltipProviderProps) => (
  <TooltipPrimitive.Provider delayDuration={300} {...props}>
    {children}
  </TooltipPrimitive.Provider>
);
TooltipProvider.displayName = "TooltipProvider";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
const Tooltip = TooltipPrimitive.Root;

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
const TooltipTrigger = TooltipPrimitive.Trigger;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // Base
        "z-50 max-w-[220px] px-2 py-1",
        "rounded-r3 bg-[var(--gray-12)] text-white",
        "text-[12px] leading-relaxed",
        // Animation
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
        "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-[var(--gray-12)]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// SimpleTooltip — convenience wrapper
// ---------------------------------------------------------------------------
interface SimpleTooltipProps {
  /** The tooltip label text or node */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** Side the tooltip appears on (default: "top") */
  side?: TooltipPrimitive.TooltipContentProps["side"];
  /** Extra className forwarded to TooltipContent */
  contentClassName?: string;
  /** Override default delayDuration (ms) */
  delayDuration?: number;
}

const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  content,
  children,
  side = "top",
  contentClassName,
  delayDuration,
}) => (
  <TooltipProvider delayDuration={delayDuration}>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={contentClassName}>
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
SimpleTooltip.displayName = "SimpleTooltip";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
};
