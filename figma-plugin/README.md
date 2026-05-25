# NearGo OMS Component Library — Figma Plugin

将 NearGo OMS 设计规范 v2.0（基于 Radix UI 色阶方法论）一键导入 Figma，
自动创建所有 **Design Token 变量** + **完整组件库页面**。

---

## 安装 & 运行

### 1. 前置要求
- Figma **桌面客户端**（插件只支持桌面版，不支持浏览器版）
- 已打开 NearGo OMS 的 Figma 文件（或任意目标文件）

### 2. 导入插件（一次性操作）

```
Figma 菜单  →  Plugins  →  Development  →  Import plugin from manifest…
```
选择本文件夹中的 `manifest.json`，确认导入。

### 3. 运行插件

```
Figma 菜单  →  Plugins  →  Development  →  NearGo OMS Component Library
```
点击 **"Generate Component Library"** 按钮，等待进度完成（约 10–30 秒）。

---

## 生成内容

### 🟡 Design Token 变量（7 个集合）

| 集合 | 变量数 | 说明 |
|------|--------|------|
| NearGo / Amber | 12 | 品牌色阶，step-9 = #FFA902 |
| NearGo / Gray  | 12 | 中性色阶，step-12 = #1F1D1C |
| NearGo / Semantic | 20 | 语义色（绿/红/蓝/橙/紫各4步）|
| NearGo / Tokens | 16 | 别名 token（bg/surface/border/text…）|
| NearGo / Spacing | 9 | 4px–64px 间距阶梯 |
| NearGo / Radius  | 6 | 3px–999px 圆角阶梯 |
| NearGo / Font Size | 9 | 12px–36px 字号阶梯 |

### 🧩 组件库页面（"🧩 NearGo Component Library"）

| 组件集 | 变体数 | 关键属性 |
|--------|--------|----------|
| Button | 18 | Variant × Size（6×3）|
| Badge / Ticket Type | 3 | Type（KYC/KYB/Store）|
| Badge / Priority | 4 | Priority（Urgent/Normal/Low/Brand）|
| Status Indicator | 5 | State（L1/L2/Approved/Rejected/Returned）|
| Input | 6 | State（Default/Filled/Focused/Error/Read-Only/Disabled）|
| Navigation Item | 3 | State（Default/Hover/Active）|
| KPI Card | 4 | Variant（Neutral/Positive/Danger/Warning）|
| Stat Bar | 4 | Variant（Pending/L1/L2/Urgent）|
| Table Row | 3 | Type（Header/Data/Hover）|

---

## 核心色值一览

```
Primary Action  #1F1D1C  →  gray-12   所有关键操作按钮
Brand Color     #FFA902  →  amber-9   优惠信息（每屏 ≤10%）
Success         #29a383  →  green-9   审批通过
Danger          #e5484d  →  red-9     审批拒绝
Awaiting L1     #f76b15  →  orange-9  等待一级审批
Awaiting L2     #0090ff  →  blue-9    等待二级审批
Returned        #8e4ec6  →  purple-9  打回修改
Page BG         #fdfdfc  →  gray-1
Card Surface    #ffffff
Default Border  #dddbd8  →  gray-6
```

---

## 重新运行

再次运行插件时会**清除旧页面**并重新生成，变量集合也会替换。
请先确认本地修改已备份。
