"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
const Popover = PopoverPrimitive.Root;

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
const PopoverTrigger = PopoverPrimitive.Trigger;

// ---------------------------------------------------------------------------
// Anchor
// ---------------------------------------------------------------------------
const PopoverAnchor = PopoverPrimitive.Anchor;

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------
const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-r3 p-1",
      "text-[var(--text-low)] hover:text-[var(--text-hi)]",
      "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-8)]",
      className
    )}
    {...props}
  >
    <X size={14} strokeWidth={2} />
    <span className="sr-only">关闭</span>
  </PopoverPrimitive.Close>
));
PopoverClose.displayName = PopoverPrimitive.Close.displayName;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "start", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        // Layout
        "relative z-50 min-w-[200px] p-4",
        // Surface
        "rounded-r4 border border-[var(--border)] bg-[var(--surface)]",
        // Shadow
        "shadow-sh4",
        // Animation — open
        "animate-in fade-in-0 zoom-in-95",
        // Animation — close
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        // Slide from opposite side
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose };
