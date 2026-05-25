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
