/**
 * @component Card / CardHeader / CardTitle / CardBody / CardFooter
 * @description 卡片容器 — 对相关内容进行视觉分组的基础布局单元。
 *
 * @variants
 *   default   → border-radius 8px (r4)，通用卡片（表格容器、表单分区等）
 *   dashboard → border-radius 12px (r5)，Dashboard 大卡片（KPI 区、图表区）
 *
 * @padding
 *   none → 无内边距（子组件自行控制，如 Table 紧贴边缘）
 *   sm   → 16px
 *   md   → 24px（默认正文卡片）
 *   lg   → 32px（宽松展示型卡片）
 *
 * @composition
 *   Card
 *   ├── CardHeader    → 标题行，含左侧标题 + 右侧操作区（flex justify-between）
 *   │   └── CardTitle
 *   ├── CardBody      → 内容区，padding 24px
 *   └── CardFooter    → 底部操作栏，灰色背景
 *
 * @example
 * ```tsx
 * import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "@/components/ui/card"
 *
 * // 标准信息卡片
 * <Card>
 *   <CardHeader>
 *     <CardTitle>订单信息</CardTitle>
 *     <Button variant="ghost" size="sm">编辑</Button>
 *   </CardHeader>
 *   <CardBody>
 *     <p>订单号：ORD-20240115-001</p>
 *   </CardBody>
 * </Card>
 *
 * // 表格容器（padding="none"）
 * <Card padding="none">
 *   <DataTable columns={columns} data={data} />
 * </Card>
 *
 * // Dashboard 大卡片
 * <Card variant="dashboard" padding="md">
 *   <KpiCard ... />
 * </Card>
 * ```
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** dashboard = radius-5 (12px) for full-width hero cards */
  variant?: "default" | "dashboard";
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm:   "p-4",
  md:   "p-5",   // 24px — default
  lg:   "p-6",   // 32px
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "none", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-[var(--surface)] border border-[var(--border-subtle)]",
        "overflow-hidden",
        variant === "dashboard" ? "rounded-r5" : "rounded-r4",
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between",
        "px-5 py-3.5 border-b border-[var(--border-subtle)]",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-sm font-semibold text-[var(--text-hi)]", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5", className)} {...props} />
  )
);
CardBody.displayName = "CardBody";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--gray-2)]",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardBody, CardFooter };
