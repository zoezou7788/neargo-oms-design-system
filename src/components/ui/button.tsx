/**
 * @component Button
 * @description 按钮 — 触发操作的核心交互元素。
 *
 * @design-rules（严格遵守，不可随意使用）
 *   primary   → gray-12 黑色。每个操作区的主要动作（提交、确认、新建）
 *   secondary → 白底+边框。取消、返回、重置等次要动作
 *   positive  → 绿色。审批通过、启用等肯定性操作
 *   danger    → 红色。拒绝、删除等破坏性操作（须配合 ConfirmDialog）
 *   ghost     → 透明蓝字。"查看详情"等链接型操作
 *   brand     → 品牌橙（#FFA902）。每屏最多 1 个，仅用于营销 CTA
 *
 * @sizes
 *   sm → h-30px，筛选栏、表格行内操作
 *   md → h-38px，通用（默认）
 *   lg → h-44px，表单主提交按钮、空状态 CTA
 *
 * @props
 *   variant      ButtonVariant           按钮变体（默认 "primary"）
 *   size         ButtonSize              尺寸（默认 "md"）
 *   loading      boolean                 加载态，自动禁用并显示 spinner
 *   icon         ReactNode               图标（配合 iconPosition）
 *   iconPosition "left" | "right"        图标位置（默认 "left"）
 *   fullWidth    boolean                 撑满父容器宽度
 *
 * @example
 * ```tsx
 * import { Button } from "@/components/ui/button"
 * import { Plus, Check } from "lucide-react"
 *
 * // 主操作
 * <Button variant="primary" icon={<Plus size={14} />}>新建订单</Button>
 *
 * // 审批通过
 * <Button variant="positive" icon={<Check size={14} />}>审批通过</Button>
 *
 * // 加载态
 * <Button variant="primary" loading={isSubmitting}>提交审批</Button>
 *
 * // 危险操作（配合 ConfirmDialog 使用）
 * <Button variant="danger" size="sm">删除</Button>
 * ```
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/lib/tokens";

// ─────────────────────────────────────────────────────────────
// buttonVariants — cva is the enforcement mechanism.
// Only variants listed here are valid; TypeScript will reject
// any unknown variant at compile time.
// ─────────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-medium rounded-r3 select-none",
    "transition-all duration-normal ease-[var(--ease-out)]",
    "disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)]",
  ],
  {
    variants: {
      /**
       * ⚠️  Design System Rule:
       *   - primary   → gray-12 (#1F1D1C)  — ALL key workflow actions
       *   - secondary → white + border      — cancel, back, reset
       *   - positive  → green-solid         — approve, enable, confirm payment
       *   - danger    → red-solid           — reject, delete (REQUIRES confirmation dialog)
       *   - ghost     → transparent blue    — detail links, "view all"
       *   - brand     → amber-9 (#FFA902)   — promotional CTAs ONLY (≤1 per screen)
       */
      variant: {
        primary: [
          "bg-[var(--gray-12)] text-white",
          "hover:bg-[var(--gray-11)] active:bg-[var(--gray-12)]",
          "shadow-sh1",
        ],
        secondary: [
          "bg-[var(--surface)] text-[var(--text-hi)]",
          "border border-[var(--gray-7)]",
          "hover:bg-[var(--gray-2)] hover:border-[var(--gray-8)]",
        ],
        positive: [
          "bg-[var(--green-solid)] text-white",
          "hover:brightness-95 active:brightness-90",
        ],
        danger: [
          "bg-[var(--red-solid)] text-white",
          "hover:brightness-95 active:brightness-90",
        ],
        ghost: [
          "bg-transparent text-[var(--blue-text)]",
          "hover:bg-[var(--blue-bg)]",
        ],
        brand: [
          "bg-[var(--amber-9)] text-[var(--amber-12)] font-bold",
          "hover:bg-[var(--amber-10)] active:bg-[var(--amber-8)]",
          // ⚠️  Brand rule enforced at runtime via prop validation
        ],
      } satisfies Record<ButtonVariant, string | string[]>,

      size: {
        sm: "h-[30px] px-3 text-[12px]",
        md: "h-[38px] px-4 text-[13.5px]",
        lg: "h-[44px] px-5 text-[14.5px]",
      } satisfies Record<ButtonSize, string>,

      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ─────────────────────────────────────────────────────────────
// Props interface
// ─────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      icon,
      iconPosition = "left",
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span
            className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          icon && iconPosition === "left" && (
            <span className="shrink-0" aria-hidden="true">{icon}</span>
          )
        )}
        {children}
        {!loading && icon && iconPosition === "right" && (
          <span className="shrink-0" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
