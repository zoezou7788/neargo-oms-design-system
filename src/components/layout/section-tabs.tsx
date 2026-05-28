/**
 * @component SectionTabs / TabHeader
 * @description 页面状态分类 Tab 导航 — 带数字角标的下划线 Tab，嵌入 PageHeader 或页面顶部。
 *
 * @variants
 *   "header" → 54px 高度，内嵌在 Topbar 高度区域（无底部 border）
 *   "page"   → 40px 高度，独立一行，带底部 border（位于 PageHeader 之下）
 *
 * @when-to-use vs Tabs（ui/tabs.tsx）
 *   ✅ SectionTabs：页面级状态筛选（全部/待审批/已通过/已拒绝），通常配合服务端数据过滤
 *   ✅ Tabs（ui/tabs.tsx）：页面内容区的本地视图切换（如详情页内的「基本信息/操作日志」）
 *
 * @props
 *   tabs       SectionTab[]                 Tab 配置（key/label/count?/disabled?）
 *   activeKey  string                       当前激活 key（受控）
 *   onTabChange (key) => void               切换回调
 *   variant    "header" | "page"            样式变体（默认 "header"）
 *
 * TabHeader — 预组合：SectionTabs + 右侧操作区（放 Button 等）
 *
 * @example 嵌入 PageHeader
 * ```tsx
 * import { SectionTabs } from "@/components/layout/section-tabs"
 *
 * const tabs = [
 *   { key: "all",      label: "全部",   count: 234 },
 *   { key: "pending",  label: "待审批", count: 28 },
 *   { key: "approved", label: "已通过", count: 186 },
 *   { key: "rejected", label: "已拒绝", count: 20 },
 * ]
 *
 * <PageHeader title="订单管理" bordered>
 *   <SectionTabs tabs={tabs} activeKey={tab} onTabChange={setTab} />
 * </PageHeader>
 * ```
 *
 * @example TabHeader（带右侧操作）
 * ```tsx
 * import { TabHeader } from "@/components/layout/section-tabs"
 *
 * <TabHeader
 *   tabs={tabs}
 *   activeKey={tab}
 *   onTabChange={setTab}
 *   right={<Button variant="primary" size="sm">新建订单</Button>}
 * />
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionTab {
  key: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface SectionTabsProps {
  tabs: SectionTab[];
  activeKey: string;
  onTabChange: (key: string) => void;
  variant?: "header" | "page";
  className?: string;
}

export function SectionTabs({
  tabs,
  activeKey,
  onTabChange,
  variant = "header",
  className,
}: SectionTabsProps) {
  return (
    <nav
      className={cn(
        "flex items-end gap-0",
        variant === "page" && "border-b border-[var(--border)] px-6",
        className,
      )}
      aria-label="页面分类"
    >
      {tabs.map(tab => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            onClick={() => !tab.disabled && onTabChange(tab.key)}
            disabled={tab.disabled}
            aria-selected={isActive}
            role="tab"
            className={cn(
              "relative flex items-center gap-1.5 px-3 text-[13px] font-medium transition-colors shrink-0",
              variant === "header" ? "h-[54px]" : "h-10",
              // Active
              isActive
                ? "text-[var(--gray-12)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1F1D1C] after:rounded-t-[2px]"
                : "text-[var(--gray-9)] hover:text-[var(--gray-11)]",
              tab.disabled && "opacity-40 cursor-not-allowed",
            )}
          >
            {tab.label}
            {tab.count != null && (
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-[9999px] text-[10px] font-semibold tabular-nums",
                  isActive
                    ? "bg-[var(--gray-12)] text-white"
                    : "bg-[var(--gray-3)] text-[var(--gray-10)]",
                )}
              >
                {tab.count > 999 ? "999+" : tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

// Convenience — topbar that combines left content + SectionTabs + right actions
export interface TabHeaderProps {
  tabs: SectionTab[];
  activeKey: string;
  onTabChange: (key: string) => void;
  right?: React.ReactNode;
  className?: string;
}

export function TabHeader({ tabs, activeKey, onTabChange, right, className }: TabHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between border-b border-[var(--border)] px-6", className)}>
      <SectionTabs
        tabs={tabs}
        activeKey={activeKey}
        onTabChange={onTabChange}
        variant="header"
      />
      {right && (
        <div className="flex items-center gap-2 pb-2">
          {right}
        </div>
      )}
    </div>
  );
}
