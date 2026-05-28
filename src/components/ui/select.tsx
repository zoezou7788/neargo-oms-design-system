/**
 * @component Select
 * @description 原生下拉选择器 — 适合选项固定、数量 ≤ 20 条的场景。
 *
 * @when-to-use
 *   ✅ 门店类型（旗舰 / 标准 / 加盟 / 合作）
 *   ✅ 优先级（紧急 / 普通 / 低）
 *   ✅ 状态筛选（FilterBar 内的快速筛选）
 *   ❌ 选项 > 20 条或需要搜索 → 用 Combobox
 *   ❌ 需要多选 → 用 MultiSelect
 *
 * @props
 *   options     SelectOption[]        选项数组（value/label/disabled?/group?）
 *   value       string                当前值（受控）
 *   onChange    (v: string) => void   变更回调
 *   placeholder string                占位文字（默认"请选择…"）
 *   error       boolean               错误状态（红色边框）
 *   disabled    boolean
 *
 * @example
 * ```tsx
 * import { Select } from "@/components/ui/select"
 *
 * <Select
 *   options={[
 *     { value: "flagship", label: "旗舰门店" },
 *     { value: "standard", label: "标准门店" },
 *     { value: "franchise", label: "加盟门店" },
 *   ]}
 *   value={storeType}
 *   onChange={setStoreType}
 *   placeholder="全部门店类型"
 * />
 *
 * // 分组选项
 * <Select
 *   options={[
 *     { value: "pending", label: "待审批", group: "进行中" },
 *     { value: "processing", label: "审批中", group: "进行中" },
 *     { value: "approved", label: "已通过", group: "已完成" },
 *   ]}
 *   value={status}
 *   onChange={setStatus}
 * />
 * ```
 */
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
