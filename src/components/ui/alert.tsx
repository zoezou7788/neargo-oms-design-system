/**
 * @component Alert
 * @description 内联警告横幅 — 在页面内容区展示系统级提示、警告或错误信息。
 *
 * @when-to-use
 *   ✅ 表单提交后的错误汇总（variant="danger"）
 *   ✅ 页面级操作提示，如"审批即将超时"（variant="warning"）
 *   ✅ 成功反馈（不需要打断流程时用 Alert，需要打断用 Toast）
 *   ❌ 需要用户确认的操作 → 用 Dialog / ConfirmDialog
 *   ❌ 短暂的操作反馈（3s 自动消失）→ 用 Toast
 *
 * @variants
 *   info    → 蓝色，信息提示
 *   success → 绿色，操作成功
 *   warning → 橙色，需要注意
 *   danger  → 红色，错误或危险操作
 *
 * @props
 *   variant   AlertVariant      外观变体（默认 "info"）
 *   title     string            加粗标题（可选）
 *   icon      ReactNode         左侧图标（可选）
 *   closable  boolean           是否显示关闭按钮（默认 false）
 *   onClose   () => void        关闭回调（closable=true 时必传）
 *   children  ReactNode         正文内容
 *
 * @example
 * ```tsx
 * import { Alert } from "@/components/ui/alert"
 * import { AlertTriangle } from "lucide-react"
 *
 * // 带标题和图标
 * <Alert variant="warning" title="审批超时提醒" icon={<AlertTriangle size={16} />} closable onClose={() => {}}>
 *   订单 ORD-20240115-002 已超过 48 小时未处理，请尽快完成审批。
 * </Alert>
 *
 * // 简洁版（无标题）
 * <Alert variant="danger">请检查表单中的必填项后重新提交。</Alert>
 * ```
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { AlertVariant } from "@/lib/tokens";

const alertVariants = cva(
  "relative flex items-start gap-3 rounded-r4 border p-3 text-[13px] leading-relaxed",
  {
    variants: {
      variant: {
        info:    "bg-[var(--blue-bg)]   border-[var(--blue-border)]   text-[var(--blue-text)]",
        success: "bg-[var(--green-bg)]  border-[var(--green-border)]  text-[var(--green-text)]",
        warning: "bg-[var(--orange-bg)] border-[var(--orange-border)] text-[var(--orange-text)]",
        danger:  "bg-[var(--red-bg)]    border-[var(--red-border)]    text-[var(--red-text)]",
      } satisfies Record<AlertVariant, string>,
    },
    defaultVariants: { variant: "info" },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, closable, onClose, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon && <span className="mt-0.5 shrink-0" aria-hidden="true">{icon}</span>}
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {children}
      </div>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  )
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
