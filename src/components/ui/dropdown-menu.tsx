import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// DropdownMenu — full Radix primitive set styled to NearGo OMS tokens.
//
// Design System Rules:
//   - Content: bg-[var(--surface)], border border-[var(--border)], rounded-r4, shadow-sh2, p-1
//   - Item: text-[13px] text-[var(--text-hi)], rounded-r3, px-2.5 py-1.5
//   - Item hover: bg-[var(--gray-2)] text-[var(--gray-12)]
//   - Destructive item: text-[var(--red-solid)] hover:bg-[var(--red-bg)]
//   - Separator: bg-[var(--gray-3)] h-px my-1
//   - Label: 11px uppercase tracking-[0.04em] text-[var(--text-low)]
//   - Shortcut: 11px text-[var(--text-low)] ml-auto
// ─────────────────────────────────────────────────────────────

// ── Root passthrough ──────────────────────────────────────────
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// ── Shared content styles ─────────────────────────────────────
const contentStyles = [
  "z-50 min-w-[160px] overflow-hidden",
  "rounded-r4 border border-[var(--border)]",
  "bg-[var(--surface)] p-1",
  "shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)]",
  "animate-in fade-in-0 zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
  "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
];

// ── DropdownMenuContent ───────────────────────────────────────
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(contentStyles, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// ── DropdownMenuSubTrigger ────────────────────────────────────
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center gap-2",
      "rounded-r3 px-2.5 py-1.5 text-[13px] text-[var(--text-hi)]",
      "outline-none transition-colors duration-fast",
      "hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
      "focus:bg-[var(--gray-2)] focus:text-[var(--gray-12)]",
      "data-[state=open]:bg-[var(--gray-2)] data-[state=open]:text-[var(--gray-12)]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-3.5 w-3.5 text-[var(--text-low)]" aria-hidden="true" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

// ── DropdownMenuSubContent ────────────────────────────────────
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(contentStyles, className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

// ── DropdownMenuItem ──────────────────────────────────────────
export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
  /** "destructive" → red text + red-bg hover */
  variant?: "default" | "destructive";
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2",
      "rounded-r3 px-2.5 py-1.5 text-[13px]",
      "outline-none transition-colors duration-fast",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
      variant === "default" && [
        "text-[var(--text-hi)]",
        "hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
        "focus:bg-[var(--gray-2)] focus:text-[var(--gray-12)]",
      ],
      variant === "destructive" && [
        "text-[var(--red-solid)]",
        "hover:bg-[var(--red-bg)] hover:text-[var(--red-solid)]",
        "focus:bg-[var(--red-bg)] focus:text-[var(--red-solid)]",
      ],
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// ── DropdownMenuCheckboxItem ──────────────────────────────────
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center",
      "rounded-r3 py-1.5 pl-8 pr-2.5 text-[13px] text-[var(--text-hi)]",
      "outline-none transition-colors duration-fast",
      "hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
      "focus:bg-[var(--gray-2)] focus:text-[var(--gray-12)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5 text-[var(--gray-12)]" aria-hidden="true" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

// ── DropdownMenuRadioItem ─────────────────────────────────────
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center",
      "rounded-r3 py-1.5 pl-8 pr-2.5 text-[13px] text-[var(--text-hi)]",
      "outline-none transition-colors duration-fast",
      "hover:bg-[var(--gray-2)] hover:text-[var(--gray-12)]",
      "focus:bg-[var(--gray-2)] focus:text-[var(--gray-12)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
      className
    )}
    {...props}
  >
    <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-[var(--gray-12)] text-[var(--gray-12)]" aria-hidden="true" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// ── DropdownMenuLabel ─────────────────────────────────────────
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.04em] text-[var(--text-low)]",
      "select-none",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// ── DropdownMenuSeparator ─────────────────────────────────────
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[var(--gray-3)]", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// ── DropdownMenuShortcut ──────────────────────────────────────
/** Keyboard shortcut hint aligned to the right of a menu item. */
const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      "ml-auto text-[11px] tracking-widest text-[var(--text-low)]",
      className
    )}
    aria-hidden="true"
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};
