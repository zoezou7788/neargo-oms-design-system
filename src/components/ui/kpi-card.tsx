/**
 * @component KpiCard
 * @description KPI 指标卡 — Dashboard 顶部的数据洞察卡，展示核心业务指标。
 *
 * @when-to-use
 *   ✅ Dashboard 页顶部 4 列指标网格
 *   ✅ 审批列表页顶部的待审批数、今日通过数等统计
 *   ❌ 表格内行数据展示 → 用普通 Cell
 *   ❌ 需要图表的趋势展示 → 在 KpiCard 下方补充 Chart
 *
 * @colors
 *   blue / green / orange / red / purple / gray（影响图标背景色）
 *
 * @props
 *   title       string          指标名称（简短，≤8 字）
 *   value       string|number   核心数值（自动处理数字格式）
 *   unit        string          单位（如"元"、"单"，附在数值后）
 *   trend       KpiTrend        趋势方向（"up" | "down" | "flat"）
 *   trendValue  string          趋势幅度（如"↑ 12%"）
 *   trendLabel  string          对比说明（如"vs 昨日"）
 *   icon        ElementType     Lucide 图标组件
 *   color       KpiColor        图标背景色系
 *   loading     boolean         骨架屏加载态
 *   onClick     () => void      点击跳转（添加 hover 样式）
 *
 * @example
 * ```tsx
 * import { KpiCard } from "@/components/ui/kpi-card"
 * import { ShoppingCart } from "lucide-react"
 *
 * <div className="grid grid-cols-4 gap-4">
 *   <KpiCard
 *     title="今日订单"
 *     value={1284}
 *     trend="up"
 *     trendValue="12%"
 *     trendLabel="vs 昨日"
 *     icon={ShoppingCart}
 *     color="blue"
 *   />
 * </div>
 * ```
 */
import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export type KpiTrend = "up" | "down" | "flat";
export type KpiColor = "blue" | "green" | "orange" | "red" | "purple" | "gray";

const COLOR_MAP: Record<KpiColor, { bg: string; icon: string }> = {
  blue:   { bg: "bg-[var(--blue-2)]",   icon: "text-[var(--blue-solid)]"   },
  green:  { bg: "bg-[var(--green-2)]",  icon: "text-[var(--green-solid)]"  },
  orange: { bg: "bg-[var(--orange-2)]", icon: "text-[var(--orange-9)]"     },
  red:    { bg: "bg-[var(--red-2)]",    icon: "text-[var(--red-solid)]"    },
  purple: { bg: "bg-[var(--purple-2)]", icon: "text-[var(--purple-9)]"     },
  gray:   { bg: "bg-[var(--gray-3)]",   icon: "text-[var(--gray-11)]"      },
};

export interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: KpiTrend;
  trendValue?: string;
  trendLabel?: string;
  icon?: React.ElementType;
  color?: KpiColor;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function KpiCard({
  title,
  value,
  unit,
  trend,
  trendValue,
  trendLabel,
  icon: Icon,
  color = "blue",
  loading = false,
  className,
  onClick,
}: KpiCardProps) {
  const colorCfg = COLOR_MAP[color];
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-[var(--green-solid)]" : trend === "down" ? "text-[var(--red-solid)]" : "text-[var(--gray-9)]";

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[var(--surface)] rounded-[8px] border border-[var(--border)] p-5",
        "flex flex-col gap-4",
        onClick && "cursor-pointer hover:border-[var(--gray-7)] transition-colors",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--gray-9)]">
          {title}
        </p>
        {Icon && (
          <div className={cn("w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0", colorCfg.bg)}>
            <Icon size={16} className={colorCfg.icon} />
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="h-8 w-24 rounded-[4px] bg-[var(--gray-3)] animate-pulse" />
          <div className="h-3 w-16 rounded-[4px] bg-[var(--gray-2)] animate-pulse" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-bold tracking-[-0.04em] text-[var(--gray-12)] tabular-nums leading-none">
              {value}
            </span>
            {unit && (
              <span className="text-[13px] font-medium text-[var(--gray-10)]">{unit}</span>
            )}
          </div>

          {(trend || trendLabel) && (
            <div className="flex items-center gap-1.5">
              {trend && (
                <span className={cn("flex items-center gap-0.5 text-[12px] font-medium", trendColor)}>
                  <TrendIcon size={12} />
                  {trendValue && <span>{trendValue}</span>}
                </span>
              )}
              {trendLabel && (
                <span className="text-[12px] text-[var(--gray-9)]">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// KPI card grid — 4-column default, responsive
export interface KpiGridProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}
export function KpiGrid({ children, cols = 4, className }: KpiGridProps) {
  return (
    <div className={cn(
      "grid gap-4",
      cols === 2 && "grid-cols-1 sm:grid-cols-2",
      cols === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      cols === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      className,
    )}>
      {children}
    </div>
  );
}
