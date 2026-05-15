import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Left icon/prefix element */
  prefix?: React.ReactNode;
  /** Right icon/suffix element */
  suffix?: React.ReactNode;
  /** Show error ring */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, suffix, error, readOnly, disabled, ...props }, ref) => {
    const base = [
      "h-9 w-full rounded-r3 border px-3 text-base font-sans",
      "text-[var(--text-hi)] bg-[var(--surface)]",
      "placeholder:text-[var(--text-disabled)]",
      "transition-[border-color,box-shadow] duration-normal",
      // Default state
      "border-[var(--gray-7)]",
      // Hover
      "hover:not(:disabled):not(:read-only):border-[var(--gray-8)]",
      // Focus
      "focus:outline-none focus:border-[var(--gray-12)]",
      "focus:shadow-[0_0_0_2px_var(--gray-4)]",
      // Read-only
      readOnly && "bg-[var(--gray-2)] border-[var(--gray-6)] cursor-default",
      // Disabled
      disabled && "bg-[var(--gray-3)] border-[var(--gray-5)] cursor-not-allowed opacity-60",
      // Error
      error && "border-[var(--red-solid)] focus:shadow-[0_0_0_2px_var(--red-border)]",
    ];

    if (prefix || suffix) {
      return (
        <div className="relative flex items-center">
          {prefix && (
            <span
              className="pointer-events-none absolute left-3 text-[var(--text-low)]"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            readOnly={readOnly}
            disabled={disabled}
            aria-invalid={error}
            className={cn(base, prefix && "pl-9", suffix && "pr-9", className)}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-[var(--text-low)]" aria-hidden="true">
              {suffix}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        readOnly={readOnly}
        disabled={disabled}
        aria-invalid={error}
        className={cn(base, className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
