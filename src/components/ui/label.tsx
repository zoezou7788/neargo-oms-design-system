/**
 * @component Label
 * @description 表单标签 — 关联输入控件的文字标签，支持必填标记和可选标注。
 *
 * @when-to-use
 *   通常不直接使用，通过 FormField 或 Form 组件自动渲染。
 *   仅在自定义布局中单独使用 Label 时直接引入。
 *
 * @props
 *   required  boolean  显示红色 * 必填星号
 *   optional  boolean  显示"（可选）"灰色小字
 *   htmlFor   string   关联输入控件的 id（无障碍必填）
 *
 * @example
 * ```tsx
 * import { Label } from "@/components/ui/label"
 * import { Input } from "@/components/ui/input"
 *
 * <Label htmlFor="phone" required>联系电话</Label>
 * <Input id="phone" type="tel" placeholder="+86 138 0000 0000" />
 *
 * <Label htmlFor="remark" optional>备注</Label>
 * <Textarea id="remark" />
 * ```
 */
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
