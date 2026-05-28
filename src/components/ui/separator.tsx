/**
 * @component Separator
 * @description 分隔线 — 在内容区域之间添加视觉分隔。
 *
 * @when-to-use
 *   ✅ Sheet/Drawer 内不同信息分区之间
 *   ✅ 下拉菜单中的分组分隔（DropdownMenuSeparator 内部使用）
 *   ✅ 卡片内的分区分隔（有标题 CardHeader 时优先用 CardHeader 的 border-bottom）
 *   ❌ 表格行分隔 → 用 Table 自带的 border-b
 *
 * @props
 *   orientation   "horizontal" | "vertical"  方向（默认 "horizontal"）
 *   decorative    boolean                     true=纯装饰不设 role（默认 true）
 *
 * @example
 * ```tsx
 * import { Separator } from "@/components/ui/separator"
 *
 * // 水平分隔（默认）
 * <div>
 *   <OrderBasicInfo />
 *   <Separator />
 *   <OrderAmountInfo />
 * </div>
 *
 * // 垂直分隔（Topbar 中）
 * <div className="flex items-center h-5">
 *   <span>NearGo OMS</span>
 *   <Separator orientation="vertical" />
 *   <span>订单管理</span>
 * </div>
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      className={cn(
        "shrink-0 bg-[var(--border-subtle)]",
        orientation === "horizontal" ? "h-px w-full my-4" : "h-full w-px mx-3",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
