import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
  fullscreen?: boolean;
  blur?: boolean;
  className?: string;
}

export function LoadingOverlay({
  visible = true,
  message,
  fullscreen = false,
  blur = false,
  className,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "bg-[var(--surface)] bg-opacity-75",
        fullscreen ? "fixed inset-0 z-50" : "absolute inset-0 z-20 rounded-inherit",
        blur && "backdrop-blur-[2px]",
        className,
      )}
      aria-live="assertive"
      aria-label={message ?? "加载中"}
      role="status"
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={24} className="text-[var(--gray-12)] animate-spin" />
        {message && (
          <p className="text-[13px] font-medium text-[var(--gray-11)]">{message}</p>
        )}
      </div>
    </div>
  );
}

// Inline spinner (for buttons, small slots)
export interface SpinnerProps {
  size?: number;
  className?: string;
}
export function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-current", className)}
      aria-hidden="true"
    />
  );
}

// Page-level loading state (skeleton alternative for whole routes)
export function PageLoader({ message = "加载中..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={28} className="text-[var(--gray-9)] animate-spin" />
        <p className="text-[13px] text-[var(--gray-9)]">{message}</p>
      </div>
    </div>
  );
}
