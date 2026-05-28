/**
 * List Page — Reference Implementation (订单列表页)
 *
 * 展示标准列表页的完整组件组合：
 *   PageHeader → SectionTabs → FilterBar → DataTable → Sheet(详情)
 *
 * 适用于：订单列表、门店列表、审批列表、用户列表等所有以「行数据 + 操作」为核心的页面。
 * 复制此文件并替换数据类型、列定义和 API 调用即可快速生成新列表页。
 *
 * ⚠️  设计约束（来自 NearGo OMS Design System）：
 *   - 主操作按钮（新建）只能有一个，使用 variant="primary"（gray-12 黑色）
 *   - 状态显示必须用 StatusIndicator（dot + text），不能只用颜色
 *   - 行操作 ≥ 3 个时用 DropdownMenu，不要并排摆放多个按钮
 *   - DataTable 超过 20 条必须分页（服务端分页优先）
 */

import React, { useState, useCallback } from "react";
import { Plus, Download, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";

// Layout
import { Main }                from "@/components/layout/main";
import { PageHeader }          from "@/components/layout/page-header";
import { SectionTabs }         from "@/components/layout/section-tabs";

// UI — 数据展示
import { DataTable }           from "@/components/ui/data-table";
import { DataTableToolbar }    from "@/components/ui/data-table/toolbar";
import { DataTableFacetedFilter } from "@/components/ui/data-table/faceted-filter";
import { DataTableBulkActions } from "@/components/ui/data-table/bulk-actions";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";

// UI — 交互
import { Button }              from "@/components/ui/button";
import { Badge }               from "@/components/ui/badge";
import { StatusIndicator }     from "@/components/ui/status-indicator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,
         DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContextPanel }        from "@/components/ui/sheet";
import { ConfirmDialog }       from "@/components/ui/dialog";
import { DateRangePicker }     from "@/components/ui/date-range-picker";
import { EmptyState }          from "@/components/ui/empty-state";
import type { DateRange }      from "@/components/ui/date-range-picker";
import type { StatusType }     from "@/lib/tokens";

// ─── 数据类型 ─────────────────────────────────────────────────
interface Order {
  id:        string;
  storeId:   string;
  storeName: string;
  storeType: "flagship" | "standard" | "franchise";
  amount:    number;
  status:    StatusType;
  submitter: string;
  createdAt: string;
}

// ─── 静态配置 — 状态 Tab / 门店类型选项 ──────────────────────
const STATUS_TABS = [
  { key: "all",       label: "全部",   count: 234 },
  { key: "pending-l1",label: "待审批", count: 28  },
  { key: "in-progress",label: "进行中", count: 46 },
  { key: "approved",  label: "已通过", count: 140 },
  { key: "rejected",  label: "已拒绝", count: 20  },
];

const STORE_TYPE_OPTIONS = [
  { value: "flagship",  label: "旗舰门店" },
  { value: "standard",  label: "标准门店" },
  { value: "franchise", label: "加盟门店" },
];

// ─── Mock 数据（替换为真实 API） ──────────────────────────────
const MOCK_ORDERS: Order[] = [
  { id: "ORD-20240115-001", storeId: "S001", storeName: "朝阳旗舰店",  storeType: "flagship",  amount: 4280,  status: "approved",    submitter: "王小明", createdAt: "2024-01-15 09:30" },
  { id: "ORD-20240115-002", storeId: "S002", storeName: "海淀科技店",  storeType: "flagship",  amount: 1960,  status: "pending-l1",  submitter: "张三丰", createdAt: "2024-01-15 10:14" },
  { id: "ORD-20240115-003", storeId: "S003", storeName: "浦东联营店",  storeType: "franchise", amount: 8530,  status: "rejected",    submitter: "李阿花", createdAt: "2024-01-15 11:05" },
  { id: "ORD-20240115-004", storeId: "S004", storeName: "西湖旗舰店",  storeType: "flagship",  amount: 3120,  status: "in-progress", submitter: "赵大宝", createdAt: "2024-01-15 12:40" },
  { id: "ORD-20240115-005", storeId: "S005", storeName: "天河加盟店",  storeType: "franchise", amount: 660,   status: "pending-l1",  submitter: "陈小花", createdAt: "2024-01-15 14:22" },
  { id: "ORD-20240115-006", storeId: "S006", storeName: "南山科技店",  storeType: "standard",  amount: 2340,  status: "approved",    submitter: "周明明", createdAt: "2024-01-15 15:10" },
];

