/**
 * NearGo OMS Layout System
 *
 * Architecture:
 *   AuthenticatedLayout  — root shell (wraps LayoutProvider + manages sidebar state)
 *     ├── AppHeader      — 54px topbar (scroll-aware, search, notifications)
 *     ├── AppSidebar     — sidebar composition (OrgSwitcher + NavGroups + NavUser)
 *     │     ├── OrgSwitcher
 *     │     ├── NavGroup × N
 *     │     └── NavUser
 *     └── Main           — content area wrapper
 *           ├── PageHeader  — per-page title + breadcrumb + actions
 *           ├── SectionTabs — secondary tab nav (optional)
 *           └── [page content]
 *
 * Context:
 *   LayoutProvider / useLayout — collapsible mode + variant (persisted to localStorage)
 *
 * Data:
 *   sidebarData — example OMS navigation config
 *   SidebarData / NavGroup / NavItem types
 */

// Root layout
export { AuthenticatedLayout }                       from "./authenticated-layout";
export type { AuthenticatedLayoutProps }             from "./authenticated-layout";
export { TOPBAR_HEIGHT, SIDEBAR_FULL, SIDEBAR_ICON, PANEL_WIDTH } from "./authenticated-layout";

// Header
export { AppHeader }                                 from "./app-header";
export type { AppHeaderProps }                       from "./app-header";

// Sidebar
export { AppSidebar }                                from "./app-sidebar";
export type { AppSidebarProps }                      from "./app-sidebar";

export { OrgSwitcher }                               from "./org-switcher";
export type { OrgSwitcherProps }                     from "./org-switcher";

export { NavGroup }                                  from "./nav-group";
export type { NavGroupProps }                        from "./nav-group";

export { NavUser }                                   from "./nav-user";
export type { NavUserProps }                         from "./nav-user";

// Content area
export { Main, ContentCard, ContentStack, TwoColumnLayout } from "./main";
export type { MainProps, ContentCardProps, TwoColumnLayoutProps } from "./main";

// Page-level headers
export { PageHeader, DashboardHeader, SectionHeader } from "./page-header";
export type { PageHeaderProps, DashboardHeaderProps, SectionHeaderProps } from "./page-header";

// Secondary navigation
export { SectionTabs, TabHeader }                    from "./section-tabs";
export type { SectionTabsProps, SectionTab, TabHeaderProps } from "./section-tabs";

// Types
export type {
  SidebarData, NavGroup as NavGroupData, NavItem,
  NavLink, NavCollapsible, NavUser as NavUserData, NavOrg,
  CollapsibleMode, SidebarVariant, LayoutSettings,
} from "./types";

// Example data
export { sidebarData }                               from "./data/sidebar-data";

// Legacy exports (deprecated — use above)
export { OmsLayout, PageHeader as OmsPageHeader }    from "./oms-layout";
export { OmsSidebar, OmsTopbar }                     from "./oms-sidebar";
