/**
 * @component Steps
 * @description 步骤条 — 横向展示用户需要操作的多步流程进度。
 *
 * @when-to-use
 *   ✅ 多步表单引导（填写信息 → 上传资料 → 审核 → 完成）
 *   ✅ 操作向导 / Wizard 界面
 *   ❌ 已发生的事件历史 → 用 Timeline 组件
 *
 * @statuses
 *   done    → 绿色 CheckCircle，已完成
 *   active  → 黑色圆圈数字，当前步骤
 *   pending → 灰色圆圈数字，待完成
 *
 * @props
 *   steps     StepItem[]   步骤列表
 *             每项：{ id, label, status }
 *   className string       额外 CSS 类名
 *
 * @example
 * ```tsx
 * import { Steps } from "@/components/ui/steps"
 *
 * <Steps
 *   steps={[
 *     { id: "1", label: "填写信息", status: "done" },
 *     { id: "2", label: "上传资料", status: "done" },
 *     { id: "3", label: "审核中",   status: "active" },
 *     { id: "4", label: "完成",     status: "pending" },
 *   ]}
 * />
 * ```
 */
import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div
      className={cn("flex items-center", className)}
      role="list"
      aria-label="步骤进度"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5" role="listitem">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors",
                  step.status === "done"    && "bg-[var(--green-solid)] text-white",
                  step.status === "active"  && "bg-[var(--gray-12)] text-white",
                  step.status === "pending" && "bg-[var(--gray-3)] text-[var(--gray-9)] border border-[var(--gray-5)]",
                )}
                aria-current={step.status === "active" ? "step" : undefined}
              >
                {step.status === "done" ? (
                  <CheckCircle2 size={14} className="text-white" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-[11px] font-medium whitespace-nowrap",
                  step.status === "active"  && "text-[var(--gray-12)]",
                  step.status === "done"    && "text-[var(--green-solid)]",
                  step.status === "pending" && "text-[var(--gray-9)]",
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-px mx-2 mb-5",
                  step.status === "done"
                    ? "bg-[var(--green-solid)] opacity-40"
                    : "bg-[var(--border)]",
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
