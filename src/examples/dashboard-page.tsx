/**
 * Dashboard Page — Reference Implementation
 *
 * This file is a REFERENCE EXAMPLE showing how to compose all
 * NearGo OMS design system components into a production page.
 *
 * Copy and adapt for your module. Do NOT modify design tokens here —
 * all visual decisions are made in globals.css and tailwind.config.ts.
 */
import React, { useState } from "react";
import { OmsLayout, PageHeader }  from "@/components/layout/oms-layout";
import { OmsSidebar, OmsTopbar } from "@/components/layout/oms-sidebar";
import { Button }          from "@/components/ui/button";
import { Badge }           from "@/components/ui/badge";
import { Card, CardBody }  from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Skeleton }        from "@/components/ui/skeleton";
import { Tabs }            from "@/components/ui/tabs";
import { Avatar }          from "@/components/ui/avatar";
import { useToast }        from "@/hooks/use-toast";

// ─── Mock data ────────────────────────────────────────────────
const KPI_DATA = [
  { title: "待我审批", value: "2",  subtitle: "L1 队列",        iconBg: "bg-[var(--blue-bg)]" },
  { title: "今日已通过", value: "14", subtitle: "完整流程",     iconBg: "bg-[var(--green-bg)]" },
  { title: "今日驳回", value: "3",  subtitle: "L1+L2 合计",    iconBg: "bg-[var(--red-bg)]" },
  { title: "打回修改", value: "1",  subtitle: "待申请人修改",   iconBg: "bg-[var(--purple-bg)]" },
];

const TICKETS = [
  { id: "AP2024031001", type: "kyc"   as const, title: "KYC 个人认证 — 陈美华",       priority: "urgent" as const, status: "pending-l1" as const },
  { id: "AP2024031002", type: "store" as const, title: "门店创建 — 北京朝阳旗舰店",  priority: "normal" as const, status: "approved"  as const },
  { id: "AP2024031003", type: "kyb"   as const, title: "KYB 企业认证 — 上海卓越贸易", priority: "low"    as const, status: "pending-l2" as const },
];

const NAV_ITEMS = [
  { key: "merchant",  label: "商家管理",  icon: "🏪" },
  { key: "submit",    label: "发起审批",  icon: "📋" },
  { key: "log",       label: "审批日志",  icon: "📁" },
  { key: "template",  label: "模板管理",  icon: "⊞" },
];

// ─── Page Component ───────────────────────────────────────────
export default function DashboardPage() {
  const [loading, setLoading]     = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast }                 = useToast();

  const tabs = [
    { key: "all",      label: "全部工单", badge: 10 },
    { key: "pending",  label: "待我审批", badge: 2  },
    { key: "approved", label: "已通过" },
  ];

  const sidebar = (
    <OmsSidebar
      productName="OMS 审批引擎"
      version="v2.0"
      items={NAV_ITEMS}
      activeKey="submit"
      footer={
        <div className="flex items-center gap-2">
          <Avatar alt="Administrator" fallback="A" size="sm" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-[var(--text-hi)] truncate">Administrator</p>
            <p className="text-[10px] text-[var(--text-disabled)] truncate">admin@neargo.ai</p>
          </div>
        </div>
      }
    />
  );

  const topbar = (
    <OmsTopbar
      left={<span className="text-sm font-semibold text-[var(--text-hi)]">NearGo OMS</span>}
      right={
        <Button
          variant="primary"
          size="sm"
          onClick={() => toast({ variant: "success", title: "新工单已发起", description: "进入 L1 初审队列" })}
        >
          + 发起审批
        </Button>
      }
    />
  );

  return (
    <OmsLayout topbar={topbar} sidebar={sidebar}>

      <PageHeader title="系统概览" subtitle="欢迎回来，这是今日工作台摘要" />

      {/* KPI strip */}
      {loading ? (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array.from({length: 4}).map((_,i) => (
            <Skeleton key={i} variant="rect" className="h-[120px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {KPI_DATA.map(k => (
            <Card key={k.title}>
              <CardBody>
                <div className={`w-9 h-9 rounded-r3 flex items-center justify-center mb-3 ${k.iconBg}`}>
                  <span className="text-base">📊</span>
                </div>
                <div className="text-[26px] font-bold text-[var(--text-hi)] leading-none tracking-tight">
                  {k.value}
                </div>
                <div className="text-[12.5px] text-[var(--text-mid)] mt-1">{k.title}</div>
                <div className="text-[11px] text-[var(--text-low)]">{k.subtitle}</div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Ticket table with Tabs */}
      <Card>
        <CardBody className="p-0">
          <div className="px-5 pt-4">
            <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
          </div>
          <table className="w-full text-[13px] mt-2">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                {["单号","类型","标题","状态","操作"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10.5px] font-semibold uppercase tracking-wide text-[var(--text-low)] border-b border-[var(--border)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TICKETS.map(row => (
                <tr key={row.id} className="hover:bg-[var(--gray-2)] border-b border-[var(--gray-3)]">
                  <td className="px-4 py-3 font-mono text-[11.5px] text-[var(--text-low)]">{row.id}</td>
                  <td className="px-4 py-3"><Badge variant={row.type}>{row.type.toUpperCase()}</Badge></td>
                  <td className="px-4 py-3 font-medium text-[var(--text-hi)]">{row.title}</td>
                  <td className="px-4 py-3"><StatusIndicator status={row.status} /></td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">详情</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

    </OmsLayout>
  );
}
