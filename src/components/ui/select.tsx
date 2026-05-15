import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  clearable?: boolean;
  className?: string;
}

/**
 * Select — token-compliant dropdown selector.
 * Uses native <select> for accessibility + custom styling.
 * For searchable lists (>20 options) use Combobox instead.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, onChange, placeholder = "请选择…", disabled, error, className }, ref) => {
    // Group options
    const groups = React.useMemo(() => {
      const grouped: Record<string, SelectOption[]> = { "": [] };
      options.forEach(opt => {
        const g = opt.group ?? "";
        if (!grouped[g]) grouped[g] = [];
        grouped[g].push(opt);
      });
      return grouped;
    }, [options]);

    const hasGroups = Object.keys(groups).some(k => k !== "");

    return (
      <select
        ref={ref}
        value={value ?? ""}
        disabled={disabled}
        aria-invalid={error}
        onChange={e => onChange(e.target.value)}
        className={cn(
          "h-9 w-full rounded-r3 border px-3 text-sm font-sans",
          "bg-[var(--surface)] text-[var(--text-hi)]",
          "border-[var(--gray-7)]",
          "hover:border-[var(--gray-8)]",
          "focus:outline-none focus:border-[var(--gray-12)]",
          "focus:shadow-[0_0_0_2px_var(--gray-4)]",
          "transition-[border-color,box-shadow] duration-normal",
          "disabled:bg-[var(--gray-3)] disabled:cursor-not-allowed disabled:opacity-60",
          "appearance-none",
          // Custom chevron
          "bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23b0adaa' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")]",
          "bg-no-repeat bg-[right_12px_center] pr-9",
          error && "border-[var(--red-solid)] focus:shadow-[0_0_0_2px_var(--red-border)]",
          className
        )}
      >
        {placeholder && (
          <option value="" disabled={!value}>
            {placeholder}
          </option>
        )}
        {hasGroups
          ? Object.entries(groups).map(([group, opts]) =>
              group ? (
                <optgroup key={group} label={group}>
                  {opts.map(o => (
                    <option key={o.value} value={o.value} disabled={o.disabled}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ) : (
                opts.map(o => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))
              )
            )
          : options.map(o => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
      </select>
    );
  }
);
Select.displayName = "Select";
export { Select };
