/**
 * @component LoadingOverlay
 * @description 加载遮罩 — 在异步操作期间遮盖内容区域，防止用户重复操作。
 *
 * @when-to-use
 *   ✅ 表格/列表首次加载（全区域遮盖）→ 优先考虑 Skeleton（更好的感知体验）
 *   ✅ 提交表单时遮盖整个表单（防重复提交）
 *   ✅ 页面级全屏加载（fullscreen=true）
 *   ❌ Button 自身的加载态 → 用 Button loading prop
 *   ❌ 数据刷新（非首次加载）→ 用局部 Skeleton 或 spinner 角标
 *
 * @props
 *   visible    boolean  是否显示（默认 true）
 *   message    string   加载文案（如"提交中，请稍候…"）
 *   fullscreen boolean  全屏模式（fixed inset-0，默认 false）
 *   blur       boolean  背景模糊（默认 false）
 *
 * @example
 * ```tsx
 * import { LoadingOverlay } from "@/components/ui/loading-overlay"
 *
 * // 表单提交遮罩（相对定位父容器）
 * <div className="relative">
 *   <FormContent />
 *   <LoadingOverlay visible={isSubmitting} message="提交中，请稍候…" />
 * </div>
 *
 * // 全屏加载
 * <LoadingOverlay visible={pageLoading} fullscreen message="数据加载中…" />
 * ```
 */
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
