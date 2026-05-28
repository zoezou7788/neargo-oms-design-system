/**
 * @component NavUser
 * @description Sidebar 底部用户区 — 显示当前用户信息，点击展开菜单（个人资料/设置/退出）。
 *
 * @note
 *   通常不直接使用，由 AppSidebar 自动渲染在底部。
 *   退出登录有二次确认（防误触）。
 *
 * @props
 *   user        NavUser     用户信息（name / email / avatar? / role?）
 *   onProfile   () => void  点击"个人资料"回调
 *   onSettings  () => void  点击"系统设置"回调
 *   onSignOut   () => void  确认退出回调
 *   collapsed   boolean     图标收起模式（只显示头像）
 *
 * @example
 * ```tsx
 * import { NavUser } from "@/components/layout/nav-user"
 *
 * <NavUser
 *   user={{ name: "张三", email: "zhang@neargo.com", role: "超级管理员" }}
 *   onProfile={() => router.push("/profile")}
 *   onSettings={() => router.push("/settings")}
 *   onSignOut={async () => { await logout(); router.push("/login") }}
 * />
 * ```
 */
"use client";

import * as React from "react";
import { User, Settings, LogOut, ChevronsUpDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { NavUser as NavUserType } from "./types";

export interface NavUserProps {
  user: NavUserType;
  onProfile?: () => void;
  onSettings?: () => void;
  onSignOut?: () => void;
  collapsed?: boolean;
}

export function NavUser({
  user,
  onProfile,
  onSettings,
  onSignOut,
  collapsed = false,
}: NavUserProps) {
  const [open, setOpen] = React.useState(false);
  const [confirmSignOut, setConfirmSignOut] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setConfirmSignOut(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-2.5 w-full rounded-[8px] px-2.5 py-2",
          "hover:bg-[var(--gray-2)] transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eceae7]",
          open && "bg-[var(--gray-2)]",
          collapsed && "justify-center px-2",
        )}
      >
        <Avatar
          src={user.avatar}
          name={user.name}
          size="sm"
          className="shrink-0"
        />
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[13px] font-medium text-[var(--gray-12)] truncate leading-tight">
                {user.name}
              </p>
              <p className="text-[11px] text-[var(--gray-9)] truncate leading-tight">
                {user.role ?? user.email}
              </p>
            </div>
            <ChevronsUpDown size={14} className="text-[var(--gray-8)] shrink-0" />
          </>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-[calc(100%+6px)] left-0 right-0 z-50 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] shadow-[0_8px_16px_rgba(0,0,0,0.10)] overflow-hidden min-w-[180px]">
          {/* User info header */}
          <div className="px-3 py-2.5 border-b border-[var(--border)]">
            <p className="text-[13px] font-semibold text-[var(--gray-12)] truncate">{user.name}</p>
            <p className="text-[11px] text-[var(--gray-9)] truncate">{user.email}</p>
            {user.role && (
              <div className="flex items-center gap-1 mt-1">
                <Shield size={10} className="text-[var(--gray-8)]" />
                <span className="text-[10px] text-[var(--gray-9)]">{user.role}</span>
              </div>
            )}
          </div>

          {/* Menu items */}
          <div className="p-1">
            {onProfile && (
              <button
                onClick={() => { onProfile(); setOpen(false); }}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] text-[13px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
              >
                <User size={13} className="shrink-0" />
                个人资料
              </button>
            )}
            {onSettings && (
              <button
                onClick={() => { onSettings(); setOpen(false); }}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] text-[13px] text-[var(--gray-11)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
              >
                <Settings size={13} className="shrink-0" />
                系统设置
              </button>
            )}
          </div>

          {onSignOut && (
            <>
              <div className="h-px bg-[var(--border)] mx-1" />
              <div className="p-1">
                {!confirmSignOut ? (
                  <button
                    onClick={() => setConfirmSignOut(true)}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] text-[13px] text-[var(--red-solid)] hover:bg-[var(--red-bg)] transition-colors"
                  >
                    <LogOut size={13} className="shrink-0" />
                    退出登录
                  </button>
                ) : (
                  <div className="px-2 py-1.5">
                    <p className="text-[12px] text-[var(--gray-11)] mb-2">确认退出登录？</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { onSignOut(); setOpen(false); }}
                        className="flex-1 h-7 px-2 rounded-[6px] text-[12px] font-medium bg-[var(--red-solid)] text-white hover:opacity-90 transition-opacity"
                      >
                        确认退出
                      </button>
                      <button
                        onClick={() => setConfirmSignOut(false)}
                        className="flex-1 h-7 px-2 rounded-[6px] text-[12px] font-medium border border-[var(--border)] text-[var(--gray-11)] hover:bg-[var(--gray-2)] transition-colors"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
