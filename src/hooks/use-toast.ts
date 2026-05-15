// Re-export from toast component for cleaner imports
export { useToast, ToastProvider } from "@/components/ui/toast";
export type { ToastItem } from "@/components/ui/toast";

/**
 * Usage:
 *
 * // 1. Wrap app root
 * import { ToastProvider } from "@/hooks/use-toast";
 * <ToastProvider><App /></ToastProvider>
 *
 * // 2. In any component
 * import { useToast } from "@/hooks/use-toast";
 * const { toast } = useToast();
 *
 * toast({ variant: "success", title: "审批已提交", description: "工单进入 L1 初审队列" });
 * toast({ variant: "danger",  title: "提交失败",   duration: 0 }); // persistent
 */
