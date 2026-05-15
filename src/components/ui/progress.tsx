import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressColor = "default" | "success" | "warning" | "danger" | "brand";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;          // 0–100
  max?: number;
  size?: "sm" | "md";     // 3 | 6px height
  color?: ProgressColor;
  showLabel?: boolean;
  label?: string;
}

const colorMap: Record<ProgressColor, string> = {
  default: "var(--gray-12)",
  success: "var(--green-solid)",
  warning: "var(--orange-solid)",
  danger:  "var(--red-solid)",
  brand:   "var(--amber-9)",
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { className, value, max = 100, size = "md", color = "default",
      showLabel, label, ...props },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className={cn("flex flex-col gap-1", className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between text-[11px] text-[var(--text-low)]">
            <span>{label}</span>
            <span>{Math.round(pct)}%</span>
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full rounded-full bg-[var(--gray-4)] overflow-hidden",
            size === "sm" ? "h-[3px]" : "h-[6px]"
          )}
        >
          <div
            className="h-full rounded-full transition-[width] duration-slow ease-[var(--ease-out)]"
            style={{ width: `${pct}%`, background: colorMap[color] }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
