import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      className={cn(
        "shrink-0 bg-[var(--border-subtle)]",
        orientation === "horizontal" ? "h-px w-full my-4" : "h-full w-px mx-3",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
