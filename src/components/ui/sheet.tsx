"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SheetSide = "right" | "left" | "top" | "bottom";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
const Sheet = DialogPrimitive.Root;

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
const SheetTrigger = DialogPrimitive.Trigger;

// ---------------------------------------------------------------------------
// Close (X button — used inside SheetContent)
// ---------------------------------------------------------------------------
const SheetClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-4 top-4 rounded-r3 p-1",
      "text-[var(--text-low)] hover:text-[var(--text-hi)]",
      "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-8)]",
      className
    )}
    {...props}
  >
    <X size={16} strokeWidth={2} />
    <span className="sr-only">关闭</span>
  </DialogPrimitive.Close>
));
SheetClose.displayName = DialogPrimitive.Close.displayName;

// ---------------------------------------------------------------------------
// Side variant map
// ---------------------------------------------------------------------------
const sideVariants: Record<SheetSide, string> = {
  right: cn(
    "right-0 top-0 h-full w-[400px] max-w-[90vw]",
    "border-l border-[var(--border)]",
    "shadow-[0_0_0_1px_var(--border),_-8px_0_32px_rgba(0,0,0,0.08)]",
    "animate-in slide-in-from-right",
    "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
  ),
  left: cn(
    "left-0 top-0 h-full w-[400px] max-w-[90vw]",
    "border-r border-[var(--border)]",
    "shadow-[0_0_0_1px_var(--border),_8px_0_32px_rgba(0,0,0,0.08)]",
    "animate-in slide-in-from-left",
    "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left"
  ),
  top: cn(
    "top-0 left-0 w-full h-auto max-h-[80vh]",
    "border-b border-[var(--border)]",
    "shadow-[0_0_0_1px_var(--border),_0_8px_32px_rgba(0,0,0,0.08)]",
    "animate-in slide-in-from-top",
    "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top"
  ),
  bottom: cn(
    "bottom-0 left-0 w-full h-auto max-h-[80vh]",
    "border-t border-[var(--border)]",
    "shadow-[0_0_0_1px_var(--border),_0_-8px_32px_rgba(0,0,0,0.08)]",
    "animate-in slide-in-from-bottom",
    "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom"
  ),
};

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px]",
      "animate-in fade-in",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Which edge the sheet slides in from (default: "right") */
  side?: SheetSide;
  /** Hide the default close button */
  hideClose?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, side = "right", hideClose = false, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Base
        "fixed z-50 flex flex-col",
        "bg-[var(--surface)]",
        // Duration
        "duration-300",
        // Side-specific
        sideVariants[side],
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && <SheetClose />}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "shrink-0 border-b border-[var(--gray-3)] px-5 py-4",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "pr-6 text-[16px] font-semibold text-[var(--text-hi)]",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mt-0.5 text-[13px] text-[var(--text-mid)]", className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

// ---------------------------------------------------------------------------
// Body (scrollable middle area)
// ---------------------------------------------------------------------------
const SheetBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex-1 overflow-y-auto px-5 py-4", className)}
    {...props}
  />
);
SheetBody.displayName = "SheetBody";

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "shrink-0 border-t border-[var(--gray-3)] px-5 py-4",
      "flex items-center justify-end gap-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

// ---------------------------------------------------------------------------
// ContextPanel — pre-composed OMS right-side approval/detail panel
// ---------------------------------------------------------------------------
export interface ContextPanelProps {
  /** Controlled open state */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Panel heading */
  title: string;
  /** Optional sub-heading */
  description?: string;
  /** Content rendered in SheetFooter (action buttons, etc.) */
  footer?: React.ReactNode;
  /** Panel body content */
  children: React.ReactNode;
}

const ContextPanel: React.FC<ContextPanelProps> = ({
  open,
  onOpenChange,
  title,
  description,
  footer,
  children,
}) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="right"
      // Narrower width for detail/approval panels
      className="w-[360px]"
    >
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        {description && <SheetDescription>{description}</SheetDescription>}
      </SheetHeader>

      <SheetBody>{children}</SheetBody>

      {footer && <SheetFooter>{footer}</SheetFooter>}
    </SheetContent>
  </Sheet>
);
ContextPanel.displayName = "ContextPanel";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  ContextPanel,
};
