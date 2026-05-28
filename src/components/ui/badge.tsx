/**
 * @component Badge
 * @description 标签/徽章 — 用于标注对象的类型、状态或优先级。
 *
 * @when-to-use
 *   ✅ 表格行的状态列（订单状态、审批状态）
 *   ✅ 标注对象类型（KYC / KYB / 门店类型）
 *   ✅ 优先级标注（紧急 / 普通 / 低）
 *   ❌ 需要带圆点指示器的状态 → 用 StatusIndicator
 *   ❌ Sidebar 菜单未读数字 → 用数字角标
 *
 * @variants
 *   kyc     → 青蓝色，KYC 认证状态
 *   kyb     → 蓝色，KYB 企业认证
 *   store   → 紫色，门店类型
 *   urgent  → 红色，紧急优先级
 *   normal  → 灰色，普通优先级（默认）
 *   low     → 琥珀黄，低优先级
 *   brand   → 品牌橙，促销/品牌标签
 *
 * @example
 * ```tsx
 * import { Badge } from "@/components/ui/badge"
 *
 * <Badge variant="urgent">紧急</Badge>
 * <Badge variant="kyc">KYC 已认证</Badge>
 * <Badge variant="store">旗舰门店</Badge>
 * ```
 */
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
