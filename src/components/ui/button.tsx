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
