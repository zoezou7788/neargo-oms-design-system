/**
 * @component Switch
 * @description 开关切换 — 表达布尔型配置项的开启/关闭，效果即时生效。
 *
 * @when-to-use（Switch vs Checkbox）
 *   ✅ Switch：有"开/关"语义，状态变更即时生效（无需点提交）
 *              如：邮件通知开关、功能启用/禁用
 *   ✅ Checkbox：列表多选、表单中的勾选确认（需提交后生效）
 *
 * @props
 *   checked    boolean                  当前状态（受控，必填）
 *   onChange   (checked: boolean) => void  变更回调（必填）
 *   disabled   boolean                  禁用
 *   label      string                   右侧文字标签（可选）
 *   size       "sm" | "md"              sm:32×18px  md:40×22px（默认）
 *
 * @example
 * ```tsx
 * import { Switch } from "@/components/ui/switch"
 *
 * <Switch
 *   checked={emailEnabled}
 *   onChange={setEmailEnabled}
 *   label="邮件通知"
 * />
 *
 * // 禁用态
 * <Switch checked={false} onChange={() => {}} disabled label="短信通知（不可用）" />
 * ```
 */
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