// ─── 列定义 ───────────────────────────────────────────────────
function useColumns(onView: (o: Order) => void, onDelete: (o: Order) => void): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="订单号" />,
      cell: ({ row }) => (
        <button
          className="font-mono text-[12px] text-[var(--blue-text)] hover:underline"
          onClick={() => onView(row.original)}
        >
          {row.original.id}
        </button>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "storeName",
      header: "门店名称",
      cell: ({ row }) => (
        <span className="text-[13px] font-medium text-[var(--gray-12)]">
          {row.original.storeName}
        </span>
      ),
    },
    {
      accessorKey: "storeType",
      header: "门店类型",
      cell: ({ row }) => {
        const map: Record<string, string> = { flagship: "旗舰门店", standard: "标准门店", franchise: "加盟门店" };
        return <span className="text-[12px] text-[var(--gray-9)]">{map[row.original.storeType]}</span>;
      },
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="申请金额" />,
      cell: ({ row }) => (
        <span className="font-semibold text-[13px] text-[var(--gray-12)]">
          ¥{row.original.amount.toLocaleString()}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "status",
      // ⚠️ 状态列必须用 StatusIndicator — 不能只靠颜色传达状态（WCAG 1.4.1）
      header: "状态",
      cell: ({ row }) => <StatusIndicator status={row.original.status} />,
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "submitter",
      header: "申请人",
      cell: ({ row }) => (
        <span className="text-[13px] text-[var(--gray-10)]">{row.original.submitter}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="提交时间" />,
      cell: ({ row }) => (
        <span className="font-mono text-[12px] text-[var(--gray-9)]">{row.original.createdAt}</span>
      ),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        // 行操作 ≥ 3 个时用 DropdownMenu
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              icon={<MoreHorizontal size={14} />}
              className="h-7 w-7 p-0"
              aria-label="更多操作"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <Eye size={13} />查看详情
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit size={13} />编辑
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(row.original)}>
              <Trash2 size={13} />删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
    },
  ];
}

