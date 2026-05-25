---
name: neargo-oms-design
description: NearGo OMS 后台管理系统 UI 设计规范与代码生成。当用户提到构建、修改或审查 NearGo OMS（订单管理、门店管理、商品管理、财务结算、权限管理等）任何后台页面或组件时，必须使用此技能。包含完整设计 token（颜色/字体/间距/圆角）、shadcn/ui 组件规范、页面布局模板和代码示例。触发场景：用户提到 NearGo OMS、后台管理页面、OMS 组件/页面开发、"按设计规范"生成代码、数据列表/表格页、仪表板/KPI 卡、审批流/详情页、任何需要符合 NearGo OMS 风格的界面时，均应加载本技能。
---

# NearGo OMS Design System — 代码生成指南

**版本：** Design System v2.2 · 2026-05  
**技术栈：** React 19 + TypeScript + shadcn/ui + Tailwind CSS v4  
**适用范围：** NearGo OMS 全站后台管理界面

> 完整规范请参阅 `references/full-spec.md`。本文件为代码生成的快速参考与行为指南。

---

## 核心原则

生成任何 OMS 界面代码前，记住这 4 条：

1. **灰色为王**：所有主操作按钮用 `gray-12 (#1F1D1C)`，不用品牌琥珀色做主操作
2. **琥珀稀缺**：`#FFA902` 只用于促销/优惠标签，单屏 ≤ 10% 面积，绝不超过 1 个实心品牌 CTA
3. **状态必须是点+文**：6px 色点 + 文字标签，永远不能只靠颜色传达状态
4. **卡片分两级**：数据卡默认 `radius-4(8px)`，仪表板主角卡用 `radius-5(12px)`

---

## 设计 Token 速查

### 颜色

```css
/* 主色 */
--gray-12: #1F1D1C;   /* 主操作按钮、标题、关键文字 */
--gray-11: #4a4846;   /* 正文、表格内容 */
--gray-9:  #8c8a87;   /* 占位符、标签、提示 */
--gray-6:  #dddbd8;   /* 默认描边 */
--gray-4:  #eceae7;   /* 聚焦外发光 */
--gray-2:  #f9f9f8;   /* 悬停背景、只读底色 */
--gray-1:  #fdfdfc;   /* 页面背景 */

/* 品牌琥珀 */
--amber-9:  #FFA902;  /* 品牌实心 — 仅促销 */
--amber-11: #8c5c00;  /* 品牌文字 */
--amber-2:  #fff8d6;  /* 品牌背景淡色 */

/* 语义色 */
--green-9:  #29a383;  /* 成功/完成 */
--red-9:    #e5484d;  /* 错误/危险/失败 */
--blue-11:  #0060cf;  /* 链接/ghost按钮文字 */
--orange-9: #f76b15;  /* 警示/待办 */
--purple-9: #8e4ec6;  /* 分类/备选流程 */
```

### 字体

```css
font-family: 'Inter', 'Noto Sans SC', sans-serif;  /* UI 文字 */
font-family: 'JetBrains Mono', monospace;           /* ID/时间戳/代码 */
```

| Token | 规格 | 用途 |
|-------|------|------|
| size-1 | 12px/1.0/+0.04em w-400 | 全大写微标签、表头列名 |
| size-2 | 12px/1.5/+0.01em w-400 | 时间戳、元信息 |
| size-3 | 13px/1.5/0em w-400 | 表格单元、导航项、徽章 |
| size-4 | 14px/1.6/-0.01em w-400 | 正文（默认） |
| size-5 | 14px/1.5/-0.01em w-500 | 表格主列、强调值 |
| size-6 | 16px/1.4/-0.02em w-600 | 卡片标题、对话框标题 |
| size-7 | 20px/1.3/-0.03em w-700 | 页面标题 |
| size-8 | 26px/1.1/-0.04em w-700 | KPI 数值 |
| size-9 | 36px/1.0/-0.05em w-800 | 大号展示统计 |

### 间距

