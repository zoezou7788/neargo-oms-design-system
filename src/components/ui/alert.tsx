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
