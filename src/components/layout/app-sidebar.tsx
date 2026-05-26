"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { OrgSwitcher } from "./org-switcher";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import type { SidebarData } from "./types";

export interface AppSidebarProps {
  data: SidebarData;
  pathname: string;
  collapsed?: boolean;
  onNavigate?: (url: string) => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onSignOut?: () => void;
  onAddOrg?: () => void;
  onOrgChange?: (org: SidebarData["org"]) => void;
  className?: string;
}

export function AppSidebar({
  data,
  pathname,
  collapsed = false,
  onNavigate,
  onProfile,
  onSettings,
  onSignOut,
  onAddOrg,
  onOrgChange,
  className,
}: AppSidebarProps) {
  return (
    <nav
      className={cn("flex flex-col h-full", className)}
      aria-label="主导航"
    >
      {/* ── Header: Org switcher (aligns with topbar height) ── */}
      <div className="h-[54px] flex items-center border-b border-[var(--border)] shrink-0">
        <OrgSwitcher
          orgs={[data.org]}
          activeOrg={data.org}
          onOrgChange={onOrgChange}
          onAddOrg={onAddOrg}
          collapsed={collapsed}
        />
      </div>

      {/* ── Content: Scrollable nav groups ──────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin">
        {data.navGroups.map(group => (
          <NavGroup
            key={group.title}
            {...group}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* ── Footer: User profile ─────────────────────────────── */}
      <div className="border-t border-[var(--border)] p-2 shrink-0">
        <NavUser
          user={data.user}
          collapsed={collapsed}
          onProfile={onProfile}
          onSettings={onSettings}
          onSignOut={onSignOut}
        />
      </div>
    </nav>
  );
}