```
4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 px
(space-1 ~ space-9)
```

### 圆角

| Token | 值 | 用途 |
|-------|-----|------|
| radius-2 | 4px | 徽章、状态条 |
| radius-3 | 6px | 按钮、输入框、下拉 |
| radius-4 | 8px | **数据卡片（默认）**、表格容器 |
| radius-5 | 12px | **仪表板主角卡**、对话框、抽屉 |
| radius-6 | 9999px | 头像、药丸按钮、开关 |

---

## 页面布局

### 全局骨架

```tsx
// 三区结构：顶栏 54px + 侧边栏 232px + 内容区
<div className="flex h-screen">
  <Sidebar className="w-[232px] border-r border-[#dddbd8] bg-white" />
  <div className="flex flex-1 flex-col">
    <Header className="h-[54px] border-b border-[#dddbd8] bg-white sticky top-0 z-10" />
    <main className="flex-1 overflow-auto bg-[#fdfdfc] p-6">
      <div className="max-w-[1100px] mx-auto">
        {/* 内容 */}
      </div>
    </main>
  </div>
</div>
```

### 仪表板页纵向结构（从上到下）

```
面包屑 (可选)
↓ space-4
问候标题 28px/700 + 副文案 14px/400 gray-11
↓ space-6~7
横向 KPI 指标条（3~5项）
↓ space-6~7
全宽重点卡（radius-5）
↓ space-7
次级卡片行（2~4列 grid，gap space-5，radius-4）
↓ space-7~8
双栏底区（主列 1.5~2fr : 侧列 1fr，min-width 280px）
```

### 列表页结构

```
页面标题 + 操作按钮
↓ space-5
搜索/筛选工具栏 + 结果计数
↓ space-4
数据表格（radius-4，border gray-6）
↓
分页
```

---

## 组件规范

### 按钮

```tsx
// Primary — 唯一主操作，同一层级只有一个
<Button className="bg-[#1F1D1C] text-white hover:bg-[#1F1D1C]/90 rounded-[6px] h-9 px-4">
  提交
</Button>

// Secondary — 取消/次要
<Button variant="outline" className="border-[#cac8c4] text-[#1F1D1C] rounded-[6px] h-9 px-4">
  取消
</Button>

// Positive — 明确肯定（通过、启用、确认）
<Button className="bg-[#29a383] text-white rounded-[6px] h-9 px-4">
  通过
</Button>

// Danger — 破坏性操作（拒绝、删除），必须二次确认
<Button className="bg-[#e5484d] text-white rounded-[6px] h-9 px-4">
  拒绝
</Button>

// Ghost — 轻导航，详情链接
<Button variant="ghost" className="text-[#0060cf] h-9 px-2">
  查看详情
</Button>

// Brand — 仅促销 CTA，每屏 ≤1
<Button className="bg-[#FFA902] text-[#3c2500] rounded-[6px] h-9 px-4">
  立即领券
</Button>
```

### 徽章/状态

```tsx
// 状态 — 必须：6px色点 + 文字
<div className="flex items-center gap-1.5">
  <div className="w-[6px] h-[6px] rounded-full bg-[#29a383]" />
  <span className="text-[13px] text-[#4a4846]">已完成</span>
</div>

// Badge 模式：bg-2 + border-3 + text-11
// 成功类
<Badge className="bg-[#edfbf4] border border-[#cdf4ea] text-[#107060] text-[12px]">
  已完成
</Badge>

// 警示类
<Badge className="bg-[#fff6f0] border border-[#ffe8d7] text-[#bd4b00] text-[12px]">
  待处理
</Badge>

// 错误类
<Badge className="bg-[#fff5f5] border border-[#ffe0e0] text-[#ce2c31] text-[12px]">
  已拒绝
</Badge>

// 信息类
<Badge className="bg-[#f0f8ff] border border-[#d5efff] text-[#0060cf] text-[12px]">
  处理中
</Badge>

// 品牌徽章（仅促销）
<Badge className="bg-[#FFA902] text-[#3c2500] text-[12px] font-medium">
  限时优惠
</Badge>
```

