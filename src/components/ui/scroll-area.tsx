/**
 * @component ScrollArea / ScrollBar
 * @description 自定义滚动区域 — 用 NearGo 样式的细滚动条替代浏览器原生滚动条。
 *
 * @when-to-use
 *   ✅ Sheet / Drawer 的 body 区域（内容过长需滚动）
 *   ✅ 下拉列表（Combobox 的 CommandList 内部）
 *   ✅ 长列表容器（固定高度 + 可滚动）
 *   ❌ 整页内容 → 用原生 overflow-y-auto（性能更好）
 *
 * @design-rule
 *   滚动条宽度 4px，背景透明，thumb 颜色 var(--gray-4)，hover 时 var(--gray-6)
 *
 * @props（ScrollArea）
 *   className   string      覆盖容器样式（通常设置固定高度）
 *   children    ReactNode
 *
 * @example
 * ```tsx
 * import { ScrollArea } from "@/components/ui/scroll-area"
 *
 * // 固定高度的可滚动列表
 * <ScrollArea className="h-[320px] w-full">
 *   {items.map(item => <ListItem key={item.id} {...item} />)}
 * </ScrollArea>
 *
 * // Sheet body 内使用
 * <SheetBody>
 *   <ScrollArea className="h-full">
 *     <OrderDetailContent />
 *   </ScrollArea>
 * </SheetBody>
 * ```
 */
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ScrollArea
// ---------------------------------------------------------------------------

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden rounded-[inherit]", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>

    {/* Vertical scrollbar */}
    <ScrollBar orientation="vertical" />

    {/* Horizontal scrollbar */}
    <ScrollBar orientation="horizontal" />

    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

// ---------------------------------------------------------------------------
// ScrollBar
// ---------------------------------------------------------------------------

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex select-none touch-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaThumb />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// ---------------------------------------------------------------------------
// ScrollAreaThumb (internal, also exported for custom use)
// ---------------------------------------------------------------------------

const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaThumb>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaThumb>
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaThumb
    ref={ref}
    className={cn(
      "relative flex-1 rounded-full",
      "bg-[var(--gray-6)] hover:bg-[var(--gray-8)]",
      "transition-colors",
      className,
    )}
    {...props}
  />
));
ScrollAreaThumb.displayName = ScrollAreaPrimitive.ScrollAreaThumb.displayName;

export { ScrollArea, ScrollBar, ScrollAreaThumb };