// ─── 页面组件 ─────────────────────────────────────────────────
export function OrderListPage() {
  const [activeTab,    setActiveTab]    = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteTarget,  setDeleteTarget]  = useState<Order | null>(null);
  const [dateRange,    setDateRange]    = useState<DateRange>();
  const [isLoading,    setIsLoading]    = useState(false);

  const handleView   = useCallback((order: Order) => setSelectedOrder(order), []);
  const handleDelete = useCallback((order: Order) => setDeleteTarget(order), []);
  const columns      = useColumns(handleView, handleDelete);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    // TODO: call DELETE /api/orders/:id
    setDeleteTarget(null);
  };

  return (
    // Main — fluid=true（默认），列表页需要全宽
    <Main>

      {/* ── PageHeader ─────────────────────────────────── */}
      <PageHeader
        breadcrumb={[{ label: "首页", href: "/" }, { label: "订单管理" }]}
        title="订单管理"
        subtitle="共 234 条记录"
        bordered
        actions={
          <>
            {/* 次要操作用 secondary */}
            <Button variant="secondary" size="md" icon={<Download size={14} />}>
              导出
            </Button>
            {/* 每页只有一个 primary 主操作 */}
            <Button variant="primary" size="md" icon={<Plus size={14} />}>
              新建订单
            </Button>
          </>
        }
      >
        {/* SectionTabs 嵌入 PageHeader children slot */}
        <SectionTabs
          tabs={STATUS_TABS}
          activeKey={activeTab}
          onTabChange={setActiveTab}
          variant="header"
        />
      </PageHeader>

      {/* ── DataTable（含 Toolbar 插槽） ────────────────── */}
      <div className="px-6 py-5">
        <DataTable
          columns={columns}
          data={MOCK_ORDERS}
          loading={isLoading}
          selectable
          manualPagination={false}    // 数据量小时用前端分页
          // manualPagination         // 大数据量改为服务端分页
          // pageCount={totalPages}
          // onPaginationChange={({ pageIndex, pageSize }) => fetchPage(pageIndex + 1, pageSize)}
          toolbar={(table) => (
            <DataTableToolbar
              table={table}
              searchColumn="storeName"
              searchPlaceholder="搜索门店名称、订单号…"
              filters={
                <>
                  {/* 门店类型多值筛选 */}
                  <DataTableFacetedFilter
                    column={table.getColumn("storeType")}
                    title="门店类型"
                    options={STORE_TYPE_OPTIONS}
                  />
                  {/* 日期范围筛选（独立受控，不走 TanStack filter） */}
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    placeholder="创建时间范围"
                    className="w-[220px]"
                  />
                </>
              }
              actions={
                // 批量操作（多选后显示）
                <DataTableBulkActions
                  table={table}
                  actions={[
                    { label: "批量通过", variant: "default",      onClick: (rows) => console.log("批量通过", rows) },
                    { label: "批量拒绝", variant: "danger",       onClick: (rows) => console.log("批量拒绝", rows) },
                    { label: "导出所选", variant: "default",      onClick: (rows) => console.log("导出", rows) },
                  ]}
                />
              }
            />
          )}
        />
      </div>

      {/* ── ContextPanel（订单详情，不离开列表上下文） ── */}
      <ContextPanel
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        title="订单详情"
        description={selectedOrder ? `${selectedOrder.id} · ${selectedOrder.storeName}` : ""}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelectedOrder(null)}>关闭</Button>
            <Button variant="danger"    onClick={() => selectedOrder && handleDelete(selectedOrder)}>拒绝</Button>
            <Button variant="positive"  onClick={() => console.log("审批通过", selectedOrder?.id)}>审批通过</Button>
          </>
        }
      >
        {selectedOrder && (
          <div className="space-y-5">
            {/* 基本信息 */}
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gray-8)] mb-3">
                基本信息
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["订单号",   <span className="font-mono text-[12px]">{selectedOrder.id}</span>],
                  ["门店名称", selectedOrder.storeName],
                  ["申请人",   selectedOrder.submitter],
                  ["提交时间", <span className="font-mono text-[12px]">{selectedOrder.createdAt}</span>],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-[11px] text-[var(--gray-8)] mb-1">{label as string}</p>
                    <p className="text-[13px] font-medium text-[var(--gray-12)]">{value}</p>
                  </div>
                ))}
                <div className="col-span-2">
                  <p className="text-[11px] text-[var(--gray-8)] mb-1">申请金额</p>
                  <p className="text-[20px] font-bold tracking-[-0.04em] text-[var(--gray-12)]">
                    ¥{selectedOrder.amount.toLocaleString()}.00
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-[var(--border)]" />

            {/* 状态 */}
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gray-8)] mb-3">
                当前状态
              </h3>
              <StatusIndicator status={selectedOrder.status} size="md" />
            </section>
          </div>
        )}
      </ContextPanel>

      {/* ── 删除确认 Dialog ──────────────────────────── */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="确认删除此订单？"
        description={`订单 ${deleteTarget?.id} 的所有数据将被永久删除，此操作不可撤销。`}
        confirmLabel="确认删除"
        variant="danger"
      />

    </Main>
  );
}
