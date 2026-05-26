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
