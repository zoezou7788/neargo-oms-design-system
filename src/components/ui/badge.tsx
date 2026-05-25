import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/lib/tokens";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 rounded-r2 text-[11px] font-medium leading-relaxed whitespace-nowrap border",
  {
    variants: {
      /**
       * ⚠️  Design System Rule:
       *   All badge variants follow: step-2 bg / step-3 border / step-11 text
       *   Adding a new variant requires registering it in tokens.ts first.
       */
      variant: {
        kyc:    "bg-[#ecfcfd]          border-[#b8ecf5]              text-[#107ea0]",
        kyb:    "bg-[var(--blue-bg)]   border-[var(--blue-border)]   text-[var(--blue-text)]",
        store:  "bg-[var(--purple-bg)] border-[var(--purple-border)] text-[var(--purple-text)]",
        urgent: "bg-[var(--red-bg)]    border-[var(--red-border)]    text-[var(--red-text)]",
        normal: "bg-[var(--gray-2)]    border-[var(--gray-6)]        text-[var(--text-mid)]",
        low:    "bg-[var(--amber-2)]   border-[var(--amber-3)]       text-[var(--amber-11)]",
        brand:  "bg-[var(--amber-9)]   border-transparent            text-[var(--amber-12)] font-bold",
      } satisfies Record<BadgeVariant, string>,
    },
    defaultVariants: { variant: "normal" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
