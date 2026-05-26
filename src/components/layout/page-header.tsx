import * as React from "react";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/components/ui/breadcrumb";

export interface PageHeaderProps {
  /** Page title — 20px bold, tracking-[-0.03em] */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Breadcrumb trail */
  breadcrumb?: BreadcrumbItem[];
  /** Right-side slot — primary action button etc. */
  actions?: React.ReactNode;
  /** Extra content below the title row (e.g. SectionTabs) */
  children?: React.ReactNode;
  /** If true, adds bottom border */
  bordered?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  children,
  bordered = false,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-6 pt-6",
        bordered ? "pb-4 border-b border-[var(--border)]" : "pb-2",
        className,
      )}
    >
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb items={breadcrumb} />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[20px] font-bold text-[var(--gray-12)] tracking-[-0.03em] leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-[var(--gray-9)] mt-1 leading-normal">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            {actions}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

// Dashboard-specific header — greeting at 28px (spec: 仪表板专用档)
export interface DashboardHeaderProps {
  greeting: string;           // e.g. "早上好，张三"
  subtitle?: string;          // e.g. "今天是周一，这是你的工作概览"
  actions?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({ greeting, subtitle, actions, className }: DashboardHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between px-6 pt-7 pb-5", className)}>
      <div>
        <h1 className="text-[28px] font-bold text-[var(--gray-12)] tracking-[-0.04em] leading-tight">
          {greeting}
        </h1>
        {subtitle && (
          <p className="text-[13px] text-[var(--gray-9)] mt-1.5">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}

// Section header — used inside a page to separate content zones
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, actions, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)}>
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--gray-12)] tracking-[-0.02em]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[12px] text-[var(--gray-9)] mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}
