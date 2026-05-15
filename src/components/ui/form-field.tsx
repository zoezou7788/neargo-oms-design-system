import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

/**
 * FormField — Label + Control + Hint + Error in one composable unit.
 *
 * This is the #1 component for form consistency. Every input/select/textarea
 * in OMS forms MUST be wrapped in FormField, not built ad-hoc.
 *
 * @example
 * <FormField label="门店名称" required hint="2–50 个字符" error={errors.name?.message}>
 *   <Input placeholder="例：北京朝阳旗舰店" {...register("name")} error={!!errors.name} />
 * </FormField>
 */
export interface FormFieldProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  /** HTML id forwarded to label htmlFor */
  fieldId?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required, optional, hint, error, fieldId, children, className }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={fieldId} required={required} optional={optional}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p className="text-[11.5px] text-[var(--red-text)]" role="alert" id={fieldId ? `${fieldId}-error` : undefined}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-[11.5px] text-[var(--text-low)]">{hint}</p>
      ) : null}
    </div>
  )
);
FormField.displayName = "FormField";

/** Two-column form grid (default) or single-column */
export const FormGrid: React.FC<{
  cols?: 1 | 2;
  children: React.ReactNode;
  className?: string;
}> = ({ cols = 2, children, className }) => (
  <div
    className={cn(
      "grid gap-4",
      cols === 2 ? "grid-cols-2" : "grid-cols-1",
      className
    )}
  >
    {children}
  </div>
);

/** Form section with title + description */
export const FormSection: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => (
  <div
    className={cn(
      "bg-[var(--surface)] border border-[var(--border)] rounded-r4 p-5",
      className
    )}
  >
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-[var(--text-hi)]">{title}</h3>
      {description && (
        <p className="text-xs text-[var(--text-low)] mt-0.5">{description}</p>
      )}
    </div>
    {children}
  </div>
);

/** Form action bar (sticky at bottom of long forms) */
export const FormActions: React.FC<{
  children: React.ReactNode;
  sticky?: boolean;
}> = ({ children, sticky }) => (
  <div
    className={cn(
      "flex justify-end gap-2 px-5 py-3",
      "bg-[var(--gray-2)] border-t border-[var(--border)]",
      "rounded-b-r4",
      sticky && "sticky bottom-0 z-[var(--z-raised)]"
    )}
  >
    {children}
  </div>
);

export { FormField };
