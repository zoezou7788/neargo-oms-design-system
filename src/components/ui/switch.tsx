import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md";
  id?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, disabled, label, size = "md", id, ...props }, ref) => {
    const switchId = id ?? React.useId();
    const trackSize = size === "sm"
      ? "w-7 h-4"
      : "w-9 h-5";
    const thumbSize = size === "sm"
      ? "w-3 h-3 top-0.5 left-0.5 data-[checked]:translate-x-3"
      : "w-4 h-4 top-0.5 left-0.5 data-[checked]:translate-x-4";

    return (
      <div className="inline-flex items-center gap-2">
        <button
          ref={ref}
          role="switch"
          id={switchId}
          type="button"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={cn(
            "relative inline-block shrink-0 rounded-full cursor-pointer",
            "transition-colors duration-normal ease-[var(--ease-out)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)]",
            checked
              ? "bg-[var(--gray-12)]"
              : "bg-[var(--gray-6)]",
            disabled && "opacity-45 cursor-not-allowed",
            trackSize
          )}
          data-checked={checked || undefined}
          {...props}
        >
          <span
            className={cn(
              "absolute block rounded-full bg-white shadow-sh2",
              "transition-transform duration-normal ease-[var(--ease-spring)]",
              thumbSize
            )}
            data-checked={checked || undefined}
          />
        </button>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm text-[var(--text-hi)] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
