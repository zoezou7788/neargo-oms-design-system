import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * OmsLayout — top-level page shell.
 *
 * Implements the 3-zone grid from the design spec §08:
 *   - Topbar (54px, sticky, z-sticky=200)
 *   - Sidebar (232px at xl, 200px at lg, 64px at md)
 *   - Content area (scrollable, gray-1 bg, 24px padding)
 *
 * Usage:
 *   <OmsLayout sidebar={<OmsSidebar />} topbar={<OmsTopbar />}>
 *     <PageContent />
 *   </OmsLayout>
 */
interface OmsLayoutProps {
  topbar: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  /** Right-side detail/context panel (360px) */
  panel?: React.ReactNode;
  className?: string;
}

export const OmsLayout: React.FC<OmsLayoutProps> = ({
  topbar, sidebar, children, panel, className,
}) => (
  <div className={cn("min-h-screen bg-[var(--bg)] font-sans", className)}>
    {/* Topbar */}
    <header
      className="fixed top-0 left-0 right-0 h-[54px] bg-[var(--surface)] border-b border-[var(--border)]"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      {topbar}
    </header>

    <div className="flex pt-[54px] min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-[54px] left-0 bottom-0 bg-[var(--surface)] border-r border-[var(--border)] overflow-y-auto",
          // Responsive widths via CSS (see globals.css .oms-sidebar)
          "w-[var(--sidebar-w-full)] lg:w-[var(--sidebar-w-compact)] md:w-[var(--sidebar-w-icon)]"
        )}
        style={{ zIndex: "var(--z-sticky)" }}
      >
        {sidebar}
      </aside>

      {/* Content */}
      <main
        className={cn(
          "flex-1 overflow-y-auto p-5 min-h-[calc(100vh-54px)]",
          "ml-[var(--sidebar-w-full)] lg:ml-[var(--sidebar-w-compact)] md:ml-[var(--sidebar-w-icon)]",
          panel ? "mr-[360px]" : ""
        )}
      >
        <div className="max-w-[1100px] mx-auto">{children}</div>
      </main>

      {/* Context panel (optional) */}
      {panel && (
        <aside
          className="fixed top-[54px] right-0 bottom-0 w-[360px] bg-[var(--surface)] border-l border-[var(--border)] overflow-y-auto"
          style={{ zIndex: "var(--z-raised)" }}
        >
          {panel}
        </aside>
      )}
    </div>
  </div>
);

// ── Content inner wrappers ─────────────────────────────────────
/** Standard page header: breadcrumb + title + optional actions */
export const PageHeader: React.FC<{
  breadcrumb?: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}> = ({ breadcrumb, title, subtitle, actions, className }) => (
  <div className={cn("flex items-start justify-between gap-4 mb-5", className)}>
    <div>
      {breadcrumb && <div className="text-xs text-[var(--text-low)] mb-1">{breadcrumb}</div>}
      <h1 className="text-[20px] font-bold text-[var(--text-hi)] tracking-[-0.03em] leading-tight">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-[var(--text-low)] mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
