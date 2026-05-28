/**
 * @component EmptyState
 * @description 空状态 — 当列表/页面无内容时展示的引导型占位组件。
 *
 * @variants（选择最符合当前场景的类型）
 *   no-data       → 列表为空，从未有过数据（首次使用）
 *   no-results    → 搜索/筛选后无匹配结果
 *   no-permission → 无访问权限（403）
 *   not-found     → 资源不存在或已删除（404）
 *   server-error  → 后端异常（500）
 *
 * @props
 *   variant     EmptyVariant    空状态类型（影响图标、标题、描述）
 *   title       string          覆盖默认标题
 *   description string          覆盖默认描述
 *   action      ReactNode       操作按钮（如"新建订单"、"清除筛选"）
 *   size        "sm" | "md"     sm 用于表格内内联，md 用于整页（默认 md）
 *   className   string
 *
 * @example 搜索无结果（表格内）
 * ```tsx
 * import { EmptyState } from "@/components/ui/empty-state"
 *
 * <EmptyState
 *   variant="no-results"
 *   size="sm"
 *   action={
 *     <Button variant="secondary" size="sm" onClick={clearFilters}>
 *       清除筛选条件
 *     </Button>
 *   }
 * />
 * ```
 *
 * @example 首次使用引导
 * ```tsx
 * <EmptyState
 *   variant="no-data"
 *   title="还没有任何订单"
 *   description="创建第一条订单，开始管理您的门店业务。"
 *   action={
 *     <Button variant="primary" icon={<Plus size={14} />}>新建订单</Button>
 *   }
 * />
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// ─────────────────────────────────────────────────────────────
// Empty State Variants
//
// Each variant has a pre-defined icon, title, and description.
// Override title/description via props as needed.
// ─────────────────────────────────────────────────────────────
type EmptyVariant =
  | "no-data"        // generic empty list
  | "no-results"     // search returned nothing
  | "no-permission"  // 403 / insufficient access
  | "not-found"      // 404 / resource deleted
  | "server-error";  // 500 / backend failure

interface EmptyConfig {
  icon: string;
  title: string;
  description: string;
}

const EMPTY_CONFIGS: Record<EmptyVariant, EmptyConfig> = {
  "no-data": {
    icon: "□",
    title: "暂无数据",
    description: "当前列表为空，有新数据时将在此显示",
  },
  "no-results": {
    icon: "◎",
    title: "未找到匹配结果",
    description: "请尝试修改搜索关键词或调整筛选条件",
  },
  "no-permission": {
    icon: "⊘",
    title: "暂无访问权限",
    description: "您没有查看此内容的权限，请联系管理员",
  },
  "not-found": {
    icon: "◇",
    title: "内容不存在",
    description: "该页面或记录已被删除，或链接已失效",
  },
  "server-error": {
    icon: "⚡",
    title: "加载失败",
    description: "服务器响应异常，请稍后重试或联系技术支持",
  },
};

// ─────────────────────────────────────────────────────────────
// Typography specs (from design spec § 23 Empty State):
//   icon:        40px, opacity 0.4
//   title:       15px / 600 / --text-hi
//   description: 13px / 400 / --text-low (max-width 320px)
//   action:      btn-secondary (or btn-primary for main recovery)
// ─────────────────────────────────────────────────────────────
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: EmptyVariant;
  /** Override default icon */
  icon?: React.ReactNode;
  /** Override default title */
  title?: string;
  /** Override default description */
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  /** Compact mode for table rows / small containers */
  compact?: boolean;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant = "no-data",
      icon,
      title,
      description,
      action,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const config = EMPTY_CONFIGS[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          compact ? "py-10 px-4" : "py-16 px-6",
          className
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        {/* Icon */}
        <div
          className={cn(
            "text-[var(--text-disabled)] mb-4",
            compact ? "text-3xl" : "text-[40px]"
          )}
          aria-hidden="true"
        >
          {icon ?? config.icon}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-semibold text-[var(--text-hi)] mb-1.5",
            compact ? "text-sm" : "text-[15px]"
          )}
        >
          {title ?? config.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-[var(--text-low)] leading-relaxed max-w-[320px]",
            compact ? "text-xs" : "text-[13px]"
          )}
        >
          {description ?? config.description}
        </p>

        {/* Action */}
        {action && (
          <div className="mt-5">
            <Button
              variant={action.variant ?? "secondary"}
              size={compact ? "sm" : "md"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

// ─────────────────────────────────────────────────────────────
// LoadingState — Skeleton wrapper with consistent layout
// Use this in place of EmptyState during data fetch.
// ─────────────────────────────────────────────────────────────
import { Skeleton } from "./skeleton";

export interface LoadingStateProps {
  /** Number of skeleton rows to show */
  rows?: number;
  /** Show a header skeleton above rows */
  showHeader?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  rows = 5,
  showHeader = true,
  className,
}) => (
  <div
    className={cn("p-4", className)}
    role="status"
    aria-label="加载中"
    aria-live="polite"
    aria-busy="true"
  >
    {showHeader && (
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32 ml-auto" />
      </div>
    )}
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="flex gap-4 py-3 border-b border-[var(--gray-3)]"
        style={{ opacity: 1 - i * 0.12 }}
      >
        {/* ID column */}
        <Skeleton variant="line" className="w-28 shrink-0" />
        {/* Type badge */}
        <Skeleton variant="line" className="w-20 shrink-0" />
        {/* Title */}
        <Skeleton variant="line" className="flex-1" />
        {/* Status */}
        <Skeleton variant="line" className="w-24 shrink-0" />
        {/* Time */}
        <Skeleton variant="line" className="w-20 shrink-0" />
      </div>
    ))}
    <span className="sr-only">数据加载中，请稍候</span>
  </div>
);

export { EmptyState };
