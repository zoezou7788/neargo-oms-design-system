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

// Compact horizontal timeline for step indicators (e.g., order stages)
export interface StepItem {
  id: string;
  label: string;
  status: "done" | "active" | "pending";
}

export interface StepsProps {
  steps: StepItem[];
  className?: string;
}

export function Steps({ steps, className }: StepsProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "w-7 h-7 rounded-[9999px] flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors",
                step.status === "done"   && "bg-[var(--green-solid)] text-white",
                step.status === "active" && "bg-[#1F1D1C] text-white",
                step.status === "pending"&& "bg-[var(--gray-3)] text-[var(--gray-9)]",
              )}>
                {step.status === "done" ? (
                  <CheckCircle2 size={14} className="text-white" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={cn(
                "text-[11px] font-medium whitespace-nowrap",
                step.status === "active"  && "text-[var(--gray-12)]",
                step.status === "done"    && "text-[var(--green-solid)]",
                step.status === "pending" && "text-[var(--gray-9)]",
              )}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className={cn(
                "flex-1 h-px mx-2 mb-5",
                step.status === "done" ? "bg-[var(--green-solid)] opacity-40" : "bg-[var(--border)]",
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
