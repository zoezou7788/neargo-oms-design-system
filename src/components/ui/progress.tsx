/**
 * @component Progress
 * @description 进度条 — 展示任务完成百分比，支持语义颜色。
 *
 * @when-to-use
 *   ✅ 文件上传进度
 *   ✅ 审批完成率、任务完成率
 *   ✅ 配额使用量（如存储空间）
 *   ❌ 步骤流程进度 → 用 Steps 组件
 *   ❌ 页面加载进度条（顶部细条）→ 用 nprogress 或框架内置
 *
 * @colors
 *   default → gray-12（黑色，通用）
 *   success → green-solid（完成率 100%）
 *   warning → orange-solid（接近阈值）
 *   danger  → red-solid（超额/异常）
 *   brand   → amber-9（品牌色，营销类指标）
 *
 * @sizes
 *   sm → 3px 高（顶部细进度条）
 *   md → 6px 高（默认，通用卡片内）
 *
 * @props
 *   value     number         当前值（0–max，必填）
 *   max       number         最大值（默认 100）
 *   size      "sm" | "md"    尺寸（默认 "md"）
 *   color     ProgressColor  颜色（默认 "default"）
 *   showLabel boolean        在进度条右侧显示百分比数字
 *   label     string         自定义标签文字（覆盖百分比）
 *
 * @example
 * ```tsx
 * import { Progress } from "@/components/ui/progress"
 *
 * // 文件上传进度
 * <Progress value={uploadProgress} color="brand" showLabel />
 *
 * // 审批完成率（带自定义标签）
 * <Progress value={24} max={30} color="success" label="24/30 已处理" showLabel />
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressColor = "default" | "success" | "warning" | "danger" | "brand";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;          // 0–100
  max?: number;
  size?: "sm" | "md";     // 3 | 6px height
  color?: ProgressColor;
  showLabel?: boolean;
  label?: string;
}

const colorMap: Record<ProgressColor, string> = {
  default: "var(--gray-12)",
  success: "var(--green-solid)",
  warning: "var(--orange-solid)",
  danger:  "var(--red-solid)",
  brand:   "var(--amber-9)",
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { className, value, max = 100, size = "md", color = "default",
      showLabel, label, ...props },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className={cn("flex flex-col gap-1", className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between text-[11px] text-[var(--text-low)]">
            <span>{label}</span>
            <span>{Math.round(pct)}%</span>
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full rounded-full bg-[var(--gray-4)] overflow-hidden",
            size === "sm" ? "h-[3px]" : "h-[6px]"
          )}
        >
          <div
            className="h-full rounded-full transition-[width] duration-slow ease-[var(--ease-out)]"
            style={{ width: `${pct}%`, background: colorMap[color] }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
