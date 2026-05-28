/**
 * @component Form（react-hook-form 绑定版）
 * @description RHF 表单系统 — 与 react-hook-form 深度绑定的表单组件集。
 *
 * @when-to-use
 *   ✅ 所有需要提交的正式表单（有验证规则、错误处理、提交状态）
 *   ✅ 字段 ≥ 3 个的表单
 *   ❌ 简单的无验证受控表单 → 用独立的 FormField + Input
 *
 * @composition
 *   Form              — FormProvider 根（传入 useForm() 返回值）
 *   └── FormField     — 注册单个字段（name 绑定 RHF Controller）
 *       ├── FormLabel     — 字段标签（自动关联 id）
 *       ├── FormControl   — 控件容器（自动传 aria-invalid/aria-describedby）
 *       ├── FormDescription — 帮助说明
 *       └── FormMessage   — 错误信息（自动从 RHF errors 读取）
 *
 * @example
 * ```tsx
 * import { useForm } from "react-hook-form"
 * import { zodResolver } from "@hookform/resolvers/zod"
 * import { Form, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
 * import { Input } from "@/components/ui/input"
 * import { Button } from "@/components/ui/button"
 * import { z } from "zod"
 *
 * const schema = z.object({ name: z.string().min(2, "门店名称至少 2 个字符") })
 *
 * function StoreForm() {
 *   const form = useForm({ resolver: zodResolver(schema) })
 *
 *   return (
 *     <Form {...form}>
 *       <form onSubmit={form.handleSubmit(onSubmit)}>
 *         <FormField
 *           control={form.control}
 *           name="name"
 *           render={({ field }) => (
 *             <>
 *               <FormLabel required>门店名称</FormLabel>
 *               <FormControl>
 *                 <Input placeholder="请输入门店名称" {...field} />
 *               </FormControl>
 *               <FormMessage />
 *             </>
 *           )}
 *         />
 *         <Button type="submit" loading={form.formState.isSubmitting}>提交</Button>
 *       </form>
 *     </Form>
 *   )
 * }
 * ```
 */
"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "./label";

// Re-export FormProvider as Form root
export const Form = FormProvider;

// Context to thread field name + id through nested components
interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

// FormField — registers a single field, connects to RHF Controller
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// Hook to get field state inside any form component
interface FormItemContextValue { id: string }
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// Wrapper div for a single field row
export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("flex flex-col gap-1.5", className)} {...props} />
    </FormItemContext.Provider>
  );
}

// Label that wires aria attributes to the field
export function FormLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof Label>) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      className={cn(error && "text-[var(--red-solid)]", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

// Wraps the input and passes down correct aria IDs
export function FormControl({ ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <div
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}

// Helper text below the field
export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      id={formDescriptionId}
      className={cn("text-[12px] text-[var(--gray-10)]", className)}
      {...props}
    />
  );
}

// Error message — only renders when field has an error
export function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? error) : children;
  if (!body) return null;
  return (
    <p
      id={formMessageId}
      className={cn("text-[12px] font-medium text-[var(--red-solid)]", className)}
      {...props}
    >
      {body}
    </p>
  );
}
