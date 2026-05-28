/**
 * @component Sidebar / SidebarProvider / SidebarNav / SidebarItem
 * @description 侧边栏导航 — OMS 全局左侧导航，支持展开/收起，含子菜单。
 *
 * @when-to-use
 *   ✅ 应用级全局导航（每个页面共享）
 *   ✅ 需要折叠为图标模式节省空间
 *   ❌ 页面内二级导航 → 用 Tabs
 *   ❌ 临时导航菜单 → 用 DropdownMenu
 *
 * @composition
 *   SidebarProvider   — Context Provider，在 App 根节点包裹
 *   useSidebar()      — 读取 collapsed 状态的 hook
 *   Sidebar           — 侧边栏容器（fixed 定位，220px 展开 / 52px 收起）
 *   ├── SidebarHeader     — Logo + 品牌名 + 收起按钮
 *   ├── SidebarNav        — 菜单组列表容器
 *   │   └── SidebarItem   — 单个菜单项（支持子菜单）
 *   └── SidebarFooter     — 用户信息区
 *
 * @router-note
 *   默认使用 react-router-dom 的 Link 和 useLocation。
 *   Next.js 项目需将第 1 行改为：
 *   import Link from "next/link"; import { usePathname as useLocation } from "next/navigation";
 *
 * @example
 * ```tsx
 * import { SidebarProvider, Sidebar, SidebarItem } from "@/components/ui/sidebar"
 * import { LayoutDashboard, ClipboardList, Store } from "lucide-react"
 *
 * // App 根节点
 * <SidebarProvider>
 *   <div className="flex">
 *     <Sidebar>
 *       <SidebarItem href="/dashboard" icon={LayoutDashboard} label="数据总览" />
 *       <SidebarItem
 *         href="/orders"
 *         icon={ClipboardList}
 *         label="订单管理"
 *         badge={24}
 *         badgeVariant="urgent"
 *         children={[
 *           { href: "/orders/all",     label: "全部订单" },
 *           { href: "/orders/pending", label: "待审批" },
 *         ]}
 *       />
 *       <SidebarItem href="/stores" icon={Store} label="门店管理" badge={86} />
 *     </Sidebar>
 *     <main className="flex-1 ml-[220px]"><Outlet /></main>
 *   </div>
 * </SidebarProvider>
 * ```
 */
"use client";

import * as React from "react";
import { Link, useLocation } from "react-router-dom"; // or next/link — use conditional import pattern
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}
const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}

// Root sidebar container — 232px, left-side fixed panel
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { collapsed } = useSidebar();
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--surface)] border-r border-[var(--border)]",
        "transition-[width] duration-200",
        collapsed ? "w-[56px]" : "w-[232px]",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

// Sidebar header — logo area
export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center h-[54px] px-4 border-b border-[var(--border)] shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Sidebar body — scrollable nav area
export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto overflow-x-hidden py-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Sidebar footer — user profile / settings
export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-t border-[var(--border)] p-3 shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Group of nav items with optional label
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}
export function SidebarGroup({ className, label, children, ...props }: SidebarGroupProps) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("mb-1", className)} {...props}>
      {label && !collapsed && (
        <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gray-9)]">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

// Individual nav item
export interface SidebarItemProps {
  href: string;
  icon?: React.ElementType;
  label: string;
  badge?: string | number;
  active?: boolean;
  className?: string;
}
export function SidebarItem({ href, icon: Icon, label, badge, active, className }: SidebarItemProps) {
  const { collapsed } = useSidebar();
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 mx-2 px-3 h-9 rounded-[6px] text-[13px] font-medium",
        "transition-colors duration-100",
        active
          ? "bg-[var(--amber-2)] text-[var(--gray-12)] border-l-2 border-[var(--amber-9)] pl-[10px]"
          : "text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
        className,
      )}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
      {!collapsed && badge != null && (
        <span className="ml-auto text-[10px] font-semibold bg-[var(--gray-3)] text-[var(--gray-11)] rounded-[9999px] px-1.5 py-0.5 leading-none">
          {badge}
        </span>
      )}
    </a>
  );
}

// Collapsible nav group (sub-menu)
export interface SidebarSubGroupProps {
  icon?: React.ElementType;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}
export function SidebarSubGroup({ icon: Icon, label, defaultOpen = false, children }: SidebarSubGroupProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const { collapsed } = useSidebar();

  if (collapsed) {
    return (
      <div className="mx-2">
        {Icon && (
          <div className="flex items-center justify-center h-9 rounded-[6px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] cursor-pointer">
            <Icon size={16} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-2 mb-0.5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full px-3 h-9 rounded-[6px] text-[13px] font-medium text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        <span className="flex-1 text-left truncate">{label}</span>
        <ChevronDown
          size={14}
          className={cn("shrink-0 transition-transform duration-150", open && "rotate-180")}
        />
      </button>
      {open && <div className="ml-4 mt-0.5 border-l border-[var(--border)] pl-2">{children}</div>}
    </div>
  );
}

// Sub-item inside SidebarSubGroup
export interface SidebarSubItemProps {
  href: string;
  label: string;
  active?: boolean;
}
export function SidebarSubItem({ href, label, active }: SidebarSubItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center px-3 h-8 rounded-[6px] text-[13px] transition-colors",
        active
          ? "text-[var(--gray-12)] font-medium"
          : "text-[var(--gray-10)] hover:text-[var(--gray-12)] hover:bg-[var(--gray-2)]",
      )}
    >
      {label}
    </a>
  );
}

// App layout shell — composes sidebar + main content area
export interface AppShellProps {
  sidebar: React.ReactNode;
  topbar?: React.ReactNode;
  children: React.ReactNode;
}
export function AppShell({ sidebar, topbar, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
        <div className="flex-shrink-0">{sidebar}</div>
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {topbar && (
            <header className="h-[54px] shrink-0 bg-[var(--surface)] border-b border-[var(--border)]">
              {topbar}
            </header>
          )}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
