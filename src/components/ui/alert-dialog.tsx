/**
 * @component AlertDialog / ConfirmDialog（via alert-dialog.tsx）
 * @description 强制确认弹窗 — 用于危险操作或不可逆操作前的二次确认，不可通过点击遮罩关闭。
 *
 * @when-to-use
 *   ✅ 删除操作（批量删除、永久删除）
 *   ✅ 拒绝审批等不可撤销操作
 *   ✅ 系统级危险操作（清空数据、重置配置）
 *   ❌ 普通确认（如提交审批）→ 用 Dialog / ConfirmDialog
 *   ❌ 信息展示 → 用 Dialog
 *
 * @design-rules
 *   - 确认按钮用 variant="danger"（红色），取消按钮用 variant="secondary"
 *   - 不允许点击遮罩关闭（强制用户主动选择）
 *   - 标题直接说明后果，如"确认删除此订单？"，不要问"你确定吗？"
 *
 * @example
 * ```tsx
 * import {
 *   AlertDialog, AlertDialogTrigger, AlertDialogContent,
 *   AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
 *   AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
 * } from "@/components/ui/alert-dialog"
 *
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant="danger">删除订单</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>确认删除此订单？</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         订单 ORD-20240115-002 的所有数据将被永久删除，此操作不可撤销。
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>取消</AlertDialogCancel>
 *       <AlertDialogAction onClick={handleDelete}>确认删除</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
const AlertDialog = AlertDialogPrimitive.Root;

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// ---------------------------------------------------------------------------
// Portal
// ---------------------------------------------------------------------------
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]",
      "animate-in fade-in",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out",
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        // Position
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        // Size
        "max-w-[480px] w-full p-6",
        // Surface
        "rounded-r5 border border-[var(--border)] bg-[var(--surface)]",
        // Shadow — deeper than sh4 for dialogs
        "shadow-[0_24px_48px_rgba(0,0,0,0.18)]",
        // Animation
        "animate-in fade-in zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[16px] font-semibold text-[var(--text-hi)]",
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "mt-1 text-[14px] text-[var(--text-mid)]",
      className
    )}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-6 flex items-center justify-end gap-2", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

// ---------------------------------------------------------------------------
// Action (danger style by default — for confirm/destructive)
// ---------------------------------------------------------------------------
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex h-[38px] items-center justify-center px-4",
      "rounded-r3 bg-[var(--red-solid)] text-[13.5px] font-medium text-white",
      "hover:brightness-95 active:brightness-90",
      "transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red-solid)] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

// ---------------------------------------------------------------------------
// Cancel (secondary style)
// ---------------------------------------------------------------------------
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      "inline-flex h-[38px] items-center justify-center px-4",
      "rounded-r3 border border-[var(--gray-7)]",
      "bg-[var(--surface)] text-[13.5px] font-medium text-[var(--text-hi)]",
      "hover:bg-[var(--gray-2)] active:bg-[var(--gray-3)]",
      "transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-8)] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// ---------------------------------------------------------------------------
// ConfirmActionDialog — convenience component for OMS dangerous operations
// ---------------------------------------------------------------------------
export interface ConfirmActionDialogProps {
  /** Controlled open state */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Dialog heading */
  title: string;
  /** Explanatory copy below the title */
  description?: React.ReactNode;
  /** Confirm button label (default: 确认) */
  confirmLabel?: string;
  /** Cancel button label (default: 取消) */
  cancelLabel?: string;
  /**
   * "danger" → red confirm button (default — for delete/reject/cancel-order)
   * "positive" → brand/green confirm button (for approve/publish)
   */
  variant?: "danger" | "positive";
  /** Called when the user clicks confirm */
  onConfirm: () => void;
  /** Shows a spinner and disables buttons while true */
  loading?: boolean;
}

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "确认",
  cancelLabel = "取消",
  variant = "danger",
  onConfirm,
  loading = false,
}) => {
  const actionColorClass =
    variant === "positive"
      ? "bg-[var(--green-solid)] focus-visible:ring-[var(--green-solid)]"
      : "bg-[var(--red-solid)] focus-visible:ring-[var(--red-solid)]";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            className={actionColorClass}
            onClick={(e) => {
              // Prevent Radix from auto-closing; let consumer decide via onOpenChange
              e.preventDefault();
              onConfirm();
            }}
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin mr-1.5" />
            ) : null}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
ConfirmActionDialog.displayName = "ConfirmActionDialog";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  ConfirmActionDialog,
};
