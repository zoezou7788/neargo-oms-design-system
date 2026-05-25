# shadcn-admin 代码结构参考

基于 shadcn-admin v2.2.1 项目研究整理。技术栈：React 19 + TypeScript + shadcn/ui + Tailwind CSS v4 + TanStack Router。

## 目录结构约定

```
src/
├── components/
│   ├── ui/          # shadcn/ui 基础组件（不要修改，通过 CLI 更新）
│   └── data-table/  # 数据表格增强组件
├── features/        # 按业务域组织的功能模块
│   ├── orders/      # 订单模块
│   ├── users/       # 用户模块
│   └── ...
├── routes/          # TanStack Router 路由
└── styles/
    └── theme.css    # CSS 变量（设计 token）
```

## theme.css 结构（Tailwind CSS v4）

```css
@import "tailwindcss";

@theme inline {
  --font-inter: 'Inter', 'Noto Sans SC', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius: 0.5rem;         /* 8px — radius-4 */
  --radius-sm: 0.375rem;    /* 6px — radius-3 */
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;     /* 12px — radius-5 */
  --radius-xl: 9999px;      /* radius-6 */
}

:root {
  /* NearGo OMS tokens */
  --background: #fdfdfc;       /* gray-1 */
  --surface: #ffffff;
  --foreground: #1F1D1C;       /* gray-12 */
  --muted-foreground: #4a4846; /* gray-11 */
  --placeholder: #8c8a87;      /* gray-9 */
  --border: #dddbd8;           /* gray-6 */
  --input-border: #cac8c4;     /* gray-7 */
  --ring: #eceae7;             /* gray-4 */
  --primary: #1F1D1C;          /* gray-12 */
  --brand: #FFA902;            /* amber-9 */
  --success: #29a383;          /* green-9 */
  --danger: #e5484d;           /* red-9 */
  --warning: #f76b15;          /* orange-9 */
  --info: #0090ff;             /* blue-9 */
}
```

## 布局组件

### AppSidebar

```tsx
// shadcn-admin 侧边栏使用 SidebarProvider + AppSidebar
const SIDEBAR_WIDTH = '232px'      // NearGo OMS 标准宽度
const SIDEBAR_WIDTH_ICON = '48px'  // 折叠态

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <Header />
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

### Header

```tsx
// 高度 54px，sticky，滚动时加 backdrop-blur
<header className="
  h-[54px] sticky top-0 z-10
  flex items-center px-6
  bg-white border-b border-[#dddbd8]
  data-[scrolled=true]:backdrop-blur-md
">
  <SidebarTrigger />
  {/* 全局搜索（可选）⌘K */}
  <div className="flex-1 max-w-sm mx-4">
    <Input placeholder="搜索..." className="h-8 bg-[#f9f9f8]" />
  </div>
  {/* 右侧：通知 + 用户头像 */}
</header>
```

## 数据表格增强组件（data-table/）

shadcn-admin 提供了以下增强组件，直接复用：

- `toolbar.tsx` — 搜索输入 + 筛选 + 视图切换
- `column-header.tsx` — 可排序的列头（含排序图标）
- `faceted-filter.tsx` — 多选过滤器（状态、类型等）
- `pagination.tsx` — 分页（页码 + 每页数量选择）
- `bulk-actions.tsx` — 批量操作栏（选中行数 + 操作按钮）

### 使用示例

```tsx
import { DataTable } from '@/components/data-table'
import { columns } from './columns'  // 本模块列定义

export function OrdersTable({ data }: { data: Order[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchColumn="orderId"
      searchPlaceholder="搜索订单号..."
    />
  )
}

// columns.tsx
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="订单号" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-[13px] text-[#4a4846]">
        {row.getValue('orderId')}
      </span>
    ),
  },
  // ... 其他列
]
```

## 路由结构（TanStack Router）

```tsx
// routes/orders/
// ├── index.tsx      — 订单列表
// ├── $orderId.tsx   — 订单详情（动态路由）
// └── new.tsx        — 新建订单

// 在路由文件中定义面包屑
export const Route = createFileRoute('/orders/$orderId')({
  component: OrderDetailPage,
  beforeLoad: ({ params }) => ({
    breadcrumb: `订单 ${params.orderId}`
  })
})
```

## 关键 shadcn/ui 组件配置

### Dialog（对话框）— radius-5

```tsx
<DialogContent className="rounded-[12px] max-w-[480px]">
  <DialogHeader>
    <DialogTitle className="text-[16px] font-semibold text-[#1F1D1C]">
      确认操作
    </DialogTitle>
  </DialogHeader>
  {/* 内容 */}
  <DialogFooter>
    <Button variant="outline" className="border-[#cac8c4] rounded-[6px]">取消</Button>
    <Button className="bg-[#e5484d] text-white rounded-[6px]">确认删除</Button>
  </DialogFooter>
</DialogContent>
```

### Sheet（侧边抽屉）— 用于手机端或次要操作

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">筛选</Button>
  </SheetTrigger>
  <SheetContent className="w-[360px] rounded-l-[12px]">
    {/* 筛选内容 */}
  </SheetContent>
</Sheet>
```

### Toast（Sonner）

```tsx
import { toast } from 'sonner'

// 成功
toast.success('操作成功', { description: '订单已提交审批' })

// 错误
toast.error('操作失败', { description: '请检查网络连接后重试' })
```

## 图标规范

使用 Lucide React，尺寸规范：
- 导航/按钮内：`w-4 h-4`（16px）
- 独立图标/KPI：`w-5 h-5`（20px）
- 空状态大图：`w-12 h-12`（48px）

默认颜色 `text-[#4a4846]`（gray-11），hover `text-[#1F1D1C]`。
