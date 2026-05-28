/**
 * @component PageHeader / DashboardHeader / SectionHeader
 * @description 页面级标题区 — 面包屑 + 标题 + 副标题 + 右侧操作按钮的标准组合。
 *
 * @components
 *
 * PageHeader — 通用列表页/详情页标题（20px bold）
 *   breadcrumb → BreadcrumbItem[] 面包屑路径
 *   title      → 页面标题（必填）
 *   subtitle   → 灰色副标题（总条数、状态描述等）
 *   actions    → 右侧操作区（新建按钮、导出按钮等）
 *   bordered   → 标题区下方加 1px border（用于与内容区分隔）
 *   children   → 标题下方额外内容（通常放 SectionTabs）
 *
 * DashboardHeader — 仪表板专用标题（28px bold，含问候语）
 *   用于 Dashboard 首页，字号比 PageHeader 大
 *
 * SectionHeader — 页面内内容分区标题（15px semibold）
 *   用于 Card 内部或页面内多个子模块的分区标题
 *
 * @design-rule
 *   每个页面只有一个 PageHeader（或 DashboardHeader），放在 Main 的最顶部
 *   Section 内的小标题用 SectionHeader，不要用 PageHeader
 *
 * @example PageHeader（列表页标准用法）
 * ```tsx
 * import { PageHeader } from "@/components/layout/page-header"
 * import { Button } from "@/components/ui/button"
 * import { Plus, Download } from "lucide-react"
 *
 * <PageHeader
 *   breadcrumb={[{ label: "首页", href: "/" }, { label: "订单管理" }]}
 *   title="订单管理"
 *   subtitle="共 234 条待审批记录"
 *   actions={
 *     <>
 *       <Button variant="secondary" icon={<Download size={14} />}>导出</Button>
 *       <Button variant="primary"   icon={<Plus size={14} />}>新建订单</Button>
 *     </>
 *   }
 *   bordered
 * >
 *   <SectionTabs tabs={statusTabs} activeKey={activeTab} onTabChange={setActiveTab} />
 * </PageHeader>
 * ```
 *
 * @example DashboardHeader
 * ```tsx
 * <DashboardHeader
 *   greeting="早上好，张三 👋"
 *   subtitle="今天是周一，这是你的工作概览"
 *   actions={<Button variant="secondary">下载报告</Button>}
 * />
 * ```
 */
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
