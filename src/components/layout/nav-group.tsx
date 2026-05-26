"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavGroup as NavGroupType, NavItem, NavLink, NavCollapsible } from "./types";

// ── Type guards ───────────────────────────────────────────────
function isNavLink(item: NavItem): item is NavLink {
  return "url" in item && typeof item.url === "string";
}
function isNavCollapsible(item: NavItem): item is NavCollapsible {
  return "items" in item && Array.isArray(item.items);
}

// ── Active URL detection ──────────────────────────────────────
function isActive(url: string, pathname: string): boolean {
  if (url === pathname) return true;
  // Strip query params
  if (url === pathname.split("?")[0]) return true;
  // Match first path segment (e.g. /orders/* matches /orders)
  const segment = pathname.split("/")[1];
  if (url === `/${segment}`) return true;
  return false;
}

function hasActiveChild(items: NavLink[], pathname: string): boolean {
  return items.some(item => isActive(item.url, pathname));
}

// ── NavLinkItem ───────────────────────────────────────────────
interface NavLinkItemProps {
  item: NavLink;
  pathname: string;
  collapsed: boolean;
  onNavigate?: (url: string) => void;
}

function NavLinkItem({ item, pathname, collapsed, onNavigate }: NavLinkItemProps) {
  const active = isActive(item.url, pathname);
  const Icon = item.icon;

  return (
    <a
      href={item.url}
      onClick={e => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(item.url);
        }
      }}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.title : undefined}
      className={cn(
        "flex items-center gap-2.5 mx-2 h-9 rounded-[6px] text-[13px] font-medium",
        "transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eceae7]",
        active
          ? [
              "bg-[var(--amber-2)] text-[var(--gray-12)]",
              // Left border: negative margin to reach edge, positive padding to compensate
              "ml-0 pl-[calc(8px+2px)] rounded-l-none border-l-2 border-[var(--amber-9)]",
            ]
          : "pl-3 text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
        collapsed && "justify-center pl-0 ml-0",
      )}
    >
      {Icon && (
        <Icon
          size={16}
          className={cn("shrink-0", active ? "text-[var(--gray-12)]" : "text-[var(--gray-9)]")}
        />
      )}
      {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
      {!collapsed && item.badge != null && (
        <span className={cn(
          "ml-auto text-[10px] font-semibold rounded-[9999px] px-1.5 py-0.5 leading-none shrink-0",
          typeof item.badge === "number" && item.badge > 0
            ? "bg-[var(--red-solid)] text-white"
            : "bg-[var(--gray-3)] text-[var(--gray-11)]",
        )}>
          {typeof item.badge === "number" && item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </a>
  );
}

// ── NavCollapsibleItem ────────────────────────────────────────
interface NavCollapsibleItemProps {
  item: NavCollapsible;
  pathname: string;
  collapsed: boolean;
  onNavigate?: (url: string) => void;
}

function NavCollapsibleItem({ item, pathname, collapsed, onNavigate }: NavCollapsibleItemProps) {
  const childActive = hasActiveChild(item.items, pathname);
  const [open, setOpen] = React.useState(childActive);
  const Icon = item.icon;

  // Auto-open if a child becomes active
  React.useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  if (collapsed) {
    // In icon mode: just show the icon, no sub-menu
    return (
      <div
        title={item.title}
        className={cn(
          "flex items-center justify-center mx-2 h-9 rounded-[6px]",
          childActive
            ? "bg-[var(--amber-2)] text-[var(--gray-12)]"
            : "text-[var(--gray-9)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
          "cursor-default",
        )}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-2.5 w-full mx-2 px-3 h-9 rounded-[6px] text-[13px] font-medium",
          "transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eceae7]",
          childActive && !open
            ? "bg-[var(--amber-2)] text-[var(--gray-12)]"
            : "text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
          "w-[calc(100%-16px)]",
        )}
      >
        {Icon && (
          <Icon
            size={16}
            className={cn("shrink-0", childActive ? "text-[var(--gray-12)]" : "text-[var(--gray-9)]")}
          />
        )}
        <span className="flex-1 text-left truncate">{item.title}</span>
        {item.badge != null && (
          <span className="text-[10px] font-semibold bg-[var(--gray-3)] text-[var(--gray-11)] rounded-[9999px] px-1.5 py-0.5 leading-none">
            {item.badge}
          </span>
        )}
        <ChevronRight
          size={14}
          className={cn(
            "shrink-0 text-[var(--gray-7)] transition-transform duration-150",
            open && "rotate-90",
          )}
        />
      </button>

      {open && (
        <div className="ml-4 mt-0.5 mb-1 border-l border-[var(--border)] pl-2">
          {item.items.map(subItem => (
            <NavLinkItem
              key={subItem.url}
              item={subItem}
              pathname={pathname}
              collapsed={false}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── NavGroup ──────────────────────────────────────────────────
export interface NavGroupProps extends NavGroupType {
  pathname: string;
  collapsed?: boolean;
  onNavigate?: (url: string) => void;
}

export function NavGroup({
  title,
  items,
  pathname,
  collapsed = false,
  onNavigate,
}: NavGroupProps) {
  return (
    <div className="mb-2">
      {title && !collapsed && (
        <p className="mx-4 mt-3 mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gray-9)]">
          {title}
        </p>
      )}
      {collapsed && <div className="mx-2 my-1.5 h-px bg-[var(--border)]" />}
      <div className="flex flex-col gap-0.5">
        {items.map(item =>
          isNavCollapsible(item) ? (
            <NavCollapsibleItem
              key={item.title}
              item={item}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ) : (
            <NavLinkItem
              key={(item as NavLink).url}
              item={item as NavLink}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ),
        )}
      </div>
    </div>
  );
}
