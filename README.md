# NearGo OMS Design System

**v4.0** · [Radix UI Color Scale](https://www.radix-ui.com/colors) · [shadcn/ui](https://ui.shadcn.com) structure · WCAG AA+

NearGo OMS 后台管理系统设计规范 —— 前端可直接落地、工程化约束强制执行的完整设计系统。

---

## 仓库结构

```
neargo-oms-design-system/
├── NearGo-OMS-设计规范.md          # 完整设计规范（2510行 · 50章节）
│
├── tailwind.config.ts               # ★ 颜色/间距/圆角 Token 配置
├── .stylelintrc.json                # ★ 禁止 Hardcoded Hex — 强制 CSS 变量
├── .eslintrc.json                   # ★ 禁止 style prop 内联颜色
├── package.json                     # 依赖声明
├── tsconfig.json                    # TypeScript 严格模式
│
├── src/
│   ├── styles/
│   │   └── globals.css              # ★ 完整 CSS 变量（Light + Dark Mode）
│   ├── lib/
│   │   ├── tokens.ts                # TypeScript 类型 — Variant/Status 枚举
│   │   └── utils.ts                 # cn() Tailwind merge helper
│   └── components/
│       └── ui/                      # 受限组件库（shadcn/ui 封装）
│           ├── button.tsx           # ButtonVariant 类型约束
│           ├── badge.tsx            # BadgeVariant 类型约束
│           ├── alert.tsx            # AlertVariant 类型约束
│           ├── input.tsx            # 6 种状态完整实现
│           ├── textarea.tsx         # 字数统计 + error 状态
│           ├── label.tsx            # required / optional
│           ├── card.tsx             # default / dashboard 变体
│           ├── status-indicator.tsx # ★ 强制 dot + text 双通道
│           ├── skeleton.tsx         # shimmer 骨架屏
│           ├── separator.tsx        # 水平/垂直分隔线
│           ├── progress.tsx         # 5 种语义色进度条
│           ├── avatar.tsx           # 4 种尺寸 + 图片降级
│           ├── switch.tsx           # 开关（spring 动效）
│           └── index.ts             # 统一 barrel export
│
└── figma-plugin/
    ├── manifest.json
    ├── code.js                      # 自动创建 52 个 Figma 组件变体
    └── ui.html
```

---

## 🏗️ 工程化约束（The "Truth" Layer）

### 1. CSS Variables — 唯一色值来源

`src/styles/globals.css` 中定义了全量 CSS 变量。**Stylelint 会阻止**直接在代码中写 Hex：

```css
/* ❌ stylelint 报错 */
.my-button { background-color: #FFA902; }

/* ✅ 正确 */
.my-button { background-color: var(--amber-9); }
```

### 2. Tailwind Config — Token 映射

`tailwind.config.ts` 将所有 CSS 变量映射为 Tailwind 类名：

```tsx
/* ❌ 不可控 */
<div className="bg-[#FFA902]" />

/* ✅ 可追溯 */
<div className="bg-amber-9" />  // 映射到 var(--amber-9)
```

### 3. 组件 Variant 类型约束

`cva` + TypeScript 让非法 variant 在编译期报错：

```tsx
// ✅ 合法
<Button variant="primary" />
<Button variant="brand" />

// ❌ TypeScript 编译错误: Type '"red"' is not assignable to type '"primary" | ...'
<Button variant="red" />
```

### 4. Stylelint 规则

```bash
npm run lint:css   # 检测 CSS 硬编码颜色
npm run lint:ts    # 检测 style prop 内联颜色
npm run lint       # 全量检查
```

---

## 🚀 快速开始

### 安装依赖

```bash
npm install class-variance-authority clsx tailwind-merge
npm install -D stylelint stylelint-config-standard stylelint-declaration-use-variable
```

### 1. 复制 globals.css

将 `src/styles/globals.css` 引入项目入口：

```tsx
// app/layout.tsx 或 pages/_app.tsx
import "@/styles/globals.css";
```

### 2. 配置 Tailwind

将 `tailwind.config.ts` 合并到你的项目配置。

### 3. 使用受限组件

```tsx
import { Button, Badge, StatusIndicator, Skeleton } from "@/components/ui";

// Button — 只接受规范定义的 6 种 variant
<Button variant="primary" size="md">提交审批</Button>
<Button variant="brand" size="sm">限时优惠</Button>   // 品牌色 — 每屏 ≤1

// Badge — 只接受规范定义的 7 种 variant
<Badge variant="urgent">紧急</Badge>
<Badge variant="kyc">KYC 个人</Badge>

// StatusIndicator — 强制 dot + text 双通道（无障碍）
<StatusIndicator status="approved" />
<StatusIndicator status="pending-l1" label="待初审" />

// Skeleton — 加载态（任何异步数据区域必须实现）
<Skeleton variant="line" lines={3} />
<Skeleton variant="rect" className="h-32 w-full" />
```

---

## 🎨 核心色值

| 用途 | CSS 变量 | Tailwind | Hex |
|------|---------|----------|-----|
| 主要操作按钮 | `--gray-12` | `text-gray-12` | `#1F1D1C` |
| 品牌色（≤10%/屏）| `--amber-9` | `bg-amber-9` | `#FFA902` |
| 成功 | `--green-solid` | `bg-green-solid` | `#29a383` |
| 危险 | `--red-solid` | `bg-red-solid` | `#e5484d` |
| 页面背景 | `--bg` | `bg-bg` | `#fdfdfc` |
| 卡片表面 | `--surface` | `bg-surface` | `#ffffff` |
| 默认描边 | `--border` | `border-border` | `#dddbd8` |

---

## 🎨 Figma 插件

```
Figma → Plugins → Development → Import plugin from manifest…
选择 figma-plugin/manifest.json
运行 → Generate Component Library
```

自动创建 7 套变量集合 + 52 个组件变体。

---

## 📋 版本

| 版本 | 主要变更 |
|------|---------|
| **v4.0** | 完整 OMS 组件库（51个组件）：data-table composite、sidebar/AppShell、form、date picker、combobox、multi-select、file-upload、timeline、KPI card、filter-bar、loading-overlay、pagination、breadcrumb |
| v3.0 | 工程化层：tailwind.config + CSS vars + stylelint + 组件库（31个组件）|
| v2.2 | Soft Dashboard 排版范式，全站语言泛化 |
| v2.0 | Radix UI 色阶方法论重建 |

---

*NearGo OMS Design System · Radix UI Color Scale · shadcn/ui · WCAG AA+*
