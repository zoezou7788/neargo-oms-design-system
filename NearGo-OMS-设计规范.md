# NearGo OMS 设计规范（全站通用）

**Design System v3.0** · 2026-05 · _对标 shadcn/ui 目录标准补全_

本规范为 **NearGo OMS** 全产品的通用视觉与交互基线。v3.0 在 v2.2 基础上对标 shadcn/ui 目录结构，补全**开发集成层、缺失组件、组件 API、状态规范**，使前端工程师可**直接落地**，不依赖口头说明。

**标签：** 全站 OMS · Radix Color Scale · Inter + JetBrains Mono · 1440px 视口 · WCAG AA+ · shadcn/ui 结构

---

## 目录

### 开始使用
- [00 快速开始](#00-快速开始)

### Foundation
- [01 色彩](#01-色彩)
- [02 字体](#02-字体)
- [03 间距与圆角](#03-间距与圆角)
- [04 阴影与描边](#04-阴影与描边)
- [05 动效](#05-动效)
- [06 层叠 z-index](#06-层叠-z-index)
- [07 响应式断点](#07-响应式断点)

### Layout
- [08 页面布局](#08-页面布局)
- [09 导航](#09-导航)

### Components
- [10 Alert 警告横幅](#10-alert-警告横幅)
- [11 Avatar 头像](#11-avatar-头像)
- [12 Badge 徽章](#12-badge-徽章)
- [13 Breadcrumb 面包屑](#13-breadcrumb-面包屑)
- [14 Button 按钮](#14-button-按钮)
- [15 Calendar / DatePicker 日期选择](#15-calendar--datepicker-日期选择)
- [16 Card 卡片](#16-card-卡片)
- [17 Checkbox 复选框](#17-checkbox-复选框)
- [18 Combobox 组合搜索框](#18-combobox-组合搜索框)
- [19 Data Table 数据表格](#19-data-table-数据表格)
- [20 Dialog / Modal 对话框](#20-dialog--modal-对话框)
- [21 Drawer / Sheet 抽屉](#21-drawer--sheet-抽屉)
- [22 Dropdown Menu 下拉菜单](#22-dropdown-menu-下拉菜单)
- [23 Empty State 空状态](#23-empty-state-空状态)
- [24 Form 表单](#24-form-表单)
- [25 Input 输入框](#25-input-输入框)
- [26 KPI Card 指标卡](#26-kpi-card-指标卡)
- [27 Label 标签](#27-label-标签)
- [28 Pagination 分页](#28-pagination-分页)
- [29 Popover 浮层](#29-popover-浮层)
- [30 Progress 进度条](#30-progress-进度条)
- [31 Radio Group 单选组](#31-radio-group-单选组)
- [32 Select 下拉选择](#32-select-下拉选择)
- [33 Separator 分隔线](#33-separator-分隔线)
- [34 Skeleton 骨架屏](#34-skeleton-骨架屏)
- [35 Status Indicator 状态指示器](#35-status-indicator-状态指示器)
- [36 Switch / Toggle 开关](#36-switch--toggle-开关)
- [37 Table 表格](#37-table-表格)
- [38 Tabs 标签页](#38-tabs-标签页)
- [39 Textarea 多行输入](#39-textarea-多行输入)
- [40 Timeline 时间线](#40-timeline-时间线)
- [41 Toast / Notification 通知](#41-toast--notification-通知)
- [42 Tooltip 工具提示](#42-tooltip-工具提示)
- [43 Warning Card 风险卡片](#43-warning-card-风险卡片)

### Patterns
- [44 表单布局模式](#44-表单布局模式)
- [45 数据表格 + 筛选模式](#45-数据表格--筛选模式)
- [46 KPI 仪表板模式](#46-kpi-仪表板模式)
- [47 详情页 + 上下文面板模式](#47-详情页--上下文面板模式)

### Principles
- [48 设计原则](#48-设计原则)
- [49 可访问性指南](#49-可访问性指南)

---

## 00 快速开始

### 安装依赖

```bash
# 安装 shadcn/ui（推荐）
npx shadcn@latest init

# 字体（Inter + JetBrains Mono）
npm install @fontsource/inter @fontsource/jetbrains-mono
```

### CSS 变量（全量粘贴到 globals.css）

```css
/* globals.css — NearGo OMS Design Tokens v3.0 */

/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap');

:root {
  /* ── Amber Scale (Brand: step-9 = #FFA902) ── */
  --amber-1:  #fdfaf0;
  --amber-2:  #fff8d6;
  --amber-3:  #ffeea8;
  --amber-4:  #ffe37c;
  --amber-5:  #ffd652;
  --amber-6:  #f5c42a;
  --amber-7:  #e8af00;
  --amber-8:  #d49c00;
  --amber-9:  #FFA902;  /* ★ BRAND */
  --amber-10: #f09a00;
  --amber-11: #8c5c00;
  --amber-12: #3c2500;

  /* ── Gray Scale (Primary: step-12 = #1F1D1C) ── */
  --gray-1:  #fdfdfc;
  --gray-2:  #f9f9f8;
  --gray-3:  #f2f1ef;
  --gray-4:  #eceae7;
  --gray-5:  #e5e3e0;
  --gray-6:  #dddbd8;
  --gray-7:  #cac8c4;
  --gray-8:  #b0adaa;
  --gray-9:  #8c8a87;
  --gray-10: #807e7b;
  --gray-11: #4a4846;
  --gray-12: #1F1D1C;  /* ★ PRIMARY */

  /* ── Semantic Colors ── */
  --green-bg:     #edfbf4;
  --green-border: #cdf4ea;
  --green-solid:  #29a383;
  --green-text:   #107060;

  --red-bg:     #fff5f5;
  --red-border: #ffe0e0;
  --red-solid:  #e5484d;
  --red-text:   #ce2c31;

  --blue-bg:     #f0f8ff;
  --blue-border: #d5efff;
  --blue-solid:  #0090ff;
  --blue-text:   #0060cf;

  --orange-bg:     #fff6f0;
  --orange-border: #ffe8d7;
  --orange-solid:  #f76b15;
  --orange-text:   #bd4b00;

  --purple-bg:     #faf5ff;
  --purple-border: #ecdcfe;
  --purple-solid:  #8e4ec6;
  --purple-text:   #793aaf;

  /* ── Semantic Aliases ── */
  --bg:             var(--gray-1);
  --bg-subtle:      var(--gray-2);
  --surface:        #ffffff;
  --border:         var(--gray-6);
  --border-strong:  var(--gray-8);
  --text-hi:        var(--gray-12);
  --text-mid:       var(--gray-11);
  --text-low:       var(--gray-9);
  --text-disabled:  var(--gray-8);
  --brand:          var(--amber-9);
  --brand-bg:       var(--amber-2);
  --brand-text:     var(--amber-11);

  /* ── Spacing ── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;
  --space-8: 48px;
  --space-9: 64px;

  /* ── Radius ── */
  --radius-1: 3px;
  --radius-2: 4px;
  --radius-3: 6px;
  --radius-4: 8px;
  --radius-5: 12px;
  --radius-6: 9999px;

  /* ── Shadows ── */
  --shadow-1: 0 1px 2px rgba(0,0,0,.05);
  --shadow-2: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --shadow-3: 0 4px 8px rgba(0,0,0,.06), 0 2px 4px rgba(0,0,0,.04);
  --shadow-4: 0 8px 16px rgba(0,0,0,.08), 0 4px 8px rgba(0,0,0,.04);
  --shadow-5: 0 16px 32px rgba(0,0,0,.10);
  --shadow-6: 0 24px 48px rgba(0,0,0,.18);

  /* ── Motion ── */
  --duration-fast:   100ms;
  --duration-normal: 150ms;
  --duration-slow:   250ms;
  --duration-enter:  200ms;
  --duration-exit:   150ms;
  --ease-out:   cubic-bezier(0, 0, 0.2, 1);
  --ease-in:    cubic-bezier(0.4, 0, 1, 1);
  --ease-inout: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── z-index ── */
  --z-base:    0;
  --z-raised:  10;
  --z-dropdown: 100;
  --z-sticky:  200;
  --z-overlay: 300;
  --z-modal:   400;
  --z-popover: 500;
  --z-toast:   600;
  --z-tooltip: 700;

  /* ── Typography ── */
  --font-sans: 'Inter', 'Noto Sans SC', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Roboto Mono', monospace;
}

/* Dark Mode */
[data-theme="dark"] {
  --gray-1:  #111110;
  --gray-2:  #191918;
  --gray-3:  #222221;
  --gray-4:  #2a2927;
  --gray-5:  #31302e;
  --gray-6:  #3b3a37;
  --gray-7:  #494845;
  --gray-8:  #62605d;
  --gray-9:  #6f6d69;
  --gray-10: #7c7a76;
  --gray-11: #b5b2ad;
  --gray-12: #eeeeec;

  --amber-9:  #FF9900;
  --amber-11: #FFD060;
  --amber-2:  #2D1D00;

  --surface: #1c1b19;
  --bg:      var(--gray-1);
}

/* Base resets */
*, *::before, *::after { box-sizing: border-box; }
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text-hi);
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

### Tailwind 配置（tailwind.config.ts）

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand:   "var(--amber-9)",
        primary: "var(--gray-12)",
        border:  "var(--border)",
        surface: "var(--surface)",
        bg:      "var(--bg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm:   "var(--radius-2)",   // 4px  badges
        md:   "var(--radius-3)",   // 6px  buttons, inputs
        lg:   "var(--radius-4)",   // 8px  cards
        xl:   "var(--radius-5)",   // 12px dialogs
        full: "var(--radius-6)",   // pill
      },
      boxShadow: {
        card:  "var(--shadow-2)",
        panel: "var(--shadow-3)",
        float: "var(--shadow-4)",
        modal: "var(--shadow-6)",
      },
      transitionDuration: {
        fast:   "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow:   "var(--duration-slow)",
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 01 色彩

> _内容同 v2.2，已在 [00 快速开始](#00-快速开始) 以 CSS 变量形式提供，本节保留语义说明。_

### Amber Scale（NearGo Brand — step 9 = #FFA902）

| Step | Hex | 用途 |
|------|-----|------|
| 1 | #fdfaf0 | 品牌区背景极淡 |
| 2 | #fff8d6 | 品牌 tint 背景、导航激活底 |
| 3–5 | …～#ffd652 | UI 元素选中态 |
| 6–8 | …～#d49c00 | 品牌描边、聚焦环 |
| **9** | **#FFA902 ★** | 品牌实心：促销徽章、特价、少量 CTA |
| 10 | #f09a00 | Hover 态 |
| 11 | #8c5c00 | 白底上品牌文字（APCA Lc≥60） |
| 12 | #3c2500 | 品牌高对比文字 |

**使用限制：** 任意单屏品牌色面积 ≤ 10%；禁止用于主流程操作按钮。

### Gray Scale（Primary — step 12 = #1F1D1C）

| Step | Hex | 主要角色 |
|------|-----|---------|
| 1 | #fdfdfc | 页面背景 |
| 2 | #f9f9f8 | Subtle 背景、hover 底 |
| 3–5 | … | 表头、Badge 填充、选中态 |
| 6 | #dddbd8 | **默认描边** |
| 7 | #cac8c4 | 输入框默认边框 |
| 8 | #b0adaa | 强描边、图标色 |
| 9 | #8c8a87 | Placeholder、低信息文字 |
| 11 | #4a4846 | 次要正文、表格内容 |
| **12** | **#1F1D1C ★** | 主要操作按钮、标题、激活导航 |

### 语义色（Semantic）

每种语义色提供 bg / border / solid / text 四档，在 OMS 任意模块含义固定。

| 语义 | solid | text | 典型场景 |
|------|-------|------|--------|
| Success | #29a383 | #107060 | 已完成、已通过、成功 |
| Danger | #e5484d | #ce2c31 | 失败、错误、拒绝、删除 |
| Info | #0090ff | #0060cf | 待处理、链接、次级操作 |
| Warning | #f76b15 | #bd4b00 | 警告、SLA 临近、首要待办 |
| Purple | #8e4ec6 | #793aaf | 退回、改派、分支流程 |

---

## 02 字体

### 字体族

| 角色 | 字体 | 用途 |
|------|------|------|
| Sans（主） | Inter | 全部 UI 文字 |
| CJK | Noto Sans SC | 中文内容 |
| Mono | JetBrains Mono | 订单号、时间戳、ID、IP |

### 字号规范（Type Scale）

| Token | CSS | 字号/行高/字间距/字重 | 用途 |
|-------|-----|----------------------|------|
| `--text-micro` | `font-size:12px;line-height:1;letter-spacing:.04em` | 12 / 1.0 / +.04 / 400 | 全大写微标签 |
| `--text-caption` | `font-size:12px;line-height:1.5` | 12 / 1.5 / +.01 / 400 | 时间戳、元信息 |
| `--text-sm` | `font-size:13px;line-height:1.5` | 13 / 1.5 / 0 / 400 | 表格单元、导航项 |
| `--text-base` ★ | `font-size:14px;line-height:1.6` | 14 / 1.6 / -.01 / 400 | **默认正文** |
| `--text-base-medium` | `font-size:14px;line-height:1.5;font-weight:500` | 14 / 1.5 / -.01 / 500 | 表格主列、强调字段 |
| `--text-md` | `font-size:16px;line-height:1.4;font-weight:600` | 16 / 1.4 / -.02 / 600 | 分区标题、卡片标题 |
| `--text-lg` | `font-size:20px;line-height:1.3;font-weight:700` | 20 / 1.3 / -.03 / 700 | 页面标题 |
| `--text-xl` | `font-size:26px;line-height:1.1;font-weight:700` | 26 / 1.1 / -.04 / 700 | KPI 数值 |
| `--text-display` | `font-size:36px;line-height:1;font-weight:800` | 36 / 1.0 / -.05 / 800 | 展示统计 |

```css
/* 推荐 Tailwind 的直接类名对应 */
/* micro   → text-xs font-normal tracking-wider uppercase */
/* caption → text-xs font-normal leading-relaxed */
/* sm      → text-[13px] font-normal */
/* base    → text-sm font-normal  (Tailwind text-sm = 14px) */
/* md      → text-base font-semibold */
/* lg      → text-xl font-bold */
/* xl      → text-2xl font-bold */
/* display → text-4xl font-extrabold */
```

---

## 03 间距与圆角

### Spacing Scale

| Token | 值 | Tailwind | 用途 |
|-------|----|----------|------|
| `--space-1` | 4px | `p-1` | 图标间距、微内边距 |
| `--space-2` | 8px | `p-2` | Badge 内边距、行内间距 |
| `--space-3` | 12px | `p-3` | 行单元格间距 |
| `--space-4` | 16px | `p-4` | 表单字段间距、按钮内边距 |
| `--space-5` | 24px | `p-6` | **卡片内边距**、区块间距 |
| `--space-6` | 32px | `p-8` | 块级间距 |
| `--space-7` | 40px | `p-10` | 内容区内边距 |
| `--space-8` | 48px | `p-12` | 页面顶部偏移 |
| `--space-9` | 64px | `p-16` | 区块分隔 |

### Radius Scale

| Token | 值 | 适用 |
|-------|----|------|
| `--radius-1` | 3px | 复选框、极小内层 |
| `--radius-2` | 4px | Badge、Tag、Chip |
| `--radius-3` | 6px | Button、Input、Select |
| `--radius-4` | 8px | **Card（默认）**、Dropdown |
| `--radius-5` | 12px | Dialog、仪表板主角卡 |
| `--radius-6` | 9999px | Avatar、Pill Button、Switch |

---

## 04 阴影与描边

### Shadow Scale

| Token | 值 | 用途 |
|-------|----|------|
| `--shadow-1` | `0 1px 2px rgba(0,0,0,.05)` | 行 hover |
| `--shadow-2` | 双层 `0 1px 3px` | **卡片默认** |
| `--shadow-3` | 双层 `0 4px 8px` | 右侧面板 |
| `--shadow-4` | 双层 `0 8px 16px` | Dropdown、Popover |
| `--shadow-5` | `0 16px 32px rgba(0,0,0,.10)` | 底部浮层 |
| `--shadow-6` | `0 24px 48px rgba(0,0,0,.18)` | Modal |

### Border Usage

| 场景 | CSS |
|------|-----|
| 卡片默认 | `border: 1px solid var(--gray-6)` |
| 输入框默认 | `border: 1px solid var(--gray-7)` |
| 输入框 hover | `border: 1px solid var(--gray-8)` |
| 输入框 focus | `border: 1px solid var(--gray-12); box-shadow: 0 0 0 2px var(--gray-4)` |
| 输入框 error | `border: 1px solid var(--red-solid); box-shadow: 0 0 0 2px var(--red-border)` |
| 导航激活指示 | `border-left: 2px solid var(--amber-9)` |
| 表格行分隔 | `border-bottom: 1px solid var(--gray-3)` |

---

## 05 动效

### Motion Tokens

| Token | 值 | 用途 |
|-------|----|------|
| `--duration-fast` | 100ms | 微交互（hover 色变、focus ring） |
| `--duration-normal` | 150ms | **默认过渡** |
| `--duration-slow` | 250ms | 展开/收起、切换 |
| `--duration-enter` | 200ms | 进入动画 |
| `--duration-exit` | 150ms | 离开动画（退出比进入快） |
| `--ease-out` | cubic-bezier(0,0,.2,1) | 元素进入 |
| `--ease-in` | cubic-bezier(.4,0,1,1) | 元素退出 |
| `--ease-inout` | cubic-bezier(.4,0,.2,1) | 平移、切换 |
| `--ease-spring` | cubic-bezier(.34,1.56,.64,1) | 弹性微交互（开关、Badge 出现） |

### 常用过渡片段

```css
/* 交互元素默认过渡 */
.interactive {
  transition: color var(--duration-normal) var(--ease-out),
              background var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              opacity var(--duration-normal) var(--ease-out);
}

/* Dialog/Drawer 进场 */
@keyframes fade-in {
  from { opacity: 0; transform: scale(.97); }
  to   { opacity: 1; transform: scale(1); }
}
.dialog-enter { animation: fade-in var(--duration-enter) var(--ease-out); }

/* Toast 进场（从右侧滑入） */
@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: translateX(0); }
}
.toast-enter { animation: slide-in-right var(--duration-enter) var(--ease-out); }
```

### 动效原则

- **能用 opacity + transform 就不用其他属性**（避免重排）
- **退出比进入快 50ms**：进场 200ms，退场 150ms
- **不在密集表格行上加动效**：列表行 hover 仅颜色变化，无位移
- **弹性（spring）限用于确认反馈类**（如 Switch 切换、Toast 出现），不用于导航

---

## 06 层叠 z-index

| Token | 值 | 说明 |
|-------|----|------|
| `--z-base` | 0 | 普通文档流 |
| `--z-raised` | 10 | 激活的表格行、hover 卡片 |
| `--z-dropdown` | 100 | Dropdown Menu、Select 选项列表 |
| `--z-sticky` | 200 | 吸顶表头、固定列 |
| `--z-overlay` | 300 | Modal 遮罩层 |
| `--z-modal` | 400 | Dialog、Drawer 内容 |
| `--z-popover` | 500 | Popover、Tooltip 内容 |
| `--z-toast` | 600 | Toast 通知 |
| `--z-tooltip` | 700 | Tooltip（最高，穿透 Modal） |

**规则：** 禁止使用未登记的 z-index 魔法数字；若需新层级，在此表中登记后再使用。

---

## 07 响应式断点

OMS 以 **1440px 视口**为基准；最小支持宽度 **1280px**。1280px 以下展示水平滚动条，无需移动端适配。

| 断点 | 宽度 | 行为 |
|------|------|------|
| `xl` | ≥ 1440px | 默认设计基准 |
| `lg` | 1280–1439px | 侧栏收至 200px，内容区正常 |
| `md` | 1024–1279px | 侧栏折叠为图标模式（64px），内容区展开 |
| `<md` | < 1024px | 仅内网/管理后台不强制适配；显示横向滚动提示 |

```css
/* Tailwind 断点配置 */
/* tailwind.config.ts → theme.screens */
screens: {
  'lg': '1280px',
  'xl': '1440px',
}
```

---

## 08 页面布局

### 布局原则

OMS 后台采用 **24 栅格系统**（对标 Ant Design Pro 规范），内容区**全宽铺开**，不设 `max-width` 居中约束。
页面宽度由侧边栏宽度 + 内容区宽度组成，内容区通过 24 列栅格划分比例。

**为什么用 24 栅格而非居中布局？**
- 企业级 B2B 系统信息密度高，全宽布局能展示更多数据列
- 24 可被 1/2/3/4/6/8/12 整除，支持各类内容比例
- 不同页面的"主内容+辅助面板"比例通过列数灵活控制
- 避免超宽屏幕出现大量空白边距

### 核心变量

```css
:root {
  --sidebar-w:     220px;   /* 侧边栏宽度 */
  --topbar-h:      54px;    /* 顶栏高度 */
  --grid-cols:     24;      /* 栅格列数 */
  --gutter:        16px;    /* 列间距（默认）*/
  --gutter-lg:     24px;    /* 宽松页面列间距（仪表板）*/
  --content-pad:   24px;    /* 内容区左右内边距 */
}
```

### 三区布局骨架

```css
/* 三区布局：顶栏 / 侧栏 / 内容区 */
.oms-layout {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  grid-template-rows: var(--topbar-h) 1fr;
  min-height: 100vh;
}
.oms-topbar {
  grid-column: 1 / -1;
  height: var(--topbar-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0;
  z-index: var(--z-sticky);
}
.oms-sidebar {
  grid-row: 2;
  background: var(--surface);
  border-right: 1px solid var(--border);
  position: sticky; top: var(--topbar-h);
  height: calc(100vh - var(--topbar-h));
  overflow-y: auto;
}
.oms-content {
  grid-row: 2;
  background: var(--bg);
  padding: var(--content-pad);
  overflow-y: auto;
  /* ⚠️  不设 max-width — 全宽展开，由内部栅格控制比例 */
}
```

### 24 栅格系统

```css
/* 24栅格容器 */
.grid-24 {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: var(--gutter);
  width: 100%;
}
.grid-24-lg {
  gap: var(--gutter-lg); /* 仪表板宽松间距 */
}

/* 列跨度（常用组合） */
.col-24 { grid-column: span 24; } /* 全宽 */
.col-18 { grid-column: span 18; } /* 3/4 */
.col-16 { grid-column: span 16; } /* 2/3 主列（配合 col-8）*/
.col-12 { grid-column: span 12; } /* 1/2 */
.col-8  { grid-column: span 8;  } /* 1/3 */
.col-6  { grid-column: span 6;  } /* 1/4 — KPI 卡片 */
.col-4  { grid-column: span 4;  } /* 1/6 */
.col-3  { grid-column: span 3;  } /* 1/8 */
```

### 常用页面栅格模式

| 页面类型 | 栅格分配 | 说明 |
|---------|---------|------|
| KPI 横条（4项） | `col-6 × 4` | 每项占 1/4 |
| KPI 横条（3项） | `col-8 × 3` | 每项占 1/3 |
| 仪表板双栏 | `col-16 + col-8` | 主图表 2/3，动态流 1/3 |
| 详情页+面板 | `col-17 + col-7` | 详情主体，右侧操作面板 |
| 表单 | `col-24`（内部 2列 field grid）| 表单铺满，字段两列排布 |
| 数据表格 | `col-24` | 表格全宽 |
| 二等分卡片行 | `col-12 × 2` | 两张等宽卡片 |
| 三等分卡片行 | `col-8 × 3` | 三张等宽卡片 |

### 典型布局示例

```html
<!-- 仪表板页 -->
<div class="oms-content">

  <!-- KPI 横条：4项各占 col-6 -->
  <div class="grid-24 grid-24-lg mb-5">
    <div class="col-6"><KPICard /></div>
    <div class="col-6"><KPICard /></div>
    <div class="col-6"><KPICard /></div>
    <div class="col-6"><KPICard /></div>
  </div>

  <!-- 全宽重点卡 -->
  <div class="grid-24 mb-5">
    <div class="col-24"><PriorityCard /></div>
  </div>

  <!-- 双栏：主图表 col-16 + 动态流 col-8 -->
  <div class="grid-24 grid-24-lg">
    <div class="col-16"><ChartCard /></div>
    <div class="col-8"><ActivityFeed /></div>
  </div>

</div>

<!-- 详情页（含右侧审批面板）-->
<div class="oms-content">
  <div class="grid-24">
    <div class="col-17">  <!-- 详情主体 -->
      <DetailCard />
    </div>
    <div class="col-7">   <!-- 审批操作面板 -->
      <ApprovalPanel />
    </div>
  </div>
</div>
```

### 禁止事项

| ❌ 禁止 | ✅ 正确 |
|--------|--------|
| `max-width: 1100px; margin: 0 auto` 居中约束 | 全宽布局，内部用 `grid-24` 控制比例 |
| 固定像素宽度的内容区 `width: 800px` | 使用 `col-N` 列数定义宽度 |
| 任意 `width: 45%` 等百分比 | 用 `col-12`（1/2）等语义化列数 |
| 嵌套超过 2 层 grid-24 | 超过 2 层需评审是否有必要 |

---

## 09 导航

_同 v2.2 [06 导航]，补全 HTML 结构与 TypeScript 接口。_

```tsx
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;  // 未读数/待办数
  children?: NavItem[];
}

interface SidebarProps {
  items: NavItem[];
  activeHref: string;
  onNavigate?: (href: string) => void;
}
```

```html
<!-- 导航项 HTML 结构 -->
<nav class="oms-sidebar-nav">
  <!-- 分组标题 -->
  <div class="nav-group-label">WORKSPACE</div>

  <!-- 导航项 -->
  <a class="nav-item nav-item--active" href="/orders">
    <span class="nav-item__accent"></span>  <!-- 2px 左侧指示条 -->
    <span class="nav-item__icon"><!-- icon --></span>
    <span class="nav-item__label">订单管理</span>
    <span class="nav-item__badge">12</span>
  </a>
</nav>
```

```css
.nav-group-label {
  font-size: 10px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--text-disabled);
  padding: 12px 16px 4px;
}
.nav-item {
  display: flex; align-items: center; gap: 8px;
  height: 32px; padding: 0 16px;
  font-size: 13px; color: var(--text-mid);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all var(--duration-normal) var(--ease-out);
}
.nav-item:hover { background: var(--gray-2); color: var(--text-hi); }
.nav-item--active {
  background: var(--amber-2); color: var(--text-hi); font-weight: 500;
  border-left-color: var(--amber-9);
}
.nav-item__badge {
  margin-left: auto; min-width: 18px; height: 18px;
  background: var(--red-solid); color: #fff;
  border-radius: var(--radius-6);
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 5px;
}
```

---

## 10 Alert 警告横幅

**描述：** 非模态的行内反馈，用于表单校验结果、操作结果提示、页面级风险警示。

### Props

```typescript
interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  description?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}
```

### 变体规范

| Variant | 背景 | 边框 | 图标/文字色 |
|---------|------|------|-----------|
| info | `--blue-bg` | `--blue-border` | `--blue-text` |
| success | `--green-bg` | `--green-border` | `--green-text` |
| warning | `--orange-bg` | `--orange-border` | `--orange-text` |
| danger | `--red-bg` | `--red-border` | `--red-text` |

```html
<div class="alert alert--warning" role="alert">
  <span class="alert__icon">⚠</span>
  <div class="alert__content">
    <p class="alert__title">合同即将到期</p>
    <p class="alert__desc">3 个门店的经营合同将在 7 天内到期，请及时续签。</p>
  </div>
  <button class="alert__close" aria-label="关闭">✕</button>
</div>
```

```css
.alert {
  display: flex; align-items: flex-start; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-4); border: 1px solid;
  font-size: 13px; line-height: 1.5;
}
.alert--info    { background: var(--blue-bg);   border-color: var(--blue-border);   color: var(--blue-text); }
.alert--success { background: var(--green-bg);  border-color: var(--green-border);  color: var(--green-text); }
.alert--warning { background: var(--orange-bg); border-color: var(--orange-border); color: var(--orange-text); }
.alert--danger  { background: var(--red-bg);    border-color: var(--red-border);    color: var(--red-text); }
.alert__title { font-weight: 600; margin-bottom: 2px; }
.alert__close { margin-left: auto; background: none; border: none; cursor: pointer; opacity: .6; }
.alert__close:hover { opacity: 1; }
```

---

## 11 Avatar 头像

### Props

```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';  // 20 | 28 | 36 | 48
  fallback?: string;                   // 姓名首字母
  shape?: 'circle' | 'square';        // 默认 circle
}
```

### 尺寸规范

| Size | 像素 | 字号（fallback） |
|------|------|-----------------|
| xs | 20px | 8px |
| sm | 28px | 11px |
| **md（默认）** | 36px | 14px |
| lg | 48px | 18px |

```css
.avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-6);
  background: var(--gray-4); color: var(--text-mid);
  font-weight: 600; overflow: hidden; flex-shrink: 0;
  user-select: none;
}
.avatar--xs { width: 20px; height: 20px; font-size: 8px; }
.avatar--sm { width: 28px; height: 28px; font-size: 11px; }
.avatar--md { width: 36px; height: 36px; font-size: 14px; }
.avatar--lg { width: 48px; height: 48px; font-size: 18px; }
.avatar--square { border-radius: var(--radius-3); }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
```

---

## 12 Badge 徽章

### Props

```typescript
interface BadgeProps {
  variant: 'kyc' | 'kyb' | 'store' | 'urgent' | 'normal' | 'low' | 'brand' | 'custom';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  dot?: boolean;  // 仅圆点，无文字
}
```

### 变体速查

```css
/* 通用 badge 基础 */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: var(--radius-2);
  font-size: 11px; font-weight: 500; line-height: 1.6;
  white-space: nowrap; border: 1px solid;
}
/* 具体变体 */
.badge--kyc    { background: #ecfcfd; border-color: #b8ecf5; color: #107ea0; }
.badge--kyb    { background: var(--blue-bg); border-color: var(--blue-border); color: var(--blue-text); }
.badge--store  { background: var(--purple-bg); border-color: var(--purple-border); color: var(--purple-text); }
.badge--urgent { background: var(--red-bg); border-color: var(--red-border); color: var(--red-text); }
.badge--normal { background: var(--gray-2); border-color: var(--gray-6); color: var(--text-mid); }
.badge--low    { background: var(--amber-2); border-color: var(--amber-3); color: var(--amber-11); }
.badge--brand  { background: var(--amber-9); border-color: transparent; color: var(--amber-12); font-weight: 700; }
```

**扩展规则：** 新增 `b-*` 变体须满足 `step-2 bg + step-3 border + step-11 text`，并在团队设计附录中登记。

---

## 13 Breadcrumb 面包屑

### Props

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;  // 无 href 则为当前页（不可点击）
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;  // 默认 "/"
}
```

```html
<nav aria-label="面包屑导航">
  <ol class="breadcrumb">
    <li><a href="/orders">订单管理</a></li>
    <li aria-hidden="true" class="breadcrumb__sep">/</li>
    <li><a href="/orders/refund">退款工单</a></li>
    <li aria-hidden="true" class="breadcrumb__sep">/</li>
    <li aria-current="page">ORD-20240601-001</li>
  </ol>
</nav>
```

```css
.breadcrumb {
  display: flex; align-items: center; gap: 6px;
  list-style: none; padding: 0; margin: 0;
  font-size: 12px; color: var(--text-low);
}
.breadcrumb a { color: var(--text-low); text-decoration: none; }
.breadcrumb a:hover { color: var(--text-hi); }
.breadcrumb li:last-child { color: var(--text-mid); }
.breadcrumb__sep { color: var(--text-disabled); }
```

---

## 14 Button 按钮

### Props

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'positive' | 'danger' | 'ghost' | 'brand';
  size?: 'sm' | 'md' | 'lg';  // 默认 md
  disabled?: boolean;
  loading?: boolean;           // 显示 spinner，自动 disabled
  icon?: React.ReactNode;      // 左侧图标
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}
```

### 尺寸规范

| Size | 高度 | 内边距 | 字号 |
|------|------|--------|------|
| sm | 30px | 6px 12px | 12px |
| **md（默认）** | 38px | 9px 16px | 13.5px |
| lg | 44px | 11px 22px | 14.5px |

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: none; cursor: pointer;
  font-family: var(--font-sans); font-weight: 500;
  border-radius: var(--radius-3);
  transition: all var(--duration-normal) var(--ease-out);
  white-space: nowrap; user-select: none;
}
.btn:disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }
.btn--sm { height: 30px; padding: 6px 12px; font-size: 12px; }
.btn--md { height: 38px; padding: 9px 16px; font-size: 13.5px; }
.btn--lg { height: 44px; padding: 11px 22px; font-size: 14.5px; }

.btn--primary   { background: var(--gray-12); color: #fff; }
.btn--primary:hover { background: var(--gray-11); }

.btn--secondary { background: var(--surface); color: var(--text-hi); border: 1px solid var(--gray-7); }
.btn--secondary:hover { background: var(--gray-2); border-color: var(--gray-8); }

.btn--positive  { background: var(--green-solid); color: #fff; }
.btn--positive:hover { filter: brightness(.92); }

.btn--danger    { background: var(--red-solid); color: #fff; }
.btn--danger:hover { filter: brightness(.92); }

.btn--ghost     { background: transparent; color: var(--blue-text); }
.btn--ghost:hover { background: var(--blue-bg); }

.btn--brand     { background: var(--amber-9); color: var(--amber-12); font-weight: 700; }
.btn--brand:hover { background: var(--amber-10); }

.btn--full { width: 100%; }

/* Loading spinner */
.btn--loading .btn__spinner {
  width: 14px; height: 14px;
  border: 2px solid currentColor; border-top-color: transparent;
  border-radius: 50%; animation: spin .6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

---

## 15 Calendar / DatePicker 日期选择

### Props

```typescript
interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: string;   // 默认 'DD/MM/YYYY'
  clearable?: boolean;
}

interface DateRangePickerProps {
  value?: [Date | null, Date | null];
  onChange: (range: [Date | null, Date | null]) => void;
  placeholder?: [string, string];
}
```

**实现建议：** 使用 `react-day-picker` + shadcn/ui Calendar 组件。样式继承 Input 基础态，弹出层使用 `--z-dropdown`，日历面板 `--shadow-4`，选中日期用 `--gray-12` 背景。

```css
/* Calendar 弹出面板 */
.calendar-panel {
  position: absolute; z-index: var(--z-dropdown);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-4); box-shadow: var(--shadow-4);
  padding: var(--space-4);
}
/* 选中日期 */
.calendar-day--selected {
  background: var(--gray-12); color: #fff; border-radius: var(--radius-2);
}
/* 范围内日期 */
.calendar-day--in-range {
  background: var(--gray-3); color: var(--text-hi);
}
/* 今天 */
.calendar-day--today {
  border: 1px solid var(--gray-9); border-radius: var(--radius-2);
}
```

---

## 16 Card 卡片

### Props

```typescript
interface CardProps {
  padding?: 'sm' | 'md' | 'lg';  // 16 | 24 | 32
  shadow?: 'none' | 'sm' | 'md'; // 对应 shadow-1 / shadow-2 / shadow-3
  radius?: 'md' | 'lg';           // 对应 radius-4 / radius-5（仪表板主卡）
  bordered?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}
```

```css
.card {
  background: var(--surface);
  border-radius: var(--radius-4);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-2);
  overflow: hidden;
}
.card--dashboard { border-radius: var(--radius-5); } /* 仪表板全宽主角卡 */
.card--no-border { border: none; }
.card__header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--gray-3);
  font-size: 14px; font-weight: 600; color: var(--text-hi);
}
.card__body { padding: var(--space-5); }
.card__footer {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--gray-3);
  background: var(--gray-2);
}
```

---

## 17 Checkbox 复选框

### Props

```typescript
interface CheckboxProps {
  checked: boolean | 'indeterminate';
  onChange: (checked: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}
```

```html
<label class="checkbox-label">
  <span class="checkbox" aria-checked="true" role="checkbox" tabindex="0">
    <span class="checkbox__check">✓</span>
  </span>
  <span class="checkbox-label__text">
    <span class="checkbox-label__main">同意服务条款</span>
    <span class="checkbox-label__hint">包含《隐私政策》</span>
  </span>
</label>
```

```css
.checkbox {
  width: 16px; height: 16px; border-radius: var(--radius-1);
  border: 1.5px solid var(--gray-7); background: var(--surface);
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  transition: all var(--duration-normal) var(--ease-out);
}
.checkbox:hover { border-color: var(--gray-12); }
.checkbox[aria-checked="true"] {
  background: var(--gray-12); border-color: var(--gray-12);
  color: #fff;
}
.checkbox[aria-checked="mixed"] {
  background: var(--gray-12); border-color: var(--gray-12); color: #fff;
}
.checkbox:focus-visible {
  outline: none; box-shadow: 0 0 0 2px var(--gray-4);
}
.checkbox--disabled { opacity: .45; cursor: not-allowed; }
.checkbox-label {
  display: flex; align-items: flex-start; gap: var(--space-2); cursor: pointer;
}
.checkbox-label__main { font-size: 14px; color: var(--text-hi); }
.checkbox-label__hint { font-size: 12px; color: var(--text-low); }
```

---

## 18 Combobox 组合搜索框

可搜索的下拉选择框，用于数据量大（>20 条）的选项列表。

### Props

```typescript
interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;   // 无搜索结果提示
  disabled?: boolean;
  width?: string | number;
}
```

```html
<div class="combobox" role="combobox" aria-haspopup="listbox">
  <button class="combobox__trigger input">
    <span>选择门店…</span>
    <span class="combobox__chevron">▾</span>
  </button>
  <div class="combobox__panel">
    <input class="combobox__search" placeholder="搜索门店名称…" />
    <ul class="combobox__list" role="listbox">
      <li class="combobox__item" role="option">北京朝阳旗舰店</li>
      <li class="combobox__item combobox__item--selected" role="option">
        上海浦东门店 <span class="combobox__check">✓</span>
      </li>
    </ul>
    <div class="combobox__empty">未找到匹配结果</div>
  </div>
</div>
```

```css
.combobox { position: relative; display: inline-block; }
.combobox__trigger {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  cursor: pointer; text-align: left;
}
.combobox__panel {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  z-index: var(--z-dropdown);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-4); box-shadow: var(--shadow-4);
  overflow: hidden;
}
.combobox__search {
  width: 100%; height: 36px; border: none; border-bottom: 1px solid var(--border);
  padding: 0 12px; font-size: 13px;
  outline: none; background: var(--gray-2);
}
.combobox__list { max-height: 240px; overflow-y: auto; padding: 4px 0; }
.combobox__item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; font-size: 13px; cursor: pointer; color: var(--text-mid);
}
.combobox__item:hover { background: var(--gray-2); color: var(--text-hi); }
.combobox__item--selected { color: var(--text-hi); font-weight: 500; }
.combobox__empty { padding: 16px 12px; font-size: 13px; color: var(--text-low); text-align: center; }
```

---

## 19 Data Table 数据表格

_同 v2.2 [08 数据表格]，补全 TypeScript 接口与完整 CSS。_

### Props

```typescript
interface Column<T> {
  key: keyof T | string;
  title: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  fixed?: 'left' | 'right';  // 固定列
}

interface TableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  loading?: boolean;
  empty?: React.ReactNode;       // 自定义空状态
  pagination?: PaginationProps;
  onRowClick?: (row: T) => void;
  selectedRows?: (string | number)[];
  onSelect?: (keys: (string | number)[]) => void;
  stickyHeader?: boolean;
}
```

```css
.table-container {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-4); overflow: hidden; box-shadow: var(--shadow-2);
}
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table thead tr { background: var(--gray-2); }
.table th {
  text-align: left; padding: 10px 14px;
  font-size: 10.5px; font-weight: 600;
  text-transform: uppercase; letter-spacing: .06em;
  color: var(--text-low);
  border-bottom: 1px solid var(--border);
  user-select: none;
}
.table th--sortable { cursor: pointer; }
.table th--sortable:hover { color: var(--text-hi); }
.table td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--gray-3);
  color: var(--text-mid); vertical-align: middle;
}
.table tbody tr:last-child td { border-bottom: none; }
.table tbody tr:hover td { background: var(--gray-2); }
.table tbody tr--selected td { background: var(--amber-2); }

/* 筛选条 */
.table-toolbar {
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border);
}
.table-toolbar__search { flex: 1; max-width: 360px; }
.table-toolbar__count { font-size: 12px; color: var(--text-low); margin-left: auto; }
```

---

## 20 Dialog / Modal 对话框

### Props

```typescript
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';  // 400 | 560 | 720 | 960px
  closable?: boolean;                  // 默认 true，显示 ✕ 按钮
  footer?: React.ReactNode;            // 默认：Cancel + Confirm
  children: React.ReactNode;
}
```

### 尺寸

| Size | 最大宽度 |
|------|---------|
| sm | 400px |
| **md（默认）** | 560px |
| lg | 720px |
| xl | 960px |

```css
/* 遮罩层 */
.dialog-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.4);
  z-index: var(--z-overlay);
  display: flex; align-items: center; justify-content: center;
  padding: var(--space-5);
}
/* 内容容器 */
.dialog {
  background: var(--surface);
  border-radius: var(--radius-5);
  box-shadow: var(--shadow-6);
  z-index: var(--z-modal);
  width: 100%; max-height: calc(100vh - 64px);
  display: flex; flex-direction: column;
  overflow: hidden;
  animation: fade-in var(--duration-enter) var(--ease-out);
}
.dialog--sm { max-width: 400px; }
.dialog--md { max-width: 560px; }
.dialog--lg { max-width: 720px; }
.dialog--xl { max-width: 960px; }

.dialog__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-5); border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.dialog__title { font-size: 16px; font-weight: 600; color: var(--text-hi); }
.dialog__desc  { font-size: 13px; color: var(--text-low); margin-top: 4px; }
.dialog__close {
  width: 28px; height: 28px; border-radius: var(--radius-3);
  border: none; background: none; cursor: pointer;
  color: var(--text-low); font-size: 16px;
}
.dialog__close:hover { background: var(--gray-3); color: var(--text-hi); }
.dialog__body { padding: var(--space-5); overflow-y: auto; flex: 1; }
.dialog__footer {
  display: flex; justify-content: flex-end; gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border);
  background: var(--gray-2); flex-shrink: 0;
}
```

**规则：** 危险操作（删除/退款/作废）必须使用 Dialog 二次确认；Footer 中危险按钮用 `btn--danger`，取消用 `btn--secondary`；**禁止** Footer 同时出现两个 `btn--primary`。

---

## 21 Drawer / Sheet 抽屉

用于上下文操作（批量编辑、详情侧拉、多步骤表单）。

### Props

```typescript
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: 'right' | 'left' | 'bottom';  // 默认 right
  size?: 'sm' | 'md' | 'lg';            // 320 | 480 | 640px
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

```css
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.4);
  z-index: var(--z-overlay);
}
.drawer {
  position: fixed; top: 0; bottom: 0; right: 0;
  background: var(--surface); box-shadow: var(--shadow-6);
  z-index: var(--z-modal);
  display: flex; flex-direction: column;
  animation: slide-in-right var(--duration-enter) var(--ease-out);
}
.drawer--sm { width: 320px; }
.drawer--md { width: 480px; }
.drawer--lg { width: 640px; }
.drawer__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border); flex-shrink: 0;
}
.drawer__body { flex: 1; overflow-y: auto; padding: var(--space-5); }
.drawer__footer {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border);
  background: var(--gray-2); flex-shrink: 0;
  display: flex; justify-content: flex-end; gap: var(--space-2);
}
```

---

## 22 Dropdown Menu 下拉菜单

### Props

```typescript
interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  divider?: boolean;  // 在此项上方加分割线
}
interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';  // 对齐方向
}
```

```css
.dropdown { position: relative; display: inline-block; }
.dropdown__panel {
  position: absolute; top: calc(100% + 4px); right: 0;
  min-width: 180px; z-index: var(--z-dropdown);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-4); box-shadow: var(--shadow-4);
  padding: 4px 0; overflow: hidden;
}
.dropdown__item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; font-size: 13px; cursor: pointer;
  color: var(--text-mid); transition: background var(--duration-fast);
}
.dropdown__item:hover { background: var(--gray-2); color: var(--text-hi); }
.dropdown__item--danger { color: var(--red-text); }
.dropdown__item--danger:hover { background: var(--red-bg); }
.dropdown__item--disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }
.dropdown__divider { border-top: 1px solid var(--border); margin: 4px 0; }
```

---

## 23 Empty State 空状态

所有页面必须处理三种状态：**Loading（骨架屏）**、**Empty（无数据）**、**Error（请求失败）**。

### Loading — 使用 Skeleton（见 [34 Skeleton](#34-skeleton-骨架屏)）

### Empty State

```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
}
```

```html
<!-- 表格空状态 -->
<div class="empty-state">
  <div class="empty-state__icon">📋</div>
  <h3 class="empty-state__title">暂无待审批工单</h3>
  <p class="empty-state__desc">当前队列为空，有新工单时将在此显示</p>
  <button class="btn btn--secondary">刷新列表</button>
</div>
```

```css
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: var(--space-9) var(--space-5);
  text-align: center;
}
.empty-state__icon { font-size: 40px; margin-bottom: var(--space-4); opacity: .4; }
.empty-state__title { font-size: 15px; font-weight: 600; color: var(--text-hi); margin-bottom: 6px; }
.empty-state__desc { font-size: 13px; color: var(--text-low); margin-bottom: var(--space-4); max-width: 320px; }
```

### Error State

```html
<div class="error-state">
  <div class="error-state__icon">⚠</div>
  <h3 class="error-state__title">加载失败</h3>
  <p class="error-state__desc">{{ errorMessage }}</p>
  <button class="btn btn--secondary" onclick="retry()">重试</button>
</div>
```

```css
.error-state {
  /* 同 empty-state 结构 */
}
.error-state__icon { color: var(--red-solid); font-size: 32px; margin-bottom: var(--space-3); }
.error-state__title { color: var(--red-text); font-weight: 600; font-size: 15px; }
.error-state__desc  { color: var(--text-low); font-size: 13px; margin: 6px 0 var(--space-4); }
```

---

## 24 Form 表单

### Props

```typescript
interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;  // Input / Select / Checkbox 等
}

interface FormSectionProps {
  title: string;
  description?: string;
  columns?: 1 | 2;  // 默认 2 列
  children: React.ReactNode;
}
```

```html
<form class="form">
  <div class="form-section">
    <div class="form-section__header">
      <h3 class="form-section__title">基本信息</h3>
      <p class="form-section__desc">填写门店的基本档案信息</p>
    </div>
    <div class="form-section__grid form-section__grid--2">
      <div class="form-field">
        <label class="form-field__label">
          门店名称 <span class="form-field__required">*</span>
        </label>
        <input class="input" placeholder="例：北京朝阳旗舰店" required />
        <span class="form-field__hint">2–50 个字符</span>
      </div>
      <div class="form-field form-field--error">
        <label class="form-field__label">
          联系电话 <span class="form-field__required">*</span>
        </label>
        <input class="input input--error" value="123" />
        <span class="form-field__error">请输入有效的手机号码</span>
      </div>
    </div>
  </div>
</form>
```

```css
.form-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-4);
  padding: var(--space-5); margin-bottom: var(--space-4);
}
.form-section__title { font-size: 14px; font-weight: 600; color: var(--text-hi); }
.form-section__desc  { font-size: 12px; color: var(--text-low); margin-top: 3px; margin-bottom: var(--space-4); }
.form-section__grid  { display: grid; gap: var(--space-4); }
.form-section__grid--1 { grid-template-columns: 1fr; }
.form-section__grid--2 { grid-template-columns: 1fr 1fr; }

.form-field { display: flex; flex-direction: column; gap: 5px; }
.form-field__label { font-size: 12px; font-weight: 500; color: var(--text-mid); }
.form-field__required { color: var(--red-solid); margin-left: 2px; }
.form-field__hint  { font-size: 11.5px; color: var(--text-low); }
.form-field__error { font-size: 11.5px; color: var(--red-text); }

/* 表单底部操作区 */
.form-actions {
  display: flex; justify-content: flex-end; gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  background: var(--gray-2);
  border-top: 1px solid var(--border);
  border-radius: 0 0 var(--radius-4) var(--radius-4);
}
```

---

## 25 Input 输入框

### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: 'default' | 'focused' | 'error' | 'readonly' | 'disabled';
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;   // 左侧图标或文字
  suffix?: React.ReactNode;   // 右侧图标或文字
  clearable?: boolean;
}
```

### 状态规范

| 状态 | Border | Background | Focus ring |
|------|--------|-----------|------------|
| Default | `1px solid var(--gray-7)` | `var(--surface)` | — |
| Hover | `1px solid var(--gray-8)` | `var(--surface)` | — |
| Focus | `1px solid var(--gray-12)` | `var(--surface)` | `0 0 0 2px var(--gray-4)` |
| Error | `1px solid var(--red-solid)` | `var(--surface)` | `0 0 0 2px var(--red-border)` |
| Read-only | `1px solid var(--gray-6)` | `var(--gray-2)` | — |
| Disabled | `1px solid var(--gray-5)` | `var(--gray-3)` | — |

```css
.input {
  width: 100%; height: 36px;
  border: 1px solid var(--gray-7); border-radius: var(--radius-3);
  padding: 0 11px; font-size: 13.5px; color: var(--text-hi);
  background: var(--surface); font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--duration-normal) var(--ease-out),
              box-shadow   var(--duration-normal) var(--ease-out);
}
.input::placeholder { color: var(--text-disabled); }
.input:hover:not(:disabled):not([readonly]) { border-color: var(--gray-8); }
.input:focus {
  border-color: var(--gray-12);
  box-shadow: 0 0 0 2px var(--gray-4);
}
.input--error { border-color: var(--red-solid) !important; }
.input--error:focus { box-shadow: 0 0 0 2px var(--red-border); }
.input[readonly] { background: var(--gray-2); color: var(--text-mid); }
.input:disabled { background: var(--gray-3); color: var(--text-disabled); cursor: not-allowed; }

/* 带前缀/后缀的输入框 */
.input-wrapper {
  position: relative; display: flex; align-items: center;
}
.input-wrapper .input { padding-left: 36px; }
.input-wrapper__prefix {
  position: absolute; left: 11px; color: var(--text-low);
  pointer-events: none; font-size: 14px;
}
.input-wrapper__suffix {
  position: absolute; right: 11px; color: var(--text-low);
}
```

---

## 26 KPI Card 指标卡

_同 v2.2 [07 KPI 卡片]，补全 Props 与 CSS。_

### Props

```typescript
interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  trend?: {
    value: number;    // 正数 = 上升，负数 = 下降
    label?: string;   // 如「较昨日」
    good?: 'up' | 'down';  // 业务上升降哪个是正向
  };
  href?: string;  // 点击跳转
}
```

### 图标背景色对应

| iconColor | 背景 |
|-----------|------|
| blue | `var(--blue-bg)` |
| green | `var(--green-bg)` |
| amber | `var(--amber-2)` |
| red | `var(--red-bg)` |
| purple | `var(--purple-bg)` |

```css
.kpi-card {
  background: var(--surface); border-radius: var(--radius-4);
  border: 1px solid var(--border); box-shadow: var(--shadow-2);
  padding: var(--space-5); display: flex; flex-direction: column; gap: 10px;
}
.kpi-card__icon {
  width: 36px; height: 36px; border-radius: var(--radius-3);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.kpi-card__value { font-size: 26px; font-weight: 700; letter-spacing: -.02em; color: var(--text-hi); }
.kpi-card__title { font-size: 12.5px; color: var(--text-mid); }
.kpi-card__subtitle { font-size: 11px; color: var(--text-low); }
.kpi-card__trend { font-size: 11px; display: flex; align-items: center; gap: 3px; }
.kpi-card__trend--up   { color: var(--green-text); }
.kpi-card__trend--down { color: var(--red-text); }
```

---

## 27 Label 标签

```typescript
interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;  // 显示（可选）提示
  children: React.ReactNode;
}
```

```css
.label {
  display: inline-block;
  font-size: 12px; font-weight: 500;
  color: var(--text-mid); margin-bottom: 5px;
}
.label__required { color: var(--red-solid); margin-left: 2px; }
.label__optional { color: var(--text-disabled); font-weight: 400; margin-left: 4px; font-size: 11px; }
```

---

## 28 Pagination 分页

### Props

```typescript
interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;   // 默认 true
  pageSizeOptions?: number[];  // 默认 [10, 20, 50, 100]
  showTotal?: boolean;         // 显示「共 N 条」
  simple?: boolean;            // 简洁模式：仅「< 1/5 >」
}
```

```html
<nav class="pagination" aria-label="分页">
  <span class="pagination__total">共 243 条</span>
  <button class="pagination__btn" disabled aria-label="上一页">‹</button>
  <button class="pagination__page pagination__page--active">1</button>
  <button class="pagination__page">2</button>
  <button class="pagination__page">3</button>
  <span class="pagination__ellipsis">…</span>
  <button class="pagination__page">24</button>
  <button class="pagination__btn" aria-label="下一页">›</button>
  <select class="pagination__size-select">
    <option>10 / 页</option>
    <option>20 / 页</option>
    <option>50 / 页</option>
  </select>
</nav>
```

```css
.pagination {
  display: flex; align-items: center; gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  font-size: 13px;
}
.pagination__total { color: var(--text-low); margin-right: var(--space-3); }
.pagination__btn, .pagination__page {
  min-width: 32px; height: 32px; padding: 0 8px;
  border: 1px solid var(--border); border-radius: var(--radius-3);
  background: var(--surface); color: var(--text-mid);
  cursor: pointer; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
}
.pagination__btn:hover:not(:disabled),
.pagination__page:hover {
  border-color: var(--gray-8); color: var(--text-hi);
}
.pagination__page--active {
  background: var(--gray-12); color: #fff;
  border-color: var(--gray-12); font-weight: 600;
}
.pagination__btn:disabled { opacity: .35; cursor: not-allowed; }
.pagination__ellipsis { color: var(--text-low); padding: 0 4px; }
.pagination__size-select {
  height: 32px; border: 1px solid var(--border); border-radius: var(--radius-3);
  padding: 0 24px 0 10px; font-size: 13px; color: var(--text-mid);
  background: var(--surface); cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat; background-position: right 8px center;
  margin-left: var(--space-2);
}
```

---

## 29 Popover 浮层

轻量信息气泡，不可交互内容；可交互内容用 [22 Dropdown Menu](#22-dropdown-menu-下拉菜单) 或 [Tooltip](#42-tooltip-工具提示)。

```typescript
interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  width?: number | string;
}
```

```css
.popover {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-4); box-shadow: var(--shadow-4);
  padding: var(--space-4); font-size: 13px;
  z-index: var(--z-popover); max-width: 320px;
}
```

---

## 30 Progress 进度条

```typescript
interface ProgressProps {
  value: number;         // 0–100
  max?: number;          // 默认 100
  size?: 'sm' | 'md';   // 高度 3 | 6px
  color?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;    // 条纹动画（加载中）
}
```

```css
.progress {
  width: 100%; background: var(--gray-4);
  border-radius: var(--radius-6); overflow: hidden;
}
.progress--sm { height: 3px; }
.progress--md { height: 6px; }
.progress__fill {
  height: 100%; background: var(--gray-12);
  border-radius: var(--radius-6);
  transition: width var(--duration-slow) var(--ease-out);
}
.progress__fill--success { background: var(--green-solid); }
.progress__fill--warning { background: var(--orange-solid); }
.progress__fill--danger  { background: var(--red-solid); }
.progress__fill--amber   { background: var(--amber-9); }
```

---

## 31 Radio Group 单选组

```typescript
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';  // 默认 vertical
  variant?: 'default' | 'card';  // card 变体：带边框的卡片选项
}
```

```css
.radio-group { display: flex; gap: var(--space-3); }
.radio-group--vertical { flex-direction: column; }
.radio-label {
  display: flex; align-items: flex-start; gap: var(--space-2); cursor: pointer;
}
.radio {
  width: 16px; height: 16px; border-radius: 50%;
  border: 1.5px solid var(--gray-7); background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all var(--duration-normal) var(--ease-out);
}
.radio:hover { border-color: var(--gray-12); }
.radio--checked {
  border-color: var(--gray-12); background: var(--gray-12);
}
.radio--checked::after {
  content: ''; width: 6px; height: 6px; border-radius: 50%; background: #fff;
}
/* Card 变体 */
.radio-card {
  border: 1.5px solid var(--border); border-radius: var(--radius-4);
  padding: var(--space-4); cursor: pointer;
  transition: border-color var(--duration-normal) var(--ease-out);
}
.radio-card:hover { border-color: var(--gray-8); }
.radio-card--selected {
  border-color: var(--gray-12); background: var(--gray-2);
}
```

---

## 32 Select 下拉选择

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;  // 分组名
}
interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  clearable?: boolean;
  width?: string | number;
}
```

```css
/* 触发器样式（复用 .input） */
.select-trigger {
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; appearance: none;
  /* 继承 .input 所有样式 */
}
.select-trigger__chevron {
  color: var(--text-disabled); font-size: 12px; flex-shrink: 0;
  transition: transform var(--duration-normal) var(--ease-out);
}
.select-trigger--open .select-trigger__chevron { transform: rotate(180deg); }

/* 选项面板 */
.select-panel {
  position: absolute; z-index: var(--z-dropdown);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-4); box-shadow: var(--shadow-4);
  max-height: 240px; overflow-y: auto; padding: 4px 0;
}
.select-option {
  padding: 8px 12px; font-size: 13px; cursor: pointer; color: var(--text-mid);
  transition: background var(--duration-fast);
}
.select-option:hover { background: var(--gray-2); color: var(--text-hi); }
.select-option--selected { color: var(--text-hi); font-weight: 500; }
.select-option--disabled { opacity: .45; cursor: not-allowed; }
.select-group-label {
  padding: 6px 12px 2px;
  font-size: 10.5px; font-weight: 600; letter-spacing: .06em;
  text-transform: uppercase; color: var(--text-disabled);
}
```

---

## 33 Separator 分隔线

```typescript
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';  // 上下 margin 8 | 16 | 24px
  label?: string;  // 居中标签
}
```

```css
.separator {
  border: none; border-top: 1px solid var(--border);
  margin: var(--space-4) 0;
}
.separator--sm { margin: var(--space-2) 0; }
.separator--lg { margin: var(--space-5) 0; }
.separator--vertical {
  border-top: none; border-left: 1px solid var(--border);
  height: 100%; margin: 0 var(--space-3);
}
/* 带标签的分隔线 */
.separator--labeled {
  display: flex; align-items: center; gap: var(--space-3);
  border: none; color: var(--text-disabled); font-size: 11px;
}
.separator--labeled::before,
.separator--labeled::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}
```

---

## 34 Skeleton 骨架屏

所有异步数据区域在加载期间必须显示骨架屏，**禁止**裸白块或旋转 spinner 代替整个区域。

```typescript
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'line' | 'circle' | 'rect';
  lines?: number;     // variant=line 时的行数
  className?: string;
}
```

```css
/* 基础骨架动画 */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--gray-3) 25%, var(--gray-2) 50%, var(--gray-3) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: var(--radius-2);
}
.skeleton--line  { height: 14px; border-radius: var(--radius-6); }
.skeleton--circle{ border-radius: 50%; }
.skeleton--rect  { border-radius: var(--radius-4); }

/* 表格行骨架 */
.skeleton-row {
  display: flex; gap: var(--space-4); padding: 12px 14px;
  border-bottom: 1px solid var(--gray-3);
}

/* KPI 卡片骨架 */
.skeleton-kpi {
  padding: var(--space-5);
  background: var(--surface); border-radius: var(--radius-4);
  border: 1px solid var(--border);
}
```

---

## 35 Status Indicator 状态指示器

_同 v2.2 [09 徽章与状态]，补全 CSS 变量版本。_

**规则：** 状态始终使用「6px 圆点 + 文字」，**禁止**仅凭颜色传达状态。

```typescript
interface StatusProps {
  status: 'pending-l1' | 'pending-l2' | 'approved' | 'rejected' | 'returned'
        | 'pending' | 'in-progress' | 'completed' | 'cancelled' | string;
  label?: string;  // 自定义文字
}

// 扩展语义映射（支持全站任意模块）
const STATUS_MAP = {
  'approved':    { dot: 'var(--green-solid)',  text: 'var(--green-text)' },
  'rejected':    { dot: 'var(--red-solid)',    text: 'var(--red-text)' },
  'pending-l1':  { dot: 'var(--orange-solid)', text: 'var(--orange-text)' },
  'pending-l2':  { dot: 'var(--blue-solid)',   text: 'var(--blue-text)' },
  'returned':    { dot: 'var(--purple-solid)', text: 'var(--purple-text)' },
  'cancelled':   { dot: 'var(--gray-8)',       text: 'var(--text-low)' },
};
```

```css
.status { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; }
.status__dot {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}
```

---

## 36 Switch / Toggle 开关

```typescript
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md';  // 默认 md
}
```

```css
.switch {
  display: inline-flex; align-items: center; cursor: pointer;
}
.switch__track {
  width: 36px; height: 20px; border-radius: var(--radius-6);
  background: var(--gray-6); position: relative;
  transition: background var(--duration-normal) var(--ease-out);
}
.switch__track--checked { background: var(--gray-12); }
.switch__thumb {
  width: 16px; height: 16px; border-radius: 50%; background: #fff;
  position: absolute; top: 2px; left: 2px;
  box-shadow: var(--shadow-2);
  transition: transform var(--duration-normal) var(--ease-spring);
}
.switch__track--checked .switch__thumb { transform: translateX(16px); }
.switch--sm .switch__track { width: 28px; height: 16px; }
.switch--sm .switch__thumb { width: 12px; height: 12px; }
.switch--sm .switch__track--checked .switch__thumb { transform: translateX(12px); }
.switch:focus-visible .switch__track {
  outline: none; box-shadow: 0 0 0 2px var(--gray-4);
}
.switch--disabled { opacity: .45; cursor: not-allowed; }
```

---

## 37 Table 表格

> 完整规范见 [19 Data Table](#19-data-table-数据表格)，本节补充**固定表头、固定列、虚拟滚动**用法。

```css
/* 固定表头 */
.table-container--sticky-header {
  max-height: calc(100vh - 220px); overflow-y: auto;
}
.table-container--sticky-header .table thead th {
  position: sticky; top: 0; z-index: var(--z-raised);
  background: var(--gray-2);
}

/* 固定列 */
.table td.col-fixed-left,
.table th.col-fixed-left {
  position: sticky; left: 0; z-index: var(--z-raised);
  background: inherit;
}
.table td.col-fixed-right,
.table th.col-fixed-right {
  position: sticky; right: 0; z-index: var(--z-raised);
  background: inherit;
}
```

---

## 38 Tabs 标签页

```typescript
interface Tab {
  key: string;
  label: string;
  badge?: number;
  disabled?: boolean;
  content: React.ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: 'underline' | 'card';  // 默认 underline
}
```

```css
/* Underline 变体（默认） */
.tabs { display: flex; flex-direction: column; }
.tabs__list {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.tabs__tab {
  padding: 10px 16px; font-size: 13px; cursor: pointer;
  color: var(--text-mid); white-space: nowrap;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: all var(--duration-normal) var(--ease-out);
}
.tabs__tab:hover { color: var(--text-hi); }
.tabs__tab--active {
  color: var(--text-hi); font-weight: 500;
  border-bottom-color: var(--gray-12);
}
.tabs__tab--disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }
.tabs__badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; padding: 0 5px;
  background: var(--red-solid); color: #fff;
  border-radius: var(--radius-6); font-size: 10px; font-weight: 700;
  margin-left: 5px;
}
.tabs__content { padding-top: var(--space-4); }

/* Card 变体 */
.tabs--card .tabs__list {
  gap: 4px; border-bottom: none; background: var(--gray-3);
  border-radius: var(--radius-4); padding: 3px;
}
.tabs--card .tabs__tab {
  border-radius: var(--radius-3); border-bottom: none; margin-bottom: 0;
}
.tabs--card .tabs__tab--active {
  background: var(--surface); box-shadow: var(--shadow-1);
}
```

---

## 39 Textarea 多行输入

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;  // 显示字数
  minRows?: number;
  maxRows?: number;
}
```

```css
.textarea {
  /* 继承 .input 所有状态样式 */
  height: auto; min-height: 80px; padding: 9px 11px;
  resize: vertical; line-height: 1.5;
}
.textarea-count {
  text-align: right; font-size: 11px; color: var(--text-disabled);
  margin-top: 3px;
}
.textarea-count--warning { color: var(--orange-text); }
.textarea-count--overflow { color: var(--red-text); }
```

---

## 40 Timeline 时间线

_同 v2.2 [14 活动时间线]，补全 Props 与完整 CSS。_

```typescript
interface TimelineEvent {
  id: string;
  title: string;
  actor?: string;
  actorRole?: string;
  description?: string;
  timestamp: string | Date;
  ip?: string;
  status: 'done' | 'pending' | 'skipped';
  icon?: React.ReactNode;
}
interface TimelineProps {
  events: TimelineEvent[];
  showConnector?: boolean;  // 默认 true
}
```

```css
.timeline { padding: var(--space-4); }
.timeline__item {
  display: flex; gap: 12px; margin-bottom: var(--space-4); position: relative;
}
/* 连接线 */
.timeline__item:not(:last-child)::before {
  content: ''; position: absolute; left: 12px; top: 28px; bottom: -4px;
  width: 1px; background: var(--border);
}
.timeline__dot {
  width: 25px; height: 25px; border-radius: 50%;
  border: 1.5px solid var(--border); background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: var(--text-low);
  flex-shrink: 0; z-index: 1;
}
.timeline__dot--done    { background: var(--green-bg);   border-color: var(--green-solid);  color: var(--green-text); }
.timeline__dot--pending { background: var(--amber-2);    border-color: var(--amber-7);      color: var(--amber-11); }
.timeline__dot--skipped { background: var(--gray-3);     border-color: var(--gray-6);       color: var(--text-disabled); }

.timeline__content { flex: 1; }
.timeline__title { font-size: 13px; font-weight: 600; color: var(--text-hi); }
.timeline__title--pending { color: var(--orange-text); }
.timeline__actor { font-size: 12px; color: var(--text-low); margin-top: 2px; }
.timeline__note {
  background: var(--gray-2); border-radius: var(--radius-3);
  padding: 8px 10px; font-size: 12px; color: var(--text-mid);
  margin-top: 6px; border: 1px solid var(--border);
}
.timeline__time {
  font-size: 11px; color: var(--text-disabled); margin-top: 4px;
  font-family: var(--font-mono);
}
```

---

## 41 Toast / Notification 通知

```typescript
interface ToastProps {
  id: string;
  variant: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  description?: string;
  duration?: number;    // ms，默认 4000；0 = 不自动消失
  action?: { label: string; onClick: () => void; };
  onDismiss?: () => void;
}

// 使用方式（推荐 sonner 库）
import { toast } from 'sonner';
toast.success('审批已提交', { description: '工单 AP2024031001 已进入 L1 初审队列' });
toast.error('提交失败', { description: '网络超时，请重试' });
```

```css
/* Toast 容器（固定右下角） */
.toast-viewport {
  position: fixed; bottom: var(--space-5); right: var(--space-5);
  z-index: var(--z-toast); display: flex; flex-direction: column; gap: var(--space-2);
  max-width: 360px; width: 100%;
}
.toast {
  display: flex; align-items: flex-start; gap: 10px;
  padding: var(--space-4); border-radius: var(--radius-4);
  border: 1px solid; box-shadow: var(--shadow-4);
  font-size: 13px; animation: slide-in-right var(--duration-enter) var(--ease-out);
}
.toast--info    { background: var(--blue-bg);   border-color: var(--blue-border); }
.toast--success { background: var(--green-bg);  border-color: var(--green-border); }
.toast--warning { background: var(--orange-bg); border-color: var(--orange-border); }
.toast--danger  { background: var(--red-bg);    border-color: var(--red-border); }
.toast__title { font-weight: 600; color: var(--text-hi); }
.toast__desc  { color: var(--text-mid); margin-top: 3px; font-size: 12px; }
.toast__close {
  margin-left: auto; background: none; border: none; cursor: pointer;
  color: var(--text-disabled); font-size: 14px; flex-shrink: 0;
}
.toast__action {
  font-size: 12px; font-weight: 600; color: var(--blue-text);
  background: none; border: none; cursor: pointer; padding: 0; margin-top: 6px;
}
```

---

## 42 Tooltip 工具提示

```typescript
interface TooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayMs?: number;  // 默认 300ms
  children: React.ReactNode;
}
```

```css
.tooltip {
  background: var(--gray-12); color: #fff;
  padding: 5px 10px; border-radius: var(--radius-2);
  font-size: 12px; line-height: 1.4; max-width: 200px;
  z-index: var(--z-tooltip); pointer-events: none;
  box-shadow: var(--shadow-3);
}
/* 箭头 */
.tooltip::after {
  content: ''; position: absolute;
  border: 5px solid transparent;
}
.tooltip--top::after {
  bottom: -10px; left: 50%; transform: translateX(-50%);
  border-top-color: var(--gray-12);
}
```

---

## 43 Warning Card 风险卡片

_同 v2.2 [15 警告与风险卡片]，补全 Props。_

```typescript
interface WarningCardProps {
  title: string;
  source?: string;     // 数据来源，如「百融云创」
  sourceTime?: string; // 数据时间
  metrics: Array<{
    label: string;
    value: string | number;
    progress?: number; // 0–100，显示进度条
    progressColor?: 'amber' | 'green' | 'red';
  }>;
  badge?: { label: string; variant: 'warning' | 'danger' };
}
```

```css
.warning-card {
  border: 1px solid var(--amber-6); border-radius: var(--radius-4);
  background: var(--amber-2); padding: var(--space-5);
}
.warning-card__header {
  display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4);
}
.warning-card__title { font-size: 13px; font-weight: 700; color: var(--amber-12); flex: 1; }
.warning-card__source { font-size: 11px; color: var(--amber-11); font-family: var(--font-mono); }
.warning-card__metrics {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5);
}
.warning-metric__label { font-size: 11px; color: var(--amber-11); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
.warning-metric__value { font-size: 22px; font-weight: 700; letter-spacing: -.02em; color: var(--amber-12); }
.warning-metric__bar { height: 3px; border-radius: var(--radius-6); background: var(--amber-4); margin-top: 6px; overflow: hidden; }
.warning-metric__fill { height: 100%; border-radius: var(--radius-6); }
.warning-metric__fill--amber { background: var(--amber-8); }
.warning-metric__fill--green { background: var(--green-solid); }
.warning-metric__fill--red   { background: var(--red-solid); }
```

---

## 44 表单布局模式

### 标准多分区表单

```
┌────────────────────────────────────────────────────────┐
│  分区标题                                               │
│  描述文字                                               │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │ 字段 A          │  │ 字段 B          │              │
│  └─────────────────┘  └─────────────────┘              │
│  ┌───────────────────────────────────────┐              │
│  │ 字段 C（占全宽）                      │              │
│  └───────────────────────────────────────┘              │
└────────────────────────────────────────────────────────┘
                               ┌───────────┐ ┌─────────┐
                               │ 保存草稿   │ │ 提交审批│
                               └───────────┘ └─────────┘
```

**规则：**
- 默认两列，成对字段并排（名称&编码、起始&截止日期）
- 地址、备注等长文本字段占满整行
- 提交区靠右对齐；主操作 `btn--primary`，次操作 `btn--secondary`
- 分区间用独立卡片（`.form-section`）区隔，不用线框合并

---

## 45 数据表格 + 筛选模式

```
┌─────────────────────────────────────────────────────────────────┐
│  统计摘要条（可选 — 见 26 KPI Card）                             │
├─────────────────────────────────────────────────────────────────┤
│  [ 搜索框 ▢▢▢▢▢▢▢▢▢▢ ]  [ 类型 ▾ ]  [ 状态 ▾ ]  [ 日期范围 ]  共 N 条  │
├──────────┬──────────┬──────────────┬───────┬──────────┬─────────┤
│ 主键列   │ 类型     │ 标题         │ 状态  │ 时间     │ 操作    │
├──────────┼──────────┼──────────────┼───────┼──────────┼─────────┤
│ data     │ badge    │ text         │ dot+  │ mono     │ ghost   │
│ ...      │ ...      │ ...          │ text  │ small    │ links   │
├──────────┴──────────┴──────────────┴───────┴──────────┴─────────┤
│  < 1 2 3 … 24 >                              10/页 ▾             │
└─────────────────────────────────────────────────────────────────┘
```

**筛选规则：**
- 搜索框 flex-grow，最大 360px；回车或失焦触发搜索
- 筛选项 Select，宽度固定（120–160px）
- 「清除筛选」按钮仅在有激活筛选时出现（Ghost 变体）
- 批量操作区（选中 N 条后）出现在筛选条右侧，顶替结果计数

---

## 46 KPI 仪表板模式

```
面包屑
问候语（28px/700）           副文案（gray-11）
                            ↓ space-6
KPI 横条 [ 今日GMV ] [ 待发货 ] [ 异常门店 ] [ 超时工单 ]
                            ↓ space-6
┌──────────────────────────────────────────────────────────┐
│  全宽重点卡（radius-5）— 今日最高优先告警 / SLA 摘要       │
└──────────────────────────────────────────────────────────┘
                            ↓ space-7
[ 次级卡 A ]  [ 次级卡 B ]  [ 次级卡 C ]   （3列 gap-space-5）
                            ↓ space-7~8
┌───────────────────────────┐  ┌────────────────┐
│  主列表 / 图表（~65%）     │  │ 最近动态（~35%）│
│                           │  │                │
└───────────────────────────┘  └────────────────┘
```

**约束：**
- 全宽重点卡：每页 **至多 1 张**，radius-5，shadow-2，内边距 space-5~6
- KPI 横条：项间距 space-5~6；布局 `display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr))`
- 底区双栏：比例 约 1.5fr:1fr，右列 min-width 280px
- 彩色仅用于小图标底色 + 状态点，**不铺大色块**

---

## 47 详情页 + 上下文面板模式

```
┌─────────────────────────────────────┐  ┌──────────────────────┐
│  面包屑                              │  │  上下文面板（320px）  │
│  标题                                │  │  ┌──────────────────┐│
│  ┌─────────────────────────────────┐│  │  │ 操作区（btn-p）  ││
│  │ 详情卡 A（只读字段网格）        ││  │  └──────────────────┘│
│  └─────────────────────────────────┘│  │  ┌──────────────────┐│
│  ┌─────────────────────────────────┐│  │  │ 时间线 / 轨迹   ││
│  │ 详情卡 B（关联信息）            ││  │  └──────────────────┘│
│  └─────────────────────────────────┘│  └──────────────────────┘
│  ┌─────────────────────────────────┐│
│  │ 警告/风险卡（若有）             ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

**规则：**
- 右侧面板宽度固定 320–400px，不随内容变化
- 面板内操作区在面板顶部（提交按钮触手可及）
- 大量只读字段用 `.detail-grid`（两列），敏感字段用等宽 + 掩码
- 面板为空时隐藏，内容区展开至全宽

---

## 48 设计原则

_同 v2.2 [16 设计原则]，此处合并为精简版 + 扩展前端可量化规则。_

1. **Neutral first, accent second** — Gray-12 主导，品牌色点缀（≤10%）
2. **12-step semantic precision** — 任何用色须能引用 step token
3. **Step-6 borders, no heavy shadow** — 卡片最多 shadow-2
4. **Type does hierarchy** — 字号梯度 > 颜色强调
5. **Status = dot + text** — 禁止单色状态
6. **One primary button per scope** — 同层级只有一个 btn-p
7. **Soft density on dashboard, dense on data** — 首页 space-6~9，表格 space-4~5
8. **States are mandatory** — 任何数据区必须实现 Loading/Empty/Error 三态
9. **Keyboard-first interactive** — 所有可交互组件可用 Tab/Enter/Esc 操作
10. **Composition over custom** — 优先组合已有组件，禁止为一次需求新造颜色

---

## 49 可访问性指南

### 核心要求（WCAG AA）

| 要求 | 最低标准 | OMS 实施 |
|------|---------|---------|
| 文字对比度 | 4.5:1（正常文字）/ 3:1（大文字） | gray-11 on white ≈ 7.8:1 ✓ |
| 组件对比度 | 3:1（边框、图标） | gray-7 on white ≈ 3.4:1 ✓ |
| 焦点可见性 | 清晰可见焦点环 | `box-shadow: 0 0 0 2px var(--gray-4)` |
| 键盘导航 | 全部交互可达 | Tab 顺序 + Esc 关闭浮层 |
| 屏幕阅读器 | 正确 ARIA 语义 | 见下表 |

### ARIA 模式速查

| 组件 | role | 必要 aria 属性 |
|------|------|--------------|
| Dialog | `dialog` | `aria-modal="true"` `aria-labelledby` |
| Alert | `alert` 或 `alertdialog` | 自动宣告 |
| Table | `table` | `aria-label` 或 `aria-labelledby` |
| Button loading | `button` | `aria-disabled="true"` `aria-busy="true"` |
| Select | `combobox` | `aria-expanded` `aria-haspopup="listbox"` |
| Tabs | `tablist` / `tab` / `tabpanel` | `aria-selected` `aria-controls` |
| Status badge | `status` 或 `img` | `aria-label="状态：已通过"` |
| Icon-only button | `button` | `aria-label="关闭"` |

### 键盘交互标准

| 组件 | 键盘行为 |
|------|---------|
| Button | Enter / Space 触发 |
| Input | Tab 进入，Enter 提交最近表单 |
| Select / Combobox | ↑↓ 导航选项，Enter 选择，Esc 关闭 |
| Dialog | Esc 关闭，焦点锁定在弹层内 |
| Tabs | ← → 切换，Enter/Space 选中 |
| Dropdown | ↑↓ 导航，Enter 执行，Esc 关闭 |
| Table row | Enter 打开详情，Shift+Click 范围选择 |

### 只依靠颜色禁止传达的信息

以下信息必须配合文字、图标或形状：
- 输入框 Error 状态（同时显示错误文字）
- 状态指示（同时显示状态文字标签）
- 图表系列（同时显示标签或模式填充）

---

*NearGo OMS Design System v3.0 — 全站通用 · 对标 shadcn/ui 目录结构补全 · 2026-05-15*
*Radix UI color scale methodology · Inter + JetBrains Mono · 1440px viewport · WCAG AA+*
