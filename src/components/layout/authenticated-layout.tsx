"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LayoutProvider, useLayout } from "@/context/layout-provider";

// ── Dimensions ──────────────────────────────────────────────
export const TOPBAR_HEIGHT  = 54;   // px
export const SIDEBAR_FULL   = 232;  // px
export const SIDEBAR_ICON   = 56;   // px
export const PANEL_WIDTH    = 360;  // px — right context panel

// ── Inner layout that consumes context ──────────────────────
interface AuthenticatedLayoutInnerProps {
  sidebar: React.ReactNode;
  header:  React.ReactNode;
  children: React.ReactNode;
  panel?: React.ReactNode;
  className?: string;
}

function AuthenticatedLayoutInner({
  sidebar, header, children, panel, className,
}: AuthenticatedLayoutInnerProps) {
  const { collapsible } = useLayout();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [mobileOpen,  setMobileOpen]  = React.useState(false);

  // Effective sidebar width on desktop
  const sidebarWidth =
    collapsible === "none"        ? SIDEBAR_FULL :
    sidebarOpen                   ? SIDEBAR_FULL :
    collapsible === "icon"        ? SIDEBAR_ICON : 0;

  // On mobile, sidebar is always offcanvas (overlay)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className={cn("min-h-screen bg-[var(--bg)]", className)}>
      {/* ── Topbar ──────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)]"
        style={{ height: TOPBAR_HEIGHT, zIndex: 200 }}
      >
        {React.isValidElement(header)
          ? React.cloneElement(header as React.ReactElement<{
              onToggleSidebar?: () => void;
              sidebarOpen?: boolean;
            }>, {
              onToggleSidebar: () => {
                if (isMobile) setMobileOpen(o => !o);
                else setSidebarOpen(o => !o);
              },
              sidebarOpen,
            })
          : header}
      </header>

      {/* ── Mobile overlay ──────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          style={{ zIndex: 190 }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex" style={{ paddingTop: TOPBAR_HEIGHT }}>
        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside
          className={cn(
            "fixed bottom-0 bg-[var(--surface)] border-r border-[var(--border)]",
            "flex-shrink-0 overflow-hidden transition-[width] duration-200",
            // Mobile: offcanvas slide in/out
            "max-md:translate-x-0 max-md:transition-transform",
            mobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
          )}
          style={{
            top: TOPBAR_HEIGHT,
            width: SIDEBAR_FULL,    // Mobile always 232px (shown/hidden via translate)
            zIndex: 195,
            // Desktop: width transition
            ...(typeof window !== "undefined" && window.innerWidth >= 768
              ? { width: sidebarWidth }
              : {}),
          }}
          aria-label="主导航"
        >
          {React.isValidElement(sidebar)
            ? React.cloneElement(sidebar as React.ReactElement<{
                collapsed?: boolean;
                onClose?: () => void;
              }>, {
                collapsed: !sidebarOpen && collapsible === "icon",
                onClose:   () => setMobileOpen(false),
              })
            : sidebar}
        </aside>

        {/* ── Main content ──────────────────────────────────── */}
        <main
          className={cn(
            "flex-1 min-h-[calc(100vh-54px)] overflow-y-auto",
            "transition-[margin] duration-200",
          )}
          style={{
            marginLeft: typeof window !== "undefined" && window.innerWidth < 768 ? 0 : sidebarWidth,
            marginRight: panel ? PANEL_WIDTH : 0,
          }}
        >
          {children}
        </main>

        {/* ── Right context panel (optional) ──────────────────── */}
        {panel && (
          <aside
            className="fixed right-0 bottom-0 bg-[var(--surface)] border-l border-[var(--border)] overflow-y-auto"
            style={{
              top:   TOPBAR_HEIGHT,
              width: PANEL_WIDTH,
              zIndex: 10,
            }}
            aria-label="详情面板"
          >
            {panel}
          </aside>
        )}
      </div>
    </div>
  );
}

// ── Public API ───────────────────────────────────────────────
export interface AuthenticatedLayoutProps extends AuthenticatedLayoutInnerProps {}

/**
 * AuthenticatedLayout — root shell for all post-login pages.
 *
 * Wraps LayoutProvider so layout settings are always available.
 *
 * Usage:
 *   <AuthenticatedLayout
 *     header={<AppHeader />}
 *     sidebar={<AppSidebar />}
 *     panel={detailOpen ? <ContextPanel /> : undefined}
 *   >
 *     <Outlet />
 *   </AuthenticatedLayout>
 */
export function AuthenticatedLayout(props: AuthenticatedLayoutProps) {
  return (
    <LayoutProvider>
      <AuthenticatedLayoutInner {...props} />
    </LayoutProvider>
  );
}
