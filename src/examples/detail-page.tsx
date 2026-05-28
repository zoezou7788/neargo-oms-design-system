/**
 * Detail Page — Reference Implementation (订单详情页)
 *
 * 展示标准详情页的完整组件组合：
 *   PageHeader（面包屑+状态+操作）→ TwoColumnLayout
 *     左列：基本信息 Card + 金额明细 Card + 附件 Card
 *     右列（固定 360px）：审批面板 Card + Timeline Card
 *
 * 适用于：订单详情、门店档案、用户详情、退款审批、任意「单对象查看 + 操作」页面。
 * 复制此文件并替换数据类型和内容 Card 即可生成新详情页。
 *
 * ⚠️  设计约束：
 *   - 右侧面板固定 360px，sticky top-6，不随内容滚动
 *   - 操作按钮：拒绝 = danger，通过 = positive，不能反过来
 *   - RadioGroup 审批决定：选"通过"前不允许点提交（按钮 disabled）
 *   - Timeline 时间线展示审批历史，done/in-progress/pending 三态
 */

import React, { useState } from "react";
import { ChevronLeft, FileText, Download } from "lucide-react";

// Layout
import { Main, TwoColumnLayout, ContentCard, ContentStack } from "@/components/layout/main";
import { PageHeader, SectionHeader }                        from "@/components/layout/page-header";

// UI
import { Button }          from "@/components/ui/button";
import { Badge }           from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Separator }       from "@/components/ui/separator";
import { Timeline }        from "@/components/ui/timeline";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea }        from "@/components/ui/textarea";
import { Alert }           from "@/components/ui/alert";
import { ConfirmDialog }   from "@/components/ui/dialog";
import { Avatar }          from "@/components/ui/avatar";
import type { TimelineItem } from "@/components/ui/timeline";
import type { StatusType }  from "@/lib/tokens";

// ─── 数据类型 ─────────────────────────────────────────────────
interface OrderDetail {
  id:          string;
  storeName:   string;
  storeType:   string;
  submitter:   string;
  submitterPhone: string;
  amount:      number;
  type:        string;
  remark:      string;
  status:      StatusType;
  createdAt:   string;
  attachments: { name: string; size: string }[];
  timeline:    TimelineItem[];
}

// ─── Mock 数据（替换为真实 API） ──────────────────────────────
const MOCK_ORDER: OrderDetail = {
  id:            "ORD-20240115-002",
  storeName:     "海淀科技店",
  storeType:     "旗舰门店",
  submitter:     "张三丰",
  submitterPhone: "+86 138 0013 8000",
  amount:        19600,
  type:          "进货补货",
  remark:        "因本周活动预期销量增加 30%，申请补货饮料类目商品，详见附件清单。库存不足可能影响大促期间收入，请尽快审批。",
  status:        "pending-l1",
  createdAt:     "2024-01-15 10:14",
  attachments: [
    { name: "补货清单.xlsx",   size: "128 KB" },
    { name: "库存截图.png",    size: "2.4 MB" },
  ],
  timeline: [
    { id: "t1", status: "done",        title: "提交申请",   actor: "张三丰", time: "2024-01-15 10:14", description: "发起进货补货申请" },
    { id: "t2", status: "done",        title: "系统初审通过", time: "2024-01-15 10:14", description: "金额 ≤ 20,000 元，符合自动初审条件" },
    { id: "t3", status: "in-progress", title: "L1 审批中",   time: "等待审批负责人处理…" },
    { id: "t4", status: "pending",     title: "财务放款" },
    { id: "t5", status: "pending",     title: "完成" },
  ],
};

