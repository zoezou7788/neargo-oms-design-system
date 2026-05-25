import * as React from "react";
import { cn } from "@/lib/utils";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/tokens";
import type { StatusType } from "@/lib/tokens";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  /** Override default label */
  label?: string;
  size?: "sm" | "md";
}

/**
 * StatusIndicator — dot + text
 *
 * Design System Rule: Status MUST always show both a colored dot
 * AND a text label. Never use color alone to convey state.
 */
const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ status, label, size = "md", className, ...props }, ref) => {
    const colors = STATUS_COLORS[status];
    const text   = label ?? STATUS_LABELS[status] ?? status;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5",
          size === "sm" ? "text-[11px]" : "text-[12.5px]",
          className
        )}
        aria-label={`状态：${text}`}
        {...props}
      >
        <span
          className={cn(
            "rounded-full shrink-0",
            size === "sm" ? "w-1.5 h-1.5" : "w-[6px] h-[6px]"
          )}
          style={{ background: colors.dot }}
          aria-hidden="true"
        />
        <span style={{ color: colors.text }}>{text}</span>
      </span>
    );
  }
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
