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
