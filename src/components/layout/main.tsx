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
