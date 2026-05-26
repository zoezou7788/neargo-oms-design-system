import type React from "react";

// ── User & Org ──────────────────────────────────────────────

export interface NavUser {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface NavOrg {
  name: string;
  logo?: React.ElementType;
  tier?: string;          // e.g. "企业版" | "专业版"
}

// ── Navigation ──────────────────────────────────────────────

/** Shared base — all nav items have title + optional icon/badge */
interface NavBase {
  title: string;
  icon?: React.ElementType;
  badge?: string | number;
  /** If set, this item is hidden when user lacks this permission key */
  permission?: string;
  disabled?: boolean;
}

/** A leaf nav item that navigates to a URL */
export interface NavLink extends NavBase {
  url: string;
  items?: never;
}

/** A collapsible group that contains NavLinks */
export interface NavCollapsible extends NavBase {
  url?: never;
  items: NavLink[];
}

/** Union — either a link or a collapsible group */
export type NavItem = NavLink | NavCollapsible;

/** A labelled section of nav items */
export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Top-level sidebar data config */
export interface SidebarData {
  user: NavUser;
  org: NavOrg;
  navGroups: NavGroup[];
}

// ── Layout Settings ─────────────────────────────────────────

/** How the sidebar collapses on desktop */
export type CollapsibleMode =
  | "icon"       // shrinks to 56px icon-only rail
  | "offcanvas"  // slides off-screen entirely
  | "none";      // never collapses (always 232px)

/** Sidebar visual variant */
export type SidebarVariant =
  | "sidebar"   // flush to edge, shares bg with page
  | "floating"  // card style, rounded, shadow, slight inset
  | "inset";    // main content is inset away from sidebar

export interface LayoutSettings {
  collapsible: CollapsibleMode;
  variant: SidebarVariant;
  defaultCollapsible: CollapsibleMode;
  defaultVariant: SidebarVariant;
  setCollapsible: (mode: CollapsibleMode) => void;
  setVariant: (variant: SidebarVariant) => void;
  resetLayout: () => void;
}
