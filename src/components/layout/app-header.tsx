"use client";

import * as React from "react";
import { Menu, Search, Bell, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export interface AppHeaderProps {
  /** Left slot — breadcrumb or page title summary */
  left?: React.ReactNode;
  /** Right slot — additional actions before the standard icons */
  right?: React.ReactNode;
  /** Injected by AuthenticatedLayout */
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  /** If true, header sticks and gets frosted on scroll */
  fixed?: boolean;
  /** Called when user clicks the search area */
  onSearchClick?: () => void;
  /** Notification badge count */
  notificationCount?: number;
  /** User avatar area — pass <NavUser /> or a simple avatar */
  userSlot?: React.ReactNode;
  className?: string;
}

export function AppHeader({
  left,
  right,
  onToggleSidebar,
  sidebarOpen = true,
  fixed = true,
  onSearchClick,
  notificationCount = 0,
  userSlot,
  className,
}: AppHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!fixed) return;
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [fixed]);

  return (
    <div
      className={cn(
        "flex items-center h-[54px] px-4 gap-3",
        "transition-[box-shadow,background-color] duration-150",
        scrolled && fixed && [
          "shadow-[0_1px_8px_rgba(0,0,0,0.08)]",
          "bg-[var(--surface)]/90 backdrop-blur-[8px]",
        ],
        !scrolled && "bg-[var(--surface)]",
        className,
      )}
    >
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-10)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors shrink-0"
        aria-label={sidebarOpen ? "收起侧边栏" : "展开侧边栏"}
        title={sidebarOpen ? "收起侧边栏" : "展开侧边栏"}
      >
        {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
      </button>

      <Separator orientation="vertical" className="h-5 shrink-0" />

      {/* Left slot — breadcrumb / page title */}
      {left && (
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {left}
        </div>
      )}

      {!left && <div className="flex-1" />}

      {/* Right zone */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        {right}

        {/* Global search trigger */}
        <button
          onClick={onSearchClick}
          className={cn(
            "hidden sm:flex items-center gap-2 h-8 px-3 rounded-[8px] text-[13px]",
            "border border-[var(--border)] bg-[var(--surface)]",
            "text-[var(--gray-9)] hover:border-[var(--gray-7)] hover:text-[var(--gray-12)]",
            "transition-colors",
          )}
          aria-label="搜索"
        >
          <Search size={13} />
          <span className="hidden md:inline">搜索订单、门店...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[var(--gray-2)] text-[10px] font-mono text-[var(--gray-9)]">
            ⌘K
          </kbd>
        </button>

        {/* Mobile search */}
        <button
          onClick={onSearchClick}
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-10)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
          aria-label="搜索"
        >
          <Search size={16} />
        </button>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center w-8 h-8 rounded-[6px] text-[var(--gray-10)] hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)] transition-colors"
          aria-label={notificationCount > 0 ? `${notificationCount} 条未读通知` : "通知"}
        >
          <Bell size={16} />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-[var(--red-solid)] ring-[1.5px] ring-[var(--surface)]" />
          )}
        </button>

        {/* User slot */}
        {userSlot && (
          <>
            <Separator orientation="vertical" className="h-5 shrink-0" />
            {userSlot}
          </>
        )}
      </div>
    </div>
  );
}
