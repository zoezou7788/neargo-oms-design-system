import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  /** Show character count; requires maxLength prop */
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, showCount, maxLength, value, onChange, ...props }, ref) => {
    const [count, setCount] = React.useState(
      typeof value === "string" ? value.length : 0
    );
    const isOverflow = maxLength !== undefined && count > maxLength;

    return (
      <div className="flex flex-col gap-1">
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          aria-invalid={error}
          onChange={(e) => {
            setCount(e.target.value.length);
            onChange?.(e);
          }}
          className={cn(
            "min-h-[80px] w-full resize-y rounded-r3 border px-3 py-2 font-sans",
            "text-sm text-[var(--text-hi)] bg-[var(--surface)]",
            "placeholder:text-[var(--text-disabled)] leading-relaxed",
            "border-[var(--gray-7)]",
            "hover:border-[var(--gray-8)]",
            "focus:outline-none focus:border-[var(--gray-12)]",
            "focus:shadow-[0_0_0_2px_var(--gray-4)]",
            "transition-[border-color,box-shadow] duration-normal",
            "disabled:bg-[var(--gray-3)] disabled:cursor-not-allowed disabled:opacity-60",
            error && "border-[var(--red-solid)] focus:shadow-[0_0_0_2px_var(--red-border)]",
            className
          )}
          {...props}
        />
        {showCount && maxLength && (
          <p
            className={cn(
              "self-end text-[11px]",
              isOverflow
                ? "text-[var(--red-text)]"
                : count > maxLength * 0.9
                ? "text-[var(--orange-text)]"
                : "text-[var(--text-disabled)]"
            )}
          >
            {count} / {maxLength}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
