import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "line" | "circle" | "rect";
  /** For variant="line": height in px, defaults to 14 */
  lineHeight?: number;
  /** Repeat n skeleton lines */
  lines?: number;
}

const shimmer = [
  "animate-[shimmer_1.4s_ease-in-out_infinite]",
  "bg-[linear-gradient(90deg,var(--gray-3)_25%,var(--gray-2)_50%,var(--gray-3)_75%)]",
  "[background-size:800px_100%]",
].join(" ");

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "line", lineHeight = 14, lines = 1, style, ...props }, ref) => {
    if (lines > 1) {
      return (
        <div className={cn("flex flex-col gap-2", className)}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(shimmer, "rounded-full")}
              style={{ height: lineHeight, width: i === lines - 1 ? "60%" : "100%", ...style }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          shimmer,
          variant === "circle" && "rounded-full",
          variant === "line"   && "rounded-full",
          variant === "rect"   && "rounded-r4",
          className
        )}
        style={{ height: variant === "line" ? lineHeight : undefined, ...style }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