// ─── 详情字段组件（复用） ─────────────────────────────────────
function FieldGrid({ fields }: { fields: [string, React.ReactNode][] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {fields.map(([label, value]) => (
        <div key={label}>
          <p className="text-[11px] text-[var(--gray-8)] mb-1">{label}</p>
          <div className="text-[13px] font-medium text-[var(--gray-12)]">{value}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 右侧审批面板 ─────────────────────────────────────────────
function ApprovalPanel({ order }: { order: OrderDetail }) {
  const [decision,  setDecision]  = useState<"approve" | "reject" | "">("");
  const [remark,    setRemark]    = useState("");
  const [confirm,   setConfirm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = decision !== "";

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: call POST /api/orders/:id/review
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setConfirm(false);
  };

  return (
    <ContentStack gap="gap-4">

      {/* 审批操作卡 */}
      <ContentCard padding="p-5">
        <SectionHeader title="审批决定" className="mb-4" />

        {/* 超时提示 */}
        <Alert variant="warning" className="mb-4">
          此申请已等待 <strong>26 小时</strong>，建议尽快处理。
        </Alert>

        {/* 审批选项 — RadioGroup */}
        <RadioGroup
          value={decision}
          onValueChange={(v) => setDecision(v as "approve" | "reject")}
          className="gap-3 mb-4"
        >
          <div
            className={`flex items-center gap-2.5 p-3 rounded-[8px] border cursor-pointer transition-colors ${
              decision === "approve"
                ? "border-[var(--green-solid)] bg-[var(--green-bg)]"
                : "border-[var(--border)] hover:bg-[var(--gray-2)]"
            }`}
            onClick={() => setDecision("approve")}
          >
            <RadioGroupItem value="approve" id="approve" />
            <label htmlFor="approve" className="text-[13px] font-medium text-[var(--green-text)] cursor-pointer">
              ✓ 通过 — 申请符合条件，准予放款
            </label>
          </div>

          <div
            className={`flex items-center gap-2.5 p-3 rounded-[8px] border cursor-pointer transition-colors ${
              decision === "reject"
                ? "border-[var(--red-solid)] bg-[var(--red-bg)]"
                : "border-[var(--border)] hover:bg-[var(--gray-2)]"
            }`}
            onClick={() => setDecision("reject")}
          >
            <RadioGroupItem value="reject" id="reject" />
            <label htmlFor="reject" className="text-[13px] font-medium text-[var(--red-text)] cursor-pointer">
              ✗ 拒绝 — 申请不符合条件
            </label>
          </div>
        </RadioGroup>

        {/* 审批意见 */}
        <Textarea
          placeholder={decision === "reject" ? "请填写拒绝原因（必填）…" : "填写审批意见（可选）…"}
          rows={3}
          maxLength={500}
          showCount
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="mb-4"
        />

        {/* 操作按钮 */}
        <div className="flex gap-2">
          {/* 拒绝：danger */}
          <Button
            variant="danger"
            size="md"
            className="flex-1"
            disabled={!canSubmit || decision !== "reject"}
            onClick={() => setConfirm(true)}
          >
            拒绝
          </Button>
          {/* 通过：positive（绿色） */}
          <Button
            variant="positive"
            size="md"
            className="flex-1"
            disabled={!canSubmit || decision !== "approve"}
            onClick={() => setConfirm(true)}
          >
            审批通过
          </Button>
        </div>
      </ContentCard>

      {/* 审批进度 Timeline */}
      <ContentCard padding="p-5">
        <SectionHeader title="审批进度" className="mb-4" />
        <Timeline items={order.timeline} />
      </ContentCard>

      {/* 确认 Dialog */}
      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleSubmit}
        title={decision === "approve" ? "确认审批通过？" : "确认拒绝此申请？"}
        description={
          decision === "approve"
            ? "审批通过后系统将自动通知申请人并启动放款流程，此操作不可撤销。"
            : `拒绝后申请人将收到通知。拒绝原因：${remark || "（未填写）"}`
        }
        confirmLabel={decision === "approve" ? "确认通过" : "确认拒绝"}
        variant={decision === "reject" ? "danger" : "default"}
        loading={submitting}
      />
    </ContentStack>
  );
}

// ─── 页面组件 ─────────────────────────────────────────────────
export function OrderDetailPage() {
  const order = MOCK_ORDER; // 替换为 useQuery / useLoaderData

  return (
    // fixed=true — 固定布局，防止右侧面板随内容撑高
    <Main fixed>

      {/* ── PageHeader ─────────────────────────────────── */}
      <PageHeader
        breadcrumb={[
          { label: "首页",     href: "/" },
          { label: "订单管理", href: "/orders" },
          { label: order.id   },
        ]}
        title="订单详情"
        actions={
          <>
            <StatusIndicator status={order.status} />
            <Separator orientation="vertical" className="h-5" />
            <Button variant="secondary" size="md" icon={<Download size={14} />}>
              导出
            </Button>
          </>
        }
        bordered
      />

      {/* ── 双栏布局 ────────────────────────────────────── */}
      <div className="px-6 py-5 overflow-y-auto flex-1">
        <TwoColumnLayout
          panelWidth={360}
          main={
            // 左列：多个信息 Card 纵向堆叠
            <ContentStack>

              {/* 基本信息 */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">基本信息</h2>
                  <Badge variant="urgent">进货补货</Badge>
                </div>
                <div className="p-5">
                  <FieldGrid fields={[
                    ["订单号",   <span className="font-mono text-[12px]">{order.id}</span>],
                    ["提交时间", <span className="font-mono text-[12px]">{order.createdAt}</span>],
                    ["门店名称", order.storeName],
                    ["门店类型", order.storeType],
                    ["申请人",   (
                      <div className="flex items-center gap-2">
                        <Avatar name={order.submitter} size="xs" />
                        <span>{order.submitter}</span>
                      </div>
                    )],
                    ["联系方式", <span className="font-mono text-[12px]">{order.submitterPhone}</span>],
                  ]} />
                </div>
              </ContentCard>

              {/* 金额明细 */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">金额明细</h2>
                </div>
                <div className="p-5">
                  <div className="mb-5">
                    <p className="text-[11px] text-[var(--gray-8)] mb-1">申请金额</p>
                    <p className="text-[28px] font-bold tracking-[-0.04em] text-[var(--gray-12)]">
                      ¥{order.amount.toLocaleString()}.00
                    </p>
                  </div>
                  <FieldGrid fields={[
                    ["申请类型", order.type],
                  ]} />
                  <Separator className="my-4" />
                  <div>
                    <p className="text-[11px] text-[var(--gray-8)] mb-2">申请说明</p>
                    <p className="text-[13px] text-[var(--gray-10)] leading-relaxed">{order.remark}</p>
                  </div>
                </div>
              </ContentCard>

              {/* 附件 */}
              {order.attachments.length > 0 && (
                <ContentCard>
                  <div className="px-5 py-4 border-b border-[var(--border)]">
                    <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">
                      附件 <span className="text-[var(--gray-8)] font-normal text-[12px]">({order.attachments.length})</span>
                    </h2>
                  </div>
                  <div className="p-5 space-y-2">
                    {order.attachments.map((file) => (
                      <div key={file.name} className="flex items-center gap-3 p-3 rounded-[8px] border border-[var(--border)] hover:bg-[var(--gray-2)] transition-colors">
                        <FileText size={16} className="text-[var(--gray-8)] shrink-0" />
                        <span className="flex-1 text-[13px] font-medium text-[var(--gray-12)] truncate">{file.name}</span>
                        <span className="text-[11px] text-[var(--gray-9)]">{file.size}</span>
                        <Button variant="ghost" size="sm" icon={<Download size={12} />} className="shrink-0">下载</Button>
                      </div>
                    ))}
                  </div>
                </ContentCard>
              )}

            </ContentStack>
          }

          panel={
            // 右列：审批操作面板（sticky，不随左列内容滚动）
            <ApprovalPanel order={order} />
          }
        />
      </div>

    </Main>
  );
}