### 输入框状态

```tsx
// 遵循 gray-7 默认边框，聚焦 gray-12 边框 + gray-4 外发光
<Input 
  className="
    border-[#cac8c4] 
    focus:border-[#1F1D1C] 
    focus:ring-2 focus:ring-[#eceae7] focus:ring-offset-0
    rounded-[6px] h-9
  " 
/>

// 错误态
<Input className="border-[#e5484d] focus:ring-[#ffe0e0]" />

// 只读态
<Input readOnly className="border-[#dddbd8] bg-[#f9f9f8] cursor-default" />
```

### KPI 卡片

```tsx
<Card className="rounded-[8px] border border-[#dddbd8] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] bg-white p-6">
  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-8 rounded-[6px] bg-[#f0f8ff] flex items-center justify-center">
      <Icon className="w-4 h-4 text-[#0090ff]" />
    </div>
    <span className="text-[13px] text-[#4a4846]">今日 GMV</span>
  </div>
  <div className="text-[26px] font-bold text-[#1F1D1C] tracking-[-0.04em]">
    ¥128,450
  </div>
  <p className="text-[12px] text-[#8c8a87] mt-1">较昨日 +12.3%</p>
</Card>
```

### 导航状态

```tsx
// Default
<NavItem className="text-[#4a4846] hover:bg-[#f9f9f8] hover:text-[#1F1D1C]" />

// Active
<NavItem className="bg-[#fff8d6] text-[#1F1D1C] font-medium border-l-2 border-[#FFA902]" />
```

---

## 常见页面模板

### 数据列表页

参阅 `references/templates/list-page.md` 获取完整的数据表格页模板，包含：
- 搜索/筛选工具栏
- 数据表格（含排序、状态列）
- 行内操作（详情/编辑/状态操作）
- 分页

### 仪表板页

参阅 `references/templates/dashboard-page.md` 获取完整仪表板模板，包含：
- 问候区 + KPI 横条
- 全宽重点卡
- 双栏底区（图表 + 动态流）

### 详情/审批页

参阅 `references/templates/detail-page.md` 获取完整详情页模板，包含：
- 两列只读网格
- 活动时间线
- 右侧上下文操作面板

---

## 生成代码时的检查清单

在输出代码前，验证以下 7 条：

- [ ] 主操作按钮是 `gray-12 (#1F1D1C)`，不是 `#FFA902`
- [ ] 状态展示使用了「6px 色点 + 文字标签」
- [ ] 徽章遵循了「bg-2 + border-3 + text-11」模式
- [ ] 输入框有聚焦时的 `gray-4` 外发光（`ring-2 ring-[#eceae7]`）
- [ ] 数据卡使用 `radius-4(8px)`，仅仪表板主角卡用 `radius-5(12px)`
- [ ] 标签始终在输入框上方（不仅用 placeholder 充当标签）
- [ ] 同一视图中的 `btn-p` 只有一个

---

## 反模式（绝对不要做）

| 错误做法 | 正确做法 |
|---------|---------|
| `bg-[#FFA902]` 做主操作按钮 | `bg-[#1F1D1C]` 做 Primary |
| 单屏多个 `#FFA902` 实心元素 | 每屏最多 1 个品牌 CTA |
| 仅用颜色区分状态 | 颜色 + 文字标签组合 |
| 所有卡片都用 `rounded-xl` (12px) | 数据卡 `rounded-[8px]`，主角卡 `rounded-[12px]` |
| 卡片用 `shadow-lg` 重阴影 | 最多用 `shadow-sm`（shadow-2） |
| 只用 `placeholder` 当表单标签 | 必须有持久 label 在上方 |
| 硬编码随意 hex 如 `#ff6600` | 使用规范 token 色值 |

---

详细规范参阅：
- `references/full-spec.md` — 完整 NearGo OMS v2.2 设计规范
- `references/shadcn-admin-patterns.md` — shadcn-admin 代码结构参考
