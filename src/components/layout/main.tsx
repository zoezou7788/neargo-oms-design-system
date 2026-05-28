/**
 * @component Main / ContentCard / ContentStack / TwoColumnLayout
 * @description 页面主内容区容器 — 在 AuthenticatedLayout 的 children 内包裹页面内容。
 *
 * @components
 *
 * Main — 主内容区包装器
 *   fluid=true  → 全宽（默认，适合列表页、仪表板）
 *   fluid=false → max-w-3xl 居中（适合设置页、窄表单页）
 *   fixed=true  → flex-col + overflow-hidden（适合详情页有粘性右侧面板时）
 *
 * ContentCard — 白色卡片容器（radius-4, 1px border）
 *   用于将表单分区、详情信息组包裹为视觉独立区块
 *
 * ContentStack — 纵向间距统一的内容堆叠容器（默认 gap-5=24px）
 *   用于页面内多个 ContentCard 或 section 的纵向排列
 *
 * TwoColumnLayout — 左主列 + 右面板（detail/approval 页标准布局）
 *   main  → 主内容（flex-1）
 *   panel → 右侧面板（默认 320px，sticky top-6）
 *
 * @example 列表页（全宽）
 * ```tsx
 * import { Main } from "@/components/layout/main"
 *
 * <Main>
 *   <PageHeader title="订单管理" actions={<Button>新建</Button>} />
 *   <DataTable ... />
 * </Main>
 * ```
 *
 * @example 详情页（双栏布局）
 * ```tsx
 * import { Main, TwoColumnLayout } from "@/components/layout/main"
 *
 * <Main fixed>
 *   <TwoColumnLayout
 *     main={<OrderDetailContent />}
 *     panel={<ApprovalPanel />}
 *     panelWidth={360}
 *   />
 * </Main>
 * ```
 *
 * @example 表单页（居中窄布局）
 * ```tsx
 * <Main fluid={false}>
 *   <ContentStack>
 *     <ContentCard><BasicInfoForm /></ContentCard>
 *     <ContentCard><ContactForm /></ContentCard>
 *   </ContentStack>
 * </Main>
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MainProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * fixed — enables flex-col + overflow-hidden for split-pane pages.
   * Use for detail pages with sticky right panel.
   */
  fixed?: boolean;
  /**
   * fluid — removes max-width constraint.
   * Default: true (OMS data tables need full width).
   * Set false for narrow forms / settings pages (max-w-3xl centered).
   */
  fluid?: boolean;
  /** Extra inner padding class override */
  padding?: string;
  ref?: React.Ref<HTMLElement>;
}

export function Main({
  fixed = false,
  fluid = true,
  padding,
  className,
  children,
  ref,
  ...props
}: MainProps) {
  return (
    <main
      ref={ref}
      className={cn(
        // Base padding
        padding ?? "px-6 py-6",
        // Fixed mode — for detail pages with overflow control
        fixed && "flex grow flex-col overflow-hidden",
        // Constrained mode — for settings/forms (narrow centered)
        !fluid && "max-w-3xl mx-auto w-full",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}

// ── Content containers ────────────────────────────────────────

/**
 * ContentCard — white surface card for page sections.
 * Wraps content in a rounded-[8px] card (radius-4).
 */
export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string;
}

export function ContentCard({ padding = "p-5", className, children, ...props }: ContentCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--surface)] rounded-[8px] border border-[var(--border)]",
        padding,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * ContentStack — vertical stack of content sections with consistent gap.
 */
export function ContentStack({
  gap = "gap-5",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { gap?: string }) {
  return (
    <div className={cn("flex flex-col", gap, className)} {...props}>
      {children}
    </div>
  );
}

/**
 * TwoColumnLayout — left main column + right sidebar panel.
 * Used on detail/approval pages (main content + 320px context panel).
 */
export interface TwoColumnLayoutProps {
  main: React.ReactNode;
  panel: React.ReactNode;
  panelWidth?: number;
  className?: string;
}

export function TwoColumnLayout({ main, panel, panelWidth = 320, className }: TwoColumnLayoutProps) {
  return (
    <div className={cn("flex items-start gap-5", className)}>
      <div className="flex-1 min-w-0">{main}</div>
      <aside
        className="shrink-0 sticky top-6"
        style={{ width: panelWidth }}
      >
        {panel}
      </aside>
    </div>
  );
}
