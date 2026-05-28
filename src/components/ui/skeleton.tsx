/**
 * @component Skeleton
 * @description 骨架屏 — 数据加载时的内容占位，减少布局抖动，提升感知性能。
 *
 * @when-to-use
 *   ✅ 优先于 LoadingOverlay：数据首次加载、SSR 水合前
 *   ✅ 表格行加载（每行用 Skeleton 占位，而非整体转菊花）
 *   ✅ KPI 卡片数字加载
 *   ❌ 用户主动触发的操作（提交/保存）→ 用 Button loading 或 LoadingOverlay
 *
 * @variants
 *   line   → 行文字占位（默认，14px 高度可调）
 *   rect   → 矩形区块（图片、卡片、图表区）
 *   circle → 圆形（头像、圆形图标）
 *
 * @props
 *   variant    "line"|"circle"|"rect"   形状（默认 "line"）
 *   lineHeight number                   行高 px（variant="line" 时有效，默认 14）
 *   lines      number                   重复行数（自动末行缩短 40% 宽度）
 *   className  string                   覆盖宽高（rect/circle 必须通过此传入尺寸）
 *
 * @example
 * ```tsx
 * import { Skeleton } from "@/components/ui/skeleton"
 *
 * // 多行文本占位
 * <Skeleton variant="line" lines={3} />
 *
 * // 头像占位
 * <Skeleton variant="circle" className="w-10 h-10" />
 *
 * // 图表区占位
 * <Skeleton variant="rect" className="w-full h-48 rounded-r4" />
 *
 * // 表格行骨架
 * {loading && Array.from({ length: 5 }).map((_, i) => (
 *   <tr key={i}>
 *     <td><Skeleton lineHeight={12} className="w-32" /></td>
 *     <td><Skeleton lineHeight={12} className="w-20" /></td>
 *   </tr>
 * ))}
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "line" | "circle" | "rect";
  /** For variant="line": height in px, defaults to 14 */
  lineHeight?: number;
  /** Repeat n skeleton lines */
  lines?: number;
}

const shimmer = [
  "animate-[shimmer_1.4s_ease-in-out_infinite]",
  "bg-[linear-gradient(90deg,var(--gray-3)_25%,var(--gray-2)_50%,var(--gray-3)_75%)]",
  "[background-size:800px_100%]",
].join(" ");

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "line", lineHeight = 14, lines = 1, style, ...props }, ref) => {
    if (lines > 1) {
      return (
        <div className={cn("flex flex-col gap-2", className)}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(shimmer, "rounded-full")}
              style={{ height: lineHeight, width: i === lines - 1 ? "60%" : "100%", ...style }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          shimmer,
          variant === "circle" && "rounded-full",
          variant === "line"   && "rounded-full",
          variant === "rect"   && "rounded-r4",
          className
        )}
        style={{ height: variant === "line" ? lineHeight : undefined, ...style }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
