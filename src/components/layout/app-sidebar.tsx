/**
 * @component AppSidebar
 * @description OMS 侧边栏外壳 — 组合 OrgSwitcher + NavGroup × N + NavUser，高度填满屏幕。
 *
 * @note
 *   AppSidebar 是数据驱动的组合容器，接受 SidebarData 配置对象。
 *   导航项的视觉逻辑（激活态、子菜单展开）由 NavGroup 内部处理。
 *   collapsed prop 由 AuthenticatedLayout 自动注入，无需手动传入。
 *
 * @props
 *   data       SidebarData    完整侧边栏数据（org / navGroups / user）
 *   pathname   string         当前路由路径（用于激活态高亮）
 *   collapsed  boolean        图标模式（由 AuthenticatedLayout 注入）
 *   onNavigate (url) => void  路由跳转回调（拦截默认 <a> 行为）
 *   onSignOut  () => void     退出登录回调
 *
 * @data-structure
 * ```ts
 * const sidebarData: SidebarData = {
 *   org: { name: "NearGo", tier: "企业版" },
 *   user: { name: "张三", email: "zhang@neargo.com", role: "超级管理员" },
 *   navGroups: [
 *     {
 *       title: "主菜单",
 *       items: [
 *         { title: "数据总览", url: "/dashboard", icon: LayoutDashboard },
 *         { title: "订单管理", url: "/orders",    icon: ClipboardList, badge: 24,
 *           items: [                              // 子菜单
 *             { title: "全部订单", url: "/orders/all" },
 *             { title: "待审批",   url: "/orders/pending" },
 *           ]
 *         },
 *       ],
 *     },
 *   ],
 * }
 * ```
 *
 * @example
 * ```tsx
 * import { AppSidebar } from "@/components/layout/app-sidebar"
 * import { sidebarData } from "@/components/layout/data/sidebar-data"
 *
 * <AppSidebar
 *   data={sidebarData}
 *   pathname={pathname}
 *   onNavigate={(url) => router.push(url)}
 *   onSignOut={handleSignOut}
 * />
 * ```
 */
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
