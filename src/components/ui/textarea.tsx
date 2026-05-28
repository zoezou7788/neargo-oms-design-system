/**
 * @component Textarea
 * @description 多行文本输入框 — 适合长文本输入，如备注、描述、审批意见。
 *
 * @when-to-use
 *   ✅ 审批意见、拒绝原因（建议 rows=3-4）
 *   ✅ 备注/描述字段
 *   ✅ 需要字数统计的输入（showCount + maxLength）
 *   ❌ 单行输入 → 用 Input
 *   ❌ 富文本编辑 → 需引入专用富文本编辑器
 *
 * @states
 *   默认 / Focus（黑色边框）/ Error（红色边框）/ Disabled（灰色背景）/ ReadOnly
 *
 * @props
 *   error      boolean   错误状态（红色边框）
 *   showCount  boolean   显示字数统计（需配合 maxLength 使用）
 *   maxLength  number    最大字符数（超出时计数变红）
 *   rows       number    初始可见行数（默认 3）
 *   （继承所有 textarea 原生属性）
 *
 * @example
 * ```tsx
 * import { Textarea } from "@/components/ui/textarea"
 *
 * // 审批意见（带字数限制）
 * <Textarea
 *   placeholder="请填写审批意见（选填）…"
 *   rows={4}
 *   maxLength={500}
 *   showCount
 *   value={remark}
 *   onChange={(e) => setRemark(e.target.value)}
 * />
 *
 * // 错误状态
 * <Textarea error={!!errors.reason} placeholder="请填写拒绝原因" />
 * ```
 */
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
