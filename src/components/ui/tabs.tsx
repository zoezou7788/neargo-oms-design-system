/**
 * @component Tabs
 * @description 标签页 — 在同一区域内切换多个相关视图/内容。
 *
 * @variants
 *   underline → 下划线激活指示器（默认），用于页面级内容切换（如订单状态分组）
 *   card      → 卡片胶囊样式，用于次级内容区域内的切换（如详情页内的 Tab 组）
 *
 * @design-rules
 *   - Tab 数量建议 2-6 个，超过 6 个用 Select 或 Sidebar 分组
 *   - badge 超出 99 显示"99+"
 *   - 键盘：← → 切换，Enter/Space 激活
 *
 * @props
 *   tabs            Tab[]                    Tab 配置数组（key/label/badge?/disabled?）
 *   activeKey       string                   当前激活的 key（受控）
 *   onChange        (key: string) => void    切换回调
 *   variant         "underline" | "card"     样式变体（默认 "underline"）
 *   children        ReactNode                Tab 面板内容（与 activeKey 联动展示）
 *
 * @example
 * ```tsx
 * import { Tabs } from "@/components/ui/tabs"
 *
 * const tabs = [
 *   { key: "all",       label: "全部",   badge: 234 },
 *   { key: "pending",   label: "待审批", badge: 28 },
 *   { key: "approved",  label: "已通过" },
 *   { key: "rejected",  label: "已拒绝", disabled: true },
 * ]
 *
 * <Tabs
 *   tabs={tabs}
 *   activeKey={activeTab}
 *   onChange={setActiveTab}
 *   variant="underline"
 * >
 *   {activeTab === "pending" && <PendingList />}
 *   {activeTab === "approved" && <ApprovedList />}
 * </Tabs>
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  key: string;
  label: string;
  badge?: number;
  disabled?: boolean;
}
export interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: "underline" | "card";
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode; // tab panels
}

/**
 * Tabs — underline or card variant.
 *
 * Motion: active indicator uses --transition-layout (250ms ease-inout)
 * Color:  active underline = gray-12; card active = surface + shadow-1
 *
 * Keyboard: ← → switch tabs, Enter/Space select (see accessibility.ts)
 */
const Tabs: React.FC<TabsProps> = ({
  tabs, activeKey, onChange, variant = "underline", className, contentClassName, children,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, key: string, idx: number) => {
    if (e.key === "ArrowRight") {
      const next = tabs.findIndex((_, i) => i > idx && !tabs[i].disabled);
      if (next !== -1) onChange(tabs[next].key);
    }
    if (e.key === "ArrowLeft") {
      const prev = [...tabs].slice(0, idx).reverse().findIndex(t => !t.disabled);
      if (prev !== -1) onChange(tabs[idx - prev - 1].key);
    }
    if (e.key === "Enter" || e.key === " ") onChange(key);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        role="tablist"
        className={cn(
          "flex overflow-x-auto",
          variant === "underline"
            ? "border-b border-[var(--border)]"
            : "gap-1 bg-[var(--gray-3)] rounded-r4 p-[3px]"
        )}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            role="tab"
            type="button"
            id={`tab-${tab.key}`}
            aria-selected={activeKey === tab.key}
            aria-controls={`panel-${tab.key}`}
            disabled={tab.disabled}
            tabIndex={activeKey === tab.key ? 0 : -1}
            onClick={() => !tab.disabled && onChange(tab.key)}
            onKeyDown={e => handleKeyDown(e, tab.key, idx)}
            className={cn(
              "inline-flex items-center gap-1.5 text-[13px] whitespace-nowrap",
              "transition-all duration-normal ease-[var(--ease-inout)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)]",
              "disabled:opacity-45 disabled:cursor-not-allowed",
              variant === "underline"
                ? [
                    "px-4 py-2.5 border-b-2 -mb-px",
                    activeKey === tab.key
                      ? "border-[var(--gray-12)] text-[var(--text-hi)] font-medium"
                      : "border-transparent text-[var(--text-mid)] hover:text-[var(--text-hi)]",
                  ]
                : [
                    "px-3 py-1.5 rounded-r3",
                    activeKey === tab.key
                      ? "bg-[var(--surface)] shadow-sh1 text-[var(--text-hi)] font-medium"
                      : "text-[var(--text-mid)] hover:text-[var(--text-hi)]",
                  ]
            )}
          >
            {tab.label}
            {tab.badge != null && tab.badge > 0 && (
              <span className="min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-[var(--red-solid)] text-white rounded-full text-[10px] font-bold">
                {tab.badge > 99 ? "99+" : tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {children && (
        <div className={cn("pt-4", contentClassName)} role="tabpanel" id={`panel-${activeKey}`} aria-labelledby={`tab-${activeKey}`}>
          {children}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";
export { Tabs };
export type { Tab, TabsProps };
