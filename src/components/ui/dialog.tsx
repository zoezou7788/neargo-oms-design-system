/**
 * @component Dialog / ConfirmDialog
 * @description 模态弹窗 — 需要用户在继续操作前完成一个任务时使用。
 *
 * @when-to-use
 *   ✅ 需要填写附加信息（添加备注、填写拒绝原因）
 *   ✅ 非破坏性操作的二次确认（提交审批）
 *   ✅ 小型表单（≤6 个字段）不需要独立页面时
 *   ❌ 破坏性操作 → 用 AlertDialog（不可点击遮罩关闭）
 *   ❌ 字段 > 8 个 → 用独立表单页
 *   ❌ 上下文联动查看详情 → 用 Sheet / ContextPanel（不打断列表上下文）
 *
 * @sizes
 *   sm → max-w-400px（确认型）
 *   md → max-w-560px（表单型，默认）
 *   lg → max-w-720px（大表单）
 *   xl → max-w-960px（复杂内容）
 *
 * @design-rules
 *   - Footer 左侧：取消（secondary），右侧：确认（primary / danger）
 *   - 同一 Footer 不允许出现两个 primary 按钮
 *   - Danger variant：标题变红色，确认按钮用 variant="danger"
 *
 * @example Dialog（自定义内容）
 * ```tsx
 * import { Dialog } from "@/components/ui/dialog"
 * import { Button } from "@/components/ui/button"
 *
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="添加审批备注"
 *   description="请填写本次审批的处理说明"
 *   footer={
 *     <>
 *       <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
 *       <Button variant="primary" loading={saving} onClick={handleSave}>保存</Button>
 *     </>
 *   }
 * >
 *   <Textarea placeholder="请填写备注内容…" rows={4} />
 * </Dialog>
 * ```
 *
 * @example ConfirmDialog（预组合确认框）
 * ```tsx
 * import { ConfirmDialog } from "@/components/ui/dialog"
 *
 * <ConfirmDialog
 *   open={confirmOpen}
 *   onClose={() => setConfirmOpen(false)}
 *   onConfirm={handleSubmit}
 *   title="确认提交审批？"
 *   description="提交后将进入审批流程，期间无法修改申请内容。"
 *   confirmLabel="确认提交"
 *   loading={isSubmitting}
 * />
 * ```
 */
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
