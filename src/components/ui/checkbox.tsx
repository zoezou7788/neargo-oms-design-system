/**
 * @component Checkbox
 * @description 复选框 — 用于单个布尔值选择，或多选列表中的行选择。
 *
 * @when-to-use
 *   ✅ 表格行多选（配合 Table 的 selectable 模式）
 *   ✅ 表单中的"我同意条款"等单项确认
 *   ✅ 设置页的功能开关（布尔型，无"开/关"语义时）→ 有"开/关"语义用 Switch
 *   ❌ 互斥选项 → 用 RadioGroup
 *
 * @states
 *   未选中 / 选中 / 半选（indeterminate，用于表格全选）/ 禁用
 *
 * @example
 * ```tsx
 * import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
 * import { Checkbox } from "@/components/ui/checkbox"
 *
 * // 基础用法
 * <Checkbox
 *   id="agree"
 *   checked={agreed}
 *   onCheckedChange={(v) => setAgreed(!!v)}
 * />
 * <label htmlFor="agree">我已阅读并同意服务条款</label>
 *
 * // 半选状态（表格全选按钮）
 * <Checkbox checked="indeterminate" onCheckedChange={handleSelectAll} />
 * ```
 */
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// Checkbox — Radix primitive styled to NearGo OMS tokens.
//
// Design System Rules:
//   - Size: 16×16px (size-4)
//   - Radius: rounded-r2 (4px)
//   - Border: border border-[var(--gray-7)], hover: var(--gray-8)
//   - Checked bg: var(--gray-12), border: var(--gray-12), indicator: white
//   - Focus ring: ring-2 ring-[var(--gray-4)]
//   - Disabled: opacity-50 cursor-not-allowed
//   - Indicator: Check icon from lucide-react at size 10
//
// CheckboxField wraps Checkbox with Label, optional description, optional error.
// ─────────────────────────────────────────────────────────────

// ── Checkbox ──────────────────────────────────────────────────
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Layout
      "peer relative inline-flex size-4 shrink-0 items-center justify-center",
      // Shape
      "rounded-r2 border border-[var(--gray-7)]",
      // Background
      "bg-[var(--surface)]",
      // Transitions
      "transition-[background-color,border-color,box-shadow] duration-fast",
      // Hover (unchecked)
      "hover:border-[var(--gray-8)]",
      // Checked state
      "data-[state=checked]:bg-[var(--gray-12)]",
      "data-[state=checked]:border-[var(--gray-12)]",
      "data-[state=checked]:text-white",
      // Indeterminate state
      "data-[state=indeterminate]:bg-[var(--gray-12)]",
      "data-[state=indeterminate]:border-[var(--gray-12)]",
      "data-[state=indeterminate]:text-white",
      // Focus ring
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)] focus-visible:ring-offset-1",
      // Disabled
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center" asChild>
      <Check
        size={10}
        strokeWidth={3}
        aria-hidden="true"
        // Indeterminate shows a dash instead of a check
        className={cn(
          "text-current",
          props.checked === "indeterminate" && "hidden"
        )}
      />
    </CheckboxPrimitive.Indicator>
    {/* Indeterminate indicator — dash */}
    {props.checked === "indeterminate" && (
      <span
        className="absolute block h-[2px] w-[8px] rounded-full bg-current"
        aria-hidden="true"
      />
    )}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// ── CheckboxField ─────────────────────────────────────────────
export interface CheckboxFieldProps {
  /** HTML id — forwarded to checkbox and used for label htmlFor */
  id: string;
  /** Primary label text */
  label: string;
  /** Secondary helper text displayed below the label */
  description?: string;
  /** Validation error message — replaces description when set */
  error?: string;
  /** Forwards checked value and change handler to the inner Checkbox */
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  description,
  error,
  checked,
  onCheckedChange,
  disabled,
  required,
  className,
}) => (
  <div className={cn("flex items-start gap-2.5", className)}>
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      aria-describedby={
        error
          ? `${id}-error`
          : description
          ? `${id}-description`
          : undefined
      }
      // Align checkbox with the first line of label text
      className="mt-[1px]"
    />
    <div className="flex flex-col gap-0.5">
      <label
        htmlFor={id}
        className={cn(
          "text-[13px] leading-snug text-[var(--text-hi)] select-none",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--red-solid)]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[11px] leading-snug text-[var(--red-solid)]"
        >
          {error}
        </p>
      ) : description ? (
        <p
          id={`${id}-description`}
          className="text-[11px] leading-snug text-[var(--text-low)]"
        >
          {description}
        </p>
      ) : null}
    </div>
  </div>
);

CheckboxField.displayName = "CheckboxField";

export { Checkbox, CheckboxField };
