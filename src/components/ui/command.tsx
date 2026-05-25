"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

// ---------------------------------------------------------------------------
// Command root
// ---------------------------------------------------------------------------

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "rounded-r4 border border-[var(--border)] bg-[var(--surface)]",
      "shadow-sh2 overflow-hidden",
      "flex flex-col",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

// ---------------------------------------------------------------------------
// CommandInput
// ---------------------------------------------------------------------------

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center gap-2 px-3 h-10 border-b border-[var(--gray-3)]"
    // prevent cmdk from treating this wrapper as a list item
    cmdk-input-wrapper=""
  >
    <SearchIcon
      size={16}
      className="shrink-0 text-[var(--text-low)]"
      strokeWidth={2}
    />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex-1 bg-transparent outline-none",
        "text-[13px] leading-[18px] text-[var(--text-hi)]",
        "placeholder:text-[var(--text-low)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

// ---------------------------------------------------------------------------
// CommandList
// ---------------------------------------------------------------------------

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("overflow-y-auto max-h-[300px]", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

// ---------------------------------------------------------------------------
// CommandEmpty
// ---------------------------------------------------------------------------

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(
      "text-center py-6 text-[13px] text-[var(--text-low)]",
      className,
    )}
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// ---------------------------------------------------------------------------
// CommandGroup
// ---------------------------------------------------------------------------

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "px-2 py-1.5",
      "[&_[cmdk-group-heading]]:text-[11px]",
      "[&_[cmdk-group-heading]]:uppercase",
      "[&_[cmdk-group-heading]]:tracking-[0.04em]",
      "[&_[cmdk-group-heading]]:text-[var(--text-low)]",
      "[&_[cmdk-group-heading]]:px-0",
      "[&_[cmdk-group-heading]]:pb-1",
      "[&>div]:mt-0.5",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// ---------------------------------------------------------------------------
// CommandItem
// ---------------------------------------------------------------------------

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "flex items-center gap-2 px-2 py-1.5 rounded-r3",
      "text-[13px] leading-[18px] text-[var(--text-hi)]",
      "cursor-pointer select-none",
      "data-[selected=true]:bg-[var(--gray-2)] data-[selected=true]:text-[var(--gray-12)]",
      "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
      "transition-colors",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

// ---------------------------------------------------------------------------
// CommandSeparator
// ---------------------------------------------------------------------------

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("h-px bg-[var(--gray-3)] mx-2 my-1", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// ---------------------------------------------------------------------------
// CommandShortcut
// ---------------------------------------------------------------------------

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "text-[11px] leading-none text-[var(--text-low)] ml-auto font-mono",
      "bg-[var(--gray-2)] px-1.5 py-0.5 rounded-r2",
      className,
    )}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";

// ---------------------------------------------------------------------------
// CommandDialog — ⌘K global search dialog
// ---------------------------------------------------------------------------

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

const CommandDialog = ({
  open,
  onOpenChange,
  children,
  className,
}: CommandDialogProps) => {
  // ⌘K keyboard shortcut
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "rounded-r4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] max-w-[560px] p-0 gap-0 overflow-hidden",
          className,
        )}
      >
        <Command className="border-none shadow-none rounded-none">
          <CommandInput placeholder="搜索订单、门店、用户... ⌘K" />
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};
CommandDialog.displayName = "CommandDialog";

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
};
