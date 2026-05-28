/**
 * @component OmsSidebar / OmsTopbar
 * @description Legacy 侧边栏和顶栏组件 — 已被 AppSidebar / AppHeader 取代。
 *
 * @deprecated
 *   ⚠️  OmsSidebar 和 OmsTopbar 是 v2 的遗留组件，新页面请使用：
 *   - OmsSidebar → AppSidebar（数据驱动，支持折叠、子菜单、OrgSwitcher）
 *   - OmsTopbar  → AppHeader（滚动毛玻璃、通知铃、搜索触发）
 *
 * @migration
 * ```tsx
 * // ❌ Old (v2)
 * import { OmsSidebar, OmsTopbar } from "@/components/layout/oms-sidebar"
 * <OmsSidebar items={navItems} activeKey="orders" />
 *
 * // ✅ New (v4)
 * import { AppSidebar } from "@/components/layout/app-sidebar"
 * import { AppHeader }  from "@/components/layout/app-header"
 * import { sidebarData } from "@/components/layout/data/sidebar-data"
 * <AppSidebar data={sidebarData} pathname={pathname} />
 * <AppHeader userSlot={<NavUser user={currentUser} />} />
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: number;
  children?: Omit<NavItem, "children">[];
}

export interface OmsSidebarProps {
  productName?: string;
  version?: string;
  items: NavItem[];
  activeKey: string;
  onNavigate?: (key: string, href?: string) => void;
  footer?: React.ReactNode;
  /** Group labels: { key: label } */
  groups?: Record<string, string>;
}

/**
 * OmsSidebar — fixed left navigation.
 *
 * States (from spec §09):
 *   Default: transparent bg, gray-11 text
 *   Hover:   gray-2 bg, gray-12 text
 *   Active:  amber-2 bg, gray-12 text, 2px amber-9 left border
 *
 * At md breakpoint (1024px): icon-only mode via CSS (see globals.css)
 */
export const OmsSidebar: React.FC<OmsSidebarProps> = ({
  productName = "OMS", version, items, activeKey, onNavigate, footer, groups,
}) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const renderItem = (item: NavItem, isChild = false) => {
    const isActive = activeKey === item.key;
    const hasChildren = !!item.children?.length;
    const isExpanded = expanded[item.key];

    return (
      <div key={item.key}>
        <button
          type="button"
          className={cn(
            "nav-item w-full flex items-center gap-2 h-8 transition-all duration-fast",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gray-4)]",
            isActive && "nav-item--active",
            isChild && "nav-item-sub"
          )}
          onClick={() => {
            if (hasChildren) toggle(item.key);
            else onNavigate?.(item.key, item.href);
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {/* Left accent */}
          <span
            className="nav-item__accent w-[2px] h-full shrink-0 rounded-r"
            style={{ background: isActive ? "var(--amber-9)" : "transparent" }}
          />
          {item.icon && (
            <span className="nav-item__icon shrink-0 w-4 h-4 flex items-center justify-center">
              {item.icon}
            </span>
          )}
          <span className="nav-item__label flex-1 text-left text-[13px] truncate">
            {item.label}
          </span>
          {item.badge != null && item.badge > 0 && (
            <span className="nav-item__badge mr-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[var(--red-solid)] text-white rounded-full text-[10px] font-bold shrink-0">
              {item.badge > 99 ? "99+" : item.badge}
            </span>
          )}
          {hasChildren && (
            <span
              className={cn("mr-2 text-[10px] text-[var(--text-disabled)] transition-transform duration-normal", isExpanded && "rotate-90")}
            >
              ›
            </span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="ml-2">{item.children!.map(c => renderItem(c, true))}</div>
        )}
      </div>
    );
  };

  // Group items
  const grouped: Record<string, NavItem[]> = { "": [] };
  items.forEach(item => {
    const g = groups
      ? Object.keys(groups).find(k => items.filter((_, i) => i < items.indexOf(item)).length >= 0)
        ?? ""
      : "";
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(item);
  });

  return (
    <nav className="flex flex-col h-full" aria-label="主导航">
      {/* Product header */}
      <div className="px-4 py-3 border-b border-[var(--border)] shrink-0">
        <div className="text-sm font-bold text-[var(--text-hi)] truncate">{productName}</div>
        {version && <div className="text-[11px] text-[var(--text-disabled)] mt-0.5">{version}</div>}
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-2">
        {Object.entries(groups ?? {}).map(([, label], i) => (
          <React.Fragment key={i}>
            <div className="nav-group-label px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-disabled)]">
              {label}
            </div>
          </React.Fragment>
        ))}
        {items.map(item => renderItem(item))}
      </div>

      {/* Footer slot (user profile, settings) */}
      {footer && (
        <div className="border-t border-[var(--border)] shrink-0 p-3">{footer}</div>
      )}
    </nav>
  );
};

export const OmsTopbar: React.FC<{
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}> = ({ left, right, className }) => (
  <div className={cn("flex items-center justify-between h-[54px] px-5", className)}>
    <div className="flex items-center gap-4">{left}</div>
    <div className="flex items-center gap-3">{right}</div>
  </div>
);
