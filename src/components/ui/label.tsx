import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "inline-block text-[12px] font-medium text-[var(--text-mid)] mb-1",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-[var(--red-solid)]" aria-hidden="true">
          *
        </span>
      )}
      {optional && (
        <span className="ml-1 text-[11px] font-normal text-[var(--text-disabled)]">
          （可选）
        </span>
      )}
    </label>
  )
);
Label.displayName = "Label";

export { Label };
