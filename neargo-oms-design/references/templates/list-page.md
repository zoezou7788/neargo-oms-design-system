# 数据列表页模板

NearGo OMS 数据列表页标准结构。适用于：订单列表、用户列表、门店列表、商品列表、审批队列等任意以「行数据 + 操作」为核心的页面。

## 完整示例代码

```tsx
import { useState } from 'react'
import { Search, Filter, Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// ---- 状态配置（示例：可替换为任意业务状态）----
const STATUS_CONFIG = {
  pending:   { dot: '#f76b15', label: '待处理', badge: 'bg-[#fff6f0] border-[#ffe8d7] text-[#bd4b00]' },
  completed: { dot: '#29a383', label: '已完成', badge: 'bg-[#edfbf4] border-[#cdf4ea] text-[#107060]' },
  rejected:  { dot: '#e5484d', label: '已拒绝', badge: 'bg-[#fff5f5] border-[#ffe0e0] text-[#ce2c31]' },
  processing:{ dot: '#0090ff', label: '处理中', badge: 'bg-[#f0f8ff] border-[#d5efff] text-[#0060cf]' },
}

export function ListPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-5">
      {/* 页面标题行 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1F1D1C] tracking-[-0.03em]">
            订单管理  {/* 替换为实际页面标题 */}
          </h1>
          <p className="text-[14px] text-[#8c8a87] mt-0.5">共 2,847 条记录</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-[#cac8c4] text-[#1F1D1C] rounded-[6px] h-9 gap-1.5"
          >
            <Download className="w-4 h-4" />
            导出
          </Button>
          {/* Primary 按钮 — 同页面只有一个 */}
          <Button className="bg-[#1F1D1C] text-white hover:bg-[#1F1D1C]/90 rounded-[6px] h-9 gap-1.5">
            <Plus className="w-4 h-4" />
            新建订单
          </Button>
        </div>
      </div>

      {/* 工具栏：搜索 + 筛选 */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-[360px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8a87]" />
          <Input
            placeholder="搜索订单号、用户名..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              pl-9 h-9 rounded-[6px]
              border-[#cac8c4]
              focus:border-[#1F1D1C]
              focus:ring-2 focus:ring-[#eceae7] focus:ring-offset-0
              placeholder:text-[#8c8a87]
            "
          />
        </div>
        <Button
          variant="outline"
          className="border-[#cac8c4] text-[#4a4846] rounded-[6px] h-9 gap-1.5"
        >
          <Filter className="w-4 h-4" />
          筛选
        </Button>
      </div>

      {/* 数据表格 */}
      <div className="rounded-[8px] border border-[#dddbd8] bg-white overflow-hidden
                      shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f9f9f8] border-b border-[#eceae7]">
              <TableHead className="text-[12px] font-medium text-[#4a4846] uppercase tracking-[0.04em] h-10">
                订单号
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#4a4846] uppercase tracking-[0.04em]">
                客户
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#4a4846] uppercase tracking-[0.04em]">
                金额
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#4a4846] uppercase tracking-[0.04em]">
                状态
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#4a4846] uppercase tracking-[0.04em]">
                创建时间
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#4a4846] uppercase tracking-[0.04em] text-right">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 示例行 — 替换为 .map(row => ...) */}
            <TableRow className="hover:bg-[#f9f9f8] border-b border-[#f2f1ef] transition-colors">
              {/* 主键列 — 等宽字体 */}
              <TableCell>
                <span className="font-mono text-[13px] text-[#4a4846]">
                  ORD-2026-08841
                </span>
              </TableCell>
              {/* 名称列 */}
              <TableCell className="text-[14px] font-medium text-[#1F1D1C]">
                张三
              </TableCell>
              {/* 金额列 */}
              <TableCell className="text-[14px] text-[#1F1D1C]">
                ¥1,280.00
              </TableCell>
              {/* 状态列 — 必须：色点 + 文字 */}
              <TableCell>
                <StatusBadge status="pending" />
              </TableCell>
              {/* 时间列 — 等宽字体 */}
              <TableCell>
                <span className="font-mono text-[12px] text-[#8c8a87]">
                  2026-05-25 14:32
                </span>
              </TableCell>
              {/* 操作列 */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    className="text-[#0060cf] text-[13px] h-8 px-2"
                  >
                    查看
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-[#4a4846] h-8 px-2 text-[13px]"
                      >
                        更多
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-[8px]">
                      <DropdownMenuItem className="text-[13px]">编辑</DropdownMenuItem>
                      <DropdownMenuItem className="text-[13px] text-[#ce2c31]">
                        取消订单
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between text-[13px] text-[#8c8a87]">
        <span>显示第 1–20 条，共 2,847 条</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="border-[#cac8c4] rounded-[6px] h-8 px-3 text-[13px]"
          >
            上一页
          </Button>
          <Button
            variant="outline"
            className="border-[#cac8c4] rounded-[6px] h-8 px-3 text-[13px]"
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  )
}

// 状态徽章组件
function StatusBadge({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const config = STATUS_CONFIG[status]
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-[6px] h-[6px] rounded-full flex-shrink-0"
        style={{ backgroundColor: config.dot }}
      />
      <span className={`
        text-[12px] px-1.5 py-0.5 rounded-[4px] border
        ${config.badge}
      `}>
        {config.label}
      </span>
    </div>
  )
}
```

## 关键规则

- **表头**：`text-[12px] uppercase tracking-[0.04em] text-[#4a4846]`，背景 `bg-[#f9f9f8]`
- **行分隔线**：`border-b border-[#f2f1ef]`（gray-3，比卡片边框更淡）
- **行 hover**：`hover:bg-[#f9f9f8]`，可加 `shadow-[0_1px_2px_rgba(0,0,0,.05)]`（shadow-1）
- **主键/时间**：等宽字体 `font-mono`，`text-[#4a4846]`
- **主名称列**：`font-medium text-[#1F1D1C]`
- **操作列**：ghost 链接 `text-[#0060cf]`，危险操作 `text-[#ce2c31]`，必须二次确认
