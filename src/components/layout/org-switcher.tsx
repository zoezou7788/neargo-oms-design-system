/**
 * @component OrgSwitcher
 * @description Sidebar 顶部组织切换器 — 展示当前组织，支持多组织切换和新增。
 *
 * @note
 *   通常不直接使用，由 AppSidebar 自动渲染在顶部（与 Topbar 等高）。
 *
 * @props
 *   orgs        NavOrg[]     组织列表（name / logo? / tier?）
 *   activeOrg   NavOrg       当前激活组织
 *   onOrgChange (org)=>void  切换组织回调
 *   onAddOrg    ()=>void     添加组织回调（不传则不显示"添加"按钮）
 *   collapsed   boolean      图标收起模式（只显示 logo）
 *
 * @example
 * ```tsx
 * import { OrgSwitcher } from "@/components/layout/org-switcher"
 * import { Building2 } from "lucide-react"
 *
 * <OrgSwitcher
 *   orgs={[
 *     { name: "NearGo 总部", logo: Building2, tier: "企业版" },
 *     { name: "NearGo 中东", tier: "标准版" },
 *   ]}
 *   activeOrg={currentOrg}
 *   onOrgChange={switchOrg}
 *   onAddOrg={() => router.push("/orgs/new")}
 * />
 * ```
 */
"use client";

import * as React from "react";
import { ChevronsUpDown, Building2, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavOrg } from "./types";

export interface OrgSwitcherProps {
  orgs: NavOrg[];
  activeOrg?: NavOrg;
  onOrgChange?: (org: NavOrg) => void;
  onAddOrg?: () => void;
  collapsed?: boolean;
}

export function OrgSwitcher({
  orgs,
  activeOrg,
  onOrgChange,
  onAddOrg,
  collapsed = false,
}: OrgSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<NavOrg>(activeOrg ?? orgs[0]);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const Logo = active.logo;

  return (
    <div ref={ref} className="relative px-3 py-2">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-2.5 w-full rounded-[8px] px-2 py-1.5",
          "hover:bg-[var(--gray-2)] transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eceae7]",
          open && "bg-[var(--gray-2)]",
        )}
      >
        {/* Org logo / icon */}
        <div className="w-7 h-7 rounded-[6px] bg-[#1F1D1C] flex items-center justify-center shrink-0 text-white">
          {Logo ? <Logo size={14} /> : <Building2 size={14} />}
        </div>

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[13px] font-semibold text-[var(--gray-12)] truncate leading-tight">
                {active.name}
              </p>
              {active.tier && (
                <p className="text-[10px] text-[var(--gray-9)] leading-tight">{active.tier}</p>
              )}
            </div>
            <ChevronsUpDown size={14} className="text-[var(--gray-9)] shrink-0" />
          </>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-3 right-3 top-[calc(100%+4px)] z-50 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] shadow-[0_8px_16px_rgba(0,0,0,0.08)] overflow-hidden">
          {orgs.length > 1 && (
            <div className="p-1">
              <p className="px-2 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gray-9)]">
                切换组织
              </p>
              {orgs.map((org, i) => {
                const OrgLogo = org.logo;
                const isActive = org.name === active.name;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(org);
                      onOrgChange?.(org);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-[6px] hover:bg-[var(--gray-2)] transition-colors text-left"
                  >
                    <div className="w-6 h-6 rounded-[5px] bg-[#1F1D1C] flex items-center justify-center shrink-0 text-white">
                      {OrgLogo ? <OrgLogo size={12} /> : <Building2 size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[var(--gray-12)] truncate">{org.name}</p>
                      {org.tier && <p className="text-[11px] text-[var(--gray-9)]">{org.tier}</p>}
                    </div>
                    {isActive && <Check size={13} className="text-[var(--gray-11)] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {onAddOrg && (
            <>
              {orgs.length > 1 && <div className="h-px bg-[var(--border)] mx-1" />}
              <div className="p-1">
                <button
                  onClick={() => { onAddOrg(); setOpen(false); }}
                  className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] text-[13px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
                >
                  <Plus size={13} />
                  添加组织
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
