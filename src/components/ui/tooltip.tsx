"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
const TooltipProvider = ({ children, ...props }: TooltipPrimitive.TooltipProviderProps) => (
  <TooltipPrimitive.Provider delayDuration={300} {...props}>
    {children}
  </TooltipPrimitive.Provider>
);
TooltipProvider.displayName = "TooltipProvider";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
const Tooltip = TooltipPrimitive.Root;

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
const TooltipTrigger = TooltipPrimitive.Trigger;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // Base
        "z-50 max-w-[220px] px-2 py-1",
        "rounded-r3 bg-[var(--gray-12)] text-white",
        "text-[12px] leading-relaxed",
        // Animation
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
        "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-[var(--gray-12)]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// SimpleTooltip — convenience wrapper
// ---------------------------------------------------------------------------
interface SimpleTooltipProps {
  /** The tooltip label text or node */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** Side the tooltip appears on (default: "top") */
  side?: TooltipPrimitive.TooltipContentProps["side"];
  /** Extra className forwarded to TooltipContent */
  contentClassName?: string;
  /** Override default delayDuration (ms) */
  delayDuration?: number;
}

const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  content,
  children,
  side = "top",
  contentClassName,
  delayDuration,
}) => (
  <TooltipProvider delayDuration={delayDuration}>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={contentClassName}>
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
SimpleTooltip.displayName = "SimpleTooltip";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
};
