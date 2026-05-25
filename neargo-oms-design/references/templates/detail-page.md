# 详情/审批页模板

适用于：订单详情、商户档案、退款审批、用户详情、任意「单对象查看 + 操作」的页面。

## 完整示例代码

```tsx
import { useState } from 'react'
import { ChevronLeft, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function DetailPage() {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null)
  const [remark, setRemark] = useState('')

  return (
    <div className="space-y-5">
      {/* 面包屑 */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#8c8a87]">
        <button
          className="flex items-center gap-1 hover:text-[#1F1D1C] transition-colors"
          onClick={() => history.back()}
        >
          <ChevronLeft className="w-3 h-3" />
          订单列表
        </button>
        <span>/</span>
        <span className="text-[#4a4846]">订单详情</span>
      </div>

      {/* 页面标题行 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] font-bold text-[#1F1D1C] tracking-[-0.03em]">
              退款申请
            </h1>
            {/* 状态 — 色点 + 文字 */}
            <div className="flex items-center gap-1.5">
              <div className="w-[6px] h-[6px] rounded-full bg-[#f76b15]" />
              <span className="text-[12px] px-1.5 py-0.5 rounded-[4px] border
                               bg-[#fff6f0] border-[#ffe8d7] text-[#bd4b00]">
                待审批
              </span>
            </div>
          </div>
          <p className="font-mono text-[12px] text-[#8c8a87] mt-1">
            ORD-2026-08841
          </p>
        </div>
      </div>

      {/* 主体：详情 + 右侧面板 */}
      <div className="flex gap-5 items-start">
        {/* 左侧：详情内容 */}
        <div className="flex-1 space-y-5">
          {/* 基本信息卡 */}
          <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                           shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-[16px] font-semibold text-[#1F1D1C] mb-4">
              基本信息
            </h2>
            {/* 两列只读网格 */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <FieldItem label="订单编号" value="ORD-2026-08841" mono />
              <FieldItem label="申请用户" value="张三" />
              <FieldItem label="申请金额" value="¥1,280.00" />
              <FieldItem label="退款原因" value="商品与描述不符" />
              <FieldItem label="申请时间" value="2026-05-25 14:32:05" mono />
              <FieldItem label="订单来源" value="App - iOS" />
            </div>
          </Card>

          {/* 商品信息卡（可选，按业务添加更多卡片） */}
          <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                           shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-[16px] font-semibold text-[#1F1D1C] mb-4">
              商品明细
            </h2>
            {/* 简版列表 */}
            <div className="space-y-3">
              {[
                { name: '商品名称 A', qty: 2, price: '¥640.00' },
                { name: '商品名称 B', qty: 1, price: '¥640.00' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between
                                        py-2 border-b border-[#f2f1ef] last:border-0">
                  <span className="text-[14px] text-[#1F1D1C]">{item.name}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-[13px] text-[#8c8a87]">×{item.qty}</span>
                    <span className="text-[14px] font-medium text-[#1F1D1C]">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 活动时间线 */}
          <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                           shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-[16px] font-semibold text-[#1F1D1C] mb-4">
              处理记录
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: '退款申请提交',
                  actor: '张三（用户）',
                  time: '2026-05-25 14:32',
                  note: '商品与描述不符，申请全额退款',
                  done: true,
                },
                {
                  title: '系统初步审核',
                  actor: 'System',
                  time: '2026-05-25 14:32',
                  note: '自动通过基础风控检查',
                  done: true,
                },
                {
                  title: '人工审核',
                  actor: '待指派',
                  time: null,
                  note: null,
                  done: false,
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-3">
                  {/* 时间线节点 */}
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                      ${step.done ? 'bg-[#edfbf4]' : 'bg-[#f2f1ef]'}
                    `}>
                      {step.done
                        ? <CheckCircle2 className="w-3.5 h-3.5 text-[#29a383]" />
                        : <div className="w-2 h-2 rounded-full bg-[#b0adaa]" />
                      }
                    </div>
                    {i < 2 && <div className="w-px flex-1 bg-[#eceae7] mt-1" />}
                  </div>
                  {/* 节点内容 */}
                  <div className="pb-4">
                    <p className={`
                      text-[14px] font-medium
                      ${step.done ? 'text-[#1F1D1C]' : 'text-[#8c8a87]'}
                    `}>
                      {step.title}
                    </p>
                    <p className="text-[12px] text-[#8c8a87] mt-0.5">
                      {step.actor}
                      {step.time && (
                        <span className="font-mono ml-2">{step.time}</span>
                      )}
                    </p>
                    {step.note && (
                      <p className="text-[13px] text-[#4a4846] mt-1 bg-[#f9f9f8]
                                    rounded-[6px] p-2">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 右侧：上下文操作面板 — 320px fixed */}
        <div className="w-[320px] flex-shrink-0 sticky top-6">
          <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                           shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
            <h2 className="text-[16px] font-semibold text-[#1F1D1C] mb-1">
              审批决定
            </h2>
            <p className="text-[13px] text-[#8c8a87] mb-4">
              你是此申请的指定审核人
            </p>

            <Separator className="bg-[#f2f1ef] mb-4" />

            {/* 互斥决策选项 */}
            <div className="space-y-2 mb-4">
              <button
                onClick={() => setDecision('approve')}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-[6px] border text-left
                  transition-colors
                  ${decision === 'approve'
                    ? 'border-[#29a383] bg-[#edfbf4]'
                    : 'border-[#dddbd8] hover:border-[#cac8c4] bg-white'}
                `}
              >
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${
                  decision === 'approve' ? 'text-[#29a383]' : 'text-[#b0adaa]'
                }`} />
                <div>
                  <p className="text-[14px] font-medium text-[#1F1D1C]">通过退款</p>
                  <p className="text-[12px] text-[#8c8a87]">退还 ¥1,280.00 至用户账户</p>
                </div>
              </button>

              <button
                onClick={() => setDecision('reject')}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-[6px] border text-left
                  transition-colors
                  ${decision === 'reject'
                    ? 'border-[#e5484d] bg-[#fff5f5]'
                    : 'border-[#dddbd8] hover:border-[#cac8c4] bg-white'}
                `}
              >
                <XCircle className={`w-5 h-5 flex-shrink-0 ${
                  decision === 'reject' ? 'text-[#e5484d]' : 'text-[#b0adaa]'
                }`} />
                <div>
                  <p className="text-[14px] font-medium text-[#1F1D1C]">拒绝退款</p>
                  <p className="text-[12px] text-[#8c8a87]">驳回本次申请</p>
                </div>
              </button>
            </div>

            {/* 备注输入 */}
            <div className="mb-4">
              <label className="block text-[12px] font-medium text-[#4a4846] uppercase
                                tracking-[0.04em] mb-1.5">
                审批备注
              </label>
              <Textarea
                placeholder="请填写审批说明（必填）"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="
                  rounded-[6px] resize-none text-[14px]
                  border-[#cac8c4]
                  focus:border-[#1F1D1C]
                  focus:ring-2 focus:ring-[#eceae7] focus:ring-offset-0
                  placeholder:text-[#8c8a87]
                "
                rows={3}
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              {/* Primary — 面板内唯一主操作 */}
              <Button
                disabled={!decision || !remark.trim()}
                className="flex-1 bg-[#1F1D1C] text-white rounded-[6px] h-9
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                提交审批
              </Button>
              {/* Secondary */}
              <Button
                variant="outline"
                className="border-[#cac8c4] text-[#1F1D1C] rounded-[6px] h-9 px-4"
              >
                取消
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 只读字段组件
function FieldItem({
  label, value, mono = false
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      {/* 标签：size-1 全大写 gray-8 */}
      <dt className="text-[12px] font-medium text-[#b0adaa] uppercase tracking-[0.04em] mb-0.5">
        {label}
      </dt>
      {/* 值：size-5 gray-12 */}
      <dd className={`text-[14px] font-medium text-[#1F1D1C] ${mono ? 'font-mono' : ''}`}>
        {value}
      </dd>
    </div>
  )
}
```

## 关键规则

- **两列只读网格**：字段标签 `text-[12px] uppercase tracking-[0.04em] text-[#b0adaa]`，值 `text-[14px] font-medium text-[#1F1D1C]`
- **右侧操作面板**：宽度 320px，`sticky top-6`，用 shadow-3 以内的阴影
- **时间线节点**：已完成 = 绿色勾；进行中 = orange 标题；未发生 = gray 弱化
- **互斥选项**（通过/拒绝）：选中时高亮对应语义色的 border + bg，不用 radio 默认样式
- **备注输入**：标签在上方，不用 placeholder 代替
- **Primary 按钮位置**：操作面板内的提交按钮是该页面唯一 Primary
