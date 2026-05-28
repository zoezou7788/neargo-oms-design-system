/**
 * @component Collapsible / SectionCollapsible
 * @description 折叠展开容器 — 切换内容区域的显示/隐藏，带动画过渡。
 *
 * @when-to-use
 *   ✅ 长表单的可选分区（高级选项、附加信息）
 *   ✅ FAQ / 帮助文档的问答折叠
 *   ✅ Sidebar 子菜单展开（已集成到 Sidebar 组件）
 *   ❌ 标签页切换 → 用 Tabs
 *   ❌ 需要手风琴效果（多个互斥展开）→ 用 Accordion
 *
 * @composition（Radix UI Collapsible 原语）
 *   Collapsible            — 根组件（控制 open 状态）
 *   ├── CollapsibleTrigger — 触发按钮（asChild 可传任意元素）
 *   └── CollapsibleContent — 折叠内容（含 fade + slide 动画）
 *
 *   SectionCollapsible     — 预组合版本，适合表单分区折叠
 *
 * @example SectionCollapsible（推荐）
 * ```tsx
 * import { SectionCollapsible } from "@/components/ui/collapsible"
 *
 * <SectionCollapsible title="高级配置" defaultOpen={false}>
 *   <FormField label="备注">
 *     <Textarea placeholder="可选填写备注…" />
 *   </FormField>
 * </SectionCollapsible>
 * ```
 *
 * @example Collapsible 原语
 * ```tsx
 * import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
 *
 * <Collapsible open={open} onOpenChange={setOpen}>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost" size="sm">查看更多 {open ? "▲" : "▼"}</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <DetailContent />
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Base Collapsible primitives (re-exported with display names)
// ---------------------------------------------------------------------------

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden",
      // open/close animation
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
CollapsibleContent.displayName =
  CollapsiblePrimitive.CollapsibleContent.displayName;

// ---------------------------------------------------------------------------
// AccordionSection — pre-composed collapsible for OMS use cases
// (sidebar filter groups, settings sections, etc.)
// ---------------------------------------------------------------------------

export interface AccordionSectionProps {
  title: string;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const AccordionSection = ({
  title,
  defaultOpen = false,
  badge,
  children,
  className,
}: AccordionSectionProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn("w-full", className)}
    >
      <CollapsibleTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
          aria-expanded={open}
          className={cn(
            "flex items-center justify-between py-2 px-0",
            "text-[13px] font-medium leading-[18px]",
            "text-[var(--text-hi)] hover:text-[var(--gray-12)]",
            "cursor-pointer select-none transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)] rounded-r2",
          )}
        >
          <span className="flex items-center gap-2">
            {title}
            {badge != null && badge}
          </span>

          <ChevronDownIcon
            size={16}
            strokeWidth={2}
            className={cn(
              "shrink-0 text-[var(--text-low)] transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="pt-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
AccordionSection.displayName = "AccordionSection";

export { Collapsible, CollapsibleTrigger, CollapsibleContent, AccordionSection };
