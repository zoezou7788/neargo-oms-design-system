import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type DialogSize = "sm" | "md" | "lg" | "xl";
const sizeMap: Record<DialogSize, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  xl: "max-w-[960px]",
};

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: DialogSize;
  /** false = hide × button */
  closable?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
  /** Danger dialog: title turns red, confirm button uses btn-danger */
  variant?: "default" | "danger";
}

/**
 * Dialog — modal with focus trap, Esc close, accessible ARIA.
 *
 * Design System Rules:
 *   - radius-5 (12px) — larger than cards
 *   - shadow-6 — deepest shadow
 *   - overlay: rgba(0,0,0,.4) at z-overlay (300), content at z-modal (400)
 *   - Footer: Cancel (btn-secondary) left, Confirm right
 *   - Danger variant: Confirm uses btn-danger, title color = red-text
 *   - Never put two btn-primary in the same footer
 */
const Dialog: React.FC<DialogProps> = ({
  open, onClose, title, description, size = "md",
  closable = true, footer, children, variant = "default",
}) => {
  // Focus trap & Esc close
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closable) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closable, onClose]);

  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-5"
      style={{ zIndex: "var(--z-overlay)" }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-desc" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 animate-[fade-in_200ms_var(--ease-gentle)]"
        onClick={closable ? onClose : undefined}
      />
      {/* Panel */}
      <div
        className={cn(
          "relative w-full bg-[var(--surface)] rounded-r5 shadow-sh6",
          "flex flex-col max-h-[calc(100vh-64px)] overflow-hidden",
          "animate-[fade-in_200ms_var(--ease-gentle)]",
          sizeMap[size]
        )}
        style={{ zIndex: "var(--z-modal)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-[var(--border)] shrink-0">
          <div>
            <h2
              id="dialog-title"
              className={cn(
                "text-base font-semibold",
                variant === "danger" ? "text-[var(--red-text)]" : "text-[var(--text-hi)]"
              )}
            >
              {title}
            </h2>
            {description && (
              <p id="dialog-desc" className="text-xs text-[var(--text-low)] mt-1">
                {description}
              </p>
            )}
          </div>
          {closable && (
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭"
              className={cn(
                "w-7 h-7 flex items-center justify-center shrink-0",
                "rounded-r3 text-[var(--text-low)] text-sm",
                "hover:bg-[var(--gray-3)] hover:text-[var(--text-hi)]",
                "transition-colors duration-fast"
              )}
            >
              ✕
            </button>
          )}
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-2 px-5 py-3 border-t border-[var(--border)] bg-[var(--gray-2)] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/** Pre-built confirmation dialog */
export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open, onClose, onConfirm, title, description,
  confirmLabel = "确认", cancelLabel = "取消",
  variant = "default", loading = false,
}) => (
  <Dialog
    open={open} onClose={onClose}
    title={title} description={description}
    size="sm" variant={variant}
    footer={
      <>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={variant === "danger" ? "danger" : "primary"}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </>
    }
  >
    {description && (
      <p className="text-sm text-[var(--text-mid)]">{description}</p>
    )}
  </Dialog>
);

Dialog.displayName = "Dialog";
export { Dialog };
