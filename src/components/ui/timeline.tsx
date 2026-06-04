/**
 * @component Timeline
 * @description 时间线 — 展示审批流程、操作历史等有序事件序列。
 *
 * @when-to-use
 *   ✅ 订单/审批详情页的流程追踪（Sheet / ContextPanel 内）
 *   ✅ 操作日志（谁在什么时间做了什么）
 *   ❌ 步骤引导（用户需要操作的流程）→ 用 Steps 组件
 *
 * @statuses
 *   done        → 绿色 CheckCircle，已完成
 *   in-progress → 橙色 Clock，进行中（当前步骤）
 *   pending     → 灰色 Circle，待处理
 *   error       → 红色 AlertCircle，异常
 *   cancelled   → 灰色 XCircle，已取消
 *
 * @props
 *   items    TimelineItem[]   事件列表
 *            每项：{ id, status, title, description?, time?, actor?, actorAvatar? }
 *
 * @example
 * ```tsx
 * import { Timeline } from "@/components/ui/timeline"
 *
 * <Timeline
 *   items={[
 *     { id: "1", status: "done",        title: "提交申请",  actor: "张三", time: "2024-01-15 09:30" },
 *     { id: "2", status: "done",        title: "初审通过",  actor: "李四", time: "2024-01-15 11:20",
 *                description: "符合补货标准" },
 *     { id: "3", status: "in-progress", title: "终审处理中", time: "等待终审负责人…" },
 *     { id: "4", status: "pending",     title: "财务放款" },
 *   ]}
 * />
 * ```
 */
import * as React from "react";
import { CheckCircle2, Clock, AlertCircle, XCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineStatus = "done" | "in-progress" | "pending" | "error" | "cancelled";

export interface TimelineItem {
  id: string;
  status: TimelineStatus;
  title: string;
  description?: string;
  time?: string;
  actor?: string;
  actorAvatar?: string;
}

const STATUS_CONFIG: Record<TimelineStatus, {
  icon: React.ElementType;
  iconColor: string;
  dotColor: string;
  lineColor: string;
}> = {
  done:        { icon: CheckCircle2, iconColor: "text-[var(--green-solid)]", dotColor: "bg-[var(--green-solid)]",  lineColor: "border-[var(--green-solid)] opacity-30" },
  "in-progress": { icon: Clock,       iconColor: "text-[var(--orange-9)]",    dotColor: "bg-[var(--orange-9)]",     lineColor: "border-[var(--border)]" },
  pending:     { icon: Circle,        iconColor: "text-[var(--gray-8)]",      dotColor: "bg-[var(--gray-5)]",       lineColor: "border-[var(--border)]" },
  error:       { icon: AlertCircle,   iconColor: "text-[var(--red-solid)]",   dotColor: "bg-[var(--red-solid)]",    lineColor: "border-[var(--border)]" },
  cancelled:   { icon: XCircle,       iconColor: "text-[var(--gray-8)]",      dotColor: "bg-[var(--gray-6)]",       lineColor: "border-[var(--border)]" },
};

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, index) => {
        const cfg = STATUS_CONFIG[item.status];
        const Icon = cfg.icon;
        const isLast = index === items.length - 1;

        return (
          <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* vertical line */}
            {!isLast && (
              <span
                className={cn("absolute left-[15px] top-8 bottom-0 w-px border-l-2", cfg.lineColor)}
                aria-hidden="true"
              />
            )}

            {/* icon / dot */}
            <div className="relative z-10 flex items-start justify-center w-8 h-8 shrink-0">
              <Icon
                size={20}
                className={cn("mt-0.5", cfg.iconColor)}
                aria-hidden="true"
              />
            </div>

            {/* content */}
            <div className="flex-1 pt-0.5 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className={cn(
                  "text-[13px] font-medium leading-5",
                  item.status === "pending" ? "text-[var(--gray-9)]" : "text-[var(--gray-12)]",
                )}>
                  {item.title}
                </p>
                {item.time && (
                  <span className="text-[11px] text-[var(--gray-9)] font-mono shrink-0 mt-0.5">
                    {item.time}
                  </span>
                )}
              </div>

              {item.actor && (
                <p className="text-[12px] text-[var(--gray-10)] mt-0.5">{item.actor}</p>
              )}
              {item.description && (
                <p className="text-[12px] text-[var(--gray-10)] mt-1 leading-relaxed">{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// Steps 已拆分为独立组件，请从 "./steps" 导入
export { Steps, type StepsProps, type StepItem } from "./steps";
