import * as React from "react";
import { cn } from "@/lib/utils";
import type { AlertVariant } from "@/lib/tokens";

export interface ToastItem {
  id: string;
  variant: AlertVariant;
  title: string;
  description?: string;
  duration?: number; // ms, 0 = persistent
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => setToasts([]), []);

  const toast = React.useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts(t => [...t, { ...item, id }]);
      if ((item.duration ?? 4000) > 0) {
        setTimeout(() => dismiss(id), item.duration ?? 4000);
      }
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ── Viewport (fixed bottom-right) ────────────────────────────
const VARIANT_STYLES: Record<AlertVariant, string> = {
  info:    "bg-[var(--blue-bg)]   border-[var(--blue-border)]   text-[var(--blue-text)]",
  success: "bg-[var(--green-bg)]  border-[var(--green-border)]  text-[var(--green-text)]",
  warning: "bg-[var(--orange-bg)] border-[var(--orange-border)] text-[var(--orange-text)]",
  danger:  "bg-[var(--red-bg)]    border-[var(--red-border)]    text-[var(--red-text)]",
};

const ToastViewport: React.FC = () => {
  const { toasts, dismiss } = React.useContext(ToastContext)!;
  return (
    <div
      className="fixed bottom-5 right-5 flex flex-col gap-2 w-[360px] max-w-[calc(100vw-40px)]"
      style={{ zIndex: "var(--z-toast)" }}
      aria-live="polite"
      aria-atomic="false"
      role="status"
    >
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-2.5 p-4 rounded-r4 border shadow-sh4",
            "animate-[slide-in-right_200ms_var(--ease-bounce)]",
            VARIANT_STYLES[t.variant]
          )}
        >
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold leading-snug">{t.title}</p>
            {t.description && (
              <p className="text-[12px] mt-0.5 opacity-85">{t.description}</p>
            )}
            {t.action && (
              <button
                type="button"
                onClick={t.action.onClick}
                className="text-[12px] font-semibold mt-1.5 underline-offset-2 hover:underline"
              >
                {t.action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="关闭通知"
            className="shrink-0 opacity-60 hover:opacity-100 text-sm transition-opacity mt-0.5"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
