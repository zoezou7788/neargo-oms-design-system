/**
 * @component Breadcrumb / PageBreadcrumb
 * @description 面包屑导航 — 显示用户在应用层级中的当前位置。
 *
 * @when-to-use
 *   ✅ 页面层级 ≥ 2 层时（如：首页 > 订单管理 > 订单详情）
 *   ✅ 所有详情页、编辑页的顶部
 *   ❌ Dashboard 首页（无上级页面可回）
 *   ❌ 只有一层的列表页
 *
 * @composition
 *   Breadcrumb            — 根组件，渲染 <nav aria-label="breadcrumb">
 *   └── items[]           — 数组形式传入，无需手动组合子组件
 *
 *   PageBreadcrumb        — 预组合版本，含 showHomeIcon + 右侧 action slot
 *
 * @props
 *   items        BreadcrumbItem[]  必填。每项包含 label / href（可选）/ icon（可选）
 *   showHomeIcon boolean           是否显示首页 Home 图标（默认 false）
 *   className    string            自定义样式
 *
 * @example 基础用法
 * ```tsx
 * import { Breadcrumb } from "@/components/ui/breadcrumb"
 *
 * <Breadcrumb
 *   items={[
 *     { label: "订单管理", href: "/orders" },
 *     { label: "ORD-20240115-001" },          // 最后一项不传 href，自动加粗
 *   ]}
 * />
 * ```
 *
 * @example 带首页图标 + 右侧操作按钮（PageBreadcrumb）
 * ```tsx
 * import { PageBreadcrumb } from "@/components/ui/breadcrumb"
 *
 * <PageBreadcrumb
 *   items={[
 *     { label: "订单管理", href: "/orders" },
 *     { label: "订单详情" },
 *   ]}
 *   action={<Button variant="primary">审批通过</Button>}
 * />
 * ```
 *
 * @example 带图标的层级项
 * ```tsx
 * import { Store } from "lucide-react"
 *
 * <Breadcrumb
 *   items={[
 *     { label: "门店管理", href: "/stores", icon: Store },
 *     { label: "海淀科技店" },
 *   ]}
 * />
 * ```
 *
 * @accessibility
 *   - 根元素自动添加 aria-label="breadcrumb"
 *   - 当前页项自动添加 aria-current="page"
 *   - 分隔符 ChevronRight 添加 aria-hidden="true"
 */
import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumb({ items, className, showHomeIcon = false }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center flex-wrap gap-0.5">
        {showHomeIcon && (
          <li className="flex items-center gap-0.5">
            <a
              href="/"
              className="flex items-center justify-center w-6 h-6 text-[var(--gray-9)] hover:text-[var(--gray-12)] transition-colors"
              aria-label="首页"
            >
              <Home size={14} />
            </a>
            {items.length > 0 && (
              <ChevronRight size={12} className="text-[var(--gray-7)] mx-0.5" aria-hidden="true" />
            )}
          </li>
        )}

        {items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-0.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-[13px] text-[var(--gray-10)] hover:text-[var(--gray-12)] transition-colors"
                >
                  {Icon && <Icon size={13} className="shrink-0" />}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1 text-[13px]",
                    isLast ? "text-[var(--gray-12)] font-medium" : "text-[var(--gray-10)]",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {Icon && <Icon size={13} className="shrink-0" />}
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight size={12} className="text-[var(--gray-7)] mx-0.5" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Compact breadcrumb for page headers — includes optional action slot
export interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
  action?: React.ReactNode;
  className?: string;
}
export function PageBreadcrumb({ items, action, className }: PageBreadcrumbProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Breadcrumb items={items} showHomeIcon />
      {action && <div>{action}</div>}
    </div>
  );
}
