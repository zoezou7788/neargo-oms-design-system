/**
 * @component StatusIndicator
 * @description 状态指示器 — 始终以"圆点 + 文字"组合展示状态，不允许单独使用颜色。
 *
 * @accessibility-rule
 *   ❗ WCAG 1.4.1：不得仅靠颜色传达状态信息。
 *   StatusIndicator 自动满足此要求（dot + text 双重编码）。
 *
 * @status-types（来自 tokens.ts，不可随意扩展）
 *   pending      → 灰色，待处理
 *   in-review    → 蓝色，审核中
 *   approved     → 绿色，已审批
 *   rejected     → 红色，已拒绝
 *   cancelled    → 浅灰，已取消
 *   on-hold      → 橙色，搁置中
 *
 * @sizes
 *   sm → 11px 字号，表格密集行
 *   md → 12.5px 字号（默认）
 *
 * @example
 * ```tsx
 * import { StatusIndicator } from "@/components/ui/status-indicator"
 *
 * // 基础用法（使用 tokens 默认标签）
 * <StatusIndicator status="approved" />
 *
 * // 覆盖默认文字
 * <StatusIndicator status="in-review" label="终审中" />
 *
 * // 表格紧凑模式
 * <StatusIndicator status="pending" size="sm" />
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/tokens";
import type { StatusType } from "@/lib/tokens";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  /** Override default label */
  label?: string;
  size?: "sm" | "md";
}

/**
 * StatusIndicator — dot + text
 *
 * Design System Rule: Status MUST always show both a colored dot
 * AND a text label. Never use color alone to convey state.
 */
const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ status, label, size = "md", className, ...props }, ref) => {
    const colors = STATUS_COLORS[status];
    const text   = label ?? STATUS_LABELS[status] ?? status;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5",
          size === "sm" ? "text-[11px]" : "text-[12.5px]",
          className
        )}
        aria-label={`状态：${text}`}
        {...props}
      >
        <span
          className={cn(
            "rounded-full shrink-0",
            size === "sm" ? "w-1.5 h-1.5" : "w-[6px] h-[6px]"
          )}
          style={{ background: colors.dot }}
          aria-hidden="true"
        />
        <span style={{ color: colors.text }}>{text}</span>
      </span>
    );
  }
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
